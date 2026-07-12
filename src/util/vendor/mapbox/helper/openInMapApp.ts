export function openInMapApp({ lat, lng }: { lat: number; lng: number }) {
  // Detect the platform
  const userAgent = navigator.userAgent || navigator.vendor;

  // iOS devices
  if (/iPad|iPhone|iPod/.test(userAgent)) {
    // Apple Maps URL scheme
    window.location.href = `maps://maps.apple.com/?q=${lat},${lng}`;
  }

  // Android devices
  else if (/android/i.test(userAgent)) {
    // Google Maps intent URL
    window.location.href = `geo:${lat},${lng}?q=${lat},${lng}`;
  }

  // Desktop or fallback
  else {
    // Google Maps web URL
    window.open(`https://www.google.com/maps?q=${lat},${lng}`, "_blank");
  }
}
