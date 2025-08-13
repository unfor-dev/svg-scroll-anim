window.addEventListener("DOMContentLoaded", () => {
  gsap.registerPlugin(ScrollTrigger);
  const header = document.querySelector("header");

  // Mobile menu toggle function
  function toggleMobileNav() {
    document.getElementById("mobileMenu").classList.toggle("show");
  }
  window.toggleMobileNav = toggleMobileNav;

  // Initial page load animations
  function runInitialAnimations() {
    const onLoadTl = gsap.timeline({ defaults: { ease: "power2.out" } });

    onLoadTl
      .to("header", { "--border-width": "100%", duration: 3 }, 0)
      .from(".desktop-nav a", {
        y: -100,
        opacity: 0,
        duration: 0.8,
        stagger: 0.2,
        ease: "power3.out",
      }, 0)
      .to(".hero-content h1", { opacity: 1, duration: 1 }, 0)
      .to(".hero-content h1", {
        delay: 0.5,
        duration: 1.2,
        color: "var(--sienna)",
        "-webkit-text-stroke": "0px var(--sienna)",
      }, 0)
      .from(".hero-content .line", {
        x: 100,
        delay: 1,
        opacity: 0,
        duration: 0.8,
        stagger: 0.2,
        ease: "power3.out",
      }, 0)
      .to(".hero-bottle-wrapper", {
        opacity: 1,
        scale: 1,
        delay: 1.5,
        duration: 1.3,
        ease: "power3.out",
      }, 0)
      .to(".hero-stamp", {
        opacity: 1,
        scale: 1,
        delay: 2,
        duration: 0.2,
        ease: "back.out(3)",
      }, 0)
      .to(".hero-stamp", {
        y: "+=5",
        x: "-=3",
        repeat: 2,
        yoyo: true,
        duration: 0.05,
        ease: "power1.inOut",
      }, 0);
  }

  // Reusable scroll animation helper
  function pinAndAnimate({
    trigger,
    endTrigger,
    pin,
    animations,
    markers = false,
    headerOffset = 0,
  }) {
    const end = `top top+=${headerOffset}`;
    const tl = gsap.timeline({
      scrollTrigger: {
        trigger,
        start: `top top+=${headerOffset}`,
        endTrigger,
        end,
        scrub: true,
        pin,
        pinSpacing: false,
        markers,
        invalidateOnRefresh: true,
      },
    });

    animations.forEach(({ target, vars, position = 0 }) => {
      tl.to(target, vars, position);
    });
  }

  // Setup scroll animations
  function setupScrollAnimations() {
    const headerOffset = header.offsetHeight - 1;

    ScrollTrigger.matchMedia({
      "(min-width: 769px)": function () {
        pinAndAnimate({
          trigger: ".hero",
          endTrigger: ".section-intro",
          pin: ".hero-bottle-wrapper",
          animations: [{ target: ".hero-bottle", vars: { rotate: 0, scale: 0.8 } }],
          headerOffset,
        });

        pinAndAnimate({
          trigger: ".section-intro",
          endTrigger: ".timeline-entry:nth-child(even)",
          pin: ".hero-bottle-wrapper",
          animations: [
            { target: ".hero-bottle", vars: { rotate: 10, scale: 0.7 } },
            { target: ".hero-bottle-wrapper", vars: { x: "30%" } },
          ],
          headerOffset,
        });

        pinAndAnimate({
          trigger: ".timeline-entry:nth-child(even)",
          endTrigger: ".timeline-entry:nth-child(odd)",
          pin: ".hero-bottle-wrapper",
          animations: [
            { target: ".hero-bottle", vars: { rotate: -10, scale: 0.7 } },
            { target: ".hero-bottle-wrapper", vars: { x: "-25%" } },
          ],
          headerOffset,
        });
      },

      "(max-width: 768px)": function () {
        gsap.to(".hero-bottle-wrapper", { opacity: 1, duration: 1, delay: 0.5 });
      },
    });
  }

  // Initialize all animations
  runInitialAnimations();
  setupScrollAnimations();
  ScrollTrigger.refresh();
});
/**
 * Music toggle button
 */
const audio = document.getElementById('backgroundMusic')
const musicButton = document.getElementById('musicButton')
let isPlaying = false

musicButton.addEventListener('click', () => {
    if (!isPlaying) {
        audio.play()
        musicButton.textContent = 'Pause'
        isPlaying = true
    } else {
        audio.pause()
        musicButton.textContent = 'Play'
        isPlaying = false
    }
})