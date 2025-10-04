document.addEventListener("DOMContentLoaded", () => {
  const root  = document.querySelector(".products-overview");
  if (!root) return;

  const track = root.querySelector(".products-overview-track");
  const slides = Array.from(track.querySelectorAll(".product-card"));
  const prevBtn = root.querySelector(".products-overview-btn.prev");
  const nextBtn = root.querySelector(".products-overview-btn.next");
  const dotsWrap = root.querySelector(".products-overview-dots");

  if (!slides.length) return;

  let slidesToShow = 4; 


  function getSlideWidth() {
    const el = slides[0];
    const cs = getComputedStyle(el);
    const mr = parseFloat(cs.marginRight) || 0;
    return el.offsetWidth + mr;
  }

  function getSlidesToShow() {
    return window.innerWidth <= 768 ? 1 : 4;
  }

  function pagesCount() {
    return Math.max(1, Math.ceil(slides.length / slidesToShow));
  }

  function buildDots() {
    if (!dotsWrap) return;
    dotsWrap.innerHTML = "";
    const total = pagesCount();
    for (let i = 0; i < total; i++) {
      const btn = document.createElement("button");
      if (i === page) btn.classList.add("active");
      btn.addEventListener("click", () => {
        page = i;
        update();
      });
      dotsWrap.appendChild(btn);
    }
  }

  function update() {
    const w = getSlideWidth();
    const total = pagesCount();

    page = (page + total) % total;

    track.style.transition = "transform 0.4s ease";
    track.style.transform = `translateX(-${page * w * slidesToShow}px)`;

    if (dotsWrap) {
      Array.from(dotsWrap.children).forEach((d, i) =>
        d.classList.toggle("active", i === page)
      );
    }

    const isMobile = slidesToShow === 1;
    if (prevBtn) prevBtn.style.display = isMobile ? "none" : "";
    if (nextBtn) nextBtn.style.display = isMobile ? "none" : "";
    if (dotsWrap) dotsWrap.style.display = isMobile ? "none" : "";
  }

  function next() { page++; update(); }
  function prev() { page--; update(); }

  function init() {
    slidesToShow = getSlidesToShow();
    buildDots();
    update();
  }

  // --- events ---
  nextBtn?.addEventListener("click", next);
  prevBtn?.addEventListener("click", prev);

  window.addEventListener("resize", init);
  window.addEventListener("load", init);

  init();
});
