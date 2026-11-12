

document.addEventListener('DOMContentLoaded', () => {
  const imagens = ['imagens/FRENTE PT.jpg', 'imagens/TRAS PT.jpg'];
  let indiceAtual = 0;

  const cardsFoto = document.querySelectorAll('.card-foto-menu');
  const modal = document.getElementById('modal-lightbox');
  const btnFechar = document.getElementById('fechar-lightbox');
  const setaAnterior = document.getElementById('seta-anterior');
  const setaSeguinte = document.getElementById('seta-seguinte');
  const imgModal = document.getElementById('img-lightbox');

  function atualizarImagem(indice) {
    indiceAtual = (indice + imagens.length) % imagens.length;
    if (imgModal) {
      imgModal.src = imagens[indiceAtual];
      imgModal.classList.remove('zoom');
    }
  }

  function abrirModal(indice) {
    if (!modal) return;
    atualizarImagem(indice);
    modal.classList.add('ativo');
    document.body.style.overflow = 'hidden';
  }

  function fecharModal() {
    if (!modal) return;
    modal.classList.remove('ativo');
    document.body.style.overflow = '';
    if (imgModal) imgModal.classList.remove('zoom');
  }

  function irParaAnterior() {
    atualizarImagem(indiceAtual - 1);
  }

  function irParaSeguinte() {
    atualizarImagem(indiceAtual + 1);
  }

  // Clicar nos cartões de foto da ementa
  cardsFoto.forEach((card) => {
    card.addEventListener('click', () => {
      const idx = parseInt(card.getAttribute('data-index') || '0', 10);
      abrirModal(idx);
    });
  });

  // Navegação por setas
  if (setaAnterior) {
    setaAnterior.addEventListener('click', (e) => {
      e.stopPropagation();
      irParaAnterior();
    });
  }

  if (setaSeguinte) {
    setaSeguinte.addEventListener('click', (e) => {
      e.stopPropagation();
      irParaSeguinte();
    });
  }

  // Fechar botão (X)
  if (btnFechar) {
    btnFechar.addEventListener('click', (e) => {
      e.stopPropagation();
      fecharModal();
    });
  }

  // Fechar ao clicar fora da imagem
  if (modal) {
    modal.addEventListener('click', (e) => {
      if (e.target === modal || e.target.classList.contains('lightbox-conteudo')) {
        fecharModal();
      }
    });
  }

  // Alternar zoom ao clicar na imagem
  if (imgModal) {
    imgModal.addEventListener('click', (e) => {
      e.stopPropagation();
      imgModal.classList.toggle('zoom');
    });
  }

  // Teclas de atalho (Escape para fechar, Setas para navegar)
  document.addEventListener('keydown', (e) => {
    if (!modal || !modal.classList.contains('ativo')) return;

    if (e.key === 'Escape') {
      fecharModal();
    } else if (e.key === 'ArrowLeft') {
      irParaAnterior();
    } else if (e.key === 'ArrowRight') {
      irParaSeguinte();
    }
  });
});
