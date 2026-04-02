document.addEventListener('DOMContentLoaded', () => {

  const container = document.getElementById('product-container');
  const itemsCount = document.getElementById('items-count');

  const nutriFilter = document.getElementById('nutriFilter');
  const ecoFilter = document.getElementById('ecoFilter');
  const novaFilter = document.getElementById('novaFilter');
  const brandFilter = document.getElementById('brandFilter');

  const modal = document.getElementById('product-modal');
  const modalBody = document.getElementById('modal-body');
  const closeBtn = document.querySelector('.close-btn');

  const searchInput = document.getElementById('searchInput');

  let productsData = [];

  /* ---------- Helpers ---------- */
  function normalize(str) {
    return (str || '').toString().trim().toLowerCase();
  }

  function displayBrand(brandsField) {
    const raw = (brandsField || '').toString().trim();
    if (!raw) return '';
    return raw.split(',')[0].trim();
  }


  function escapeHTML(str) {
    const div = document.createElement('div');
    div.appendChild(document.createTextNode(str || ''));
    return div.innerHTML;
  }

  /* ---------- Fetch JSON ---------- */
  fetch('food-data.json')
    .then(res => res.json())
    .then(data => {
      productsData = data.filter(
        p => p.nutriscore_grade && normalize(p.nutriscore_grade) !== 'unknown'
      );

      populateBrandFilter(productsData);
      renderCards(productsData);
      applyFilters();
    })
    .catch(err => console.error('Failed to load food data:', err));

  /* ---------- Populate Brand Dropdown ---------- */
  function populateBrandFilter(products) {
    const brandSet = new Set();

    products.forEach(p => {
      const b = displayBrand(p.brands);
      if (b) brandSet.add(b);
    });

    const brands = Array.from(brandSet).sort((a, b) => a.localeCompare(b));

    brandFilter.innerHTML =
      `<option value="all" selected>All</option>` +
      brands.map(b => `<option value="${escapeHTML(b)}">${escapeHTML(b)}</option>`).join('');
  }

  /* ---------- Render Cards ---------- */
  function renderCards(products) {
    container.innerHTML = '';

    products.forEach(product => {
      const prodDiv = document.createElement('div');
      prodDiv.classList.add('foodx100-card');

      const brand = displayBrand(product.brands);

      prodDiv.dataset.nutriscore = product.nutriscore_grade || '';
      prodDiv.dataset.ecoscore = product.environmental_score_grade || '';
      prodDiv.dataset.nova = product.nova_group || '';
      prodDiv.dataset.brand = brand;
      prodDiv.dataset.category = product.categories || '';
      prodDiv.dataset.name = product.product_name || '';
      prodDiv.dataset.brands = product.brands || '';

      prodDiv.innerHTML = `
        <img src="${escapeHTML(product.image_url || 'assets/icons/placeholder.png')}"
             alt="${escapeHTML(product.product_name || 'Product')}"
             class="foodx100-image"
             onerror="this.src='assets/icons/placeholder.png'">
        <h3 class="foodx100-name">${escapeHTML(product.product_name || 'Unnamed product')}</h3>
        <div class="foodx100-badges">
          <span class="foodx100-nutriscore">Nutriscore: ${escapeHTML(product.nutriscore_grade || 'N/A')}</span>
          <span class="foodx100-environmental">Ecoscore: ${escapeHTML(product.environmental_score_grade || 'N/A')}</span>
          <span class="foodx100-nova">NOVA: ${escapeHTML(product.nova_group || 'N/A')}</span>
        </div>
      `;

      prodDiv.addEventListener('click', () => {
        modalBody.innerHTML = `
          <h2 id="modal-title">${escapeHTML(product.product_name || 'Unnamed product')}</h2>
          <img src="${escapeHTML(product.image_url || 'assets/icons/placeholder.png')}"
               alt="${escapeHTML(product.product_name || 'Product')}"
               class="foodx100-image"
               onerror="this.src='assets/icons/placeholder.png'">
          <p><b>Brand:</b> ${escapeHTML(brand || 'N/A')}</p>
          <p><b>Nutriscore:</b> ${escapeHTML(product.nutriscore_grade || 'N/A')}</p>
          <p><b>Ecoscore:</b> ${escapeHTML(product.environmental_score_grade || 'N/A')}</p>
          <p><b>NOVA Group:</b> ${escapeHTML(product.nova_group || 'N/A')}</p>
          <p><b>Ingredients:</b> ${escapeHTML(product.ingredients_text || 'N/A')}</p>
          <p><b>Quantity:</b> ${escapeHTML(product.quantity || 'N/A')}</p>
          <p><b>Categories:</b> ${escapeHTML(product.categories || 'N/A')}</p>
        `;
        modal.style.display = 'block';
      });

      container.appendChild(prodDiv);
    });
  }

  /* ---------- Modal Close ---------- */
  closeBtn.addEventListener('click', () => (modal.style.display = 'none'));
  window.addEventListener('click', e => {
    if (e.target === modal) modal.style.display = 'none';
  });

  window.addEventListener('keydown', e => {
    if (e.key === 'Escape' && modal.style.display === 'block') {
      modal.style.display = 'none';
    }
  });

  /* ---------- Apply Filters ---------- */
  function applyFilters() {
    const nutriValue = nutriFilter.value;
    const ecoValue = ecoFilter.value;
    const novaValue = novaFilter.value;
    const brandValue = brandFilter.value;

    const checkedCategories = Array.from(document.querySelectorAll('.categoryCheck:checked'))
      .map(cb => normalize(cb.value));

    const searchValue = normalize(searchInput.value);

    const cards = document.querySelectorAll('.foodx100-card');
    let visibleCount = 0;

    cards.forEach(card => {
      const nutri = normalize(card.dataset.nutriscore);
      const eco = normalize(card.dataset.ecoscore);
      const nova = (card.dataset.nova || '').toString();
      const brand = (card.dataset.brand || '').toString();
      const category = normalize(card.dataset.category);
      const name = normalize(card.dataset.name);
      const brandsFull = normalize(card.dataset.brands);

      let hide = false;

      if (nutriValue !== 'all' && nutri !== normalize(nutriValue)) hide = true;
      if (ecoValue !== 'all' && eco !== normalize(ecoValue)) hide = true;
      if (novaValue !== 'all' && nova !== novaValue) hide = true;
      if (brandValue !== 'all' && brand !== brandValue) hide = true;

      if (checkedCategories.length > 0) {
        const matchesCategory = checkedCategories.some(cat => category.includes(cat));
        if (!matchesCategory) hide = true;
      }

      if (searchValue) {
        const matchesSearch = name.includes(searchValue) || brandsFull.includes(searchValue);
        if (!matchesSearch) hide = true;
      }

      card.style.display = hide ? 'none' : 'flex';
      if (!hide) visibleCount++;
    });

    itemsCount.textContent = `${visibleCount} items shown`;
  }

  /* ---------- Hook Events ---------- */
  [nutriFilter, ecoFilter, novaFilter, brandFilter].forEach(select => {
    select.addEventListener('change', applyFilters);
  });

  document.querySelectorAll('.categoryCheck').forEach(box => {
    box.addEventListener('change', applyFilters);
  });

  searchInput.addEventListener('input', applyFilters);

})