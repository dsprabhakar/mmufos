document.addEventListener('DOMContentLoaded', () => {
  const header = document.getElementById('header');
  const navToggle = document.getElementById('navToggle');
  const navLinks = document.getElementById('navLinks');

  window.addEventListener('scroll', () => {
    header.classList.toggle('scrolled', window.scrollY > 50);
  });

  navToggle.addEventListener('click', () => {
    navToggle.classList.toggle('active');
    navLinks.classList.toggle('active');
  });

  navLinks.querySelectorAll('a').forEach(link => {
    link.addEventListener('click', () => {
      navToggle.classList.remove('active');
      navLinks.classList.remove('active');
    });
  });

  const propertySubItems = {
    'marina-bay': [
      { label: 'Tower A - Ground Floor', value: 'marina-a-gf' },
      { label: 'Tower A - 1st Floor', value: 'marina-a-1f' },
      { label: 'Tower B - Ground Floor', value: 'marina-b-gf' },
      { label: 'Tower B - 1st Floor', value: 'marina-b-1f' },
      { label: 'Commercial Space', value: 'marina-comm' }
    ],
    'adyar-grand': [
      { label: 'Block 1 - Retail', value: 'adyar-b1-retail' },
      { label: 'Block 1 - Office', value: 'adyar-b1-office' },
      { label: 'Block 2 - Retail', value: 'adyar-b2-retail' },
      { label: 'Block 2 - Office', value: 'adyar-b2-office' }
    ],
    'tnagar-heritage': [
      { label: 'Ground Floor - Showroom', value: 'tnagar-gf-show' },
      { label: '1st Floor - Office', value: 'tnagar-1f-office' },
      { label: '2nd Floor - Co-working', value: 'tnagar-2f-cowork' }
    ],
    'velachery-prime': [
      { label: 'Wing A - Retail', value: 'vel-a-retail' },
      { label: 'Wing A - Office', value: 'vel-a-office' },
      { label: 'Wing B - Retail', value: 'vel-b-retail' },
      { label: 'Wing B - Office', value: 'vel-b-office' },
      { label: 'Food Court Space', value: 'vel-food' }
    ],
    'anna-nagar': [
      { label: 'Penthouse Level', value: 'anna-pent' },
      { label: 'Mid Floors - Residential', value: 'anna-mid-res' },
      { label: 'Lower Floors - Commercial', value: 'anna-low-comm' },
      { label: 'Basement - Parking', value: 'anna-park' }
    ]
  };

  const productSubItems = {
    'laptop': [
      { label: '14" Standard', value: 'laptop-14' },
      { label: '15.6" Performance', value: 'laptop-15' },
      { label: '16" Premium', value: 'laptop-16' },
      { label: '13" Ultrabook', value: 'laptop-13' }
    ],
    'desktop': [
      { label: 'Tower - Entry', value: 'desktop-entry' },
      { label: 'Tower - Mid Range', value: 'desktop-mid' },
      { label: 'Tower - High Performance', value: 'desktop-high' },
      { label: 'Workstation', value: 'desktop-ws' }
    ],
    'all-in-one': [
      { label: '24" Display', value: 'aio-24' },
      { label: '27" Display', value: 'aio-27' },
      { label: '32" Display', value: 'aio-32' }
    ],
    'mini-pc': [
      { label: 'Compact - Basic', value: 'mini-basic' },
      { label: 'Compact - Pro', value: 'mini-pro' },
      { label: 'Stick PC', value: 'mini-stick' },
      { label: 'NUC Style', value: 'mini-nuc' }
    ]
  };

  const jewelSubItems = {
    'chains': [
      { label: 'Gold Chain', value: 'chain-gold' },
      { label: 'Silver Chain', value: 'chain-silver' },
      { label: 'Platinum Chain', value: 'chain-platinum' },
      { label: 'Diamond Chain', value: 'chain-diamond' }
    ],
    'bracelets': [
      { label: 'Gold Bracelet', value: 'bracelet-gold' },
      { label: 'Silver Bracelet', value: 'bracelet-silver' },
      { label: 'Diamond Bracelet', value: 'bracelet-diamond' },
      { label: 'Charm Bracelet', value: 'bracelet-charm' }
    ],
    'earrings': [
      { label: 'Stud Earrings', value: 'earring-stud' },
      { label: 'Hoop Earrings', value: 'earring-hoop' },
      { label: 'Drop Earrings', value: 'earring-drop' },
      { label: 'Jhumka', value: 'earring-jhumka' }
    ],
    'bangles': [
      { label: 'Gold Bangles', value: 'bangle-gold' },
      { label: 'Diamond Bangles', value: 'bangle-diamond' },
      { label: 'Antique Bangles', value: 'bangle-antique' },
      { label: 'Kada', value: 'bangle-kada' }
    ],
    'rings': [
      { label: 'Solitaire Ring', value: 'ring-solitaire' },
      { label: 'Band Ring', value: 'ring-band' },
      { label: 'Cocktail Ring', value: 'ring-cocktail' },
      { label: 'Eternity Ring', value: 'ring-eternity' }
    ]
  };

  const propertyDetails = {
    'marina-bay': { name: 'Marina Bay Towers', location: 'OMR, Chennai', rate: '₹2,500/sq ft', available: '450 sq ft', type: 'Mixed Use' },
    'adyar-grand': { name: 'Adyar Grand Square', location: 'Adyar, Chennai', rate: '₹3,200/sq ft', available: '320 sq ft', type: 'Commercial' },
    'tnagar-heritage': { name: 'T. Nagar Heritage Hub', location: 'T. Nagar, Chennai', rate: '₹4,100/sq ft', available: '600 sq ft', type: 'Heritage Commercial' },
    'velachery-prime': { name: 'Velachery Prime Plaza', location: 'Velachery, Chennai', rate: '₹2,800/sq ft', available: '520 sq ft', type: 'Retail & Office' },
    'anna-nagar': { name: 'Anna Nagar Sky Residences', location: 'Anna Nagar, Chennai', rate: '₹3,600/sq ft', available: '380 sq ft', type: 'Residential & Commercial' }
  };

  let selectedProperty = null;
  let selectedPropertySub = null;
  let selectedProduct = null;
  let selectedProductSub = null;
  let selectedJewel = null;
  let selectedJewelSub = null;

  function setupDropdown(triggerId, listId, onSelect) {
    const trigger = document.getElementById(triggerId);
    const list = document.getElementById(listId);

    trigger.addEventListener('click', (e) => {
      e.stopPropagation();
      document.querySelectorAll('.cascade-list.open').forEach(l => {
        if (l !== list) l.classList.remove('open');
      });
      document.querySelectorAll('.cascade-trigger.open').forEach(t => {
        if (t !== trigger) t.classList.remove('open');
      });
      trigger.classList.toggle('open');
      list.classList.toggle('open');
    });

    list.querySelectorAll('li').forEach(item => {
      item.addEventListener('click', (e) => {
        e.stopPropagation();
        list.querySelectorAll('li').forEach(i => i.classList.remove('selected'));
        item.classList.add('selected');
        trigger.classList.remove('open');
        list.classList.remove('open');
        onSelect(item);
      });
    });
  }

  function setupSubDropdown(triggerId, listId, onSelect) {
    const triggerEl = document.querySelector(`#${triggerId}`).closest('.cascade-sub').querySelector('.sub-trigger');
    const list = document.getElementById(listId);

    triggerEl.addEventListener('click', (e) => {
      e.stopPropagation();
      document.querySelectorAll('.cascade-list.open').forEach(l => {
        if (l !== list) l.classList.remove('open');
      });
      document.querySelectorAll('.cascade-trigger.open').forEach(t => {
        if (t !== triggerEl) t.classList.remove('open');
      });
      triggerEl.classList.toggle('open');
      list.classList.toggle('open');
    });
  }

  function populateSubList(listId, items, subContainerId, selectedLabelId, onItemClick) {
    const list = document.getElementById(listId);
    const container = document.getElementById(subContainerId);
    const label = document.getElementById(selectedLabelId);

    list.innerHTML = '';
    items.forEach(item => {
      const li = document.createElement('li');
      li.textContent = item.label;
      li.dataset.value = item.value;
      li.addEventListener('click', (e) => {
        e.stopPropagation();
        list.querySelectorAll('li').forEach(i => i.classList.remove('selected'));
        li.classList.add('selected');
        label.textContent = item.label;
        list.classList.remove('open');
        container.querySelector('.sub-trigger').classList.remove('open');
        if (onItemClick) onItemClick(item);
      });
      list.appendChild(li);
    });

    container.classList.add('visible');
    label.textContent = 'Select...';
  }

  function updateSelectionDisplay() {
    const card = document.getElementById('selectionCard');
    const title = document.getElementById('selectionTitle');
    const details = document.getElementById('selectionDetails');

    if (!selectedProperty) {
      title.textContent = 'Select a property and product to view details';
      details.innerHTML = '';
      return;
    }

    const prop = propertyDetails[selectedProperty];
    title.textContent = prop.name;

    let html = `
      <div class="detail-item">
        <div class="detail-label">Location</div>
        <div class="detail-value">${prop.location}</div>
      </div>
      <div class="detail-item">
        <div class="detail-label">Rate</div>
        <div class="detail-value">${prop.rate}</div>
      </div>
      <div class="detail-item">
        <div class="detail-label">Available Space</div>
        <div class="detail-value">${prop.available}</div>
      </div>
      <div class="detail-item">
        <div class="detail-label">Property Type</div>
        <div class="detail-value">${prop.type}</div>
      </div>
    `;

    if (selectedPropertySub) {
      html += `
        <div class="detail-item">
          <div class="detail-label">Selected Section</div>
          <div class="detail-value">${selectedPropertySub}</div>
        </div>
      `;
    }

    if (selectedProduct) {
      html += `
        <div class="detail-item">
          <div class="detail-label">Product</div>
          <div class="detail-value">${selectedProduct}</div>
        </div>
      `;
    }

    if (selectedProductSub) {
      html += `
        <div class="detail-item">
          <div class="detail-label">Product Option</div>
          <div class="detail-value">${selectedProductSub}</div>
        </div>
      `;
    }

    if (selectedJewel) {
      html += `
        <div class="detail-item">
          <div class="detail-label">Jewellery</div>
          <div class="detail-value">${selectedJewel}</div>
        </div>
      `;
    }

    if (selectedJewelSub) {
      html += `
        <div class="detail-item">
          <div class="detail-label">Jewellery Option</div>
          <div class="detail-value">${selectedJewelSub}</div>
        </div>
      `;
    }

    details.innerHTML = html;
  }

  setupDropdown('propertiesTrigger', 'propertiesList', (item) => {
    const key = item.dataset.property;
    selectedProperty = key;
    selectedPropertySub = null;
    document.getElementById('propertiesSelected').textContent = item.textContent;

    if (propertySubItems[key]) {
      populateSubList('propertySubList', propertySubItems[key], 'propertySub', 'propertySubSelected', (subItem) => {
        selectedPropertySub = subItem.label;
        updateSelectionDisplay();
      });
    }

    updateSelectionDisplay();
  });

  setupDropdown('productsTrigger', 'productsList', (item) => {
    const key = item.dataset.product;
    selectedProduct = item.textContent;
    selectedProductSub = null;
    document.getElementById('productsSelected').textContent = item.textContent;

    if (productSubItems[key]) {
      populateSubList('productSubList', productSubItems[key], 'productSub', 'productSubSelected', (subItem) => {
        selectedProductSub = subItem.label;
        updateSelectionDisplay();
      });
    }

    updateSelectionDisplay();
  });

  setupDropdown('jewelsTrigger', 'jewelsList', (item) => {
    const key = item.dataset.jewel;
    selectedJewel = item.textContent;
    selectedJewelSub = null;
    document.getElementById('jewelsSelected').textContent = item.textContent;

    if (jewelSubItems[key]) {
      populateSubList('jewelSubList', jewelSubItems[key], 'jewelSub', 'jewelSubSelected', (subItem) => {
        selectedJewelSub = subItem.label;
        updateSelectionDisplay();
      });
    }

    updateSelectionDisplay();
  });

  setupSubDropdown('propertySubSelected', 'propertySubList');
  setupSubDropdown('productSubSelected', 'productSubList');
  setupSubDropdown('jewelSubSelected', 'jewelSubList');

  document.addEventListener('click', () => {
    document.querySelectorAll('.cascade-list.open').forEach(l => l.classList.remove('open'));
    document.querySelectorAll('.cascade-trigger.open').forEach(t => t.classList.remove('open'));
  });
});
