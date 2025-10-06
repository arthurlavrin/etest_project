// Catalog Filters Handler
(function () {
  let activeFilters = {
    category: [],
    color: [],
    size: [],
    salesStatus: []
  };

  // Initialize filters when DOM is loaded
  document.addEventListener('DOMContentLoaded', initFilters);

  function initFilters() {
    // Wait a bit for products-section.js to load
    setTimeout(setupAllFilters, 100);
  }

  function setupAllFilters() {
    setupToggleButton();
    setupFilterListeners();
    setupResetButton();
    setupMobileDropdowns();
  }

  function setupToggleButton() {
    const toggleBtn = document.getElementById('toggle-filters-btn');
    const filtersList = document.getElementById('filters-list');
    const resetBtn = document.getElementById('reset-filters-btn');

    if (toggleBtn && filtersList) {
      toggleBtn.addEventListener('click', () => handleToggleClick(filtersList, resetBtn, toggleBtn));
    }
  }

  function handleToggleClick(filtersList, resetBtn, toggleBtn) {
    const isVisible = filtersList.style.display !== 'none';

    if (isVisible) {
      filtersList.style.display = 'none';
      resetBtn.style.display = 'none';
      toggleBtn.classList.remove('active');
    } else {
      filtersList.style.display = 'flex';
      resetBtn.style.display = 'block';
      toggleBtn.classList.add('active');
    }
  }

  function setupFilterListeners() {
    // Get all filter checkboxes
    const filterCheckboxes = document.querySelectorAll('.filter-option input[type="checkbox"]');

    filterCheckboxes.forEach(checkbox => {
      checkbox.addEventListener('change', handleFilterChange);
    });
  }

  function setupResetButton() {
    const resetBtn = document.getElementById('reset-filters-btn');
    if (resetBtn) {
      resetBtn.addEventListener('click', resetAllFilters);
    }
  }

  function setupMobileDropdowns() {
    // Only add click handlers for mobile (< 769px)
    const filterToggles = document.querySelectorAll('.filter-toggle');

    filterToggles.forEach(toggle => {
      toggle.addEventListener('click', handleMobileToggleClick);
    });
  }

  function handleMobileToggleClick(e) {
    // Only handle clicks on mobile
    if (window.innerWidth < 769) {
      e.stopPropagation();
      const dropdown = this.nextElementSibling;
      const isActive = dropdown.classList.contains('active');

      // Close all dropdowns
      closeAllDropdowns();

      // Toggle current dropdown
      if (!isActive) {
        dropdown.classList.add('active');
        this.classList.add('active');
      }
    }
  }

  function closeAllDropdowns() {
    document.querySelectorAll('.filter-dropdown').forEach(d => {
      d.classList.remove('active');
    });
    document.querySelectorAll('.filter-toggle').forEach(t => {
      t.classList.remove('active');
    });
  }

  function handleFilterChange(e) {
    const filterType = e.target.name;
    const filterValue = e.target.value;
    const isChecked = e.target.checked;

    if (isChecked) {
      // Add filter
      if (!activeFilters[filterType].includes(filterValue)) {
        activeFilters[filterType].push(filterValue);
      }
    } else {
      // Remove filter
      activeFilters[filterType] = activeFilters[filterType].filter(v => v !== filterValue);
    }

    // Update filter toggle appearance
    updateFilterToggleAppearance(filterType);

    // Apply filters
    applyFilters();
  }

  function updateFilterToggleAppearance(filterType) {
    const filterItem = document.querySelector(`.filter-toggle[data-filter="${filterType}"]`);
    if (!filterItem) {return;}

    const hasActiveFilters = activeFilters[filterType].length > 0;

    if (hasActiveFilters) {
      filterItem.classList.add('active');
    } else {
      filterItem.classList.remove('active');
    }
  }

  function resetAllFilters() {
    // Clear active filters
    activeFilters = {
      category: [],
      color: [],
      size: [],
      salesStatus: []
    };

    // Uncheck all checkboxes
    uncheckAllFilters();

    // Remove active class from all toggles
    removeActiveFromToggles();

    // Apply filters (will show all products)
    applyFilters();
  }

  function uncheckAllFilters() {
    const filterCheckboxes = document.querySelectorAll('.filter-option input[type="checkbox"]');
    filterCheckboxes.forEach(checkbox => {
      checkbox.checked = false;
    });
  }

  function removeActiveFromToggles() {
    document.querySelectorAll('.filter-toggle').forEach(toggle => {
      toggle.classList.remove('active');
    });
  }

  function applyFilters() {
    // Dispatch custom event that products-section.js will listen to
    const event = new CustomEvent('filtersChanged', {
      detail: { filters: activeFilters }
    });
    document.dispatchEvent(event);
  }

  // Export for potential external use
  window.CatalogFilters = {
    getActiveFilters: () => activeFilters,
    resetFilters: resetAllFilters
  };
})();
