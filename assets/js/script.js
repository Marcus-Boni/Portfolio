(function () {
  const nav = document.querySelector(".header__menu");
  const menuLinks = [...nav.querySelectorAll("ul li a[href^='#']")];
  const header = document.querySelector(".header");
  const elements = [...document.querySelectorAll(".animate")];
  const sectionAbout = document.querySelector("#banner");
  const galleryContainer = document.querySelector(".container__gallery");
  const menu = document.querySelector(".menu");
  const menuBar = document.querySelector(".menu__bar--list");
  const controls = [...document.querySelectorAll(".control")];
  let currentItem = 0;
  const items = [...document.querySelectorAll(".item")];

  const carousel = (event) => {
    toggleControlClass(event.target);
    currentItem = event.currentTarget.dataset.number;
    items[currentItem].scrollIntoView({
      behavior: "smooth",
      inline: "nearest",
      block: "nearest",
    });
    items.forEach((item) => item.classList.remove("active"));
    items[currentItem].classList.add("active");
  };

  const toggleControlClass = (element) => {
    if (element.classList.contains("control__active")) {
      return;
    } else {
      controls.forEach((control) =>
        control.classList.remove("control__active")
      );
      element.classList.add("control__active");
    }
  };

  const navToggle = () => {
    document.querySelector(".menu__bar").classList.toggle("nav-toggle");
  };

  const intersectObserverForAnimationOptions = {
    rootMargin: "-8% 0px",
  };

  const intersectObserverForAnimation = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
      if (!entry.isIntersecting) return;
      entry.target.classList.toggle("show", entry.isIntersecting);
    });
  }, intersectObserverForAnimationOptions);

  elements.forEach((element) => intersectObserverForAnimation.observe(element));

  const intersectObserverForHeaderOptions = {
    rootMargin: "-70px 0px",
  };

  const intersectObserverForHeader = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
      if (!entry.isIntersecting) {
        header.classList.add("change-background");
        menuBar.classList.add("change--background");
      } else {
        header.classList.remove("change-background");
        menuBar.classList.remove("change--background");
      }
    });
  }, intersectObserverForHeaderOptions);

  intersectObserverForHeader.observe(sectionAbout);

  const getLastSeenElement = (positions) => {
    let activatePositions = positions.filter((n) => n < innerHeight / 2);
    return menuLinks[activatePositions.length - 1];
  };

  const constrastMenu = () => {
    let positions = [...menuLinks].map((link) => {
      let id = link.getAttribute("href");
      let section = document.querySelector(id);
      return section.getBoundingClientRect().top;
    });

    let activedLink = getLastSeenElement(positions);
    let navActived = nav.querySelector(".active");

    if (navActived) navActived.classList.remove("active");

    if (activedLink) return activedLink.classList.add("active");
  };

  menu.addEventListener("click", navToggle);
  window.addEventListener("scroll", constrastMenu);
  controls.forEach((control) => {
    control.addEventListener("click", carousel);
  });
  return menuLinks[0].classList.add("active");
})();

/* função para scroll suave 
  const getDistanceFromTheTop = (element) => {
    let distanceToTop = "";
    if (element.nodeName === "A") {
      distanceToTop = document.querySelector(
        element.getAttribute("href")
      ).offsetTop;
    } else if (element.nodeName === "I") {
      return document.querySelector(element.id).offsetTop;
    }
    return distanceToTop;
  };

  const scrollToSection = (event) => {
    event.preventDefault();
    if(locked) return;
    const distanceFromTheTop = getDistanceFromTheTop(event.target);
    smoothScrollTo(0, distanceFromTheTop);
  };

  const smoothScrollTo = (endX, endY, duration) => {
    const startX = window.scrollX || window.pageXOffset;
    const startY = window.scrollY || window.pageYOffset;
    const distanceX = endX - startX;
    const distanceY = endY - startY;
    const startTime = new Date().getTime();

    duration = typeof duration !== "undefined" ? duration : 1500;

    const easeInOutQuart = (time, from, distance, duration) => {
      if ((time /= duration / 2) < 1)
        return (distance / 2) * time * time * time * time + from;
      return (-distance / 2) * ((time -= 2) * time * time * time - 2) + from;
    };

    const timer = setInterval(() => {
      const time = new Date().getTime() - startTime;
      const newX = easeInOutQuart(time, startX, distanceX, duration);
      const newY = easeInOutQuart(time, startY, distanceY, duration);
      if (time >= duration) {
        clearInterval(timer);
      }
      window.scroll(newX, newY);
    }, 1000 / 60);
  };

  menuLinks.forEach((link) => {
    link.addEventListener("click", scrollToSection);
  });

  arrows.forEach((nextButton) => {
    nextButton.addEventListener("click", scrollToSection);
  }); */
