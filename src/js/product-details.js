// Product Details Page
import { renderStars, renderSection } from './products-section.js';

(function () {
  let currentProduct = null;
  let allProducts = [];
  let selectedRating = 0;
  let starInputs = null;

  // Get product ID from URL
  function getProductIdFromURL() {
    const params = new URLSearchParams(window.location.search);
    return params.get('id');
  }

  // Load product data
  async function loadProductData() {
    try {
      const response = await fetch('/src/assets/data.json');
      const data = await response.json();
      allProducts = data.data;

      const productId = getProductIdFromURL();
      if (productId) {
        currentProduct = allProducts.find(p => p.id === productId);
      } else {
        // Default to first product if no ID specified
        currentProduct = allProducts[0];
      }

      if (currentProduct) {
        renderProductDetails(currentProduct);
        loadRelatedProducts();
      } else {
        console.error('Product not found');
      }
    } catch (error) {
      console.error('Error loading product data:', error);
    }
  }

  // Render product details
  function renderProductDetails(product) {
    // Update product name
    document.getElementById('product-name').textContent = product.name;
    document.getElementById('review-product-name').textContent = product.name;

    // Update rating
    const starsContainer = document.getElementById('product-stars');
    starsContainer.innerHTML = renderStars(product.rating);
    document.getElementById('product-rating-value').textContent = `(${product.rating})`;

    // Update price
    document.getElementById('product-price').textContent = `$${product.price}`;

    // Update description
    document.getElementById('product-description').textContent = product.description || 'No description available.';

    // Update main image
    const mainImage = document.getElementById('main-image');
    if (mainImage && product.imageUrl) {
      mainImage.src = product.imageUrl;
      mainImage.alt = product.name;
    }

    // Setup interactive elements
    setupThumbnailGallery();
    setupQuantitySelector();
    setupTabs();
    setupAddToCart();
    setupStarRatingInput();
    setupReviewForm();
  }

  // Setup Thumbnail Gallery
  function setupThumbnailGallery() {
    const thumbnails = document.querySelectorAll('.thumbnail');
    const mainImage = document.getElementById('main-image');

    thumbnails.forEach(thumb => {
      thumb.addEventListener('click', () => handleThumbnailClick(thumb, thumbnails, mainImage));
    });
  }

  function handleThumbnailClick(clickedThumb, allThumbnails, mainImage) {
    // Remove active class from all thumbnails
    removeActiveThumbnails(allThumbnails);

    // Add active class to clicked thumbnail
    clickedThumb.classList.add('active');

    // Update main image
    mainImage.src = clickedThumb.src;
    mainImage.alt = clickedThumb.alt;
  }

  function removeActiveThumbnails(thumbnails) {
    thumbnails.forEach(t => t.classList.remove('active'));
  }

  // Quantity Selector
  function setupQuantitySelector() {
    const qtyInput = document.getElementById('quantity');
    const qtyMinus = document.getElementById('qty-minus');
    const qtyPlus = document.getElementById('qty-plus');

    qtyMinus.addEventListener('click', () => {
      const currentValue = parseInt(qtyInput.value);
      if (currentValue > 1) {
        qtyInput.value = currentValue - 1;
      }
    });

    qtyPlus.addEventListener('click', () => {
      const currentValue = parseInt(qtyInput.value);
      qtyInput.value = currentValue + 1;
    });
  }

  // Tab Switching
  function setupTabs() {
    const tabBtns = document.querySelectorAll('.tab-btn');
    const tabPanes = document.querySelectorAll('.tab-pane');

    tabBtns.forEach(btn => {
      btn.addEventListener('click', () => handleTabClick(btn, tabBtns, tabPanes));
    });
  }

  function handleTabClick(clickedBtn, allBtns, allPanes) {
    const tabName = clickedBtn.dataset.tab;

    // Remove active class from all buttons and panes
    deactivateAllTabs(allBtns, allPanes);

    // Add active class to clicked button and corresponding pane
    clickedBtn.classList.add('active');
    document.getElementById(`${tabName}-tab`).classList.add('active');
  }

  function deactivateAllTabs(buttons, panes) {
    buttons.forEach(b => b.classList.remove('active'));
    panes.forEach(p => p.classList.remove('active'));
  }

  // Add to Cart
  function setupAddToCart() {
    const addToCartBtn = document.getElementById('add-to-cart-btn');

    if (!addToCartBtn) {return;}

    addToCartBtn.addEventListener('click', () => {
      const quantity = parseInt(document.getElementById('quantity').value);

      if (window.CartHandler) {
        // Add product to cart with quantity
        for (let i = 0; i < quantity; i++) {
          window.CartHandler.addToCart(currentProduct);
        }
      }

      // Reset quantity to 1
      document.getElementById('quantity').value = 1;
    });
  }

  // Load Related Products ("You May Also Like")
  function loadRelatedProducts() {
    // Get 4 random products (excluding current product)
    const otherProducts = allProducts.filter(p => p.id !== currentProduct.id);
    const shuffled = otherProducts.toSorted(() => 0.5 - Math.random());
    const selectedProducts = shuffled.slice(0, 4);

    // Use the same renderSection function as home page for consistent styling
    renderSection(
      'related-products',
      'You May Also Like',
      'Duis vestibulum elit vel neque pharetra',
      'View Product',
      selectedProducts,
      null
    );
  }

  // Star Rating Input
  function setupStarRatingInput() {
    starInputs = document.querySelectorAll('.star-input');
    const ratingInput = document.getElementById('rating-input');

    starInputs.forEach(star => {
      star.addEventListener('click', () => handleStarClick(star, ratingInput));
      star.addEventListener('mouseenter', () => handleStarHover(star));
    });

    // Reset on mouse leave
    const ratingContainer = document.querySelector('.star-rating-input');
    if (ratingContainer) {
      ratingContainer.addEventListener('mouseleave', resetStarsToSelected);
    }
  }

  function handleStarClick(clickedStar, ratingInput) {
    selectedRating = parseInt(clickedStar.dataset.rating);
    ratingInput.value = selectedRating;

    // Update visual state
    updateStarVisuals(selectedRating);
  }

  function handleStarHover(hoveredStar) {
    const hoverRating = parseInt(hoveredStar.dataset.rating);
    updateStarVisuals(hoverRating);
  }

  function updateStarVisuals(targetRating) {
    starInputs.forEach(s => {
      const rating = parseInt(s.dataset.rating);
      if (rating <= targetRating) {
        s.textContent = '★';
        s.classList.add('active');
      } else {
        s.textContent = '☆';
        s.classList.remove('active');
      }
    });
  }

  function resetStarsToSelected() {
    updateStarVisuals(selectedRating);
  }

  // Review Form Submission
  function setupReviewForm() {
    const reviewForm = document.getElementById('reviewForm');

    if (!reviewForm) {return;}

    reviewForm.addEventListener('submit', function(e) {
      e.preventDefault();

      const ratingInput = document.getElementById('rating-input');
      const reviewText = document.getElementById('review-text').value;

      // Validate rating
      if (!ratingInput.value || ratingInput.value === '0') {
        alert('Please select a rating');
        return;
      }

      // Validate review text
      if (reviewText.trim().length < 10) {
        alert('Please write a review of at least 10 characters');
        return;
      }

      // Success
      alert('Thank you for your review!');

      // Reset form
      this.reset();
      selectedRating = 0;

      // Reset stars
      if (starInputs) {
        updateStarVisuals(0);
      }
    });
  }

  // Initialize on DOM load
  document.addEventListener('DOMContentLoaded', loadProductData);
})();

// Export renderStarsForDetails for potential use
export function renderStarsForDetails(rating) {
  let stars = '';
  for (let i = 1; i <= 5; i++) {
    if (i <= rating) {
      stars += '<span class="star filled">★</span>';
    } else {
      stars += '<span class="star">☆</span>';
    }
  }
  return stars;
}
