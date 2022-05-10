gsap.registerPlugin(ScrollTrigger, Draggable);

let vh = window.innerHeight * 0.01;
document.documentElement.style.setProperty('--vh', `${vh}px`);
window.addEventListener('resize', () => {
  let vh = window.innerHeight * 0.01;
  document.documentElement.style.setProperty('--vh', `${vh}px`);
  gsap.to(caminos, { x: 0, y: 0, left: i => pos[i].left, top: i => pos[i].top, duration: 0.5, ease: "power2.inOut" });
});
/* function resizeWindow() {
  ulWidth = document.querySelector("#menu ul").clientWidth;
  ulheight = document.querySelector("#menu ul").clientHeight;
  console.log(ulWidth);
  console.log(ulheight);
}
window.onresize = resizeWindow; */

const menuButton = document.querySelector("#menu-toggle");
const textMenu = document.querySelector("#text-menu");
const menu = document.querySelector("#menuBox");
const ulMenu = document.querySelector("#menuBox ul");
const leadsBox = document.querySelector("#descripciones");
const backImgBox = document.querySelector("#backImg");
const caminos = Array.from(document.querySelectorAll("#menuBox ul li"));
const caminosLink = Array.from(document.querySelectorAll("#menuBox li a"));
const terrain = document.querySelectorAll("#terrain");
const menuChange = document.querySelector("#menu-change");
let vel = [-1, -2, -3, -4, 1, 2, 3, 4, 5, 6, 7, 8];
let [backDivs, descripciones, pos, xRandom, yRandom] = [[], [], [], [], []];
function posRandom() {
  pos = [
    { left: "random(14, 40, 1)" + "%", top: "random(18, 36, 1)" + "%" },
    { left: "random(65, 90, 1)" + "%", top: "random(14, 41, 1)" + "%" },
    { left: "random(40, 60, 1)" + "%", top: "random(40, 70, 1)" + "%" },
    { left: "random(15, 30, 1)" + "%", top: "random(68, 90, 1)" + "%" },
    { left: "random(68, 84, 1)" + "%", top: "random(68, 94, 1)" + "%" }
  ];
}
let dir = [
  { dirSi: "-=", dirNo: "+=" },
  { dirSi: "+=", dirNo: "-=" },
  { dirSi: "-=", dirNo: "+=" },
  { dirSi: "+=", dirNo: "-=" },
  { dirSi: "-=", dirNo: "+=" },
  { dirSi: "+=", dirNo: "-=" },
  { dirSi: "-=", dirNo: "+=" },
  { dirSi: "+=", dirNo: "-=" },
  { dirSi: "-=", dirNo: "+=" },
  { dirSi: "+=", dirNo: "-=" }
];

let ulWidth = ulMenu.clientWidth;
let ulHeight = ulMenu.clientHeight;
let toush = false;
let big = 0.05;
let lastBig = "";

if ("ontouchstart" in document.documentElement) {
  toush = true;
  big = 0.1;
} else {
  document.querySelector("body").classList.add("desk");
}

let spanMenu = document.createElement("span");
spanMenu.ariaHidden = "true";
spanMenu.classList.add(`tram${gsap.utils.random(1, 5, 1)}`);
menuButton.appendChild(spanMenu);
let iconMenu = document.createElement("i");
iconMenu.ariaHidden = "true";
iconMenu.dataset.feather = "x";
menuButton.appendChild(iconMenu);
let eyes = document.createElement("i");
eyes.dataset.feather = "eye";
menuChange.appendChild(eyes);
let eyeClose = document.createElement("span");
menuChange.appendChild(eyeClose);
//menuChange.appendChild(eye.cloneNode(true));

gsap.set(caminos, { xPercent: -50, yPercent: -50 });
gsap.set(menuChange, { top: document.querySelector("#headerBar").offsetHeight + 20})

caminos.forEach(camino => {
  camino.classList.add("disable");
  let arrow = document.createElement("div");
  arrow.ariaHidden = "true";
  arrow.classList.add("arrow");
  let arrowIcon = document.createElement("i");
  arrowIcon.ariaHidden = "true";
  arrowIcon.dataset.feather = "arrow-right";
  camino.querySelector(".name").appendChild(arrow);
  arrow.appendChild(arrowIcon);

  let trama = document.createElement("div");
  trama.ariaHidden = "true";
  trama.classList.add("trama");
  camino.querySelector("a").appendChild(trama);

  let desc = camino.querySelector(".lead");
  let descripcion = document.createElement("div");
  descripcion.innerHTML = desc.innerHTML;
  leadsBox.appendChild(descripcion);
  descripciones.push(descripcion);
  
  let backImg = document.createElement("div");
  backImgBox.appendChild(backImg);
  backDivs.push(backImg);

  let others = caminos.filter(y => y !== camino);

  camino.tl = gsap.timeline({ paused: true })
    .addLabel("walk")
    .to(desc, { height: "auto", duration: 0.4, ease: "power1.inOut" }, "walk")
    .to(desc, { opacity: 1, duration: 0.3, ease: "power1.inOut", delay: 0.3 }, "walk")
    .to(arrow, { height: "5vh", autoAlpha: 1, duration: 0.5, ease: "power1.inOut" }, "walk")
    .to(camino, { scale: "+=0.05", duration: 0.5, ease: "power1.inOut" }, "walk")
    ;
  
  function caminoOver() {
    let backOthers = backDivs.filter(x => x !== backImg);
    camino.setAttribute("data-over", "");
    gsap.set(others, { zIndex: 10 });
    gsap.to(others, { opacity: 0.2, duration: 0.5, ease: "power2.inOut" });
    gsap.set(camino, { zIndex: 20 })
    gsap.to(camino, { opacity: 1, duration: 0.5, ease: "power2.inOut" });
    gsap.to(backImg, { opacity: 1, duration: 0.5, ease: "power2.inOut" });
    gsap.to(backOthers, { opacity: 0, duration: 0.5, ease: "power2.inOut" });
    camino.tl.play();
  }
  function caminoOut() {
    camino.removeAttribute('data-over');
    gsap.to(caminos, { opacity: 1, duration: 0.5, ease: "power2.out" });
    gsap.to(backImg, { opacity: 0, duration: 0.5, ease: "power2.out" });
    camino.tl.reverse();
  }
  
  Draggable.create(camino, {
    onClick: function () {
      if (camino.hasAttribute("data-over")) {
        return true;
      } else {
        caminoOver();
        e.preventDefault();
        return false; 
      }
    },
    onDragStart: function () {
      document.removeEventListener('mousemove', parall);
      caminoOver();
    },
    onDragEnd: function () {
      dragPos(this);
    }
  });
  
  camino.addEventListener("mouseover", caminoOver);
  camino.addEventListener("mouseout", caminoOut);
  camino.addEventListener("touchstart", function (event) {
    let othersDesc = descripciones.filter(j => j !== descripcion);
    if (camino.hasAttribute('data-over')) {
    } else {
      gsap.to(othersDesc, { height: 0, opacity: 0, duration: 0.5, ease: "power2.out" });
      gsap.to(descripcion, { height: "auto", opacity: 1, duration: 0.5, ease: "power2.out" });
    }
  }, false);
})

const names = Array.from(document.querySelectorAll("#menuBox .name"));
const arrows = Array.from(document.querySelectorAll("#menuBox .arrow .feather"));
const caminoBox = Array.from(document.querySelectorAll("#menuBox .trama"));

gsap.set(caminoBox, { scale: 0.4, transformOrigin: "50% 50%", opacity: 0 });
gsap.set(terrain, { width: "200%", height: "200%" });

function menuParall() {
  gsap.utils.shuffle(vel);
  document.addEventListener("mousemove", parall);
  /* document.addEventListener("touchmove", parall); */
}
function parall(e) {
  caminos.forEach((layer, i) => {
    let x = (window.innerWidth - e.pageX * vel[i]) / 100;
    let y = (window.innerHeight - e.pageY * vel[i]) / 100;
    gsap.to(layer, { x: x, y: y, duration: 1, ease: "sine" })
  })
}

function menuClose() {
  document.removeEventListener('mousemove', parall);
  caminos.forEach(x => x.classList.add("disable"));
  let scaleTime = gsap.utils.random(1.5, 2, .1);
  gsap.timeline({
    onComplete: function () {
      menuButton.classList.remove("disable");
      document.body.classList.remove("menuOpen");
      textMenu.classList.remove("hideText")
    }
  })
    .to(caminoBox, { scale: "+=0.05", rotation: i => `${dir[i].dirNo}25`, opacity: 1, duration: 0.8, ease: "power2.inOut" })
    .addLabel("walk")
    .to(menuChange, { autoAlpha: 0, duration: 1, ease: "power2.inOut" })
    .to(caminos, { x: 0, y: 0, left: i => pos[i].left, top: i => pos[i].top, duration: scaleTime, ease: "power2.inOut", delay: 0.3 }, "walk")
    .to(names, { opacity: 0, duration: scaleTime, ease: "power2.inOut", delay: 0.09 }, "walk")
    .to(caminoBox, { scale: 0.4, duration: scaleTime, transformOrigin: "50% 50%", ease: "power2.inOut", delay: 0.3 }, "walk")
    .to(caminoBox, { rotation: i => `${dir[i].dirSi}${"random(150, 200)"}`, duration: "random(2, 2.8, .1)", transformOrigin: "50% 50%", ease: "power2.inOut" }, "walk")
    .to(terrain, { width: "200%", height: "200%", duration: 2.6, ease: "power1.inOut" }, "walk+=0.2")
    .to(terrain, { opacity: 0, duration: 2, ease: "power1.inOut" }, "<")
    .to(caminoBox, { opacity: 0, duration: 0.9, ease: "power2.inOut" }, "-=1.5")
    .to(backImgBox, { opacity: 0, duration: 0.7, ease: "power1.inOut" }, ">-1")
  ;
}

let scaleTime = gsap.utils.random(2, 2.5, .1);

const vTweens = {}
for (let i = 0; i < caminos.length; i++) {
  vTweens[`tween${i}`];
}

function caminoRota() {
  caminoBox.forEach((x, i) => {
    gsap.to(x, {
      rotation: `${dir[i].dirSi}${"random(200, 300)"}`, duration: "random(3.5, 6)", transformOrigin: "50% 50%", ease: "power1.inOut", onComplete: function () {
        vTweens[i] = gsap.to(x, { rotation: `${dir[i].dirSi}360`, duration: 30, transformOrigin: "50% 50%", ease: "none", repeat: -1, overwrite: 'auto' }).timeScale(gsap.utils.random(0.06, 0.6));
      }
    });
  });
}

let openM = gsap.timeline({
  paused: true,
  onComplete: function () {
    menuButton.classList.remove("disable");
    caminos.forEach(x => x.classList.remove("disable"));
  }
})
  .addLabel("terra")
  .to(terrain, { opacity: 0.4, duration: 1.2, ease: "power2.out" })
  .to(caminoBox, { opacity: 1, duration: 0.6, ease: "power2.inOut" }, "terra")
  .to(caminoBox, { scale: "-=0.05", rotation: i => `${dir[i].dirNo}25`, duration: 1.2, ease: "power2.inOut" }, "terra")
  .addLabel("walk")
  .call(caminoRota)
  .to(terrain, { width: "130%", height: "130%", duration: `${scaleTime + 0.6}`, ease: "power1.inOut" }, "walk+=0.4")
  .to(backImgBox, { opacity: 1, duration: 1, ease: "power1.inOut" }, "walk+=0.4")
  .to(caminos, { x: 0, y: 0, left: i => pos[i].left, top: i => pos[i].top, duration: scaleTime, ease: "power2.inOut" }, "walk+=0.8")
  .to(caminoBox, { scale: "random(0.95, 1.25)", duration: scaleTime, transformOrigin: "50% 50%", ease: "power1.inOut"}, "walk+=0.8")
  .to(names, { opacity: 1, duration: scaleTime, ease: "power2.inOut" }, "walk+=1")
  .call(menuParall)
  .to(menuChange, { autoAlpha: 1, duration: 1, ease: "power2.inOut" })
;

function openMenu(open) {
  document.removeEventListener('mousemove', parall);
  posRandom();
  gsap.utils.shuffle(pos);
  gsap.utils.shuffle(dir);
  scaleTime = gsap.utils.random(2, 2.5, .1);
  textMenu.classList.add("hideText")
  

  if (open == true) {
    [xRandom, yRandom] = [[], []];
    caminos.forEach(x => {
      xRandom.push(`${gsap.utils.random(20, 80, 5)}%`);
      yRandom.push(`${gsap.utils.random(0, 100, 5)}%`)
    });
    gsap.set(caminos, { x: 0, y: 0, left: i => xRandom[i], top: i => yRandom[i] });
    openM.invalidate().play(0);
  } else {
    openM.invalidate().play(0);
  }
}

function dragPos(who) {
  let Xpercent = String(Math.round(((who.x / ulWidth) * 100) + ((who.target.offsetLeft / ulWidth) * 100)) + "%");
  let Ypercent = String(Math.round(((who.y / ulHeight) * 100) + ((who.target.offsetTop / ulHeight) * 100)) + "%");
  gsap.timeline()
    .to(who.target, { x: 0, y: 0, left: Xpercent, top: Ypercent, duration: 0.5, ease: "power2.out" })
    .call(menuParall, null, "+=0.3")
    ;
};

let menuRotate = gsap.fromTo(spanMenu, { rotation: 0 }, { rotation: 360, duration: 1, transformOrigin: "50% 50%",  ease: "linear", repeat: -1, paused: true }).timeScale(0);

menuButton.addEventListener("click", function () {
  menuButton.classList.add("disable");
  if (menu.ariaHidden == "true") {
    menu.ariaHidden = "false";
    menuButton.ariaExpanded = "true";
    document.body.classList.add("menuOpen");
    openMenu(true);
  } else {
    menu.ariaHidden = "true";
    menuButton.ariaExpanded = "false";
    menuClose();
  }
});
menuButton.addEventListener("mouseover", function () {
  menuRotate.play();
  gsap.to(menuRotate, { timeScale: 0.1, duration: 1 });
});
menuButton.addEventListener("mouseout", function () {
  gsap.to(menuRotate, { timeScale: 0, duration: 1, onComplete: function() { this.pause(); }});
});

menuChange.addEventListener("click", function (event) {
  event.preventDefault();
  for (let i = 0; i < caminos.length; i++) {
    vTweens[i].kill();;
  }
  caminos.forEach(x => x.classList.add("disable"));
  openMenu(false);
  gsap.to(document.querySelector("#menu-change .feather"), { opacity: 0, duration: 0.6, ease: "power2.inOut" });
  gsap.to(document.querySelector("#menu-change span"), { opacity: 1, duration: 0.6, ease: "power2.inOut" });
  gsap.to(document.querySelector("#menu-change .feather"), { opacity: 1, duration: 0.6, delay: 0.6, ease: "power2.inOut" });
  gsap.to(document.querySelector("#menu-change span"), { opacity: 0, duration: 0.6, delay: 0.6, ease: "power2.inOut" });
});

// carga https://feathericons.com
feather.replace();


