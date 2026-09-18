const screens = {
  intro: document.getElementById("intro"),
  same: document.getElementById("same"),
  letter: document.getElementById("letter"),
  memories: document.getElementById("memories"),
  final: document.getElementById("final")
};

const music = document.getElementById("music");
const heroPhoto = document.getElementById("heroPhoto");
const message = document.getElementById("message");

const memories = [
  ["fotos/02.jpg", "Nossos momentos juntos são engraçados."],
  ["fotos/03.jpg", "Nossos momentos juntos são maravilhosos."],
  ["fotos/04.jpg", "Nossos momentos juntos são gostosos."],
  ["fotos/05.jpg", "Feliz aniversário para essa mulher engraçada, maravilhosa e gostosa. ❤️"]
];

let memoryIndex = 0;

heroPhoto.style.backgroundImage = "url('fotos/01.jpg')";

const paragraphs = [
`Um bom dia igual a todos os outros, mas diferente.<br><br>Bom dia, mozão. ❤️<br>Este bom dia é igual a todos os outros que eu mando de manhã, mas é diferente. Espero que tenhas descansado bem e que hoje a tua disposição esteja lá no teto para fazeres desse dia um dos melhores desse ano, pois é um dia exclusivamente teu e de mais ninguém.`,

`AMOR, és uma mulher incrível, amável, sensível e “durona”. Essas todas tuas características e qualidades devem permanecer. Tu deves celebrar todas elas no dia de hoje.<br><span class="emphasis">O TEU DIA! ❤️</span>Hoje deves te enaltecer mais que todos os dias, deves sorrir mais que todos os dias, deves brilhar mais que todos os dias.`,

`Meu amor, feliz aniversário. Muitos anos de vida (ao meu lado nem 😂) e muita saúde (também do meu lado ❤️).`,

`Espero que tenhas amanhecido da melhor forma possível...`,

`Este é o primeiro dos muitos felizes aniversários que amor irá receber hoje.<br>Vindo de mim, claro. ❤️`
];


/* =====================================================
   CRIAÇÃO DOS PARÁGRAFOS DA CARTA
   ===================================================== */

paragraphs.forEach((p) => {
  const el = document.createElement("p");

  el.className = "paragraph";

  el.innerHTML = p;

  // Começam escondidos
  el.style.opacity = "0";
  el.style.transform = "translateY(15px)";
  el.style.transition = "opacity 1s ease, transform 1s ease";

  message.appendChild(el);
});


/* =====================================================
   REVELAR A CARTA PARÁGRAFO POR PARÁGRAFO
   ===================================================== */

function revealParagraphs() {
  const els = message.querySelectorAll(".paragraph");
  const nextButton = document.getElementById("letterNext");

  // Esconde o botão enquanto a carta está sendo lida
  nextButton.style.opacity = "0";
  nextButton.style.pointerEvents = "none";

  els.forEach((el, index) => {

    setTimeout(() => {

      el.style.opacity = "1";
      el.style.transform = "translateY(0)";

    }, index * 4500);

  });

  // Mostra o botão depois do último parágrafo
  setTimeout(() => {

    nextButton.style.opacity = "1";
    nextButton.style.pointerEvents = "auto";

  }, els.length * 4500);
}


/* =====================================================
   MUDANÇA DE TELAS
   ===================================================== */

function show(id) {
  Object.values(screens).forEach(s => s.classList.remove("active"));
  screens[id].classList.add("active");
}


/* =====================================================
   INÍCIO DA EXPERIÊNCIA
   ===================================================== */

function startExperience() {

  music.volume = 0.62;

  music.play().catch(() => {});

  show("same");

  setTimeout(() => {

    show("letter");

    // Começa a carta parágrafo por parágrafo
    revealParagraphs();

  }, 3000);

  makeHearts();
}

document
  .getElementById("startBtn")
  .addEventListener("click", startExperience);


/* =====================================================
   CORAÇÕES FLUTUANTES
   ===================================================== */

function makeHearts() {

  const holder = document.querySelector(".hearts");

  for (let i = 0; i < 18; i++) {

    const h = document.createElement("span");

    h.className = "heartParticle";

    h.textContent = "♥";

    h.style.left = (Math.random() * 100) + "%";

    h.style.animationDelay = (Math.random() * 7) + "s";

    h.style.setProperty(
      "--drift",
      ((Math.random() - 0.5) * 120) + "px"
    );

    holder.appendChild(h);
  }
}


/* =====================================================
   MEMÓRIAS / FOTOS
   ===================================================== */

function renderMemory() {

  const [img, cap] = memories[memoryIndex];

  document
    .getElementById("memoryPhoto")
    .style.backgroundImage = `url('${img}')`;

  const c = document.getElementById("memoryCaption");

  c.classList.remove("show");

  setTimeout(() => {

    c.textContent = cap;

    c.classList.add("show");

  }, 100);
}


/* =====================================================
   BOTÃO DA CARTA
   ===================================================== */

document
  .getElementById("letterNext")
  .addEventListener("click", () => {

    memoryIndex = 0;

    renderMemory();

    show("memories");
  });


/* =====================================================
   BOTÃO DAS MEMÓRIAS
   ===================================================== */

document
  .getElementById("memoryNext")
  .addEventListener("click", () => {

    if (memoryIndex < memories.length - 1) {

      memoryIndex++;

      renderMemory();

    } else {

      show("final");

      setTimeout(() => {

        screens.final.classList.add("fadeOut");

        setTimeout(() => {

          music.pause();
          music.currentTime = 0;

        }, 1900);

      }, 6000);
    }
  });
