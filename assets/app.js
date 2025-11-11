/*
 * GTA-6 E-Shop - Main JavaScript Entry Point
 * A cyberpunk-themed gaming e-commerce platform
 */

// Import main SCSS
import './styles/app.scss';

// Import libraries
import Alpine from 'alpinejs';
import Swiper from 'swiper';
import { Navigation, Pagination, Autoplay, EffectFade } from 'swiper/modules';
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';
import 'swiper/css/effect-fade';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

// Register GSAP plugins
gsap.registerPlugin(ScrollTrigger);

// Initialize Alpine.js
window.Alpine = Alpine;
Alpine.start();

// Make Swiper globally available
window.Swiper = Swiper;
window.gsap = gsap;

// Import custom scripts
import './scripts/theme-switcher.js';
import './scripts/cart.js';
import './scripts/animations.js';
import './scripts/filters.js';
