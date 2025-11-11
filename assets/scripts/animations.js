/**
 * GSAP Animations Module
 * Handles scroll animations and interactive effects using GSAP and ScrollTrigger
 * @module Animations
 */

import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

/**
 * Animations class for managing all page animations
 * @class Animations
 */
class Animations {
  /**
   * Creates a new Animations instance and initializes all animations
   * @constructor
   */
  constructor() {
    this.init();
  }

  /**
   * Initialize all animation modules
   * @private
   */
  init() {
    // Temporarily disabled scroll animations to fix opacity issues
    // this.initScrollAnimations();
    this.initNavbarScroll();
    this.initBackToTop();
    this.initProductCards();
    this.initCounters();
    // this.initParallax();
  }

  /**
   * Initialize scroll-triggered animations
   * Only animate elements that are below the fold
   * @private
   */
  initScrollAnimations() {
    // Helper function to check if element is in viewport
    const isInViewport = (element) => {
      const rect = element.getBoundingClientRect();
      return rect.top < window.innerHeight * 0.8 && rect.bottom > 0;
    };

    // Fade in elements on scroll
    const fadeElements = document.querySelectorAll('.fade-in-scroll');
    fadeElements.forEach(element => {
      // Only animate if element is NOT already visible
      if (!isInViewport(element)) {
        gsap.from(element, {
          opacity: 0,
          y: 50,
          duration: 0.8,
          ease: 'power3.out',
          scrollTrigger: {
            trigger: element,
            start: 'top 80%',
            toggleActions: 'play none none none'
          }
        });
      }
      // If already visible, do nothing (no animation)
    });

    // Slide in from left
    const slideLeftElements = document.querySelectorAll('.slide-in-left');
    slideLeftElements.forEach(element => {
      if (!isInViewport(element)) {
        gsap.from(element, {
          opacity: 0,
          x: -100,
          duration: 0.8,
          ease: 'power3.out',
          scrollTrigger: {
            trigger: element,
            start: 'top 80%',
            toggleActions: 'play none none none'
          }
        });
      }
    });

    // Slide in from right
    const slideRightElements = document.querySelectorAll('.slide-in-right');
    slideRightElements.forEach(element => {
      if (!isInViewport(element)) {
        gsap.from(element, {
          opacity: 0,
          x: 100,
          duration: 0.8,
          ease: 'power3.out',
          scrollTrigger: {
            trigger: element,
            start: 'top 80%',
            toggleActions: 'play none none none'
          }
        });
      }
    });

    // Scale in elements
    const scaleElements = document.querySelectorAll('.scale-in-scroll');
    scaleElements.forEach(element => {
      if (!isInViewport(element)) {
        gsap.from(element, {
          opacity: 0,
          scale: 0.8,
          duration: 0.6,
          ease: 'back.out(1.7)',
          scrollTrigger: {
            trigger: element,
            start: 'top 80%',
            toggleActions: 'play none none none'
          }
        });
      }
    });

    // Stagger children - only animate if NOT in viewport
    const staggerContainers = document.querySelectorAll('.stagger-container');
    staggerContainers.forEach(container => {
      const children = container.querySelectorAll('.stagger-item');

      if (!isInViewport(container)) {
        // Animate on scroll only
        gsap.from(children, {
          opacity: 0,
          y: 30,
          duration: 0.6,
          ease: 'power3.out',
          stagger: 0.1,
          scrollTrigger: {
            trigger: container,
            start: 'top 80%',
            toggleActions: 'play none none none'
          }
        });
      }
      // If already visible, no animation - elements show normally
    });
  }

  initNavbarScroll() {
    const navbar = document.querySelector('.navbar');

    if (navbar) {
      ScrollTrigger.create({
        start: 'top -80',
        end: 99999,
        toggleClass: { className: 'scrolled', targets: navbar }
      });
    }
  }

  initBackToTop() {
    const backToTopBtn = document.querySelector('.back-to-top');

    if (backToTopBtn) {
      ScrollTrigger.create({
        start: 'top -300',
        end: 99999,
        toggleClass: { className: 'visible', targets: backToTopBtn },
        onUpdate: (self) => {
          gsap.to(backToTopBtn, {
            opacity: self.progress > 0.1 ? 1 : 0,
            duration: 0.3
          });
        }
      });

      backToTopBtn.addEventListener('click', () => {
        gsap.to(window, {
          scrollTo: { y: 0, autoKill: false },
          duration: 1,
          ease: 'power3.inOut'
        });
      });
    }
  }

  initProductCards() {
    const cards = document.querySelectorAll('.card');

    cards.forEach(card => {
      const image = card.querySelector('.card__image img');

      if (image) {
        card.addEventListener('mouseenter', () => {
          gsap.to(image, {
            scale: 1.1,
            duration: 0.4,
            ease: 'power2.out'
          });
        });

        card.addEventListener('mouseleave', () => {
          gsap.to(image, {
            scale: 1,
            duration: 0.4,
            ease: 'power2.out'
          });
        });
      }
    });
  }

  initCounters() {
    const counters = document.querySelectorAll('[data-counter]');

    counters.forEach(counter => {
      const target = parseInt(counter.dataset.counter, 10);
      const rect = counter.getBoundingClientRect();
      const isInViewport = rect.top < window.innerHeight && rect.bottom > 0;

      // If already visible, animate immediately
      if (isInViewport) {
        gsap.to(counter, {
          innerText: target,
          duration: 2,
          ease: 'power1.out',
          snap: { innerText: 1 },
          onUpdate: function() {
            counter.innerText = Math.ceil(this.targets()[0].innerText);
          }
        });
      } else {
        // Otherwise, animate on scroll
        ScrollTrigger.create({
          trigger: counter,
          start: 'top 80%',
          onEnter: () => {
            gsap.to(counter, {
              innerText: target,
              duration: 2,
              ease: 'power1.out',
              snap: { innerText: 1 },
              onUpdate: function() {
                counter.innerText = Math.ceil(this.targets()[0].innerText);
              }
            });
          },
          once: true
        });
      }
    });
  }

  initParallax() {
    const parallaxElements = document.querySelectorAll('[data-parallax]');

    parallaxElements.forEach(element => {
      const speed = element.dataset.parallax || 0.5;

      gsap.to(element, {
        yPercent: -50 * speed,
        ease: 'none',
        scrollTrigger: {
          trigger: element,
          start: 'top bottom',
          end: 'bottom top',
          scrub: true
        }
      });
    });
  }

  // Hero animation
  static animateHero() {
    const hero = document.querySelector('.hero');

    if (hero) {
      const title = hero.querySelector('.hero__title');
      const subtitle = hero.querySelector('.hero__subtitle');
      const actions = hero.querySelector('.hero__actions');
      const badge = hero.querySelector('.hero__badge');

      const tl = gsap.timeline({ defaults: { ease: 'power3.out' } });

      tl.from(badge, {
        opacity: 0,
        y: -30,
        duration: 0.6
      })
      .from(title, {
        opacity: 0,
        y: 50,
        duration: 0.8
      }, '-=0.3')
      .from(subtitle, {
        opacity: 0,
        y: 30,
        duration: 0.6
      }, '-=0.4')
      .from(actions, {
        opacity: 0,
        y: 30,
        duration: 0.6
      }, '-=0.3');
    }
  }

  // Page transition
  static pageTransition() {
    const content = document.querySelector('main');

    gsap.from(content, {
      opacity: 0,
      y: 20,
      duration: 0.6,
      ease: 'power3.out'
    });
  }

  // Product detail gallery animation
  static animateProductGallery() {
    const mainImage = document.querySelector('.product-detail__main-image');
    const thumbnails = document.querySelectorAll('.product-detail__thumbnails-item');

    if (mainImage && thumbnails.length > 0) {
      gsap.from(mainImage, {
        opacity: 0,
        scale: 0.9,
        duration: 0.6,
        ease: 'power3.out'
      });

      gsap.from(thumbnails, {
        opacity: 0,
        y: 20,
        duration: 0.4,
        stagger: 0.1,
        ease: 'power3.out',
        delay: 0.3
      });
    }
  }

  /**
   * Add ripple effect to all buttons
   * Creates a ripple animation on click
   * @static
   */
  static addRippleEffect() {
    const buttons = document.querySelectorAll('.btn');

    buttons.forEach(button => {
      button.addEventListener('click', function(e) {
        const rect = this.getBoundingClientRect();
        const x = e.clientX - rect.left;
        const y = e.clientY - rect.top;

        const ripple = document.createElement('span');
        ripple.className = 'btn__ripple';
        ripple.style.left = `${x}px`;
        ripple.style.top = `${y}px`;

        this.appendChild(ripple);

        // Remove after animation completes
        setTimeout(() => ripple.remove(), 600);
      });
    });
  }

  // Cart item animation
  static animateCartItem(element) {
    gsap.from(element, {
      opacity: 0,
      x: -20,
      duration: 0.3,
      ease: 'power2.out'
    });
  }

  static removeCartItem(element, callback) {
    gsap.to(element, {
      opacity: 0,
      x: 50,
      height: 0,
      marginBottom: 0,
      duration: 0.3,
      ease: 'power2.in',
      onComplete: callback
    });
  }
}

// Initialize animations
const animations = new Animations();

// Initialize hero animation on DOMContentLoaded
document.addEventListener('DOMContentLoaded', () => {
  // Temporarily disabled animations to fix opacity issues
  // Animations.animateHero();
  // Animations.pageTransition();
  Animations.addRippleEffect();

  // Check if we're on product detail page
  // if (document.querySelector('.product-detail')) {
  //   Animations.animateProductGallery();
  // }
});

// Listen for cart updates to animate items
window.addEventListener('cart:updated', () => {
  setTimeout(() => {
    const cartItems = document.querySelectorAll('.cart-item');
    cartItems.forEach((item, index) => {
      if (!item.dataset.animated) {
        Animations.animateCartItem(item);
        item.dataset.animated = 'true';
      }
    });
  }, 100);
});

export default Animations;
