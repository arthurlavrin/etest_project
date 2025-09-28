document.addEventListener("DOMContentLoaded", function () {
	const track = document.querySelector(".products-overview-track");
	const slides = document.querySelectorAll(
		".products-overview-track .product-card"
	);
	const dotsContainer = document.querySelector(".products-overview-dots");

	const slidesToShow = 4; // amount of cards
	const totalPages = Math.ceil(slides.length / slidesToShow);
	let index = 0;
	let slideWidth = slides[0].offsetWidth;

	// сdots
	for (let i = 0; i < totalPages; i++) {
		const dot = document.createElement("button");
		if (i === 0) dot.classList.add("active");
		dotsContainer.appendChild(dot);

		dot.addEventListener("click", () => {
			index = i * slidesToShow;
			updatePosition();
			updateDots();
		});
	}

	function updateDots() {
		const dots = dotsContainer.querySelectorAll("button");
		dots.forEach((dot, i) => {
			dot.classList.toggle(
				"active",
				i === Math.floor(index / slidesToShow)
			);
		});
	}

	function updatePosition() {
		track.style.transform = `translateX(-${index * slideWidth}px)`;
	}

	// for diff. size
	window.addEventListener("resize", () => {
		slideWidth = slides[0].offsetWidth;
		updatePosition();
	});
});
