const loadingScreen = document.querySelector('.loading-screen')
    const mainNavigation = document.querySelector('.main-navigation')

    // Function to add and remove the page transition screen
    function pageTransitionIn() {
      return gsap
        .to(loadingScreen, { duration: .5, scale: 1, transformOrigin: 'center'})
    }
    // Function to add and remove the page transition screen
    function pageTransitionOut(container) {
      // GSAP methods can be chained and return directly a promise
      return gsap
        .timeline({ delay: 1 }) // More readable to put it here
        .add('start') // Use a label to sync screen and content animation
        .to(loadingScreen, {
          duration: 0.5,
          scaleY: 0,
          skewX: 0,
          transformOrigin: 'center',
          ease: 'power1.out'
        }, 'start')
        .call(contentAnimation, [container], 'start')
    }

    // Function to animate the content of each page
    function contentAnimation(container) {
      // Query from container
      $(container.querySelector('.green-heading-bg')).addClass('show')
      // GSAP methods can be chained and return directly a promise
      return gsap
        .timeline()
        .from(container.querySelector('.is-animated'), {
          duration: 0.5,
          translateY: 10,
          opacity: 0,
          stagger: 0.4
        })
        .from(mainNavigation, { duration: .5, translateY: -10, opacity: 0})
    }

    $(function() {
      barba.init({

        transitions: [{

          async leave(data) {


            await pageTransitionIn()

            data.current.container.remove()
          },

          async enter(data) {
            await pageTransitionOut(data.next.container)
          },

          async once(data) {
            await contentAnimation(data.next.container);
          }
        }]
      });

    });