import tls from 'node:tls';

const SMTP_HOST = process.env.SMTP_HOST || 'smtp.gmail.com';
const SMTP_PORT = Number(process.env.SMTP_PORT || 465);
const SMTP_USER = process.env.SMTP_USER;
const SMTP_APP_PASSWORD = process.env.SMTP_APP_PASSWORD;
const LEAD_RECEIVER_EMAIL = process.env.LEAD_RECEIVER_EMAIL || 'royalinvestorealty@gmail.com';

const b64 = (v) => Buffer.from(v, 'utf8').toString('base64');

function parseBody(req) {
  return new Promise((resolve, reject) => {
    let body = '';
    req.on('data', (chunk) => { body += chunk; });
    req.on('end', () => {
      try { resolve(body ? JSON.parse(body) : {}); } catch { reject(new Error('Invalid JSON body')); }
    });
    req.on('error', reject);
  });
}

function sendCommand(socket, cmd, expectedCodes) {
  return new Promise((resolve, reject) => {
    let buffer = '';
    const onData = (chunk) => {
      buffer += chunk.toString('utf8');
      const lines = buffer.split('\r\n').filter(Boolean);
      if (!lines.length) return;
      const last = lines[lines.length - 1];
      if (!/^\d{3} /.test(last)) return;
      const code = Number(last.slice(0, 3));
      socket.off('data', onData);
      if (expectedCodes.includes(code)) resolve({ code, data: buffer });
      else reject(new Error(`SMTP error ${code}: ${buffer}`));
    };
    socket.on('data', onData);
    if (cmd) socket.write(`${cmd}\r\n`);
  });
}

async function sendViaSmtp({ subject, content, replyTo }) {
  if (!SMTP_USER || !SMTP_APP_PASSWORD) throw new Error('SMTP credentials are missing');

  const socket = tls.connect({ host: SMTP_HOST, port: SMTP_PORT, servername: SMTP_HOST });
  await new Promise((resolve, reject) => {
    socket.once('secureConnect', resolve);
    socket.once('error', reject);
  });

  try {
    await sendCommand(socket, '', [220]);
    await sendCommand(socket, 'EHLO royalinvestorrealty.com', [250]);
    await sendCommand(socket, 'AUTH LOGIN', [334]);
    await sendCommand(socket, b64(SMTP_USER), [334]);
    await sendCommand(socket, b64(SMTP_APP_PASSWORD), [235]);
    await sendCommand(socket, `MAIL FROM:<${SMTP_USER}>`, [250]);
    await sendCommand(socket, `RCPT TO:<${LEAD_RECEIVER_EMAIL}>`, [250, 251]);
    await sendCommand(socket, 'DATA', [354]);

    const headers = [
      `From: Royal Investor Realty <${SMTP_USER}>`,
      `To: ${LEAD_RECEIVER_EMAIL}`,
      replyTo ? `Reply-To: ${replyTo}` : '',
      `Subject: ${subject}`,
      'MIME-Version: 1.0',
      'Content-Type: text/plain; charset=UTF-8'
    ].filter(Boolean).join('\r\n');

    socket.write(`${headers}\r\n\r\n${content}\r\n.\r\n`);
    await sendCommand(socket, '', [250]);
    await sendCommand(socket, 'QUIT', [221]);
  } finally {
    socket.end();
  }
}

export default async function handler(req, res) {
  if (req.method !== 'POST') {
    res.statusCode = 405;
    res.setHeader('Content-Type', 'application/json');
    res.end(JSON.stringify({ error: 'Method not allowed' }));
    return;
  }

  try {
    const payload = await parseBody(req);
    const lines = [
      `Source: ${payload.source || '-'}`,
      `Name: ${payload.name || '-'}`,
      `Email: ${payload.email || '-'}`,
      `Phone: ${payload.phone || '-'}`,
      `Property: ${payload.property || '-'}`,
      `Location: ${payload.location || '-'}`,
      `Price: ${payload.price || '-'}`,
      `Message: ${payload.message || '-'}`,
      `Submitted At: ${new Date().toISOString()}`
    ];

    await sendViaSmtp({
      subject: `New Lead - ${payload.property || payload.source || 'Website Inquiry'}`,
      content: lines.join('\n'),
      replyTo: payload.email
    });

    res.statusCode = 200;
    res.setHeader('Content-Type', 'application/json');
    res.end(JSON.stringify({ ok: true }));
  } catch (error) {
    res.statusCode = 500;
    res.setHeader('Content-Type', 'application/json');
    res.end(JSON.stringify({ error: error.message || 'Failed to send email' }));
  }
}
