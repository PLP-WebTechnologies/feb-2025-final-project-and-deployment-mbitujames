// Cart functionality
let cart = JSON.parse(localStorage.getItem('cart')) || [];

function updateCartCount() {
    const count = cart.reduce((total, item) => total + item.quantity, 0);
    document.querySelectorAll('#cart-count').forEach(el => {
        el.textContent = count;
    });
}

function addToCart(productId, productName, productPrice) {
    const existingItem = cart.find(item => item.id === productId);
    
    if (existingItem) {
        existingItem.quantity += 1;
    } else {
        cart.push({
            id: productId,
            name: productName,
            price: productPrice,
            quantity: 1
        });
    }
    
    localStorage.setItem('cart', JSON.stringify(cart));
    updateCartCount();
    alert(`${productName} added to cart!`);
}

function renderCartItems() {
    const cartItemsEl = document.getElementById('cart-items');
    const totalAmountEl = document.getElementById('total-amount');
    
    if (!cartItemsEl) return;
    
    if (cart.length === 0) {
        cartItemsEl.innerHTML = '<p class="empty-cart">Your cart is empty</p>';
        totalAmountEl.textContent = '0.00';
        return;
    }
    
    cartItemsEl.innerHTML = '';
    let total = 0;
    
    cart.forEach(item => {
        const itemTotal = item.price * item.quantity;
        total += itemTotal;
        
        const itemEl = document.createElement('div');
        itemEl.className = 'cart-item';
        itemEl.innerHTML = `
            <img src="images/${item.id === '1' ? 'laptop' : item.id === '2' ? 'phone' : item.id === '3' ? 'headphones' : 'smartwatch'}.jpg" alt="${item.name}">
            <div class="cart-item-info">
                <h3>${item.name}</h3>
                <p>$${item.price.toFixed(2)} × ${item.quantity}</p>
            </div>
            <p class="cart-item-price">$${itemTotal.toFixed(2)}</p>
            <button class="remove-item" data-id="${item.id}">Remove</button>
        `;
        
        cartItemsEl.appendChild(itemEl);
    });
    
    totalAmountEl.textContent = total.toFixed(2);
}

// Event listeners for Add to Cart buttons
document.querySelectorAll('.add-to-cart').forEach(button => {
    button.addEventListener('click', function() {
        const productCard = this.closest('.product-card');
        const productId = this.getAttribute('data-id');
        const productName = productCard.querySelector('h3').textContent;
        const productPrice = parseFloat(productCard.querySelector('.price').textContent.replace('$', ''));
        
        addToCart(productId, productName, productPrice);
    });
});

// Event delegation for Remove buttons
document.addEventListener('click', function(e) {
    if (e.target.classList.contains('remove-item')) {
        const productId = e.target.getAttribute('data-id');
        cart = cart.filter(item => item.id !== productId);
        localStorage.setItem('cart', JSON.stringify(cart));
        updateCartCount();
        renderCartItems();
    }
});

// Checkout button
document.getElementById('checkout-btn')?.addEventListener('click', function() {
    if (cart.length === 0) {
        alert('Your cart is empty!');
        return;
    }
    
    alert('Thank you for your purchase! This would redirect to payment in a real implementation.');
    cart = [];
    localStorage.setItem('cart', JSON.stringify(cart));
    updateCartCount();
    renderCartItems();
});

// Initialize
updateCartCount();
if (window.location.pathname.includes('cart.html')) {
    renderCartItems();
}