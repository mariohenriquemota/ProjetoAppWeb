# 🌿 Ninho D'Arara — Alojamento Local & Cafetaria

> **Unidade Curricular:** Aplicações Web  
> **Curso:** Licenciatura em Informática de Gestão — ISCAC / Coimbra Business School  
> **Ano Letivo:** 2026/2027  
> **Entrega 2:** Identificação e Estrutura Inicial do Projeto  

---

## 📖 1. Sobre o Projeto

O **Ninho D'Arara** é um website simples e intuitivo desenvolvido para um espaço de alojamento local rural e cafetaria envolto em natureza panorâmica (*árvores • montanhas • rio • aves*).

O projeto foi construído respeitando as instruções das aulas práticas de Aplicações Web, combinando **HTML5 semântico**, **regras de estilo personalizadas em CSS (`css/estilos.css`)** e a biblioteca utilitária **Tailwind CSS**.

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
   - Cabeçalho com badge do logótipo (*NINHO D'ARARA*) e menu de navegação responsivo (`Início | Alojamento | Restaurante | Reservas`).
   - Secção Hero com fundo verde suave (`#d8ebd0`), contorno inferior tracejado e botão de ação direta (*"Fazer Reserva"*).
   - Banner fotográfico da paisagem panorâmica.
   - Três cartões de destaque simples:
     - **1. Alojamento** (botão *Ver quartos*);
     - **2. Cafetaria** (botão *Ver ementa*);
     - **3. Natureza Envolvente** (botão *Explorar*).
   - Rodapé com Morada, Contactos, Horário, Redes Sociais e atalho para o Acesso Reservado.

2. **Catálogo de Quartos (`alojamento.html`)**:
   - Título *"Os Nossos Quartos"* e subtítulo *"Escolha o seu alojamento"*.
   - Três cartões horizontais com espaço para foto, comodidades e preços:
     - **Quarto Duplo Rústico** (Desde 85€ / noite);
     - **Suite Jardim** (Desde 110€ / noite);
     - **Quarto Familiar Arara** (Desde 135€ / noite).
   - Cada quarto tem um botão *"Reservar Quarto"* que abre a página de reserva com o respetivo quarto pré-selecionado.

3. **Cafetaria & Restaurante (`restaurante.html`)**:
   - Apresentação do conceito da cafetaria com produtos regionais.
   - Ementa simples dividida em: Pequeno-Almoço & Cafetaria e Petiscos & Almoços Ligeiros.
   - Botão para reserva de mesa na cafetaria.

4. **Página de Reservas (`reserva.html`)**:
   - Formulário semântico com validação em tempo real e avisos de erro por campo:
     - **Nome Completo:** validação de preenchimento e tamanho mínimo;
     - **Email:** validação de formato (`type="email"`);
     - **Telefone:** validação de formato de 9 dígitos nacionais (`pattern="(9[1236][0-9]{7}|2[0-9]{8})"`);
     - **Alojamento Pretendido:** seleção obrigatória;
     - **Datas de Check-in e Check-out:** validação de datas coerentes (check-out posterior ao check-in);
     - **Cálculo dinâmico do orçamento:** calcula automaticamente as noites e o preço total da estadia.

5. **Acesso Reservado (`entrar.html`)**:
   - Interface simples de autenticação para a futura gestão interna em PHP/MySQL.

---

## 🎨 4. CSS Personalizado & Tailwind

Para além do Tailwind CSS, foi criado um ficheiro específico de estilos [**`css/estilos.css`**](css/estilos.css) com:
- Variáveis CSS globais (`:root`) com a paleta oficial do projeto (`--cor-verde`, `--cor-vermelho`, `--cor-creme`, etc.);
- Efeitos de hover e transições suaves nos botões e cartões (`transform: translateY(-4px)`);
- Estilização e validação nativa de formulários através do pseudo-seletor `:user-invalid` e `:user-valid`;
- Mensagens de erro automáticas sob os campos (`.msg-erro`).

---

## 💻 5. Como Abrir no VS Code com Live Server

1. Abra a pasta do projeto no **Visual Studio Code**.
2. Clique com o botão direito do rato no ficheiro `index.html` e selecione **"Open with Live Server"**.
3. O website abrirá no navegador em `http://127.0.0.1:5500/index.html`.
