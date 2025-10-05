// Cart Page Handler
(function () {
    const SHIPPING_COST = 30;
    const DISCOUNT_THRESHOLD = 3000;
    const DISCOUNT_PERCENTAGE = 10;

    let cart = [];

    // Initialize cart when DOM is loaded
    document.addEventListener('DOMContentLoaded', initCart);

    function initCart() {
        // Load cart from localStorage
        loadCartFromStorage();

        // Render cart
        renderCart();

        // Setup event listeners
        setupEventListeners();
    }

    function loadCartFromStorage() {
        const cartData = localStorage.getItem('cart');
        if (cartData) {
            try {
                cart = JSON.parse(cartData);
            } catch (error) {
                console.error('Error loading cart:', error);
                cart = [];
            }
        }
    }

    function saveCartToStorage() {
        localStorage.setItem('cart', JSON.stringify(cart));
        updateCartCounter();
    }

    function updateCartCounter() {
        const totalItems = cart.reduce((sum, item) => sum + item.quantity, 0);
        // Update cart counter in header if exists
        const cartCounter = document.querySelector('.cart-counter');
        if (cartCounter) {
            if (totalItems > 0) {
                cartCounter.textContent = totalItems;
                cartCounter.style.display = 'block';
            } else {
                cartCounter.style.display = 'none';
            }
        }
        console.log('Cart items:', totalItems);
    }

    function renderCart() {
        const cartWithItems = document.getElementById('cart-with-items');
        const cartEmpty = document.getElementById('cart-empty');
        const cartThankYou = document.getElementById('cart-thank-you');

        // Hide thank you message by default
        if (cartThankYou) {
            cartThankYou.style.display = 'none';
        }

        if (cart.length === 0) {
            // Show empty cart message
            if (cartWithItems) cartWithItems.style.display = 'none';
            if (cartEmpty) cartEmpty.style.display = 'block';
            return;
        }

        // Show cart with items
        if (cartWithItems) cartWithItems.style.display = 'grid';
        if (cartEmpty) cartEmpty.style.display = 'none';

        renderCartItems();
        renderCartSummary();
    }

    function renderCartItems() {
        const tbody = document.getElementById('cart-items-tbody');
        if (!tbody) return;

        tbody.innerHTML = cart.map((item, index) => `
            <tr data-index="${index}">
                <td data-label="Image">
                    <img src="${item.imageUrl}" alt="${item.name}" class="cart-item-image" />
                </td>
                <td data-label="Product Name" class="cart-item-name">
                    ${item.name}
                    ${item.size ? `<br><small>Size: ${item.size}</small>` : ''}
                    ${item.color ? `<br><small>Color: ${item.color}</small>` : ''}
                </td>
                <td data-label="Price" class="cart-item-price">$${item.price}</td>
                <td data-label="Quantity">
                    <div class="quantity-control">
                        <button class="qty-btn qty-minus" data-index="${index}" ${item.quantity <= 1 ? 'disabled' : ''}>-</button>
                        <span class="qty-value">${item.quantity}</span>
                        <button class="qty-btn qty-plus" data-index="${index}">+</button>
                    </div>
                </td>
                <td data-label="Total" class="cart-item-total">$${(item.price * item.quantity).toFixed(0)}</td>
                <td data-label="Delete">
                    <button class="delete-btn" data-index="${index}">🗑</button>
                </td>
            </tr>
        `).join('');

        // Add event listeners to quantity buttons and delete buttons
        setupItemEventListeners();
    }

    function setupItemEventListeners() {
        // Quantity minus buttons
        document.querySelectorAll('.qty-minus').forEach(btn => {
            btn.addEventListener('click', function() {
                const index = parseInt(this.dataset.index);
                updateQuantity(index, -1);
            });
        });

        // Quantity plus buttons
        document.querySelectorAll('.qty-plus').forEach(btn => {
            btn.addEventListener('click', function() {
                const index = parseInt(this.dataset.index);
                updateQuantity(index, 1);
            });
        });

        // Delete buttons
        document.querySelectorAll('.delete-btn').forEach(btn => {
            btn.addEventListener('click', function() {
                const index = parseInt(this.dataset.index);
                removeItem(index);
            });
        });
    }

    function updateQuantity(index, change) {
        if (cart[index]) {
            cart[index].quantity += change;
            
            // Remove item if quantity becomes 0 or less
            if (cart[index].quantity <= 0) {
                removeItem(index);
                return;
            }
            
            saveCartToStorage();
            renderCart();
        }
    }

    function removeItem(index) {
        if (confirm('Are you sure you want to remove this item from your cart?')) {
            cart.splice(index, 1);
            saveCartToStorage();
            renderCart();
        }
    }

    function renderCartSummary() {
        // Calculate sub total
        const subTotal = cart.reduce((sum, item) => sum + (item.price * item.quantity), 0);
        
        // Calculate discount (10% if subtotal exceeds $3000)
        let discount = 0;
        if (subTotal > DISCOUNT_THRESHOLD) {
            discount = subTotal * (DISCOUNT_PERCENTAGE / 100);
        }
        
        // Calculate total
        const total = subTotal - discount + SHIPPING_COST;

        // Update summary display
        const subTotalEl = document.getElementById('sub-total');
        const discountRow = document.getElementById('discount-row');
        const discountValueEl = document.getElementById('discount-value');
        const shippingCostEl = document.getElementById('shipping-cost');
        const totalValueEl = document.getElementById('total-value');

        if (subTotalEl) subTotalEl.textContent = `$${subTotal.toFixed(0)}`;
        if (shippingCostEl) shippingCostEl.textContent = `$${SHIPPING_COST}`;
        if (totalValueEl) totalValueEl.textContent = `$${total.toFixed(0)}`;

        // Show/hide discount row
        if (discountRow && discountValueEl) {
            if (discount > 0) {
                discountRow.style.display = 'flex';
                discountValueEl.textContent = `$${discount.toFixed(0)}`;
            } else {
                discountRow.style.display = 'none';
            }
        }
    }

    function clearCart() {
        if (cart.length === 0) {
            alert('Your cart is already empty.');
            return;
        }

        if (confirm('Are you sure you want to clear your entire cart?')) {
            cart = [];
            saveCartToStorage();
            renderCart();
        }
    }

    function checkout() {
        if (cart.length === 0) {
            alert('Your cart is empty. Please add items before checking out.');
            return;
        }

        // Clear cart
        cart = [];
        saveCartToStorage();

        // Show thank you message
        const cartWithItems = document.getElementById('cart-with-items');
        const cartEmpty = document.getElementById('cart-empty');
        const cartThankYou = document.getElementById('cart-thank-you');

        if (cartWithItems) cartWithItems.style.display = 'none';
        if (cartEmpty) cartEmpty.style.display = 'none';
        if (cartThankYou) cartThankYou.style.display = 'block';

        // Scroll to top
        window.scrollTo({ top: 0, behavior: 'smooth' });
    }

    function setupEventListeners() {
        // Continue Shopping button
        const continueShoppingBtn = document.getElementById('continue-shopping-btn');
        if (continueShoppingBtn) {
            continueShoppingBtn.addEventListener('click', () => {
                window.location.href = '/src/pages/catalog.html';
            });
        }

        // Clear Cart button
        const clearCartBtn = document.getElementById('clear-cart-btn');
        if (clearCartBtn) {
            clearCartBtn.addEventListener('click', clearCart);
        }

        // Checkout button
        const checkoutBtn = document.getElementById('checkout-btn');
        if (checkoutBtn) {
            checkoutBtn.addEventListener('click', checkout);
        }

        // Browse Catalog button (empty cart state)
        const browseCatalogBtn = document.getElementById('browse-catalog-btn');
        if (browseCatalogBtn) {
            browseCatalogBtn.addEventListener('click', () => {
                window.location.href = '/src/pages/catalog.html';
            });
        }

        // Continue Shopping button (thank you state)
        const continueShoppingThankYouBtn = document.getElementById('continue-shopping-thank-you-btn');
        if (continueShoppingThankYouBtn) {
            continueShoppingThankYouBtn.addEventListener('click', () => {
                window.location.href = '/src/index.html';
            });
        }
    }

    // Export functions for use by other scripts
    window.CartManager = {
        addToCart: function(product) {
            // Check if item already exists with same name, size, and color
            const existingIndex = cart.findIndex(item => 
                item.id === product.id && 
                item.size === product.size && 
                item.color === product.color
            );

            if (existingIndex !== -1) {
                // Update quantity of existing item
                cart[existingIndex].quantity += product.quantity || 1;
            } else {
                // Add new item
                cart.push({
                    id: product.id,
                    name: product.name,
                    price: product.price,
                    imageUrl: product.imageUrl,
                    quantity: product.quantity || 1,
                    size: product.size || null,
                    color: product.color || null,
                    category: product.category || null
                });
            }

            saveCartToStorage();
            return true;
        },
        
        getCart: function() {
            return cart;
        },

        getCartCount: function() {
            return cart.reduce((sum, item) => sum + item.quantity, 0);
        }
    };
})();