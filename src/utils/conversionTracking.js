export function trackContactConversion() {
  if (typeof window === 'undefined') {
    return;
  }

  if (typeof window.trackContactConversion === 'function') {
    window.trackContactConversion();
    return;
  }

  if (typeof window.gtag === 'function') {
    window.gtag('event', 'conversion', {
      send_to: 'AW-18008595740/EiveCP-j2accEJy6lYtD'
    });
  }
}
