# 🎮 GTA-6 Themed E-Commerce Prototype

A stunning, cyberpunk-inspired e-commerce platform for a gaming shop, built with Symfony, featuring a Vice City aesthetic with neon colors and modern UI/UX.

![Vice City E-Shop](https://img.shields.io/badge/Symfony-7.3-000000?style=for-the-badge&logo=symfony)
![Status](https://img.shields.io/badge/Status-Prototype-ff006e?style=for-the-badge)
![Frontend](https://img.shields.io/badge/Frontend-Only-00d9ff?style=for-the-badge)

## ✨ Features

### 🎨 **Professional Gaming Theme**
- **Cyberpunk Vice City Aesthetic**: Neon pink, purple, and blue color palette inspired by GTA-6
- **Responsive Design**: Fully optimized for desktop, tablet, and mobile devices
- **Smooth Animations**: GSAP-powered scroll animations and transitions
- **Modern UI Components**: Custom-designed cards, buttons, forms, and navigation

### 🛍️ **E-Commerce Functionality** (Frontend Only)
- **Homepage** with hero section, featured games, categories, and testimonials
- **Products Catalog** with advanced filtering and sorting
- **Product Detail Pages** with image galleries and reviews
- **Shopping Cart** with localStorage persistence
- **Checkout Flow** with multi-step process
- **User Account Pages** (Profile, Orders, Wishlist)
- **Authentication Pages** (Login, Register)

### 🚀 **Technical Highlights**
- **Symfony 7.3** framework
- **Twig** templating engine
- **SCSS** with BEM methodology
- **JavaScript ES6** modules
- **Alpine.js** for reactive components
- **GSAP** for animations
- **Swiper** for carousels
- **Webpack Encore** for asset management

## 📋 Requirements

- PHP 8.3 or higher
- Composer
- Node.js 16+ and npm
- Symfony CLI (optional, for local server)

## 🔧 Installation

1. **Clone or Navigate to the Project**
   ```bash
   cd gta6-eshop
   ```

2. **Install PHP Dependencies**
   ```bash
   composer install --ignore-platform-req=ext-iconv
   ```

3. **Install Node.js Dependencies**
   ```bash
   npm install
   ```

4. **Build Assets**
   ```bash
   # For development
   npm run dev

   # For production
   npm run build

   # Watch mode (auto-rebuild on changes)
   npm run watch
   ```

## 🚀 Running the Application

### Option 1: Using Symfony CLI (Recommended)
```bash
symfony serve
```
Then visit: `http://127.0.0.1:8000`

### Option 2: Using PHP Built-in Server
```bash
php -S 127.0.0.1:8000 -t public/
```
Then visit: `http://127.0.0.1:8000`

## 📁 Project Structure

```
gta6-eshop/
├── assets/                      # Frontend assets
│   ├── app.js                   # Main JavaScript entry
│   ├── scripts/                 # JavaScript modules
│   │   ├── cart.js              # Shopping cart logic
│   │   ├── animations.js        # GSAP animations
│   │   └── filters.js           # Product filtering
│   └── styles/                  # SCSS files
│       ├── app.scss             # Main stylesheet
│       ├── _variables.scss      # Design tokens
│       ├── _mixins.scss         # SCSS mixins
│       ├── _base.scss           # Base styles
│       ├── _utilities.scss      # Utility classes
│       ├── components/          # Component styles
│       │   ├── _navigation.scss
│       │   ├── _hero.scss
│       │   ├── _cards.scss
│       │   ├── _buttons.scss
│       │   ├── _forms.scss
│       │   ├── _cart.scss
│       │   └── _footer.scss
│       └── pages/               # Page-specific styles
│           ├── _home.scss
│           ├── _products.scss
│           ├── _product-detail.scss
│           ├── _checkout.scss
│           └── _account.scss
├── src/
│   └── Controller/
│       └── PageController.php   # Main controller with routes
├── templates/
│   ├── base.html.twig           # Base layout
│   ├── components/              # Reusable components
│   │   ├── _navigation.html.twig
│   │   └── _footer.html.twig
│   └── pages/                   # Page templates
│       └── home.html.twig
├── public/
│   ├── build/                   # Compiled assets (generated)
│   └── index.php                # Entry point
├── webpack.config.js            # Webpack Encore configuration
├── composer.json                # PHP dependencies
└── package.json                 # Node.js dependencies
```

## 🎨 Design System

### Color Palette
```scss
// Neon Vice City Colors
$color-neon-pink: #ff006e;
$color-neon-blue: #00d9ff;
$color-neon-purple: #b967ff;
$color-neon-orange: #ff8c00;
$color-neon-green: #00ff88;
$color-neon-yellow: #ffed4e;

// Dark Backgrounds
$color-bg-dark: #0a0a0f;
$color-bg-darker: #050508;
$color-bg-card: #1a1a2e;
```

### Typography
- **Headings**: Orbitron (Google Fonts)
- **Body**: Inter (Google Fonts)
- **Monospace**: JetBrains Mono

### Effects
- Neon glow effects on hover
- Smooth gradient transitions
- GSAP scroll animations
- Cyberpunk border effects
- Scanline overlays

## 🛣️ Available Routes

| Route | Description |
|-------|-------------|
| `/` | Homepage with hero, featured games, and testimonials |
| `/products` | Products catalog with filtering |
| `/product/{slug}` | Product detail page |
| `/cart` | Shopping cart |
| `/checkout` | Checkout process |
| `/checkout/success` | Order confirmation |
| `/account` | User profile |
| `/account/orders` | Order history |
| `/account/wishlist` | Wishlist |
| `/login` | Login page |
| `/register` | Registration page |

## 💡 Key Features Explained

### Shopping Cart
- **LocalStorage Persistence**: Cart data survives page refreshes
- **Real-time Updates**: Instant quantity changes and totals
- **Mini Cart**: Dropdown cart accessible from navigation
- **Add/Remove Items**: Full cart management

### Product Filtering
- **Category Filters**: Filter by game categories
- **Platform Filters**: PC, PlayStation, Xbox, Nintendo Switch
- **Genre Tags**: Multiple genre selections
- **Price Range**: Min/max price filtering
- **Search**: Real-time product search
- **Sorting**: By price, name, rating, release date

### Animations
- **Hero Animations**: Sequenced fade-in effects
- **Scroll Triggers**: Elements animate on scroll
- **Card Hovers**: Smooth image zoom and glow effects
- **Page Transitions**: Fade transitions between pages
- **Button Ripples**: Material Design-inspired click effects

## 🎯 Technologies Used

### Backend
- **Symfony 7.3** - PHP framework
- **Twig** - Template engine
- **Composer** - Dependency manager

### Frontend
- **SCSS** - CSS preprocessor
- **JavaScript ES6** - Modern JavaScript
- **Alpine.js** - Lightweight reactive framework
- **GSAP** - Animation library
- **Swiper** - Touch slider
- **Webpack Encore** - Asset bundler

### Development Tools
- **Symfony Webpack Encore** - Asset management
- **Sass Loader** - SCSS compilation
- **Babel** - JavaScript transpilation

## 🔒 Important Notes

### Frontend Only Prototype
This is a **frontend-only prototype** designed to showcase the UI/UX and design system. Key points:

- ✅ All pages are accessible and functional
- ✅ Shopping cart works with localStorage
- ✅ Filtering and sorting work client-side
- ✅ Animations and interactions are fully functional
- ❌ No actual database backend
- ❌ No real payment processing
- ❌ Demo data is hardcoded in the controller

### Demo Data
All products, categories, and user data are simulated through the `PageController.php` file. This makes it easy to customize or extend for demonstration purposes.

## 🎨 Customization

### Changing Colors
Edit `assets/styles/_variables.scss` to customize the color scheme:

```scss
// Change primary neon color
$color-neon-pink: #your-color;
```

### Adding New Pages
1. Create a new route in `src/Controller/PageController.php`
2. Create a new Twig template in `templates/pages/`
3. (Optional) Add page-specific styles in `assets/styles/pages/`

### Modifying Animations
Edit `assets/scripts/animations.js` to customize GSAP animations and scroll triggers.

## 📸 Screenshots

The prototype includes:
- 🏠 **Homepage**: Hero section, featured games, categories, testimonials
- 🎮 **Products**: Advanced filtering and grid layout
- 📦 **Product Details**: Image galleries and reviews section
- 🛒 **Shopping Cart**: Dynamic cart with localStorage
- 💳 **Checkout**: Multi-step checkout flow
- 👤 **Account**: Profile, orders, wishlist pages

## 🚀 Performance

- **Optimized SCSS**: Modular architecture with code splitting
- **Lazy Loading**: Images and components load on demand
- **Minified Assets**: Production builds are optimized
- **GSAP Optimizations**: Hardware-accelerated animations
- **Responsive Images**: Adaptive sizing for different devices

## 🤝 Contributing

This is a prototype project. Feel free to fork and customize for your own needs!

## 📝 License

This project is created for demonstration purposes.

## 🙏 Acknowledgments

- Inspired by GTA-6 and Vice City aesthetics
- Built with Symfony and modern frontend technologies
- Designed with love for gaming culture

---

**Made with 🎮 and Claude Code By Sami El Alami Trebki**

For questions or support, please refer to the Symfony documentation at [symfony.com](https://symfony.com)
