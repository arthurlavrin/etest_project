// Product Details Page
import { renderStars, renderSection } from "./products-section.js";

(function () {
    let currentProduct = null;
    let allProducts = [];
    let selectedRating = 0;

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

        // Update SKU
        document.getElementById('product-sku').textContent = product.id;

        // Update price
        const currentPrice = document.getElementById('product-price');
        const oldPrice = document.getElementById('product-old-price');
        
        currentPrice.textContent = `$${product.price}`;
        
        if (product.salesStatus) {
            const originalPrice = Math.round(product.price * 1.4); // Calculate original price
            oldPrice.textContent = `$${originalPrice}`;
            oldPrice.style.display = 'inline';
        } else {
            oldPrice.style.display = 'none';
        }

        // Update main image
        document.getElementById('main-image').src = product.imageUrl;
        document.getElementById('main-image').alt = product.name;

        // Update thumbnails
        const thumbnails = document.querySelectorAll('.thumbnail');
        thumbnails.forEach((thumb, index) => {
            // For now, use the same image, but you can update this when you have multiple images
            thumb.src = product.imageUrl;
            thumb.alt = `${product.name} view ${index + 1}`;
        });

        // Set default selections
        if (product.size) {
            document.getElementById('size-select').value = product.size;
        }
        if (product.color) {
            document.getElementById('color-select').value = product.color;
        }
        if (product.category) {
            document.getElementById('category-select').value = product.category;
        }
    }

    // Image Gallery - Thumbnail Click
    function setupImageGallery() {
        const thumbnails = document.querySelectorAll('.thumbnail');
        const mainImage = document.getElementById('main-image');

        thumbnails.forEach(thumb => {
            thumb.addEventListener('click', function() {
                // Remove active class from all thumbnails
                thumbnails.forEach(t => t.classList.remove('active'));
                
                // Add active class to clicked thumbnail
                this.classList.add('active');
                
                // Update main image
                mainImage.src = this.src;
                mainImage.alt = this.alt;
            });
        });
    }

    // Quantity Selector
    function setupQuantitySelector() {
        const qtyInput = document.getElementById('quantity');
        const qtyMinus = document.getElementById('qty-minus');
        const qtyPlus = document.getElementById('qty-plus');

        qtyMinus.addEventListener('click', () => {
            let currentValue = parseInt(qtyInput.value);
            if (currentValue > 1) {
                qtyInput.value = currentValue - 1;
            }
        });

        qtyPlus.addEventListener('click', () => {
            let currentValue = parseInt(qtyInput.value);
            qtyInput.value = currentValue + 1;
        });
    }

    // Tab Switching
    function setupTabs() {
        const tabBtns = document.querySelectorAll('.tab-btn');
        const tabPanes = document.querySelectorAll('.tab-pane');

        tabBtns.forEach(btn => {
            btn.addEventListener('click', function() {
                const tabName = this.dataset.tab;

                // Remove active class from all buttons and panes
                tabBtns.forEach(b => b.classList.remove('active'));
                tabPanes.forEach(p => p.classList.remove('active'));

                // Add active class to clicked button and corresponding pane
                this.classList.add('active');
                document.getElementById(`${tabName}-tab`).classList.add('active');
            });
        });
    }

    // Add to Cart
    function setupAddToCart() {
        const addToCartBtn = document.getElementById('add-to-cart-btn');

        addToCartBtn.addEventListener('click', () => {
            if (!currentProduct) return;

            const quantity = parseInt(document.getElementById('quantity').value);
            const size = document.getElementById('size-select').value;
            const color = document.getElementById('color-select').value;
            const category = document.getElementById('category-select').value;

            // Validate selections
            if (!size) {
                alert('Please select a size');
                return;
            }
            if (!color) {
                alert('Please select a color');
                return;
            }
            if (!category) {
                alert('Please select a category');
                return;
            }

            const cartItem = {
                id: currentProduct.id,
                name: currentProduct.name,
                price: currentProduct.price,
                imageUrl: currentProduct.imageUrl,
                quantity: quantity,
                size: size,
                color: color,
                category: category
            };

            // Use CartHandler if available
            if (window.CartHandler) {
                window.CartHandler.addToCart(cartItem);
            } else {
                // Fallback: manual localStorage management
                console.warn('CartHandler not available, using fallback');
                
                let cart = JSON.parse(localStorage.getItem('cart')) || [];

                const existingItemIndex = cart.findIndex(item => 
                    item.id === cartItem.id && 
                    item.size === cartItem.size && 
                    item.color === cartItem.color
                );

                if (existingItemIndex !== -1) {
                    cart[existingItemIndex].quantity += cartItem.quantity;
                } else {
                    cart.push(cartItem);
                }

                localStorage.setItem('cart', JSON.stringify(cart));
                alert(`${cartItem.name} added to cart!`);
            }

            // Reset quantity to 1
            document.getElementById('quantity').value = 1;
        });
    }

    // Load Related Products ("You May Also Like")
    function loadRelatedProducts() {
        // Get 4 random products (excluding current product)
        const otherProducts = allProducts.filter(p => p.id !== currentProduct.id);
        const shuffled = otherProducts.sort(() => 0.5 - Math.random());
        const selectedProducts = shuffled.slice(0, 4);

        // Use the same renderSection function as home page for consistent styling
        renderSection(
            'related-products',
            'You May Also Like',
            null,
            'Add To Cart',
            selectedProducts,
            null
        );
    }

    // Star Rating Input
    function setupStarRatingInput() {
        const starInputs = document.querySelectorAll('.star-input');
        const ratingInput = document.getElementById('rating-input');

        starInputs.forEach(star => {
            star.addEventListener('click', function() {
                selectedRating = parseInt(this.dataset.rating);
                ratingInput.value = selectedRating;

                // Update visual state
                starInputs.forEach(s => {
                    const rating = parseInt(s.dataset.rating);
                    if (rating <= selectedRating) {
                        s.textContent = '★';
                        s.classList.add('active');
                    } else {
                        s.textContent = '☆';
                        s.classList.remove('active');
                    }
                });
            });

            // Hover effect
            star.addEventListener('mouseenter', function() {
                const hoverRating = parseInt(this.dataset.rating);
                starInputs.forEach(s => {
                    const rating = parseInt(s.dataset.rating);
                    if (rating <= hoverRating) {
                        s.textContent = '★';
                    } else {
                        s.textContent = '☆';
                    }
                });
            });
        });

        // Reset on mouse leave
        document.querySelector('.star-rating-input').addEventListener('mouseleave', () => {
            starInputs.forEach(s => {
                const rating = parseInt(s.dataset.rating);
                if (rating <= selectedRating) {
                    s.textContent = '★';
                } else {
                    s.textContent = '☆';
                }
            });
        });
    }

    // Review Form Submission
    function setupReviewForm() {
        const addReviewBtn = document.querySelector('.add-review-btn');
        const reviewForm = document.getElementById('add-review-form');
        const form = document.getElementById('reviewForm');

        if (addReviewBtn) {
            addReviewBtn.addEventListener('click', () => {
                reviewForm.scrollIntoView({ behavior: 'smooth' });
            });
        }

        if (form) {
            form.addEventListener('submit', (e) => {
                e.preventDefault();

                if (selectedRating === 0) {
                    alert('Please rate the product');
                    return;
                }

                const reviewData = {
                    rating: selectedRating,
                    text: document.getElementById('review-text').value,
                    name: document.getElementById('reviewer-name').value,
                    email: document.getElementById('reviewer-email').value,
                    date: new Date().toLocaleDateString('en-US', { 
                        year: 'numeric', 
                        month: 'long', 
                        day: 'numeric' 
                    })
                };

                console.log('Review submitted:', reviewData);
                alert('Thank you for your review! (This is a demo - no backend yet)');
                
                // Reset form
                form.reset();
                selectedRating = 0;
                document.querySelectorAll('.star-input').forEach(s => {
                    s.textContent = '☆';
                    s.classList.remove('active');
                });
            });
        }
    }

    // Initialize
    document.addEventListener('DOMContentLoaded', () => {
        loadProductData();
        setupImageGallery();
        setupQuantitySelector();
        setupTabs();
        setupAddToCart();
        setupStarRatingInput();
        setupReviewForm();
    });
})();

// Export renderStars function if needed
export function renderStarsForDetails(rating) {
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