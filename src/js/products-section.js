// --- products-toolbar ---
function updateResultsToolbar(list, currentPage, perPage) {
  const el = document.getElementById("results-count");
  if (!el) return;
  const total = list.length;
  const start = total === 0 ? 0 : (currentPage - 1) * perPage + 1;
  const end = total === 0 ? 0 : Math.min(currentPage * perPage, total);
  el.innerHTML = `<p>Showing ${start}–${end} of ${total} results</p>`;
}

let products = [];
let filteredProducts = [];
let catalogContainer;
let paginationEl;

const perPage = 12;
let currentPage = 1;

document.addEventListener("DOMContentLoaded", async () => {
  try {
    // JSON
    const res = await fetch("/src/assets/data.json");
    const { data } = await res.json();
    products = data;
    filteredProducts = [...products];

    // --- new-products + selected-products ---
    if (document.getElementById("new-products")) {
      renderSection("new-products", "New Products Arrival", "Duis vestibulum elit vel neque pharetra", "View Product", products, "New Products Arrival");
    }

    if (document.getElementById("selected-products")) {
      renderSection("selected-products", "Selected Products", "Duis vestibulum elit vel neque pharetra", "Add To Cart", products, "Selected Products");
    }

    // --- catalog (all items + pagination) ---
    catalogContainer = document.getElementById("catalog-products");
    paginationEl = document.getElementById("pagination");

    if (catalogContainer && paginationEl) {
      renderCatalogPage(currentPage);
      renderPagination();
    }

    // --- Top Best Sets ---
    renderTopBestSets(products);

    // sorting + searching
    const sortEl = document.getElementById("sortSelect");
    const searchEl = document.getElementById("searchInput");

    sortEl?.addEventListener("change", applySearchAndSort);
    searchEl?.addEventListener("input", debounce(applySearchAndSort, 250));
  } catch (err) {
    console.error("Loading error JSON:", err);
  }
});

// --- function for new + selected ---
export function renderSection(containerId, title, subtitle, btnText, products, blockFilter = null) {
  const container = document.getElementById(containerId);
  if (!container) return;

  const filtered = blockFilter ? products.filter((p) => p.blocks.includes(blockFilter)) : products;

  const block = document.createElement("div");
  block.className = "products-block";

  const titleHTML = `
    <div class="products-block-title">
      <h2>${title}</h2>
      ${subtitle ? `<p>${subtitle}</p>` : ""}
    </div>
  `;

  const cardsHTML = filtered
    .map(
      (item) => `
      <div class="product-card" data-product-id="${item.id}">
        ${item.salesStatus ? '<div class="badge-sale">SALE</div>' : ""}
        <img src="${item.imageUrl}" alt="${item.name}">
        <h3>${item.name}</h3>
        <p class="price">$${item.price}</p>
        <button class="btn add-to-cart-btn" data-product-id="${item.id}">${btnText}</button>
      </div>
    `
    )
    .join("");

  block.innerHTML = titleHTML + `<div class="products-list">${cardsHTML}</div>`;
  container.appendChild(block);
  
  // Add click handlers for Add to Cart buttons
  addCartHandlers(block, filtered);
}

// Add Cart Handlers to Product Cards
function addCartHandlers(container, products) {
  const productCards = container.querySelectorAll('.product-card');
  const addToCartButtons = container.querySelectorAll('.add-to-cart-btn');
  
  // Add click handler to product cards (navigate to product details)
  productCards.forEach(card => {
    card.addEventListener('click', function(e) {
      // Don't navigate if clicking on the button
      if (e.target.closest('.add-to-cart-btn')) {
        return;
      }
      
      const productId = this.dataset.productId;
      if (productId) {
        window.location.href = `/src/pages/product-details-template.html?id=${productId}`;
      }
    });
  });
  
  // Add click handler to Add to Cart buttons
  addToCartButtons.forEach(btn => {
    btn.addEventListener('click', function(e) {
      e.stopPropagation(); // Prevent card click
      
      const productId = this.dataset.productId;
      const product = products.find(p => p.id === productId);
      
      if (product && window.CartHandler) {
        window.CartHandler.addToCart({
          id: product.id,
          name: product.name,
          price: product.price,
          imageUrl: product.imageUrl,
          size: product.size || null,
          color: product.color || null,
          category: product.category || null
        });
      }
    });
  });
}

// --- catalog render ---
function renderCatalogPage(page = 1, items = filteredProducts) {
  catalogContainer.innerHTML = "";

  const start = (page - 1) * perPage;
  const end = start + perPage;
  const pageProducts = items.slice(start, end);

  if (pageProducts.length === 0) {
    catalogContainer.innerHTML = `<p class="empty">No products found</p>`;
    if (paginationEl) paginationEl.innerHTML = "";
    updateResultsToolbar(items, 1, perPage);
    return;
  }

  const block = document.createElement("div");
  block.className = "products-block";
  block.innerHTML = `
    <div class="products-list">
      ${pageProducts
        .map(
          (item) => `
        <div class="product-card" data-product-id="${item.id}">
          ${item.salesStatus ? '<div class="badge-sale">SALE</div>' : ""}
          <img src="${item.imageUrl}" alt="${item.name}">
          <h3>${item.name}</h3>
          <p class="price">$${item.price}</p>
          <button class="btn add-to-cart-btn" data-product-id="${item.id}">Add To Cart</button>
        </div>
      `
        )
        .join("")}
    </div>`;
  catalogContainer.appendChild(block);
  
  // Add click handlers for Add to Cart buttons
  addCartHandlers(block, pageProducts);

  updateResultsToolbar(items, page, perPage);
}

// --- pagination render ---
function renderPagination(totalItems = filteredProducts.length) {
  const totalPages = Math.ceil(totalItems / perPage);

  const prevHTML = currentPage > 1 ? `<button class="pagination__prev">Prev</button>` : "";
  const pagesHTML = Array.from({ length: totalPages }, (_, i) => {
    const page = i + 1;
    return `
      <li>
        <button class="pagination__page ${page === currentPage ? "is-active" : ""}" data-page="${page}">
          ${page}
        </button>
      </li>`;
  }).join("");
  const nextHTML = currentPage < totalPages ? `<button class="pagination__next">Next</button>` : "";

  paginationEl.innerHTML = `
    <nav class="pagination">
      ${prevHTML}
      <ul class="pagination__list">${pagesHTML}</ul>
      ${nextHTML}
    </nav>
  `;

  // event
  paginationEl.querySelectorAll(".pagination__page").forEach((btn) => {
    btn.addEventListener("click", () => {
      currentPage = Number(btn.dataset.page);
      renderCatalogPage(currentPage);
      renderPagination();
      window.scrollTo({ top: 0, behavior: "smooth" });
    });
  });

  paginationEl.querySelector(".pagination__prev")?.addEventListener("click", () => {
    currentPage--;
    renderCatalogPage(currentPage);
    renderPagination();
    window.scrollTo({ top: 0, behavior: "smooth" });
  });

  paginationEl.querySelector(".pagination__next")?.addEventListener("click", () => {
    currentPage++;
    renderCatalogPage(currentPage);
    renderPagination();
    window.scrollTo({ top: 0, behavior: "smooth" });
  });
}

// --- sorting + search ---
function sortArray(arr, value) {
  arr.sort((a, b) => {
    switch (value) {
      case "price-asc": return a.price - b.price;
      case "price-desc": return b.price - a.price;
      case "popularity": return b.popularity - a.popularity;
      case "rating": return b.rating - a.rating;
      default: return 0;
    }
  });
}

function debounce(fn, delay = 250) {
  let t;
  return (...args) => {
    clearTimeout(t);
    t = setTimeout(() => fn(...args), delay);
  };
}

function applySearchAndSort() {
  const sortEl = document.getElementById("sortSelect");
  const searchEl = document.getElementById("searchInput");

  const q = (searchEl?.value || "").trim().toLowerCase();
  const words = q.split(/\s+/).filter(Boolean);

  filteredProducts = products.filter((item) => {
    const hay = `${item.name} ${item.category} ${item.color} ${item.size}`.toLowerCase();
    return words.every((w) => hay.includes(w));
  });

  sortArray(filteredProducts, sortEl?.value || "");

  currentPage = 1;
  renderCatalogPage(currentPage);
  renderPagination(filteredProducts.length);
}

// --- asidebar (Top Best Sets) ---
function renderTopBestSets(products) {
  const container = document.getElementById("top-best-sets");
  if (!container) return;

  const filtered = products.filter((p) => p.blocks.includes("Top Best Sets"));

  const block = document.createElement("div");
  block.className = "top-best-list";

  const itemsHTML = filtered
    .map(
      (item) => `
      <div class="top-best-item" data-product-id="${item.id}">
        <img src="${item.imageUrl}" alt="${item.name}">
        <div class="top-best-info">
          <p class="title">${item.name}</p>
          <div class="rating">${renderStars(item.rating)}</div>
          <p class="price">$${item.price}</p>
        </div>
      </div>
    `
    )
    .join("");

  block.innerHTML = `<h3 class="top-best-title">Top Best Sets</h3>${itemsHTML}`;
  container.appendChild(block);

  // Add click handlers to navigate to product details
  const topBestItems = block.querySelectorAll('.top-best-item');
  topBestItems.forEach(item => {
    item.style.cursor = 'pointer';
    item.addEventListener('click', function() {
      const productId = this.dataset.productId;
      if (productId) {
        window.location.href = `/src/pages/product-details-template.html?id=${productId}`;
      }
    });
  });
}

function renderStars(rating) {
  const fullStars = Math.floor(rating);
  const halfStar = rating % 1 >= 0.5 ? 1 : 0;
  const emptyStars = 5 - fullStars - halfStar;

  return (
    "★".repeat(fullStars) +
    (halfStar ? "☆" : "") +
    "☆".repeat(emptyStars)
  )
    .split("")
    .map((star) => `<span class="star">${star}</span>`)
    .join("");
}

// Export renderStars for use in other modules
export { renderStars };