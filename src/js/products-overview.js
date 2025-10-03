document.addEventListener("DOMContentLoaded", function () {
	const track = document.querySelector(".products-overview-track");
	let slides = document.querySelectorAll(".products-overview-track .product-card");
	const dots = document.querySelectorAll(".products-overview-dots button");
	const prevBtn = document.querySelector(".products-overview-btn.prev");
	const nextBtn = document.querySelector(".products-overview-btn.next");

	let index = 1; // начинаем с 1 (так как 0 — это клон последнего)
	let isTransitioning = false;

	// --- клонируем первый и последний слайд ---
	const firstClone = slides[0].cloneNode(true);
	const lastClone = slides[slides.length - 1].cloneNode(true);
	firstClone.classList.add("clone");
	lastClone.classList.add("clone");

	track.appendChild(firstClone);
	track.insertBefore(lastClone, slides[0]);

	// обновляем slides
	slides = document.querySelectorAll(".products-overview-track .product-card");

	// --- ширина слайда ---
	function getSlideWidth() {
		if (!slides.length) return 0;
		const style = getComputedStyle(slides[0]);
		const marginRight = parseFloat(style.marginRight) || 0;
		return slides[0].offsetWidth + marginRight;
	}

	// --- перемещение с анимацией ---
	function setTranslate() {
		const slideWidth = getSlideWidth();
		track.style.transition = "transform 0.4s ease";
		track.style.transform = `translateX(-${index * slideWidth}px)`;
	}

	// --- прыжок без анимации на реальный слайд ---
	function jumpToRealSlide() {
		const slideWidth = getSlideWidth();
		track.style.transition = "none";
		track.style.transform = `translateX(-${index * slideWidth}px)`;
		isTransitioning = false;
	}

	// --- обновляем позицию ---
	function updatePosition() {
		if (isTransitioning) return;
		isTransitioning = true;
		setTranslate();

		track.addEventListener(
			"transitionend",
			() => {
				if (slides[index].classList.contains("clone")) {
					if (index === 0) {
						index = slides.length - 2; // прыжок на реальный последний
					} else if (index === slides.length - 1) {
						index = 1; // прыжок на реальный первый
					}
					jumpToRealSlide();
				} else {
					isTransitioning = false;
				}
			},
			{ once: true }
		);

		// обновляем точки (реальные слайды)
		dots.forEach((dot, i) => {
			dot.classList.toggle("active", i === (index - 1) % (slides.length - 2));
		});
	}

	// --- кнопки prev / next ---
	if (nextBtn) {
		nextBtn.addEventListener("click", () => {
			if (index >= slides.length - 1) return;
			index++;
			updatePosition();
		});
	}

	if (prevBtn) {
		prevBtn.addEventListener("click", () => {
			if (index <= 0) return;
			index--;
			updatePosition();
		});
	}

	// --- dots ---
	dots.forEach((dot, i) => {
		dot.addEventListener("click", () => {
			index = i + 1; // сдвиг, потому что 0 — клон
			updatePosition();
		});
	});

	// --- ресайз ---
	window.addEventListener("resize", () => jumpToRealSlide());
	window.addEventListener("load", () => jumpToRealSlide());

	// --- первый запуск ---
	jumpToRealSlide();
});
