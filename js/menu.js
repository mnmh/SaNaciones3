gsap.registerPlugin(ScrollTrigger, Draggable);
barba.use(barbaCss);

let vh = window.innerHeight * 0.01;
document.documentElement.style.setProperty('--vh', `${vh}px`);
let ulWidth = document.querySelector("#menuBox ul").clientWidth;
let ulHeight = document.querySelector("#menuBox ul").clientHeight;
/* window.addEventListener('resize', () => {
  let vh = window.innerHeight * 0.01;
  document.documentElement.style.setProperty('--vh', `${vh}px`);
  gsap.to(caminos, { x: 0, y: 0, left: i => pos[i].left, top: i => pos[i].top, duration: 0.5, ease: "power2.inOut" });
}); */

// Create menu
const spanMenu = document.createElement("span");
spanMenu.ariaHidden = "true";
spanMenu.classList.add(`trama${gsap.utils.random(1, 5, 1)}`);
document.querySelector("#menu-toggle").appendChild(spanMenu);
const iconMenu = document.createElement("i");
iconMenu.ariaHidden = "true";
iconMenu.dataset.feather = "x";
document.querySelector("#menu-toggle").appendChild(iconMenu);
const eye = document.createElement("span");
const eyeIcon = document.createElement("i");
eyeIcon.dataset.feather = "eye";
eye.appendChild(eyeIcon);
document.querySelector("#menu-change").appendChild(eye);
const eyeClose = document.createElement("span");
document.querySelector("#menu-change").appendChild(eyeClose);
eye.classList.add("eye");
eyeClose.classList.add("eyeClose");
document.querySelector("#loading").appendChild(document.createElement("span"));
let [backDivs, descripciones, pos, xRandom, yRandom] = [[], [], [], [], []];
const vel = [-1, -2, -3, -4, 1, 2, 3, 4, 5, 6, 7, 8];
const posRandom = () => {
  pos = [
    { left: `${gsap.utils.random(14, 40, 1)}%`, top: `${gsap.utils.random(18, 36, 1)}%` },
    { left: `${gsap.utils.random(65, 90, 1)}%`, top: `${gsap.utils.random(14, 41, 1)}%` },
    { left: `${gsap.utils.random(40, 60, 1)}%`, top: `${gsap.utils.random(40, 70, 1)}%` },
    { left: `${gsap.utils.random(15, 30, 1)}%`, top: `${gsap.utils.random(68, 90, 1)}%` },
    { left: `${gsap.utils.random(68, 84, 1)}%`, top: `${gsap.utils.random(68, 94, 1)}%` }
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

const caminos = Array.from(document.querySelectorAll("#menuBox ul li"));
caminos.forEach(camino => {
  camino.classList.add("disable");
  const arrowDiv = document.createElement("div");
  arrowDiv.ariaHidden = "true";
  arrowDiv.classList.add("arrow");
  const arrowIcon = document.createElement("i");
  arrowIcon.ariaHidden = "true";
  arrowIcon.dataset.feather = "arrow-right";
  camino.querySelector(".name").appendChild(arrowDiv);
  arrowDiv.appendChild(arrowIcon);

  const trama = document.createElement("div");
  trama.ariaHidden = "true";
  trama.classList.add("trama");
  camino.querySelector("a").appendChild(trama);

  const descripcionDiv = document.createElement("div");
  descripcionDiv.innerHTML = camino.querySelector(".lead").innerHTML;
  document.querySelector("#descripciones").appendChild(descripcionDiv);
  descripciones.push(descripcionDiv);
  
  const backImgDiv = document.createElement("div");
  document.querySelector("#backImg").appendChild(backImgDiv);
  backDivs.push(backImgDiv);
})

const names = Array.from(document.querySelectorAll("#menuBox .name"));
//const arrows = Array.from(document.querySelectorAll("#menuBox .arrow .feather"));
const caminoBox = Array.from(document.querySelectorAll("#menuBox .trama"));
gsap.set(caminoBox, { scale: 0.4, transformOrigin: "50% 50%", opacity: 0 });

// Start menu
const menuToggle = document.querySelector("#menu-toggle");
const body = document.querySelector("body");
//const terrain = document.querySelector(".terrain");
const terrainIn = document.querySelector(".terrainIn");
const content = document.querySelector("#content");
const textMenu = document.querySelector("#text-menu");
const menu = document.querySelector("#menuBox");
const menuChange = document.querySelector("#menu-change");
const loading = document.querySelector("#loading");
let mainDiv,
  caminoSel;

gsap.set(caminos, { xPercent: -50, yPercent: -50 });
gsap.set(menuChange, { top: document.querySelector("#headerBar").offsetHeight + 20 });

caminos.forEach((camino, i) => {
  const lead = camino.querySelector(".lead");
  const arrow = camino.querySelector(".arrow");
  const backImg = backDivs[i];
  const backOthers = backDivs.filter(x => x !== backImg);
  const others = caminos.filter(y => y !== camino);
  const descripcion = descripciones[i];

  const caminoTl = gsap.timeline({
    paused: true
  })
    .addLabel("walk")
    .to(lead, { height: "auto", duration: 0.4, ease: "power1.inOut" }, "walk")
    .to(lead, { opacity: 1, duration: 0.3, ease: "power1.inOut", delay: 0.3 }, "walk")
    .to(arrow, { height: "5vh", autoAlpha: 1, duration: 0.5, ease: "power1.inOut" }, "walk")
    .to(camino, { scale: "+=0.05", duration: 0.5, ease: "power1.inOut" }, "walk")
  ;
  
  const caminoOver = () => {
    camino.setAttribute("data-over", "");
    gsap.set(others, { zIndex: 10 });
    gsap.to(others, { opacity: 0.2, duration: 0.5, ease: "power2.inOut" });
    gsap.set(camino, { zIndex: 20 })
    gsap.to(camino, { opacity: 1, duration: 0.5, ease: "power2.inOut" });
    gsap.to(backImg, { opacity: 0.7, duration: 0.5, ease: "power2.inOut" });
    gsap.to(terrainIn, { opacity: 1, duration: 0.5, ease: "power2.inOut" });
    gsap.to(backOthers, { opacity: 0, duration: 0.5, ease: "power2.inOut" });
    caminoTl.play();
  }
  const caminoOut = () => {
    camino.removeAttribute('data-over');
    gsap.to(caminos, { opacity: 1, duration: 0.5, ease: "power2.out" });
    gsap.to(backImg, { opacity: 0, duration: 0.5, ease: "power2.out" });
    gsap.to(terrainIn, { opacity: 0.8, duration: 0.4, ease: "power2.out" });
    caminoTl.reverse();
  }
  
  Draggable.create(camino, {
    onClick: () => {
      if (camino.hasAttribute("data-over")) {
        return true;
      } else {
        caminoOver();
        e.preventDefault();
        return false; 
      }
    },
    onDragStart: () => {
      document.removeEventListener('mousemove', parall);
      caminoOver();
    },
    onDragEnd: function () {
      let Xpercent = `${Math.round(((this.x / ulWidth) * 100) + ((this.target.offsetLeft / ulWidth) * 100))}%`;
      let Ypercent = `${Math.round(((this.y / ulHeight) * 100) + ((this.target.offsetTop / ulHeight) * 100))}%`;
      gsap.to(this.target, { x: 0, y: 0, left: Xpercent, top: Ypercent, duration: 0.5, ease: "power2.out", onComplete: menuParall });
    }
  });
  
  camino.addEventListener("mouseover", caminoOver, false);
  camino.addEventListener("mouseout", caminoOut, false);
  camino.addEventListener("touchstart", () => {
    let othersDesc = descripciones.filter(k => k !== descripcion);
    if (camino.hasAttribute('data-over')) {
    } else {
      gsap.to(othersDesc, { height: 0, opacity: 0, duration: 0.5, ease: "power2.out" });
      gsap.to(descripcion, { height: "auto", opacity: 1, duration: 0.5, ease: "power2.out" });
    }
  }, false);
  camino.addEventListener("click", function () {
    caminoSel = this;
  }, false);
})

const menuParall = () => {
  gsap.utils.shuffle(vel);
  document.addEventListener("mousemove", parall, false);
  /* document.addEventListener("touchmove", parall, false); */
}
const parall = e => {
  caminos.forEach((i, j) => {
    let x = (window.innerWidth - e.pageX * vel[j]) / 100;
    let y = (window.innerHeight - e.pageY * vel[j]) / 100;
    gsap.to(i, { x: x, y: y, duration: 1, ease: "sine" })
  })
}

const menuClose = ejeSel => {
  return new Promise( done => {
    let mainBox = mainDiv;
    menu.ariaHidden = "true";
    menuToggle.ariaExpanded = "false";
    document.removeEventListener('mousemove', parall);
    caminos.forEach(x => x.classList.add("disable"));
    const scaleTime = gsap.utils.random(1.5, 2, .1);
    
    gsap.timeline({
      onComplete: () => {
        menuToggle.classList.remove("disable");
        body.classList.remove("menuOpen");
        textMenu.classList.remove("hideText");
        if (!ejeSel) {
          gsap.to(mainBox.querySelector("#content"), { opacity: 1, duration: 0.8 });
        }
        done();
      }
    })
      .to(caminoBox, { scale: "+=0.05", rotation: i => `${dir[i].dirNo}25`, opacity: 1, duration: 0.8, ease: "power2.inOut" })
      .to(backDivs, { opacity: 0, duration: 0.7, ease: "power1.inOut" }, ">-1")
      .addLabel("walk")
      .to(menuChange, { autoAlpha: 0, duration: 1, ease: "power2.inOut" })
      .to(caminos, {
        x: 0, y: 0, left: i => pos[i].left, top: i => pos[i].top, duration: scaleTime, ease: "power2.inOut", delay: 0.3
      }, "walk")
      .to(names, { opacity: 0, duration: scaleTime, ease: "power2.inOut", delay: 0.09 }, "walk")
      .to(caminoBox, {
        scale: 0.4, duration: scaleTime, transformOrigin: "50% 50%", ease: "power2.inOut", delay: 0.3, onComplete: () => {
          if (ejeSel) {
            ejeSelX = `${Math.round(ejeSel.getBoundingClientRect().x + (ejeSel.getBoundingClientRect().width / 2))}px`;
            ejeSelY = `${Math.round(ejeSel.getBoundingClientRect().y + (ejeSel.getBoundingClientRect().height / 2))}px`;
            body.style.setProperty('--x', ejeSelX);
            body.style.setProperty('--y', ejeSelY);
            gsap.set(loading, { x: ejeSelX, y: ejeSelY, scale: 0.5 });
            loading.className = `trama${caminos.indexOf(ejeSel) + 1}`;
            let direccion = dir[caminos.indexOf(ejeSel)].dirSi;
            if (direccion == "+=") {
              direccion = "der";
            } else if (direccion == "-=") {
              direccion = "izq";
            }
            loading.style.setProperty('--rota', direccion);
            loading.classList.add("rotation");
            gsap.fromTo(loading, { opacity: 0, scale: 0.8, transformOrigin: "0% 0%" }, { opacity: 1, scale: 1, duration: 0.3, ease: "power2.out" });
          }
        }
      }, "walk")
      .to(caminoBox, { rotation: i => `${dir[i].dirSi}${"random(150, 200)"}`, duration: "random(2, 2.8, .1)", transformOrigin: "50% 50%", ease: "power2.inOut" }, "walk")
      .to(terrainIn, { opacity: 0.8, duration: 2, ease: "power1.inOut" }, "<")
      .to(caminoBox, { opacity: 0, duration: 0.9, ease: "power2.inOut" }, "-=1.5")
      ;
  })
}

let scaleTime = gsap.utils.random(2, 2.5, .1);

const vTweens = {}
for (let i = 0; i < caminos.length; i++) {
  vTweens[`tween${i}`];
}

const caminoRota = () => {
  caminoBox.forEach((x, i) => {
    gsap.to(x, {
      rotation: `${dir[i].dirSi}${"random(200, 300)"}`, duration: "random(3.5, 6)", transformOrigin: "50% 50%", ease: "power1.inOut", onComplete: () => {
        vTweens[i] = gsap.to(x, { rotation: `${dir[i].dirSi}360`, duration: 30, transformOrigin: "50% 50%", ease: "none", repeat: -1, overwrite: 'auto' }).timeScale(gsap.utils.random(0.06, 0.6));
      }
    });
  });
}

const openMenu = open => {
  let mainBox = mainDiv;
  menu.ariaHidden = "false";
  menuToggle.ariaExpanded = "true";
  body.classList.add("menuOpen");
  document.removeEventListener('mousemove', parall);
  posRandom();
  gsap.utils.shuffle(pos);
  gsap.utils.shuffle(dir);
  scaleTime = gsap.utils.random(2, 2.5, .1);
  textMenu.classList.add("hideText");
  gsap.to(mainBox.querySelector("#content"), { opacity: 0, duration: 0.8 });

  const openM = gsap.timeline({
    paused: true,
    onComplete: () => {
      menuToggle.classList.remove("disable");
      caminos.forEach((i, j) => {
        i.classList.remove("disable");
      });
      blinkOn = true;
      gsap.delayedCall(gsap.utils.random(3, 3.5), blinkPlay);
      
    }
  })
    .addLabel("terra")
    //.to(terrain, { opacity: 1, duration: 1.2, ease: "power2.out" })
    .to(caminoBox, { opacity: 1, duration: 0.6, ease: "power2.inOut" }, "terra")
    .to(caminoBox, { scale: "-=0.05", rotation: i => `${dir[i].dirNo}25`, duration: 1.2, ease: "power2.inOut" }, "terra")
    .addLabel("walk")
    .call(caminoRota)
    //.to(backDivs, { opacity: 1, duration: 1, ease: "power1.inOut" }, "walk+=0.4")
    .to(caminos, { x: 0, y: 0, left: i => pos[i].left, top: i => pos[i].top, duration: scaleTime, ease: "power2.inOut" }, "walk+=0.8")
    .to(caminoBox, { scale: "random(0.95, 1.25)", duration: scaleTime, transformOrigin: "50% 50%", ease: "power1.inOut"}, "walk+=0.8")
    .to(names, { opacity: 1, duration: scaleTime, ease: "power2.inOut" }, "walk+=1")
    .call(menuParall)
    .to(menuChange, { autoAlpha: 1, duration: 1, ease: "power2.inOut" })
  ;
  
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

const menuRotate = gsap.fromTo(spanMenu, { rotation: 0 }, { rotation: 360, duration: 1, transformOrigin: "50% 50%", ease: "linear", repeat: -1, paused: true }).timeScale(0);

let blinkOn = true;
let blink;
const blinkPlay = () => {
  blink = gsap.timeline({
    onComplete: () => {
      if (blinkOn == true) {
        gsap.delayedCall(gsap.utils.random(1, 8), () => blink.restart());
      }
    }
  })
    .to(eye, { opacity: 0, duration: 0.2, ease: "power2.in" })
    .to(eyeClose, { opacity: 1, duration: 0.3, ease: "power2.in" }, "<")
    .call(() => {
      if (blinkOn == true) {
        blink.resume();
      } else {
        blink.pause();
        gsap.delayedCall(1.4, () => blink.resume());
      }
    })
    .to(eyeClose, { opacity: 0, duration: 0.2, ease: "power2.out", delay: 0.07 })
    .to(eye, { opacity: 1, duration: 0.3, ease: "power2.out" }, "<0.05")
  ;
}

const toggleClick = (mainBox) => {
  menuToggle.classList.add("disable");
  if (menu.ariaHidden == "true") {
    openMenu(true, mainBox);
  } else {
    menuClose(false, mainBox);
  }
}

menuToggle.addEventListener("click", () => {
  menuToggle.classList.add("disable");
  if (menu.ariaHidden == "true") {
    openMenu(true);
  } else {
    menuClose();
  }
}, false);

menuToggle.addEventListener("mouseover", () => {
  menuRotate.play();
  gsap.to(menuRotate, { timeScale: 0.1, duration: 1 });
}, false);
menuToggle.addEventListener("mouseout", () => gsap.to(menuRotate, { timeScale: 0, duration: 1 }), false);

menuChange.addEventListener("click", event => {
  event.preventDefault();
  blinkOn = false;
  blink.clear();
  blinkPlay();
  for (let i = 0; i < caminos.length; i++) {
    vTweens[i].kill();;
  }
  caminos.forEach(x => x.classList.add("disable"));
  openMenu(false);
}, false);
//

//Function to Delay
const delay = n => {
  n = n || 2000;
  return new Promise( done =>{
      setTimeout(()=>{
        done();
      },n)
  })
}
barba.hooks.enter(() => {
  window.scrollTo(0, 0);
});
barba.init({
	debug: true,
  timeout: 5000,
  preventRunning: true,
  transitions: [
    {
      name: 'transMenu',
      sync: true,
      once() { },
      afterOnce: ({ next }) => {
        gsap.fromTo(next.container.querySelector("#content"), { opacity: 0 }, { opacity: 1, duration: 1, delay: 0.5, ease: 'power2.out'
        });
        mainDiv = next.container;
			},
      async beforeLeave() {
        const done = this.async();
        await menuClose(caminoSel);
        await delay(1000);
        gsap.to(loading, { opacity: 0, scale: 2, duration: 0.3, delay: 0.1, ease: 'power2.in', onComplete: () => loading.classList.remove("rotation") });
        done();
      },
      leave() { },
      enter() { },
      afterEnter: ({ next }) => {
        gsap.fromTo(next.container.querySelector("#content"), { opacity: 0 }, { opacity: 1, duration: 1, ease: "power3.out "});
        body.className = `${next.namespace}Body`;
        mainDiv = next.container;
        
      }
    }
  ],
});

// carga https://feathericons.com
feather.replace();


/* const prueba = document.querySelector(".prueba");
prueba.addEventListener("click", function (event) {
  event.preventDefault();
  gsap.to(loading, { opacity: 1, duration: 0.5, onComplete: () => loading.classList.add("rotation") });
  loading.classList.add("rotation");
}); */











