document.addEventListener("DOMContentLoaded", function () {
	const track = document.querySelector(".products-overview-track");
	const slides = document.querySelectorAll(
		".products-overview-track .product-card"
	);
	const dots = document.querySelectorAll(".products-overview-dots button");

	const slidesToShow = 4; // amount of cards
	let index = 0; 

	function getSlideWidth() {
		if (!slides.length) return 0;
		const style = getComputedStyle(slides[0]);
		const marginRight = parseFloat(style.marginRight) || 0;
		return slides[0].offsetWidth + marginRight;
	}

	function updatePosition() {
		const slideWidth = getSlideWidth();
		track.style.transform = `translateX(-${
			index * slideWidth * slidesToShow
		}px)`;

		dots.forEach((dot, i) => {
			dot.classList.toggle("active", i === index);
		});
	}

	// dots
	dots.forEach((dot, i) => {
		dot.addEventListener("click", () => {
			index = i;
			updatePosition();
		});
	});


	window.addEventListener("resize", updatePosition);
	window.addEventListener("load", updatePosition);
});
