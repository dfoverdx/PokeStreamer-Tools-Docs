const deprecated = $('#deprecated'),
  dismissed = Boolean(localStorage.getItem('dismissed') || false);
if (dismissed) {
  deprecated.remove();
} else {
  deprecated.alert();
  deprecated.on('close.bs.alert', () => localStorage.setItem('dismissed', 'true'));
}