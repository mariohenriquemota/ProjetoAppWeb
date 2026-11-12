// ==========================================
// NINHO D'ARARA - Gestão de Reservas e Validação
// Aplicações Web · Licenciatura em Informática de Gestão
// ==========================================

const PRECOS_QUARTOS = {
  'quarto-duplo': { nome: 'Quarto Duplo Rústico', preco: 85 },
  'suite-jardim': { nome: 'Suite Jardim com Terraço', preco: 110 },
  'quarto-familiar': { nome: 'Quarto Familiar Arara', preco: 135 },
  'bungalow-panoramico': { nome: 'Bungalow Panorâmico', preco: 150 }
};

document.addEventListener('DOMContentLoaded', () => {
  // 1. Ler quarto pré-selecionado a partir do URL (ex: reserva.html?quarto=suite-jardim)
  const params = new URLSearchParams(window.location.search);
  const quartoParam = params.get('quarto');

  const selectQuarto = document.querySelector('#quarto-select');
  const inputCheckIn = document.querySelector('#data-checkin');
  const inputCheckOut = document.querySelector('#data-checkout');
  const erroDatas = document.querySelector('#erro-datas');
  const resumoCalculo = document.querySelector('#resumo-calculo');
  const formReserva = document.querySelector('#form-reserva');
  const mensagemSucesso = document.querySelector('#mensagem-sucesso');

  // Inicializar datas por omissão
  const hoje = new Date();
  const hojeISO = hoje.toISOString().split('T')[0];
  
  const amanha = new Date();
  amanha.setDate(hoje.getDate() + 1);
  const amanhaISO = amanha.toISOString().split('T')[0];

  const depoisDeAmanha = new Date();
  depoisDeAmanha.setDate(hoje.getDate() + 2);
  const depoisDeAmanhaISO = depoisDeAmanha.toISOString().split('T')[0];

  if (inputCheckIn && inputCheckOut) {
    inputCheckIn.min = hojeISO;
    inputCheckOut.min = amanhaISO;

    if (!inputCheckIn.value) inputCheckIn.value = amanhaISO;
    if (!inputCheckOut.value) inputCheckOut.value = depoisDeAmanhaISO;

    inputCheckIn.addEventListener('change', () => {
      const dataIn = new Date(inputCheckIn.value);
      if (!isNaN(dataIn.getTime())) {
        dataIn.setDate(dataIn.getDate() + 1);
        inputCheckOut.min = dataIn.toISOString().split('T')[0];
        if (new Date(inputCheckOut.value) <= new Date(inputCheckIn.value)) {
          inputCheckOut.value = dataIn.toISOString().split('T')[0];
        }
      }
      validarDatas();
      atualizarCalculoResumo();
    });

    inputCheckOut.addEventListener('change', () => {
      validarDatas();
      atualizarCalculoResumo();
    });
  }

  if (selectQuarto) {
    if (quartoParam && PRECOS_QUARTOS[quartoParam]) {
      selectQuarto.value = quartoParam;
    }
    selectQuarto.addEventListener('change', atualizarCalculoResumo);
  }

  function validarDatas() {
    if (!inputCheckIn || !inputCheckOut || !erroDatas) return true;
    const inDate = new Date(inputCheckIn.value);
    const outDate = new Date(inputCheckOut.value);

    if (outDate <= inDate) {
      erroDatas.classList.remove('hidden');
      inputCheckOut.style.borderColor = '#dc2626';
      return false;
    } else {
      erroDatas.classList.add('hidden');
      inputCheckOut.style.borderColor = '';
      return true;
    }
  }

  function calcularNoites() {
    if (!inputCheckIn || !inputCheckOut || !inputCheckIn.value || !inputCheckOut.value) return 1;
    const inDate = new Date(inputCheckIn.value);
    const outDate = new Date(inputCheckOut.value);
    const diffTime = outDate.getTime() - inDate.getTime();
    const noites = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
    return noites > 0 ? noites : 1;
  }

  function atualizarCalculoResumo() {
    if (!resumoCalculo || !selectQuarto) return;
    const infoQuarto = PRECOS_QUARTOS[selectQuarto.value];
    
    if (!infoQuarto) {
      resumoCalculo.innerHTML = '';
      return;
    }

    const noites = calcularNoites();
    const total = noites * infoQuarto.preco;

    resumoCalculo.innerHTML = `
      <div class="rounded-xl bg-emerald-50 border border-emerald-200 p-3.5 text-xs text-emerald-950 flex flex-col gap-1.5">
        <div class="flex justify-between items-center border-b border-emerald-200 pb-1.5">
          <span class="font-semibold text-emerald-900">${infoQuarto.nome}</span>
          <span class="bg-emerald-200 text-emerald-950 px-2 py-0.5 rounded font-bold">${infoQuarto.preco}€ / noite</span>
        </div>
        <div class="flex justify-between items-center text-emerald-800">
          <span>Estadia: ${noites} ${noites === 1 ? 'noite' : 'noites'}</span>
          <span class="text-sm font-extrabold text-[#e13a37]">Total: ${total} €</span>
        </div>
      </div>
    `;
  }

  // Executar o cálculo logo ao abrir
  atualizarCalculoResumo();

  // Validação no envio do formulário
  if (formReserva) {
    formReserva.addEventListener('submit', (e) => {
      e.preventDefault();

      // Verificar validação nativa de HTML5 (required, email, pattern, minlength)
      if (!formReserva.checkValidity()) {
        formReserva.reportValidity();
        return;
      }

      // Validar se as datas estão corretas
      if (!validarDatas()) {
        inputCheckOut.focus();
        return;
      }

      // Sucesso
      if (mensagemSucesso) {
        mensagemSucesso.classList.remove('hidden');
        mensagemSucesso.scrollIntoView({ behavior: 'smooth', block: 'center' });
      }

      const submitBtn = formReserva.querySelector('button[type="submit"]');
      if (submitBtn) {
        submitBtn.disabled = true;
        submitBtn.innerHTML = '✓ Pedido Enviado!';
        setTimeout(() => {
          submitBtn.disabled = false;
          submitBtn.innerHTML = 'Confirmar Pedido de Reserva';
        }, 4000);
      }
    });
  }
});
