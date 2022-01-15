const deprecated = $('#deprecated'),
  dismissed = Boolean(localStorage.getItem('dismissed') || false);
if (dismissed) {
  deprecated.remove();
} else {
  deprecated.alert();
  deprecated.on('close.bs.alert', () => localStorage.setItem('dismissed', 'true'));
}

const accepted = Boolean(localStorage.getItem('accepted') || false);
if (!accepted) {
  const modal = $('#dep-modal').modal({
    show: true,
    keyboard: false,
    focus: true,
  });
  
  const input = $('#deprecation-input');
  const acceptBtn = $('#accept-deprecration-warning');
  
  input.on('change', () => acceptBtn.prop(
    'disabled',
    input.value() !== 'Because I understand that Pokemon Soul.link is NO LONGER SUPPORTED, I will use Pokelink instead! 🧐'
  ));
  
  acceptBtn.on('click', () => {
    localStorage.setItem('accepted' , 'true');
    modal.hide();
  });
}