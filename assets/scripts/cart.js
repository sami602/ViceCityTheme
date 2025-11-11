/**
 * Shopping Cart Module
 * Handles cart operations with localStorage persistence
 * @class ShoppingCart
 */
class ShoppingCart {
  /**
   * Creates a new ShoppingCart instance
   * @constructor
   */
  constructor() {
    this.cart = this.loadCart();
    this.promoCode = null;
    this.promoDiscount = 0;
    this.init();
  }

  /**
   * Initialize the cart
   * @private
   */
  init() {
    this.updateCartUI();
    this.attachEventListeners();
  }

  /**
   * Load cart data from localStorage
   * @private
   * @returns {Array} The cart items array
   */
  loadCart() {
    const saved = localStorage.getItem('gta6_cart');
    return saved ? JSON.parse(saved) : [];
  }

  /**
   * Save cart to localStorage and update UI
   * @private
   */
  saveCart() {
    localStorage.setItem('gta6_cart', JSON.stringify(this.cart));
    this.updateCartUI();
    this.dispatchCartUpdate();
  }

  /**
   * Dispatch a custom event when cart is updated
   * @private
   */
  dispatchCartUpdate() {
    window.dispatchEvent(new CustomEvent('cart:updated', {
      detail: { cart: this.cart, total: this.getTotal() }
    }));
  }

  /**
   * Add a product to the cart
   * @param {Object} product - The product object to add
   * @param {string} product.id - Product ID
   * @param {string} product.title - Product title
   * @param {number} product.price - Product price
   * @param {string} product.image - Product image URL
   * @param {string} [product.platform='PC'] - Product platform
   * @public
   */
  addItem(product) {
    const existingItem = this.cart.find(item => item.id === product.id);

    if (existingItem) {
      existingItem.quantity += 1;
    } else {
      this.cart.push({
        id: product.id,
        title: product.title,
        price: product.price,
        image: product.image,
        platform: product.platform || 'PC',
        quantity: 1
      });
    }

    this.saveCart();
    this.showNotification('Added to cart!', 'success');
  }

  /**
   * Remove a product from the cart
   * @param {string} productId - The ID of the product to remove
   * @public
   */
  removeItem(productId) {
    this.cart = this.cart.filter(item => item.id !== productId);
    this.saveCart();
    this.showNotification('Removed from cart', 'info');
  }

  /**
   * Update the quantity of a cart item
   * @param {string} productId - The ID of the product
   * @param {number} quantity - The new quantity
   * @public
   */
  updateQuantity(productId, quantity) {
    const item = this.cart.find(item => item.id === productId);

    if (item) {
      if (quantity <= 0) {
        this.removeItem(productId);
      } else {
        item.quantity = quantity;
        this.saveCart();
      }
    }
  }

  /**
   * Clear all items from the cart
   * @public
   */
  clearCart() {
    this.cart = [];
    this.saveCart();
    this.showNotification('Cart cleared', 'info');
  }

  /**
   * Calculate the total price of all items in cart
   * @returns {number} The total price
   * @public
   */
  getTotal() {
    return this.cart.reduce((total, item) => {
      return total + (item.price * item.quantity);
    }, 0);
  }

  /**
   * Get the total number of items in cart
   * @returns {number} The total item count
   * @public
   */
  getItemCount() {
    return this.cart.reduce((count, item) => count + item.quantity, 0);
  }

  /**
   * Update all cart UI elements (badges, items, summary)
   * @private
   */
  updateCartUI() {
    // Update cart badge
    const cartBadges = document.querySelectorAll('.navbar__cart-badge');
    const itemCount = this.getItemCount();

    cartBadges.forEach(badge => {
      if (itemCount > 0) {
        badge.textContent = itemCount;
        badge.classList.remove('d-none');
      } else {
        badge.classList.add('d-none');
      }
    });

    // Update cart items display
    this.updateCartItems();
    this.updateCartSummary();
  }

  /**
   * Update cart items HTML in both full and mini cart
   * @private
   */
  updateCartItems() {
    const cartItemsContainer = document.querySelector('[data-cart-items]');
    const miniCartItemsContainer = document.querySelector('[data-mini-cart-items]');

    if (cartItemsContainer) {
      if (this.cart.length === 0) {
        cartItemsContainer.innerHTML = this.getEmptyCartHTML();
      } else {
        cartItemsContainer.innerHTML = this.cart.map(item => this.getCartItemHTML(item)).join('');
      }
    }

    if (miniCartItemsContainer) {
      if (this.cart.length === 0) {
        miniCartItemsContainer.innerHTML = '<p class="text-center text-muted">Your cart is empty</p>';
      } else {
        miniCartItemsContainer.innerHTML = this.cart.map(item => this.getMiniCartItemHTML(item)).join('');
      }
    }
  }

  /**
   * Update cart summary (subtotal, tax, shipping, total)
   * @private
   */
  updateCartSummary() {
    const subtotalElements = document.querySelectorAll('[data-cart-subtotal]');
    const totalElements = document.querySelectorAll('[data-cart-total]');
    const discountRow = document.querySelector('[data-cart-discount-row]');
    const discountElements = document.querySelectorAll('[data-cart-discount]');

    const subtotal = this.getTotal();
    let shipping = subtotal > 0 ? 5.99 : 0;
    let tax = subtotal * 0.1;
    let discount = 0;
    let total = subtotal + shipping + tax;

    // Apply promo code discount
    if (this.promoCode === 'HIRE_SAMI') {
      discount = subtotal + shipping + tax;
      total = 0;
      this.promoDiscount = discount;
    }

    subtotalElements.forEach(el => {
      el.textContent = `$${subtotal.toFixed(2)}`;
    });

    totalElements.forEach(el => {
      el.textContent = `$${total.toFixed(2)}`;
    });

    // Update other summary elements
    const shippingElements = document.querySelectorAll('[data-cart-shipping]');
    shippingElements.forEach(el => {
      el.textContent = `$${shipping.toFixed(2)}`;
    });

    const taxElements = document.querySelectorAll('[data-cart-tax]');
    taxElements.forEach(el => {
      el.textContent = `$${tax.toFixed(2)}`;
    });

    // Show/hide discount row
    if (this.promoCode === 'HIRE_SAMI' && discount > 0) {
      if (discountRow) {
        discountRow.style.display = 'flex';
      }
      discountElements.forEach(el => {
        el.textContent = `-$${discount.toFixed(2)}`;
      });
    } else {
      if (discountRow) {
        discountRow.style.display = 'none';
      }
    }
  }

  getCartItemHTML(item) {
    return `
      <div class="cart-item" data-item-id="${item.id}">
        <div class="cart-item__image">
          <img src="${item.image}" alt="${item.title}">
        </div>
        <div class="cart-item__content">
          <div class="cart-item__header">
            <div>
              <h3 class="cart-item__title">${item.title}</h3>
              <p class="cart-item__platform">${item.platform}</p>
            </div>
            <button class="cart-item__remove" data-remove-item="${item.id}">
              <svg width="20" height="20" fill="currentColor" viewBox="0 0 16 16">
                <path d="M5.5 5.5A.5.5 0 0 1 6 6v6a.5.5 0 0 1-1 0V6a.5.5 0 0 1 .5-.5zm2.5 0a.5.5 0 0 1 .5.5v6a.5.5 0 0 1-1 0V6a.5.5 0 0 1 .5-.5zm3 .5a.5.5 0 0 0-1 0v6a.5.5 0 0 0 1 0V6z"/>
                <path fill-rule="evenodd" d="M14.5 3a1 1 0 0 1-1 1H13v9a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V4h-.5a1 1 0 0 1-1-1V2a1 1 0 0 1 1-1H6a1 1 0 0 1 1-1h2a1 1 0 0 1 1 1h3.5a1 1 0 0 1 1 1v1zM4.118 4 4 4.059V13a1 1 0 0 0 1 1h6a1 1 0 0 0 1-1V4.059L11.882 4H4.118zM2.5 3V2h11v1h-11z"/>
              </svg>
            </button>
          </div>
          <div class="cart-item__footer">
            <div class="cart-item__quantity">
              <button data-decrease-qty="${item.id}">-</button>
              <input type="number" value="${item.quantity}" min="1" data-qty-input="${item.id}">
              <button data-increase-qty="${item.id}">+</button>
            </div>
            <div class="cart-item__price">$${(item.price * item.quantity).toFixed(2)}</div>
          </div>
        </div>
      </div>
    `;
  }

  getMiniCartItemHTML(item) {
    return `
      <div class="cart-item" data-item-id="${item.id}">
        <div class="cart-item__image">
          <img src="${item.image}" alt="${item.title}">
        </div>
        <div class="cart-item__content">
          <h4 class="cart-item__title">${item.title}</h4>
          <p class="cart-item__platform">${item.platform} × ${item.quantity}</p>
        </div>
        <div class="cart-item__price">$${(item.price * item.quantity).toFixed(2)}</div>
      </div>
    `;
  }

  getEmptyCartHTML() {
    return `
      <div class="cart-empty">
        <div class="cart-empty__icon">🛒</div>
        <h2 class="cart-empty__title">Your cart is empty</h2>
        <p class="cart-empty__text">Start adding some awesome games to your collection!</p>
        <a href="/products" class="btn btn--primary">Browse Games</a>
      </div>
    `;
  }

  attachEventListeners() {
    // Add to cart buttons
    document.addEventListener('click', (e) => {
      const addToCartBtn = e.target.closest('[data-add-to-cart]');
      if (addToCartBtn) {
        e.preventDefault();
        const productData = JSON.parse(addToCartBtn.dataset.addToCart);
        this.addItem(productData);
      }

      // Remove item
      const removeBtn = e.target.closest('[data-remove-item]');
      if (removeBtn) {
        e.preventDefault();
        const productId = removeBtn.dataset.removeItem;
        this.removeItem(productId);
      }

      // Increase quantity
      const increaseBtn = e.target.closest('[data-increase-qty]');
      if (increaseBtn) {
        e.preventDefault();
        const productId = increaseBtn.dataset.increaseQty;
        const item = this.cart.find(item => item.id === productId);
        if (item) {
          this.updateQuantity(productId, item.quantity + 1);
        }
      }

      // Decrease quantity
      const decreaseBtn = e.target.closest('[data-decrease-qty]');
      if (decreaseBtn) {
        e.preventDefault();
        const productId = decreaseBtn.dataset.decreaseQty;
        const item = this.cart.find(item => item.id === productId);
        if (item) {
          this.updateQuantity(productId, item.quantity - 1);
        }
      }
    });

    // Quantity input change
    document.addEventListener('change', (e) => {
      const qtyInput = e.target.closest('[data-qty-input]');
      if (qtyInput) {
        const productId = qtyInput.dataset.qtyInput;
        const quantity = parseInt(qtyInput.value, 10);
        this.updateQuantity(productId, quantity);
      }
    });

    // Toggle mini cart
    const cartToggles = document.querySelectorAll('[data-cart-toggle]');
    const miniCart = document.querySelector('.mini-cart');

    cartToggles.forEach(toggle => {
      toggle.addEventListener('click', (e) => {
        e.preventDefault();
        e.stopPropagation();
        miniCart?.classList.toggle('active');
      });
    });

    // Close mini cart when clicking outside
    document.addEventListener('click', (e) => {
      if (miniCart && !miniCart.contains(e.target) && !e.target.closest('[data-cart-toggle]')) {
        miniCart.classList.remove('active');
      }
    });

    // Promo code application
    const applyPromoBtn = document.getElementById('apply-promo-btn');
    const promoInput = document.getElementById('promo-code-input');

    if (applyPromoBtn && promoInput) {
      applyPromoBtn.addEventListener('click', () => {
        const code = promoInput.value;
        if (code) {
          this.applyPromoCode(code);
        }
      });

      // Allow Enter key to apply promo code
      promoInput.addEventListener('keypress', (e) => {
        if (e.key === 'Enter') {
          const code = promoInput.value;
          if (code) {
            this.applyPromoCode(code);
          }
        }
      });
    }
  }

  /**
   * Apply promo code
   * @param {string} code - The promo code to apply
   * @public
   */
  applyPromoCode(code) {
    const promoInput = document.getElementById('promo-code-input');
    const promoMessage = document.getElementById('promo-message');

    const normalizedCode = code.trim().toUpperCase();

    if (normalizedCode === 'HIRE_SAMI') {
      this.promoCode = normalizedCode;
      this.updateCartSummary();

      if (promoMessage) {
        promoMessage.textContent = '🎉 Amazing! Everything is FREE! Sami would love to work with you! 🚀';
        promoMessage.style.display = 'block';
        promoMessage.style.color = 'var(--color-neon-green)';
        promoMessage.style.fontWeight = 'bold';
      }

      this.showNotification('🎉 Promo code applied! Total is now $0.00!', 'success');

      if (promoInput) {
        promoInput.value = '';
        promoInput.disabled = true;
      }
    } else {
      if (promoMessage) {
        promoMessage.textContent = '❌ Invalid promo code. Try HIRE_SAMI 😉';
        promoMessage.style.display = 'block';
        promoMessage.style.color = 'var(--color-neon-pink)';
      }

      this.showNotification('Invalid promo code', 'error');
    }
  }

  /**
   * Show a toast notification to the user
   * @param {string} message - The message to display
   * @param {string} type - The notification type (success, error, info, warning)
   */
  showNotification(message, type = 'success') {
    const notification = document.createElement('div');
    notification.className = `notification notification--${type}`;
    notification.textContent = message;

    document.body.appendChild(notification);

    setTimeout(() => {
      notification.classList.add('slide-out');
      setTimeout(() => notification.remove(), 300);
    }, 3000);
  }
}

// Initialize cart
const cart = new ShoppingCart();

// Make cart globally available
window.ShoppingCart = cart;

export default cart;
