// ==========================================
// NINHO D'ARARA - Gestão de Reservas e Validação
// Licenciatura em Informática de Gestão - Aplicações Web
// ==========================================

const PRECOS_QUARTOS = {
  'quarto-duplo': { nome: 'Quarto Duplo Rústico', preco: 85 },
  'suite-jardim': { nome: 'Suite Jardim', preco: 110 },
  'quarto-familiar': { nome: 'Quarto Familiar Arara', preco: 135 },
  'cafetaria': { nome: 'Mesa na Cafetaria / Restaurante', preco: 0 }
};

document.addEventListener('DOMContentLoaded', () => {
  // 1. Preenchimento automático por parâmetro de URL (ex: contactos.html?quarto=suite-jardim)
  const params = new URLSearchParams(window.location.search);
  const quartoParam = params.get('quarto');

  const selectQuarto = document.querySelector('#quarto-select');
  const inputCheckIn = document.querySelector('#data-checkin');
  const inputCheckOut = document.querySelector('#data-checkout');
  const resumoCalculo = document.querySelector('#resumo-calculo');
  const formReserva = document.querySelector('#form-reserva');
  const mensagemSucesso = document.querySelector('#mensagem-sucesso');
  const mensagemErro = document.querySelector('#mensagem-erro');

  // Inicializar datas mínimas (não permitir datas no passado)
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
      // Ajustar data mínima de checkout para o dia seguinte ao checkin
      const dataIn = new Date(inputCheckIn.value);
      if (!isNaN(dataIn.getTime())) {
        dataIn.setDate(dataIn.getDate() + 1);
        inputCheckOut.min = dataIn.toISOString().split('T')[0];
        if (new Date(inputCheckOut.value) <= new Date(inputCheckIn.value)) {
          inputCheckOut.value = dataIn.toISOString().split('T')[0];
        }
      }
      atualizarCalculoResumo();
    });

    inputCheckOut.addEventListener('change', atualizarCalculoResumo);
  }

  if (selectQuarto) {
    if (quartoParam && PRECOS_QUARTOS[quartoParam]) {
      selectQuarto.value = quartoParam;
    }
    selectQuarto.addEventListener('change', atualizarCalculoResumo);
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
    if (!infoQuarto || infoQuarto.preco === 0) {
      resumoCalculo.innerHTML = `
        <div class="rounded-lg bg-emerald-50 border border-emerald-200 p-3 text-sm text-emerald-900">
          <p class="font-semibold">Reserva de Mesa / Visita à Cafetaria</p>
          <p class="text-xs text-emerald-700">Sem custos de estadia. O pagamento é efetuado no local consoante o consumo.</p>
        </div>
      `;
      return;
    }

    const noites = calcularNoites();
    const total = noites * infoQuarto.preco;

    resumoCalculo.innerHTML = `
      <div class="rounded-lg bg-emerald-50 border border-emerald-200 p-4 text-sm text-emerald-950 flex flex-col gap-2">
        <div class="flex justify-between items-center border-b border-emerald-200 pb-2">
          <span class="font-medium text-emerald-800">${infoQuarto.nome}</span>
          <span class="text-xs bg-emerald-200 text-emerald-900 px-2 py-0.5 rounded-full font-semibold">${infoQuarto.preco}€ / noite</span>
        </div>
        <div class="flex justify-between text-xs text-emerald-700">
          <span>Duração:</span>
          <span class="font-medium">${noites} ${noites === 1 ? 'noite' : 'noites'}</span>
        </div>
        <div class="flex justify-between items-baseline pt-1">
          <span class="font-bold text-sm text-emerald-900">Total Estimado:</span>
          <span class="text-xl font-bold text-[#e13a37]">${total} €</span>
        </div>
        <p class="text-[11px] text-emerald-600 italic">Preço com impostos incluídos e cancelamento gratuito até 48h antes.</p>
      </div>
    `;
  }

  // Executar cálculo inicial
  atualizarCalculoResumo();

  // Validação do Formulário
  if (formReserva) {
    formReserva.addEventListener('submit', (e) => {
      e.preventDefault();

      let valido = true;
      let mensagem = '';

      const nome = document.querySelector('#nome-completo');
      const email = document.querySelector('#email-contacto');
      const telefone = document.querySelector('#telefone-contacto');

      if (!nome || !nome.value.trim()) {
        valido = false;
        mensagem = 'Por favor, indique o seu nome completo.';
      } else if (!email || !email.validity.valid) {
        valido = false;
        mensagem = 'Por favor, indique um endereço de e-mail válido.';
      } else if (inputCheckIn && inputCheckOut) {
        const inDate = new Date(inputCheckIn.value);
        const outDate = new Date(inputCheckOut.value);
        if (outDate <= inDate) {
          valido = false;
          mensagem = 'A data de check-out tem de ser posterior à data de check-in.';
        }
      }

      if (!valido) {
        if (mensagemErro) {
          mensagemErro.textContent = mensagem;
          mensagemErro.classList.remove('hidden');
          if (mensagemSucesso) mensagemSucesso.classList.add('hidden');
        } else {
          alert(mensagem);
        }
        return;
      }

      // Sucesso
      if (mensagemErro) mensagemErro.classList.add('hidden');
      if (mensagemSucesso) {
        mensagemSucesso.classList.remove('hidden');
        mensagemSucesso.scrollIntoView({ behavior: 'smooth', block: 'center' });
      }

      // Desativar botão temporariamente para feedback
      const submitBtn = formReserva.querySelector('button[type="submit"]');
      if (submitBtn) {
        submitBtn.disabled = true;
        submitBtn.innerHTML = '✓ Pedido de Reserva Registado';
        setTimeout(() => {
          submitBtn.disabled = false;
          submitBtn.innerHTML = 'Confirmar Pedido de Reserva';
        }, 5000);
      }
    });
  }

  // Filtros interativos para a página de alojamento.html
  const filterBtns = document.querySelectorAll('.quarto-filter-btn');
  const roomCards = document.querySelectorAll('.quarto-card-item');

  if (filterBtns.length > 0 && roomCards.length > 0) {
    filterBtns.forEach(btn => {
      btn.addEventListener('click', () => {
        // Remover estado ativo de todos
        filterBtns.forEach(b => {
          b.classList.remove('bg-[#2e693b]', 'text-white');
          b.classList.add('bg-white', 'text-slate-700', 'border-slate-300');
        });
        // Ativar botão clicado
        btn.classList.add('bg-[#2e693b]', 'text-white');
        btn.classList.remove('bg-white', 'text-slate-700', 'border-slate-300');

        const filter = btn.getAttribute('data-filter');

        roomCards.forEach(card => {
          const capacidade = card.getAttribute('data-capacidade');
          if (filter === 'todos' || filter === capacidade) {
            card.classList.remove('hidden');
          } else {
            card.classList.add('hidden');
          }
        });
      });
    });
  }
});
