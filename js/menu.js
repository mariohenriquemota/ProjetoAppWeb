

document.addEventListener('DOMContentLoaded', () => {
  const botao = document.querySelector('#menu-botao');
  const menu = document.querySelector('#menu-principal');
  const icone = document.querySelector('#menu-icone');

  if (!botao || !menu) return;

  function abrirMenu() {
    menu.classList.remove('hidden');
    botao.setAttribute('aria-expanded', 'true');
    if (icone) icone.textContent = '✕';
  }

  function fecharMenu() {
    menu.classList.add('hidden');
    botao.setAttribute('aria-expanded', 'false');
    if (icone) icone.textContent = '☰';
  }

  // Clicar no botão alterna entre aberto e fechado
  botao.addEventListener('click', () => {
    const aberto = botao.getAttribute('aria-expanded') === 'true';
    if (aberto) {
      fecharMenu();
    } else {
      abrirMenu();
    }
  });

  // esc
  document.addEventListener('keydown', (evento) => {
    if (evento.key === 'Escape' && botao.getAttribute('aria-expanded') === 'true') {
      fecharMenu();
      botao.focus();
    }
  });

  // Fecha o menu 
  window.matchMedia('(min-width: 768px)').addEventListener('change', (evento) => {
    if (evento.matches) {
      fecharMenu();
    }
  });
});
