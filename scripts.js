document.addEventListener("DOMContentLoaded", () => {
  particlesJS("particles-js", {
    particles: {
      number: {
        value: window.innerWidth > 768 ? 50 : 20,
        density: { enable: !0, value_area: 800 },
      },
      color: { value: ["#00ddeb", "#ff00ff"] },
      shape: { type: "circle" },
      opacity: { value: 0.5, random: !0, anim: { enable: !1 } },
      size: { value: 3, random: !0, anim: { enable: !1 } },
      line_linked: {
        enable: !0,
        distance: 100,
        color: "#00ddeb",
        opacity: 0.3,
      },
      move: {
        enable: !0,
        speed: 2,
        direction: "none",
        random: !0,
        out_mode: "out",
      },
    },
    interactivity: {
      detect_on: "canvas",
      events: { onhover: { enable: !1 }, onclick: { enable: !1 } },
    },
    retina_detect: !0,
  });
});

// Inicializa partículas 3D na seção de portfólio
document.addEventListener("DOMContentLoaded", () => {
  particlesJS("portfolio-canvas", {
    particles: {
      number: {
        value: 50, // Número de partículas
        density: { enable: true, value_area: 800 }, // Densidade das partículas
      },
      color: { value: ["#00ddeb", "#ff00ff"] }, // Cores das partículas
      shape: { type: "circle" }, // Formato das partículas
      opacity: {
        value: 0.5,
        random: true, // Opacidade aleatória
        anim: { enable: false }, // Sem animação de opacidade
      },
      size: { value: 3, random: true, anim: { enable: false } }, // Tamanho das partículas
      line_linked: {
        enable: true, // Habilita linhas conectando partículas
        distance: 120, // Distância máxima para conectar partículas
        color: "#00ddeb", // Cor das linhas
        opacity: 0.3, // Opacidade das linhas
      },
      move: {
        enable: true, // Habilita movimento das partículas
        speed: 2, // Velocidade do movimento
        direction: "none", // Movimento em todas as direções
        random: true, // Movimento aleatório
        out_mode: "out", // Partículas saem da tela ao atingir as bordas
      },
    },
    interactivity: {
      detect_on: "canvas", // Detecta interatividade no canvas
      events: {
        onhover: { enable: false }, // Desativa interação ao passar o mouse
        onclick: { enable: false }, // Desativa interação ao clicar
      },
    },
    retina_detect: true, // Habilita suporte para telas retina
  });
});

// Adiciona rolagem suave ao clicar nos links do menu de navegação
document.querySelectorAll("nav a").forEach((link) => {
  link.addEventListener("click", (event) => {
    const href = link.getAttribute("href");

    // Verifica se o link é um ID de seção (começa com '#')
    if (href.startsWith("#")) {
      event.preventDefault(); // Previne o comportamento padrão do link
      const targetId = href.substring(1); // Remove o '#' do ID
      const targetSection = document.getElementById(targetId); // Localiza a seção pelo ID

      if (targetSection) {
        targetSection.scrollIntoView({
          behavior: "smooth", // Define rolagem suave
          block: "start", // Alinha a seção ao topo da tela
        });
      } else {
        console.error(`Seção com o ID '${targetId}' não encontrada.`);
      }
    }
    // Caso contrário, permite que o navegador trate o link normalmente
  });
});

// Corrigir a função para rolar suavemente até a seção correspondente
window.scrollToSection = function (id) {
  const targetSection = document.querySelector(id); // Localiza a seção pelo seletor
  if (targetSection) {
    targetSection.scrollIntoView({ behavior: "smooth", block: "start" }); // Rola suavemente até a seção
  } else {
    console.error(`Seção com o seletor '${id}' não encontrada.`); // Exibe erro no console se a seção não for encontrada
  }
};

// Adiciona animações às seções ao entrar na tela
const reveals = document.querySelectorAll(".reveal"); // Seleciona todos os elementos com a classe "reveal"
const observer = new IntersectionObserver(
  (entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.classList.add("visible"); // Adiciona a classe "visible" quando o elemento entra na tela
      }
    });
  },
  { threshold: 0.1 } // Define o limite de visibilidade para ativar a animação
);

reveals.forEach((el) => observer.observe(el)); // Observa cada elemento com a classe "reveal"

// Adiciona animações aos itens do portfólio
const portfolioItems = document.querySelectorAll(".portfolio-card");
portfolioItems.forEach((item) => {
  observer.observe(item); // Observa cada item do portfólio
});

// Função para enviar o formulário usando EmailJS
function sendEmail(formData) {
  console.log("Enviando dados para o EmailJS:", formData); // Log dos dados enviados
  emailjs
    .send(
      "service_hewe23m", // Certifique-se de que este é o Service ID correto
      "template_owxtx6n", // Certifique-se de que este é o Template ID correto
      {
        name: formData.name, // Correspondente ao {{name}} no template
        email: formData.email, // Correspondente ao {{email}} no template
        service: formData.service, // Correspondente ao {{service}} no template
        message: formData.message, // Correspondente ao {{message}} no template
      },
      "hknT0CmWNFescl5Aj" // Certifique-se de que esta é a Public Key correta
    )
    .then(
      (response) => {
        console.log(
          "E-mail enviado com sucesso!",
          response.status,
          response.text
        );
        statusMessage.style.color = "#00ff00"; // Define a cor da mensagem de sucesso
        statusMessage.textContent = "Mensagem enviada com sucesso!"; // Exibe mensagem de sucesso
        form.reset(); // Reseta o formulário

        // Oculta a mensagem de sucesso após 5 segundos
        setTimeout(() => {
          statusMessage.textContent = "";
        }, 5000);
      },
      (error) => {
        console.error("Erro ao enviar o e-mail:", error); // Exibe erro detalhado no console
        statusMessage.style.color = "#ff0000"; // Define a cor da mensagem de erro
        statusMessage.textContent = "Erro ao enviar a mensagem."; // Exibe mensagem de erro

        // Oculta a mensagem de erro após 5 segundos
        setTimeout(() => {
          statusMessage.textContent = "";
        }, 5000);
      }
    );
}

// Gerencia o envio do formulário de contato
const form = document.getElementById("contactForm"); // Seleciona o formulário pelo ID
const statusMessage = document.getElementById("statusMessage"); // Seleciona o elemento para exibir mensagens de status

form.addEventListener("submit", (e) => {
  e.preventDefault(); // Previne o comportamento padrão do formulário
  const formData = {
    name: document.getElementById("name").value.trim(), // Obtém o valor do campo "name"
    email: document.getElementById("email").value.trim(), // Obtém o valor do campo "email"
    service: document.getElementById("service").value, // Obtém o valor do campo "service"
    message: document.getElementById("message").value.trim(), // Obtém o valor do campo "message"
  };

  statusMessage.style.color = "#00ddeb"; // Define a cor da mensagem de status
  statusMessage.textContent = "Enviando mensagem..."; // Exibe mensagem de envio

  // Envia o formulário usando EmailJS
  sendEmail(formData);
});

function changeTheme(bgColor, textColor, linkColor) {
  document.body.style.backgroundColor = bgColor;
  document.body.style.color = textColor;

  // Atualiza as cores dos links
  const navLinks = document.querySelectorAll("nav a");
  navLinks.forEach((link) => {
    link.style.color = linkColor;
  });

  // Configura cabeçalho e rodapé
  const header = document.querySelector("header");
  const footer = document.querySelector("footer");

  header.style.color = textColor; // Texto padrão no cabeçalho
  footer.style.color = textColor; // Texto padrão no rodapé
}

// Atualiza os botões da paleta de cores para trocar o fundo
document.querySelectorAll(".color-option").forEach((button) => {
  button.addEventListener("click", () => {
    const color = button.getAttribute("title"); // Usa o título como identificador
    switch (color) {
      case "Fundo Escuro":
        changeTheme("#0a0a15", "#ffffff", "#ffffff");
        break;
      case "Fundo Azul":
        changeTheme("#1a73e8", "#ffffff", "#ffffff");
        break;
      case "Fundo Roxo":
        changeTheme("#6a0dad", "#ffffff", "#ffffff");
        break;
    }
  });
});

let currentIndex = 0; // Índice atual do carrossel

function moveCarousel(direction) {
  const track = document.querySelector(".carousel-track");
  const cards = track.querySelectorAll(".portfolio-card");
  const cardWidth = cards[0].offsetWidth + 20; // Largura do cartão + gap
  const totalCards = cards.length; // Total de cartões no carrossel
  const visibleCards = 3; // Número de cartões visíveis por vez
  const maxIndex = totalCards - visibleCards; // Máximo índice para rolar

  // Atualiza o índice atual com base na direção
  currentIndex += direction;
  if (currentIndex < 0) currentIndex = maxIndex; // Volta ao final se ultrapassar o início
  if (currentIndex > maxIndex) currentIndex = 0; // Volta ao início se ultrapassar o final

  // Calcula a posição de rolagem e aplica a transformação
  const translateX = -currentIndex * cardWidth;
  track.style.transform = `translateX(${translateX}px)`;
}

// Adiciona eventos de clique aos botões do carrossel
document
  .querySelector(".carousel-button.prev")
  .addEventListener("click", () => moveCarousel(-1));
document
  .querySelector(".carousel-button.next")
  .addEventListener("click", () => moveCarousel(1));
