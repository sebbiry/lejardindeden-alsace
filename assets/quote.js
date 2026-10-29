(() => {
  const form = document.getElementById('emailQuoteForm');
  if (!form) return;
  const status = document.getElementById('quoteStatus');
  const submit = form.querySelector('button[type="submit"]');
  const emailLink = document.getElementById('quoteEmail');
  const smsLink = document.getElementById('quoteSms');
  const copyText = document.getElementById('quoteCopyText');
  let sending = false;
  function requestText() {
    const data = new FormData(form);
    return [
      `Bonjour, je souhaite un devis pour ${data.get('service') || 'une prestation'}.`,
      `Nom : ${data.get('name') || '—'}`,
      `E-mail : ${data.get('email') || '—'}`,
      `Téléphone : ${data.get('phone') || '—'}`,
      `Commune / cimetière : ${data.get('place') || '—'}`,
      `Précisions : ${data.get('message') || '—'}`
    ].join('\n');
  }
  function updateBackup() {
    const body = encodeURIComponent(requestText());
    emailLink.href = 'mailto:ns.lejardin.eden@gmail.com?subject=' + encodeURIComponent('Demande de devis — Le Jardin d’Eden') + '&body=' + body;
    const ios = /iPad|iPhone|iPod/.test(navigator.userAgent) || (navigator.platform === 'MacIntel' && navigator.maxTouchPoints > 1);
    smsLink.href = 'sms:+33744400810' + (ios ? '&' : '?') + 'body=' + body;
    copyText.value = requestText();
  }
  form.addEventListener('input', updateBackup);
  form.addEventListener('change', updateBackup);
  emailLink.addEventListener('click', updateBackup);
  smsLink.addEventListener('click', updateBackup);
  updateBackup();
  document.getElementById('quoteCopy').addEventListener('click', async () => {
    updateBackup();
    try {
      await navigator.clipboard.writeText(requestText());
      status.textContent = 'Demande copiée. Collez-la dans votre e-mail ou SMS pour l’envoyer.';
    } catch {
      copyText.hidden = false;
      copyText.focus();
      copyText.select();
      status.textContent = 'Copiez le texte sélectionné ci-dessous, puis collez-le dans votre e-mail ou SMS.';
    }
  });
  form.addEventListener('submit', async event => {
    event.preventDefault();
    if (sending || !form.reportValidity()) return;
    const data = new FormData(form);
    if (data.get('_honey')) return;
    updateBackup();
    sending = true;
    submit.disabled = true;
    submit.textContent = 'Envoi en cours…';
    status.textContent = 'Transmission de votre demande en cours…';
    const controller = new AbortController();
    const timeout = setTimeout(() => controller.abort(), 15000);
    try {
      const response = await fetch('https://formsubmit.co/ajax/ns.lejardin.eden@gmail.com', {
        method: 'POST', headers: {'Content-Type': 'application/json', 'Accept': 'application/json'},
        body: JSON.stringify(Object.fromEntries(data.entries())), signal: controller.signal
      });
      if (!response.ok) throw new Error('Service unavailable');
      const result = await response.json();
      if (result.success !== true && result.success !== 'true') throw new Error('Submission not confirmed');
      window.location.assign('/demande-envoyee.html');
    } catch {
      status.textContent = 'L’envoi n’a pas pu être confirmé. Votre demande reste affichée. Vous pouvez réessayer ou utiliser « Par e-mail » ou « Par SMS » ci-dessous, puis appuyer sur Envoyer dans votre messagerie.';
      status.focus();
    } finally {
      clearTimeout(timeout);
      sending = false;
      submit.disabled = false;
      submit.textContent = 'Envoyer ma demande';
    }
  });
})();
