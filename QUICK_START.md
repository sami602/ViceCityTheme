# 🚀 Quick Start Guide - GTA-6 E-Shop

Get the Vice City gaming e-shop prototype up and running in just a few steps!

## ⚡ Quick Setup (3 Steps)

### 1. Start the Symfony Development Server
```bash
symfony serve
```
**OR** if you don't have Symfony CLI:
```bash
php -S 127.0.0.1:8000 -t public/
```

### 2. In Another Terminal, Watch for Asset Changes
```bash
npm run watch
```
This will automatically rebuild assets when you make changes to SCSS or JavaScript files.

### 3. Open Your Browser
Visit: **http://127.0.0.1:8000**

That's it! 🎉

## 🎮 Exploring the Prototype

### Available Pages

1. **Homepage** (`/`)
   - Hero section with animated statistics
   - Featured games with "Add to Cart" functionality
   - Category browse section
   - Testimonials
   - Newsletter signup

2. **Products Catalog** (`/products`)
   - Product grid with filtering
   - Category, platform, and genre filters
   - Price range slider
   - Search functionality
   - Sort by price, name, rating

3. **Product Detail** (`/product/cyberpunk-vice-city-2077`)
   - Image gallery
   - Product information
   - Reviews section
   - Related products
   - Add to cart

4. **Shopping Cart** (`/cart`)
   - View cart items
   - Update quantities
   - Remove items
   - Order summary
   - Proceed to checkout

5. **Checkout** (`/checkout`)
   - Multi-step checkout process
   - Address selection
   - Payment method
   - Order review

6. **Account Pages** (`/account`)
   - User profile
   - Order history (`/account/orders`)
   - Wishlist (`/account/wishlist`)

7. **Authentication**
   - Login (`/login`)
   - Register (`/register`)

## 🛠️ Common Tasks

### Rebuild Assets
```bash
# Development mode (faster, with source maps)
npm run dev

# Production mode (optimized, minified)
npm run build

# Watch mode (auto-rebuild on changes)
npm run watch
```

### Clear Symfony Cache
```bash
php bin/console cache:clear
```

### Test Shopping Cart
1. Go to the homepage
2. Click "Add to Cart" on any game
3. See the cart badge update in the navigation
4. Click the cart icon to view the mini cart
5. Navigate to `/cart` to see the full cart page

### Test Product Filtering
1. Go to `/products`
2. Use the sidebar filters:
   - Select categories (Action, RPG, etc.)
   - Choose platforms (PC, PlayStation, etc.)
   - Set price range
   - Use the search bar
3. Sort products using the dropdown

## 🎨 Customization Tips

### Change Color Scheme
Edit `assets/styles/_variables.scss`:
```scss
// Primary neon colors
$color-neon-pink: #ff006e;    // Your color here
$color-neon-blue: #00d9ff;    // Your color here
$color-neon-purple: #b967ff;  // Your color here
```
Then rebuild: `npm run build`

### Add New Products
Edit `src/Controller/PageController.php` in the `getFeaturedGames()` or `getAllProducts()` methods:
```php
[
    'id' => 'new-game-id',
    'title' => 'New Game Title',
    'slug' => 'new-game-slug',
    'description' => 'Game description',
    'price' => 59.99,
    'image' => '/build/images/game.jpg',
    'platform' => 'PC',
    'rating' => 4.5,
]
```

### Modify Animations
Edit `assets/scripts/animations.js` to customize scroll animations, hover effects, and transitions.

## 🐛 Troubleshooting

### Assets Not Loading?
1. Make sure assets are built: `npm run build`
2. Check that `/public/build` directory exists
3. Clear browser cache (Ctrl+Shift+R / Cmd+Shift+R)

### Symfony Server Won't Start?
1. Check if port 8000 is available
2. Try a different port: `symfony serve --port=8001`
3. Or use PHP server: `php -S 127.0.0.1:8001 -t public/`

### Shopping Cart Not Working?
1. Make sure JavaScript is enabled
2. Check browser console for errors (F12)
3. Verify that app.js is loaded in the page source

### Styles Look Wrong?
1. Rebuild assets: `npm run build`
2. Clear Symfony cache: `php bin/console cache:clear`
3. Hard reload browser: Ctrl+Shift+R (Windows) / Cmd+Shift+R (Mac)

## 📱 Testing Responsive Design

### Browser DevTools
1. Open DevTools (F12)
2. Toggle device toolbar (Ctrl+Shift+M / Cmd+Shift+M)
3. Test different screen sizes:
   - Mobile: 375px (iPhone)
   - Tablet: 768px (iPad)
   - Desktop: 1440px

### Test Features
- ✅ Mobile menu (hamburger icon)
- ✅ Mini cart dropdown
- ✅ Product cards stack vertically
- ✅ Hero section adapts
- ✅ Forms are usable on small screens

## 🎯 Next Steps

### For Development
1. **Add Real Data**: Replace demo data with database integration
2. **Backend Logic**: Implement actual cart processing, user authentication
3. **Payment Integration**: Add Stripe, PayPal, etc.
4. **Admin Panel**: Create content management system

### For Demonstration
1. **Add Images**: Replace placeholder gradients with actual game images
2. **Expand Pages**: Create more page templates (about, contact, etc.)
3. **Add Features**: Wishlists, comparisons, reviews

## 📚 Resources

- **Symfony Documentation**: https://symfony.com/doc
- **Twig Documentation**: https://twig.symfony.com/doc
- **GSAP Documentation**: https://greensock.com/docs/
- **Alpine.js**: https://alpinejs.dev/

## 💬 Need Help?

Check the main `README.md` for:
- Complete project structure
- Technology stack details
- Design system documentation
- Feature explanations

---

**Happy Coding! 🎮**
