// Global Cart Handler - Manages cart counter and navigation
(function () {
    // Wait for DOM to be ready
    document.addEventListener('DOMContentLoaded', initCartHandler);

    function initCartHandler() {
        // Wait a bit for header to load
        setTimeout(() => {
            updateCartCounter();
            setupCartButtonClick();
        }, 200);
    }

    function updateCartCounter() {
        const cart = getCartFromStorage();
        const totalItems = cart.reduce((sum, item) => sum + item.quantity, 0);
        
        const cartCounter = document.querySelector('.cart-counter');
        if (cartCounter) {
            cartCounter.textContent = totalItems;
            if (totalItems > 0) {
                cartCounter.style.display = 'flex';
            } else {
                cartCounter.style.display = 'none';
            }
        }
    }

    function setupCartButtonClick() {
        const cartBtn = document.querySelector('.cart-btn');
        if (cartBtn) {
            cartBtn.addEventListener('click', () => {
                window.location.href = '/src/pages/cart.html';
            });
        }
    }

    function getCartFromStorage() {
        try {
            const cartData = localStorage.getItem('cart');
            return cartData ? JSON.parse(cartData) : [];
        } catch (error) {
            console.error('Error loading cart:', error);
            return [];
        }
    }

    function saveCartToStorage(cart) {
        localStorage.setItem('cart', JSON.stringify(cart));
        updateCartCounter();
    }

    function addToCart(product) {
        const cart = getCartFromStorage();
        
        // Check if item already exists with same id, size, and color
        const existingIndex = cart.findIndex(item => 
            item.id === product.id && 
            (item.size || 'default') === (product.size || 'default') && 
            (item.color || 'default') === (product.color || 'default')
        );

        if (existingIndex !== -1) {
            // Update quantity of existing item
            cart[existingIndex].quantity += 1;
        } else {
            // Add new item
            cart.push({
                id: product.id,
                name: product.name,
                price: product.price,
                imageUrl: product.imageUrl,
                quantity: 1,
                size: product.size || null,
                color: product.color || null,
                category: product.category || null
            });
        }

        saveCartToStorage(cart);
        
        // Show success message
        showAddToCartNotification(product.name);
        
        return true;
    }

    function showAddToCartNotification(productName) {
        // Simple alert for now - you can make this fancier later
        const message = `"${productName}" has been added to your cart!`;
        
        // Create a toast notification
        const toast = document.createElement('div');
        toast.className = 'cart-toast';
        toast.textContent = message;
        document.body.appendChild(toast);
        
        // Show toast
        setTimeout(() => {
            toast.classList.add('show');
        }, 10);
        
        // Hide and remove toast after 3 seconds
        setTimeout(() => {
            toast.classList.remove('show');
            setTimeout(() => {
                toast.remove();
            }, 300);
        }, 3000);
    }

    // Export functions for global use
    window.CartHandler = {
        addToCart: addToCart,
        updateCounter: updateCartCounter,
        getCart: getCartFromStorage
    };
})();
