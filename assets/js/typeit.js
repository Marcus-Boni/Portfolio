const typingEffect = () => {
  new TypeIt("#banner__title", {
    speed: 120,
    waitUntilVisible: true,
  })
    .type(" Desenvolvedor Front-End", { delay: 1000 })
    .go();
};

document.addEventListener("DOMContentLoaded", typingEffect);
