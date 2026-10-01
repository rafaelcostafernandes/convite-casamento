// Envio do Formulário de Confirmação
  rsvpForm.addEventListener('submit', (e) => {
    e.preventDefault();

    const btnSubmit = document.getElementById('btn-submit');
    btnSubmit.innerText = 'Enviando...';
    btnSubmit.disabled = true;

    const formData = new FormData(rsvpForm);
    const data = {
      nome: formData.get('nome'),
      acompanhantes: formData.get('acompanhantes'),
      mensagem: formData.get('mensagem'),
      data_envio: new Date().toLocaleString('pt-BR')
    };

    // Cole aqui a URL do seu endpoint do SheetDB
    const SHEETDB_URL = 'https://sheetdb.io/api/v1/SUA_CHAVE_AQUI';

    fetch(SHEETDB_URL, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({ data: [data] })
    })
    .then(response => response.json())
    .then(result => {
      rsvpForm.classList.add('hidden');
      rsvpMessage.classList.remove('hidden');
    })
    .catch(error => {
      console.error('Erro ao enviar:', error);
      alert('Houve um erro ao enviar sua confirmação. Por favor, tente novamente.');
      btnSubmit.innerText = 'Confirmar Minha Presença';
      btnSubmit.disabled = false;
    });
  });