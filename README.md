# 🌿 Ninho D'Arara — Alojamento Local & Cafetaria

> **Unidade Curricular:** Aplicações Web  
> **Curso:** Licenciatura em Informática de Gestão — ISCAC / Coimbra Business School  
> **Ano Letivo:** 2026/2027  
> **Entrega 2:** Identificação e Estrutura Inicial do Projeto  

---

## 📖 1. Sobre o Projeto

O **Ninho D'Arara** é uma plataforma web desenvolvida para um espaço de turismo rural e cafetaria biológica situado num ambiente de natureza panorâmica (árvores, montanhas, rio e aves). O website permite aos utilizadores explorar o conceito do alojamento, consultar as diferentes tipologias de quartos com as respetivas comodidades e preçário, consultar a ementa da cafetaria/restaurante de produtos locais e efetuar pedidos de reserva interativos com cálculo dinâmico do valor total da estadia.

---

## 👥 2. Equipa de Desenvolvimento

| Nº de Estudante | Nome Completo |
| :--- | :--- |
| *[Nº de Aluno]* | **Mário Henrique Mota** |
| *[Nº de Aluno]* | *[Nome do 2º Elemento, se aplicável]* |

- **Repositório GitHub:** [https://github.com/mariohenriquemota/ProjetoAppWeb](https://github.com/mariohenriquemota/ProjetoAppWeb)

---

## 🚀 3. Estrutura de Páginas do Website

1. **Página Inicial (`index.html`)**:
   - Cabeçalho institucional com logótipo em badge (*NINHO D'ARARA*) e menu de navegação responsivo.
   - Secção Hero em tons suaves de verde sálvia com slogan de boas-vindas e botão de ação direta (*CTA "Fazer Reserva"*).
   - Secção fotográfica panorâmica ilustrando a envolvente natural.
   - Três cartões de destaque com ícones temáticos e botões de navegação:
     - **1. Alojamento** (botão *Ver quartos*);
     - **2. Cafetaria** (botão *Ver ementa*);
     - **3. Natureza Envolvente** (botão *Explorar*).
   - Rodapé completo com Morada, Contactos, Horários de funcionamento, Redes Sociais e atalho para o Acesso Reservado.

2. **Catálogo de Quartos (`alojamento.html`)**:
   - Apresentação dos diferentes tipos de estadia com fotografia, comodidades e preços:
     - **Quarto Duplo Rústico** (Desde 85€ / noite);
     - **Suite Jardim** (Desde 110€ / noite);
     - **Quarto Familiar Arara** (Desde 135€ / noite).
   - Filtro interativo por capacidade (Casal, Suite, Familiar).
   - Botões de reserva rápida que encaminham para o formulário com o respetivo quarto pré-selecionado.

3. **Cafetaria & Restaurante (`restaurante.html`)**:
   - Apresentação do conceito gastronómico sustentável (*Slow Food* e produtos biológicos da região).
   - Ementa detalhada dividida em secções: Pequeno-Almoço & Brunch, Almoços Ligeiros & Tapas da Aldeia, Cafetaria de Especialidade & Vinhos.
   - Indicação de alergénios e dietas especiais (Vegetariano, Sem Glúten, Bio).
   - Opção de reserva de mesa e informação sobre o cesto de piquenique para trilhos pedestres.

4. **Contactos & Formulário de Reserva (`contactos.html`)**:
   - Formulário semântico com validação em JavaScript (`novalidate`, feedback visual em caso de erro/sucesso).
   - Cálculo automático do número de noites e estimativa do preço total da estadia em tempo real.
   - Informações completas de localização, horários e mapa de orientação.

5. **Acesso Reservado (`entrar.html`)**:
   - Ecrã de autenticação destinado aos administradores e colaboradores para gestão futura do alojamento (preparado para integração com PHP e base de dados MySQL).

---

## 🛠️ 4. Tecnologias Utilizadas

- **HTML5 Semântico:** Utilização cuidada de tags semânticas (`<header>`, `<nav>`, `<main>`, `<article>`, `<section>`, `<fieldset>`, `<legend>`, `<footer>`).
- **Tailwind CSS 3.4 (via CDN):** Estilização moderna e utilitária, garantindo consistência visual e facilidade de manutenção sem necessidade de ferramentas de compilação complexas.
- **JavaScript Moderno (ES6+):**
  - Manipulação da DOM para controlo do menu de navegação responsivo em dispositivos móveis (`js/menu.js`).
  - Lógica de reservas, leitura de parâmetros de URL (`URLSearchParams`), validação de datas e cálculo de orçamentos em tempo real (`js/reservas.js`).
- **Design Responsivo (Mobile-First):** Testado e otimizado para smartphones, tablets e computadores portáteis/desktop.

---

## 💻 5. Como Abrir e Testar o Projeto no Visual Studio Code

1. Abra a pasta do projeto no **Visual Studio Code**.
2. Certifique-se de que tem a extensão **Live Server** instalada no VS Code (da autoria de *Ritwick Dey*).
3. Clique com o botão direito do rato no ficheiro `index.html` e selecione **"Open with Live Server"** (ou prima `Alt + L, Alt + O`).
4. O navegador abrirá automaticamente o website no endereço `http://127.0.0.1:5500/index.html`.
5. Em alternativa, pode abrir diretamente o ficheiro `index.html` em qualquer navegador web moderno (Google Chrome, Mozilla Firefox, Microsoft Edge, Safari).

---

## 📅 6. Estado do Desenvolvimento & Próximos Passos

- [x] **Entrega 2:** Identificação do projeto, wireframes, estrutura inicial do website com Tailwind CSS, catálogo de quartos, ementa da cafetaria e validação de formulário no cliente.
- [ ] **Entrega 3:** Criação do modelo de dados relacional (MySQL) e integração de scripts PHP para persistência dos dados de reservas e relatos.
- [ ] **Entrega 4:** Autenticação com sessões PHP, controlo de acessos e painel de administração (CRUD de quartos, preços e ementa).
