/**
 * Product Filters Module
 * Handles product filtering, sorting, and search
 */

class ProductFilters {
  constructor() {
    this.filters = {
      category: [],
      platform: [],
      genre: [],
      priceRange: { min: 0, max: 100 },
      search: ''
    };
    this.sortBy = 'featured';
    this.viewMode = 'grid';
    this.init();
  }

  init() {
    this.attachEventListeners();
    this.initializeFilters();
  }

  attachEventListeners() {
    // Filter checkboxes
    document.addEventListener('change', (e) => {
      const filterCheckbox = e.target.closest('[data-filter]');
      if (filterCheckbox) {
        const { filterType, filterValue } = filterCheckbox.dataset;
        this.toggleFilter(filterType, filterValue, filterCheckbox.checked);
      }
    });

    // Filter tags
    document.addEventListener('click', (e) => {
      const filterTag = e.target.closest('[data-filter-tag]');
      if (filterTag) {
        e.preventDefault();
        const { filterType, filterValue } = filterTag.dataset;
        const isActive = filterTag.classList.contains('active');
        this.toggleFilter(filterType, filterValue, !isActive);
        filterTag.classList.toggle('active');
      }

      // Clear filters
      const clearBtn = e.target.closest('[data-clear-filters]');
      if (clearBtn) {
        e.preventDefault();
        this.clearFilters();
      }

      // Toggle mobile filters
      const mobileFiltersBtn = e.target.closest('[data-mobile-filters-toggle]');
      if (mobileFiltersBtn) {
        e.preventDefault();
        document.querySelector('.mobile-filters')?.classList.toggle('active');
      }

      // Close mobile filters
      const closeFiltersBtn = e.target.closest('[data-close-filters]');
      if (closeFiltersBtn) {
        e.preventDefault();
        document.querySelector('.mobile-filters')?.classList.remove('active');
      }

      // Apply mobile filters
      const applyFiltersBtn = e.target.closest('[data-apply-filters]');
      if (applyFiltersBtn) {
        e.preventDefault();
        this.applyFilters();
        document.querySelector('.mobile-filters')?.classList.remove('active');
      }

      // Sort dropdown
      const sortItem = e.target.closest('[data-sort]');
      if (sortItem) {
        e.preventDefault();
        this.sortBy = sortItem.dataset.sort;
        this.updateSortUI();
        this.applyFilters();
      }

      // View mode toggle
      const viewModeBtn = e.target.closest('[data-view-mode]');
      if (viewModeBtn) {
        e.preventDefault();
        this.viewMode = viewModeBtn.dataset.viewMode;
        this.updateViewMode();
      }

      // Collapsible filter groups
      const filterGroupTitle = e.target.closest('.filters__group-title');
      if (filterGroupTitle) {
        filterGroupTitle.classList.toggle('collapsed');
        const content = filterGroupTitle.nextElementSibling;
        content?.classList.toggle('collapsed');
      }
    });

    // Price range inputs
    document.addEventListener('input', (e) => {
      const minPriceInput = e.target.closest('[data-price-min]');
      const maxPriceInput = e.target.closest('[data-price-max]');

      if (minPriceInput) {
        this.filters.priceRange.min = parseFloat(minPriceInput.value);
        this.debounceFilter();
      }

      if (maxPriceInput) {
        this.filters.priceRange.max = parseFloat(maxPriceInput.value);
        this.debounceFilter();
      }

      // Search input
      const searchInput = e.target.closest('[data-product-search]');
      if (searchInput) {
        this.filters.search = searchInput.value.toLowerCase();
        this.debounceFilter();
      }
    });

    // Sort dropdown toggle
    const sortToggle = document.querySelector('.sort-dropdown__toggle');
    const sortMenu = document.querySelector('.sort-dropdown__menu');

    if (sortToggle && sortMenu) {
      sortToggle.addEventListener('click', (e) => {
        e.stopPropagation();
        sortMenu.classList.toggle('active');
      });

      document.addEventListener('click', () => {
        sortMenu.classList.remove('active');
      });
    }
  }

  initializeFilters() {
    // Get URL parameters if any
    const urlParams = new URLSearchParams(window.location.search);

    urlParams.forEach((value, key) => {
      if (Array.isArray(this.filters[key])) {
        this.filters[key] = value.split(',');
      } else if (key === 'search') {
        this.filters.search = value;
      }
    });

    this.applyFilters();
  }

  toggleFilter(type, value, isActive) {
    if (!this.filters[type]) {
      this.filters[type] = [];
    }

    if (isActive) {
      if (!this.filters[type].includes(value)) {
        this.filters[type].push(value);
      }
    } else {
      this.filters[type] = this.filters[type].filter(v => v !== value);
    }

    this.applyFilters();
  }

  clearFilters() {
    this.filters = {
      category: [],
      platform: [],
      genre: [],
      priceRange: { min: 0, max: 100 },
      search: ''
    };

    // Reset UI
    document.querySelectorAll('[data-filter]').forEach(checkbox => {
      checkbox.checked = false;
    });

    document.querySelectorAll('[data-filter-tag]').forEach(tag => {
      tag.classList.remove('active');
    });

    const searchInput = document.querySelector('[data-product-search]');
    if (searchInput) searchInput.value = '';

    const minPriceInput = document.querySelector('[data-price-min]');
    const maxPriceInput = document.querySelector('[data-price-max]');
    if (minPriceInput) minPriceInput.value = 0;
    if (maxPriceInput) maxPriceInput.value = 100;

    this.applyFilters();
  }

  applyFilters() {
    const products = document.querySelectorAll('[data-product]');
    let visibleCount = 0;

    products.forEach(product => {
      const productData = JSON.parse(product.dataset.product);
      const isVisible = this.shouldShowProduct(productData);

      if (isVisible) {
        product.style.display = '';
        visibleCount++;
      } else {
        product.style.display = 'none';
      }
    });

    // Update results count
    this.updateResultsCount(visibleCount);

    // Sort products
    this.sortProducts();

    // Update URL
    this.updateURL();
  }

  shouldShowProduct(product) {
    // Check category filter
    if (this.filters.category.length > 0 && !this.filters.category.includes(product.category)) {
      return false;
    }

    // Check platform filter
    if (this.filters.platform.length > 0 && !this.filters.platform.includes(product.platform)) {
      return false;
    }

    // Check genre filter
    if (this.filters.genre.length > 0) {
      const hasGenre = this.filters.genre.some(genre => product.genres?.includes(genre));
      if (!hasGenre) return false;
    }

    // Check price range
    if (product.price < this.filters.priceRange.min || product.price > this.filters.priceRange.max) {
      return false;
    }

    // Check search
    if (this.filters.search) {
      const searchTerm = this.filters.search.toLowerCase();
      const titleMatch = product.title.toLowerCase().includes(searchTerm);
      const descMatch = product.description?.toLowerCase().includes(searchTerm);

      if (!titleMatch && !descMatch) return false;
    }

    return true;
  }

  sortProducts() {
    const container = document.querySelector('.product-grid');
    if (!container) return;

    const products = Array.from(container.querySelectorAll('[data-product]'));

    products.sort((a, b) => {
      const dataA = JSON.parse(a.dataset.product);
      const dataB = JSON.parse(b.dataset.product);

      switch (this.sortBy) {
        case 'price-asc':
          return dataA.price - dataB.price;
        case 'price-desc':
          return dataB.price - dataA.price;
        case 'name-asc':
          return dataA.title.localeCompare(dataB.title);
        case 'name-desc':
          return dataB.title.localeCompare(dataA.title);
        case 'newest':
          return new Date(dataB.releaseDate) - new Date(dataA.releaseDate);
        case 'rating':
          return (dataB.rating || 0) - (dataA.rating || 0);
        default: // 'featured'
          return (dataB.featured || 0) - (dataA.featured || 0);
      }
    });

    products.forEach(product => container.appendChild(product));
  }

  updateResultsCount(count) {
    const resultsElement = document.querySelector('[data-results-count]');
    if (resultsElement) {
      resultsElement.textContent = count;
    }
  }

  updateSortUI() {
    const sortItems = document.querySelectorAll('[data-sort]');
    sortItems.forEach(item => {
      if (item.dataset.sort === this.sortBy) {
        item.classList.add('active');
      } else {
        item.classList.remove('active');
      }
    });

    const sortToggle = document.querySelector('.sort-dropdown__toggle');
    if (sortToggle) {
      const activeItem = document.querySelector(`[data-sort="${this.sortBy}"]`);
      if (activeItem) {
        sortToggle.childNodes[0].textContent = activeItem.textContent;
      }
    }
  }

  updateViewMode() {
    const viewModeButtons = document.querySelectorAll('[data-view-mode]');
    const productGrid = document.querySelector('.product-grid');

    viewModeButtons.forEach(btn => {
      if (btn.dataset.viewMode === this.viewMode) {
        btn.classList.add('active');
      } else {
        btn.classList.remove('active');
      }
    });

    if (productGrid) {
      if (this.viewMode === 'list') {
        productGrid.classList.add('product-grid--list');
      } else {
        productGrid.classList.remove('product-grid--list');
      }
    }
  }

  updateURL() {
    const params = new URLSearchParams();

    Object.keys(this.filters).forEach(key => {
      if (Array.isArray(this.filters[key]) && this.filters[key].length > 0) {
        params.set(key, this.filters[key].join(','));
      } else if (key === 'search' && this.filters[key]) {
        params.set(key, this.filters[key]);
      }
    });

    if (this.sortBy !== 'featured') {
      params.set('sort', this.sortBy);
    }

    const newURL = params.toString() ? `?${params.toString()}` : window.location.pathname;
    window.history.replaceState({}, '', newURL);
  }

  debounceFilter = (() => {
    let timeout;
    return () => {
      clearTimeout(timeout);
      timeout = setTimeout(() => this.applyFilters(), 300);
    };
  })();
}

// Initialize filters if we're on products page
if (document.querySelector('.products-page')) {
  const productFilters = new ProductFilters();
  window.ProductFilters = productFilters;
}

export default ProductFilters;
