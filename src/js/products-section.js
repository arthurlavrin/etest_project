document.addEventListener("DOMContentLoaded", function () {
	// данные для каждого блока
	const productSections = [
		{
			containerId: "products-sections",
			title: "Selected Products",
			subtitle: "Duis vestibulum elit vel neque pharetra",
			buttonText: "Add To Cart",
			items: [
				{ img: "/src/assets/images/homepage/products-sale/card1.png", title: "Vel vestibulum elit tuvel euqen.", price: "$250", sale: true },
				{ img: "/src/assets/images/homepage/products-sale/card2.png", title: "Vel vestibulum elit tuvel euqen.", price: "$200", sale: true },
				{ img: "/src/assets/images/homepage/products-sale/card3.png", title: "Vel vestibulum elit tuvel euqen.", price: "$300", sale: true },
				{ img: "/src/assets/images/homepage/products-sale/card4.png", title: "Vel vestibulum elit tuvel euqen.", price: "$350", sale: true }
			]
		},
		{
			containerId: "new-products",
			title: "New Products Arrival",
			subtitle: "Duis vestibulum elit vel neque pharetra",
			buttonText: "View Product",
			items: [
				{ img: "/src/assets/images/homepage/new-arrival/card1.png", title: "Vel vestibulum elit tuvel euqen.", price: "$150" },
				{ img: "/src/assets/images/homepage/new-arrival/card2.png", title: "Vel vestibulum elit tuvel euqen.", price: "$450", sale: true },
				{ img: "/src/assets/images/homepage/new-arrival/card3.png", title: "Vel vestibulum elit tuvel euqen.", price: "$250" },
				{ img: "/src/assets/images/homepage/new-arrival/card4.png", title: "Vel vestibulum elit tuvel euqen.", price: "$200", sale: true }
			]
		}
	];

	// рендерим каждую секцию в свой контейнер
	productSections.forEach(section => {
		const container = document.getElementById(section.containerId);
		if (!container) return; // защита от ошибок

		const block = document.createElement("div");
		block.className = "products-block";

		// заголовок блока
		const titleHTML = `
			<div class="products-block-title">
				<h2>${section.title}</h2>
				<p>${section.subtitle}</p>
			</div>
		`;

		// карточки
		const cardsHTML = section.items.map(item => `
			<div class="product-card">
				${item.sale ? '<div class="badge-sale">SALE</div>' : ""}
				<img src="${item.img}" alt="${item.title}">
				<h3>${item.title}</h3>
				<p class="price">${item.price}</p>
				<button class="btn">${section.buttonText}</button>
			</div>
		`).join("");

		block.innerHTML = titleHTML + `<div class="products-list">${cardsHTML}</div>`;
		container.appendChild(block);
	});
});
