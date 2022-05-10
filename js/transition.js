import barba from '@barba/core';

/*function pageTransition(){
  var tl = gsap.timeline();

  tl.to('.transition', { duration: 1, scale: 4, transformOrigin: 'center', })
  tl.to('.page-title', { duration: .5, opacity: 1, scale: 1})
  tl.to('.page-title', { duration: 1, scale: 0})
  tl.to('.transition', { duration: 1, scale: 0, transformOrigin: 'center', delay: 1})
}

function contentAnimation(){
  var tl = gsap.timeline();
  tl.from('.left', { duration: 1.5, translateY: 50, opacity: 0, delay: 1.5})    
  tl.to('.clip-animate', { clipPath: "polygon(0 0, 100% 0, 100% 100%, 0% 100%)"}, "-=1.8")
}

function delay(n) {
  n = n || 2000;
  return new Promise(done => {
    setTimeout(() => {
      done();
    }, n);
  });
}

barba.init({
  sync: true,

  transitions: [{

    async leave(data) {

      const done = this.async();

      pageTransition();
      await delay(3000);
      done();

    },

    async enter(data) {
      contentAnimation();
    },

    async once(data) {
      contentAnimation(data.next.container);
    }

  }]
})*/

barba.hooks.beforeEnter((data) => {
  window.scrollTo(0, 0);
});
/* barba.hooks.after(() => {
  bodyEnter();
}); */

barba.init({
  timeout: 10000,
  preventRunning: true,
  //the transitions array
  transitions: [{
    name: 'menu-transition',
    before(data) {
      /* return gsap.to(data.current.container, {
        opacity: 0
      }); */
    },
    async leave(data) {
      const done = this.async();
      menuClose(caminoSel);
      await delay(5500);
      done();
    },
    async afterEnter(data) {
      return data.next.container.querySelector(".terrain").classList.add("is-active");
      //console.log(data.next.container.querySelector(".terrain"));
    },
    /* from: {
      custom: ({ trigger }) => {
        return trigger.classList && trigger.classList.contains('prueba');
      }
    }, */ 
  }],
});
