const GOOGLE_ADS_CONVERSION_ID = 'AW-18008595740';
const CONTACT_CONVERSION_LABEL = 'EiveCP-j2accEJy6lYtD';
const CONTACT_CONVERSION_SEND_TO = `${GOOGLE_ADS_CONVERSION_ID}/${CONTACT_CONVERSION_LABEL}`;

export function trackContactConversion() {
  if (typeof window === 'undefined' || typeof window.gtag !== 'function') {
    return;
  }

  window.gtag('event', 'conversion', {
    send_to: CONTACT_CONVERSION_SEND_TO
  });
}
