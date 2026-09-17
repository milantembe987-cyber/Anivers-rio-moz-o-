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
  ["fotos/02.jpg","Nossos momentos juntos são engraçados."],
  ["fotos/03.jpg","Nossos momentos juntos são maravilhosos."],
  ["fotos/04.jpg","Nossos momentos juntos são gostosos."],
  ["fotos/05.jpg","Feliz aniversário para essa mulher engraçada, maravilhosa e gostosa. ❤️"]
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

paragraphs.forEach((p,i)=>{
  const el=document.createElement("p");
  el.className="paragraph";
  el.innerHTML=p;
  message.appendChild(el);
});

function show(id){
  Object.values(screens).forEach(s=>s.classList.remove("active"));
  screens[id].classList.add("active");
}
function startExperience(){
  music.volume=.62;
  music.play().catch(()=>{});
  show("same");
  setTimeout(()=>show("letter"),3000);
  makeHearts();
}
document.getElementById("startBtn").addEventListener("click",startExperience);

function makeHearts(){
  const holder=document.querySelector(".hearts");
  for(let i=0;i<18;i++){
    const h=document.createElement("span");
    h.className="heartParticle";
    h.textContent="♥";
    h.style.left=(Math.random()*100)+"%";
    h.style.animationDelay=(Math.random()*7)+"s";
    h.style.setProperty("--drift",((Math.random()-.5)*120)+"px");
    holder.appendChild(h);
  }
}
function renderMemory(){
  const [img,cap]=memories[memoryIndex];
  document.getElementById("memoryPhoto").style.backgroundImage=`url('${img}')`;
  const c=document.getElementById("memoryCaption");
  c.classList.remove("show");
  setTimeout(()=>{c.textContent=cap;c.classList.add("show")},100);
}
document.getElementById("letterNext").addEventListener("click",()=>{
  memoryIndex=0; renderMemory(); show("memories");
});
document.getElementById("memoryNext").addEventListener("click",()=>{
  if(memoryIndex < memories.length-1){
    memoryIndex++;
    renderMemory();
  }else{
    show("final");
    setTimeout(()=>{
      screens.final.classList.add("fadeOut");
      setTimeout(()=>{music.pause();music.currentTime=0;},1900);
    },6000);
  }
});
