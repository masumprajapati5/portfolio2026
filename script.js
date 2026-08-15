
document.addEventListener("DOMContentLoaded", () => {
  const menuToggleBtn = document.getElementById("menuToggleBtn");
  const menuCloseBtn = document.getElementById("menuCloseBtn");
  const menuBackdrop = document.getElementById("menuBackdrop");
  const menuOverlay = document.getElementById("menuOverlay");
  const overlayNavLinks = document.querySelectorAll(".overlay-nav-link");

  function openMenu() {
    if (menuOverlay) {
      menuOverlay.classList.add("active");
      document.body.classList.add("menu-open");
    }
  }

  function closeMenu() {
    if (menuOverlay) {
      menuOverlay.classList.remove("active");
      document.body.classList.remove("menu-open");
    }
  }

  if (menuToggleBtn) {
    menuToggleBtn.addEventListener("click", openMenu);
  }

  if (menuCloseBtn) {
    menuCloseBtn.addEventListener("click", closeMenu);
  }

  if (menuBackdrop) {
    menuBackdrop.addEventListener("click", closeMenu);
  }

  overlayNavLinks.forEach((link) => {
    link.addEventListener("click", () => {
      closeMenu();
    });
  });

  document.addEventListener("keydown", (e) => {
    if (e.key === "Escape" && menuOverlay && menuOverlay.classList.contains("active")) {
      closeMenu();
    }
  });


  const siteHeader = document.getElementById("siteHeader");
  let lastScrollY = window.scrollY;

  window.addEventListener("scroll", () => {
    const currentScrollY = window.scrollY;
    const menuOverlay = document.getElementById("menuOverlay");


    if (menuOverlay && menuOverlay.classList.contains("active")) {
      return;
    }

    if (currentScrollY <= 30) {
      if (typeof gsap !== "undefined" && siteHeader) {
        gsap.to(siteHeader, { yPercent: 0, opacity: 1, duration: 0.35, ease: "power2.out", overwrite: "auto" });
      }
    } else if (currentScrollY > lastScrollY && currentScrollY > 100) {
      // Scrolling down -> hide navbar (-110%)
      if (typeof gsap !== "undefined" && siteHeader) {
        gsap.to(siteHeader, { yPercent: -110, duration: 0.35, ease: "power2.out", overwrite: "auto" });
      }
    } else if (currentScrollY < lastScrollY - 5) {
      // Scrolling up -> reveal navbar (0%)
      if (typeof gsap !== "undefined" && siteHeader) {
        gsap.to(siteHeader, { yPercent: 0, opacity: 1, duration: 0.35, ease: "power2.out", overwrite: "auto" });
      }
    }

    lastScrollY = currentScrollY;
  }, { passive: true });



  if (typeof gsap !== "undefined") {
    if (typeof ScrollTrigger !== "undefined") {
      gsap.registerPlugin(ScrollTrigger);
    }


    gsap.set("#siteHeader", {
      yPercent: -110,
      opacity: 0
    });

    gsap.set([".hero-title", ".description", ".person img", ".role", ".green-title"], {
      y: 60,
      opacity: 0
    });


    const tl = gsap.timeline({ paused: true });

    tl.to(".loader", {
      yPercent: 100,
      duration: 1.2,
      ease: "expo.out"
    })
      .to("#siteHeader", {
        yPercent: 0,
        opacity: 1,
        duration: 0.9,
        ease: "power3.out"
      }, "-=0.4")
      .to(".hero-title", {
        y: 0,
        opacity: 1,
        duration: 1.0,
        ease: "power3.out"
      }, "-=0.1")
      .to(".description", {
        y: 0,
        opacity: 1,
        duration: 0.8,
        ease: "power3.out"
      }, "-=0.6")
      .to(".person img", {
        y: 0,
        opacity: 1,
        duration: 1.0,
        ease: "power3.out"
      }, "-=0.6")
      .to(".role", {
        y: 0,
        opacity: 1,
        duration: 1.0,
        ease: "power3.out",
      }, "-=0.5").to(".green-title", {
        y: 0,
        opacity: 1,
        duration: 1.0,
        ease: "power3.out",
      }, "-=0.5");



    const greetings = ["Hello", "Hola", "Bonjour", "Ciao", "नमस्ते"];
    const loaderText = document.querySelector(".loader-text");
    let currentIndex = 0;

    const interval = setInterval(() => {
      currentIndex++;
      if (currentIndex < greetings.length) {
        if (loaderText) loaderText.textContent = greetings[currentIndex];
      } else {
        clearInterval(interval);
        gsap.to(".loader-content", {
          opacity: 0,
          duration: 0.4,
          ease: "power3.out",
          onComplete: () => {
            tl.play();
          }
        });
      }
    }, 280);




    if (document.querySelector(".marque-track")) {
      gsap.to(".marque-track", {
        xPercent: -100,
        duration: 22,
        ease: "none",
        repeat: -1
      });
    }


    if (document.querySelector(".skills-header-centered")) {
      gsap.from(".skills-header-centered", {
        y: 40,
        opacity: 0,
        duration: 0.9,
        ease: "power3.out",
        scrollTrigger: {
          trigger: "#skillsSection",
          start: "top 85%"
        }
      });
    }


    if (document.querySelector(".project-stack-row")) {
      gsap.from(".project-stack-row", {
        y: 60,
        opacity: 0,
        duration: 0.9,
        stagger: 0.2,
        ease: "power3.out",
        scrollTrigger: {
          trigger: ".projects-stack-list",
          start: "top 85%"
        }
      });
    }


    if (document.querySelector(".exp-stack-row")) {
      gsap.from(".exp-stack-row", {
        y: 60,
        opacity: 0,
        duration: 0.9,
        stagger: 0.2,
        ease: "power3.out",
        scrollTrigger: {
          trigger: ".experience-container",
          start: "top 85%"
        }
      });
    }


    if (document.querySelector("#playReelBanner")) {
      gsap.fromTo("#playReelBanner",
        { scale: 0.05, opacity: 0.8},
        {
          scale: 1,
          opacity: 1,
          duration: 1,
          ease: "power2.out",
          scrollTrigger: {
            trigger: "#playReelBanner",
            start: "top 90%",
            end: "top 40%",
            scrub: 1
          }
        }
      );
    }
  }
});

