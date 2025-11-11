/**
 * Theme Switcher Module
 * Handles light/dark mode switching with localStorage persistence
 * @module ThemeSwitcher
 */

/**
 * ThemeSwitcher class for managing theme switching
 * @class ThemeSwitcher
 */
class ThemeSwitcher {
  /**
   * Creates a new ThemeSwitcher instance
   * @constructor
   */
  constructor() {
    this.theme = this.loadTheme();
    this.init();
  }

  /**
   * Initialize the theme switcher
   * @private
   */
  init() {
    this.applyTheme(this.theme);
    this.attachEventListeners();
  }

  /**
   * Load theme preference from localStorage
   * @private
   * @returns {string} The saved theme or 'dark' as default
   */
  loadTheme() {
    const saved = localStorage.getItem('gta6_theme');
    return saved || 'dark'; // default to dark
  }

  /**
   * Save theme preference to localStorage
   * @private
   * @param {string} theme - The theme to save ('light' or 'dark')
   */
  saveTheme(theme) {
    localStorage.setItem('gta6_theme', theme);
    this.theme = theme;
  }

  /**
   * Apply a theme to the document
   * @private
   * @param {string} theme - The theme to apply ('light' or 'dark')
   */
  applyTheme(theme) {
    document.documentElement.setAttribute('data-theme', theme);
    this.updateToggleUI();

    // Dispatch custom event for other components to react
    window.dispatchEvent(new CustomEvent('theme:changed', {
      detail: { theme }
    }));
  }

  /**
   * Toggle between light and dark themes
   * @public
   */
  toggleTheme() {
    const newTheme = this.theme === 'dark' ? 'light' : 'dark';
    this.saveTheme(newTheme);
    this.applyTheme(newTheme);

    // Add animation class
    document.body.classList.add('theme-transitioning');
    setTimeout(() => {
      document.body.classList.remove('theme-transitioning');
    }, 300);
  }

  /**
   * Update the theme toggle button UI
   * @private
   */
  updateToggleUI() {
    const toggles = document.querySelectorAll('[data-theme-toggle]');
    toggles.forEach(toggle => {
      const icon = toggle.querySelector('[data-theme-icon]');
      if (icon) {
        icon.textContent = this.theme === 'dark' ? '☀️' : '🌙';
      }

      toggle.setAttribute('aria-label', `Switch to ${this.theme === 'dark' ? 'light' : 'dark'} mode`);
      toggle.setAttribute('title', `Switch to ${this.theme === 'dark' ? 'light' : 'dark'} mode`);
    });
  }

  /**
   * Attach event listeners for theme switching
   * @private
   */
  attachEventListeners() {
    // Theme toggle buttons
    document.addEventListener('click', (e) => {
      const toggle = e.target.closest('[data-theme-toggle]');
      if (toggle) {
        e.preventDefault();
        this.toggleTheme();
      }
    });

    // Listen for system theme changes (optional)
    if (window.matchMedia) {
      const mediaQuery = window.matchMedia('(prefers-color-scheme: dark)');
      mediaQuery.addEventListener('change', (e) => {
        if (!localStorage.getItem('gta6_theme')) {
          // Only auto-switch if user hasn't manually chosen
          this.applyTheme(e.matches ? 'dark' : 'light');
        }
      });
    }
  }

  /**
   * Get the current theme
   * @public
   * @returns {string} The current theme ('light' or 'dark')
   */
  getCurrentTheme() {
    return this.theme;
  }
}

// Initialize theme switcher
const themeSwitcher = new ThemeSwitcher();

// Make globally available
window.ThemeSwitcher = themeSwitcher;

export default themeSwitcher;
