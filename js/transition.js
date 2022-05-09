
function pageTransition(){
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
})