console.log("✅ script.js loaded");

let selectedRole = null;
let cart = [];

// Scroll to section
function scrollToSection(id) {
  const section = document.getElementById(id);
  if (section) section.scrollIntoView({ behavior: 'smooth' });
}

// Scroll to top (Home button)
function scrollToTop() {
  const roleSection = document.getElementById('role');
  if (roleSection) {
    roleSection.scrollIntoView({ behavior: 'smooth' });
  }
}

// Role selection
function selectRole(role) {
  selectedRole = role;
  document.querySelector('.home-button').classList.remove('hide');

  if (role === 'Customer') {
    showCustomerOptions();
  } else if (role === 'Product Seller') {
    showProductSellerCategories();
  } else if (role === 'Service Provider') {
    showServiceProviderForm();
  }
}

// Customer options
function showCustomerOptions() {
  const main = document.getElementById('main-content');
  main.innerHTML = `
    <h1 class="fade-in">What are you looking for?</h1>
    <p class="fade-in">Select the type of service you need</p>
    <div class="role-grid">
      <div class="role-card slide-up" id="productCard">
        <h3>🛒 Products </h3>
        <p>Explore rural products</p>
      </div>
      <div class="role-card slide-up" id="serviceCard">
        <h3>🧰 Services </h3>
        <p>Find local services</p>
      </div>
    </div>
  `;
  main.scrollIntoView({ behavior: 'smooth', block: 'start' });

  document.getElementById('productCard').addEventListener('click', () => loadCustomerCategories('product'));
  document.getElementById('serviceCard').addEventListener('click', () => loadCustomerCategories('service'));
}

// Load all customer categories
function loadCustomerCategories(type) {
  const categories = [
    { icon: '💊', name: 'Health & Wellness' },
    { icon: '👩‍👧', name: 'Women & Child Development' },
    { icon: '💧', name: 'Water' },
    { icon: '🌱', name: 'Lifestyle for Environment (LiFE)' },
    { icon: '🎭', name: 'Cultural Pride' },
    { icon: '🪶', name: 'Tribal Empowerment' },
    { icon: '🧠', name: 'Future-Ready Skills' },
    { icon: '🤝', name: 'Local Community Problems / Others' }
  ];

  const main = document.getElementById('main-content');
  main.innerHTML = `
    <h1 class="fade-in">Select a Category</h1>
    <p class="fade-in">Choose from the available options</p>
    <div class="role-grid">
      ${categories.map(cat => `
        <div class="role-card slide-up" onclick="loadCategoryItems('${cat.name}', '${type}')">
          ${cat.icon} ${cat.name}
        </div>
      `).join('')}
    </div>
  `;
  main.scrollIntoView({ behavior: 'smooth', block: 'start' });
}

// Load items for selected category
function loadCategoryItems(category, type) {
  const main = document.getElementById('main-content');
  const items = getItemsByCategory(category, type);

  main.innerHTML = `
    <h1 class="fade-in">${category} – ${type === 'product' ? 'Products' : 'Services'}</h1>
    <div class="role-grid">
      ${items.map(item => `
        <div class="item-card slide-up" onclick="${type === 'product'
          ? `viewItemDetails('${item.name}', ${item.price}, '${item.image}')`
          : `viewServiceDetails('${item.name}', ${item.price}, '${item.image}')`}">
          <img src="${item.image}" class="item-image" />
          <h3>${item.name}</h3>
          <p>₹${item.price}</p>
        </div>
      `).join('')}
    </div>
  `;
}
function getItemsByCategory(category, type) {
  const items = {
    'Health & Wellness': {
      product: [
        { name: 'Herbal Immunity Mix', price: 120, image: 'images/herbal-mix.jpg' },
        { name: 'Ayurvedic Pain Balm', price: 85, image: 'images/pain-balm.jpg' },
        { name: 'Organic Soap', price: 60, image: 'images/organic-soap.jpg' }
      ],
      service: [
        { name: 'Home Physiotherapy', price: 300, image: 'images/physiotherapy.jpg' },
        { name: 'Ayurvedic Consultation', price: 250, image: 'images/consultation.jpg' },
        { name: 'Mobile Health Checkup', price: 500, image: 'images/health-check.jpg' }
      ]
    },
    'Women & Child Development': {
      product: [
        { name: 'Handwoven Baby Blanket', price: 250, image: 'images/baby-blanket.jpg' },
        { name: 'Natural Baby Oil', price: 180, image: 'images/baby-oil.jpg' },
        { name: 'Reusable Cloth Diapers', price: 200, image: 'images/diapers.jpg' }
      ],
      service: [
        { name: 'Child Nutrition Counseling', price: 200, image: 'images/nutrition.jpg' },
        { name: 'Maternal Yoga Class', price: 150, image: 'images/yoga.jpg' },
        { name: 'Anganwadi Support', price: 100, image: 'images/anganwadi.jpg' }
      ]
    },
    'Water': {
      product: [
        { name: '1L Bottled Water', price: 15, image: 'images/watter-bottle.jpg' },
        { name: '5L Mineral Water Can', price: 60, image: 'images/mineral-can.jpg' },
        { name: 'Copper Water Bottle', price: 350, image: 'images/copper-botle.jpg' }
      ],
      service: [
        { name: 'Water Tank Cleaning', price: 400, image: 'images/tank-cleaning.jpg' },
        { name: 'Water Supply Delivery', price: 50, image: 'images/water-deliver.jpg' },
        { name: 'Rainwater Harvesting Setup', price: 800, image: 'images/rain-water-harvest.jpg' }
      ]
    },
    'Lifestyle for Environment (LiFE)': {
      product: [
        { name: 'Bamboo Toothbrush', price: 40, image: 'images/bamboo-brush.jpg' },
        { name: 'Reusable Grocery Bags', price: 75, image: 'images/grocery-bag.jpg' },
        { name: 'Compost Kit', price: 300, image: 'images/compost-kit.jpg' }
      ],
      service: [
        { name: 'Compost Pit Installation', price: 600, image: 'images/compost-install.jpg' },
        { name: 'Eco Awareness Workshop', price: 300, image: 'images/eco-workshop.jpg' },
        { name: 'Tree Planting Service', price: 100, image: 'images/tree-planting.jpg' }
      ]
    },
    'Cultural Pride': {
      product: [
        { name: 'Terracotta Masks', price: 150, image: 'images/terracotta-mask.jpg' },
        { name: 'Tribal Jewelry Set', price: 220, image: 'images/tribal-jewelry.jpg' },
        { name: 'Hand-painted Wall Art', price: 400, image: 'images/wall-art.jpg' }
      ],
      service: [
        { name: 'Folk Dance Performance', price: 1000, image: 'images/folk-dance.jpg' },
        { name: 'Local Art Workshop', price: 350, image: 'images/art-workshop.jpg' },
        { name: 'Traditional Music Show', price: 800, image: 'images/music-show.jpg' }
      ]
    },
    'Tribal Empowerment': {
      product: [
        { name: 'Forest Honey (250g)', price: 180, image: 'images/forest-honey.jpg' },
        { name: 'Mahua Flower Tea', price: 90, image: 'images/mahua-tea.jpg' },
        { name: 'Handcrafted Basket', price: 250, image: 'images/basket.jpg' }
      ],
      service: [
        { name: 'Tribal Language Lessons', price: 200, image: 'images/language-lessons.jpg' },
        { name: 'Craft Training Session', price: 300, image: 'images/craft-training.jpg' },
        { name: 'Forest Tour Guide', price: 500, image: 'images/forest-tour.jpg' }
      ]
    },
    'Future-Ready Skills': {
      product: [
        { name: 'DIY Solar Lamp Kit', price: 320, image: 'images/solar-kit.jpg' },
        { name: 'Basic Coding Booklet', price: 150, image: 'images/coding-book.jpg' },
        { name: 'Math Puzzle Cards', price: 100, image: 'images/math-puzzle.jpg' }
      ],
      service: [
        { name: 'Digital Literacy Class', price: 250, image: 'images/digital-class.jpg' },
        { name: 'Basic Coding Workshop', price: 400, image: 'images/coding-workshop.jpg' },
        { name: 'Career Counseling', price: 300, image: 'images/counseling.jpg' }
      ]
    },
    'Local Community Problems / Others': {
      product: [
        { name: 'Mosquito Net', price: 180, image: 'images/mosquito-net.jpg' },
        { name: 'Emergency First Aid Kit', price: 350, image: 'images/first-aid.jpg' },
        { name: 'Water Purifier Straw', price: 120, image: 'images/purifier-straw.jpg' }
      ],
      service: [
        { name: 'Waste Collection Service', price: 150, image: 'images/waste-collection.jpg' },
        { name: 'Street Light Repair', price: 200, image: 'images/light-repair.jpg' },
        { name: 'Community Mediation', price: 100, image: 'images/mediation.jpg' }
      ]
    }
  };

  return items[category]?.[type] || [];
}

// Product detail view
function viewItemDetails(name, price, image) {
  const main = document.getElementById('main-content');
  main.innerHTML = `
    <div class="fade-in" style="text-align:center;">
      <img src="${image}" alt="${name}" class="item-image" />
      <h2>${name}</h2>
      <p>Price: ₹${price}</p>
  
    </div>
  `;
}

// Service detail view
function viewServiceDetails(name, price, image) {
  const main = document.getElementById('main-content');
  main.innerHTML = `
    <div class="fade-in" style="text-align:center;">
      <img src="${image}" alt="${name}" class="item-image" />
      <h2>${name}</h2>
      <p>Service Fee: ₹${price}</p>
      <button onclick="bookService('${name}', ${price})">
    </div>
  `;
}

// Product Seller flow
function showProductSellerCategories() {
  const main = document.getElementById('main-content');
  const categories = [
    'Health & Wellness',
    'Women & Child Development',
    'Water',
    'Lifestyle for Environment (LiFE)',
    'Cultural Pride',
    'Tribal Empowerment',
    'Future-Ready Skills',
    'Local Community Problems / Others'
  ];

  main.innerHTML = `
    <h1 class="fade-in">Select a Product Category</h1>
    <p class="fade-in">Choose one to add your product</p>
    <div class="role-grid">
      ${categories.map(cat => `
        <div class="role-card slide-up" data-category="${cat}">${cat}</div>
      `).join('')}
    </div>
    <div id="form-container"></div>
  `;
  main.scrollIntoView({ behavior: 'smooth', block: 'start' });

  document.querySelectorAll('.role-card').forEach(card => {
    card.addEventListener('click', () => {
      const category = card.getAttribute('data-category');
      showProductForm(category);
    });
  });
}

function showProductForm(category) {
  const formContainer = document.getElementById('form-container');
  formContainer.innerHTML = `
    <div class="fade-in" style="margin-top: 30px;">
      <h2>Add Product to ${category}</h2>
      <form id="productForm" class="slide-up">
        <label>Your Name:</label>
        <input type="text" id="sellerName" required>

        <label>Phone Number:</label>
        <input type="tel" id="sellerPhone" required pattern="[0-9]{10}" maxlength="10">

        <label>Product Name:</label>
        <input type="text" id="productName" required>

        <label>Price (₹):</label>
        <input type="number" id="productPrice" required>

        <label>Location:</label>
        <input type="text" id="productLocation" required>

        <label>Image URL:</label>
        <input type="text" id="productImage" placeholder="e.g. images/my-product.jpg">

        <label>Category:</label>
        <input type="text" id="productCategory" value="${category}" readonly style="background-color:#eee;">

        <button type="submit">Submit</button>
      </form>
    </div>
  `;

  document.getElementById('productForm').addEventListener('submit', (e) => {
    e.preventDefault();

    const sellerName = document.getElementById('sellerName').value;
    const sellerPhone = document.getElementById('sellerPhone').value;
    const name = document.getElementById('productName').value;
    const price = document.getElementById('productPrice').value;
    const location = document.getElementById('productLocation').value;
    const image = document.getElementById('productImage').value;

    console.log("✅ Product submitted:", {
      sellerName,
      sellerPhone,
      name,
      price,
      location,
      image,
      category
    });

    formContainer.innerHTML = `
      <p class="fade-in">✅ Thank you, ${sellerName}! Your product "<strong>${name}</strong>" has been submitted.</p>
      <p>📞 We may contact you at <strong>${sellerPhone}</strong> for verification.</p>
    `;
  });
}

// Service Provider flow
function showServiceProviderForm() {
  const main = document.getElementById('main-content');
  main.innerHTML = `
    <h1 class="fade-in">Service Provider Portal</h1>
    <p class="fade-in">Register your service to reach your local community</p>
    <form id="serviceForm" class="slide-up">
      <label>Your Name:</label>
      <input type="text" id="providerName" required>

      <label>Phone Number:</label>
      <input type="tel" id="providerPhone" required pattern="[0-9]{10}" maxlength="10">

      <label>Service Name:</label>
      <input type="text" id="serviceName" required>

      <label>Fee (₹):</label>
      <input type="number" id="serviceFee" required>

      <label>Location:</label>
      <input type="text" id="serviceLocation" required>

      <label>Contact Info:</label>
      <input type="text" id="serviceContact" required>

      <button type="submit">Submit</button>
    </form>
  `;
  main.scrollIntoView({ behavior: 'smooth', block: 'start' });

  document.getElementById('serviceForm').addEventListener('submit', (e) => {
    e.preventDefault();

    const providerName = document.getElementById('providerName').value;
    const providerPhone = document.getElementById('providerPhone').value;
    const serviceName = document.getElementById('serviceName').value;
    const fee = document.getElementById('serviceFee').value;
    const location = document.getElementById('serviceLocation').value;
    const contact = document.getElementById('serviceContact').value;

    console.log("✅ Service submitted:", {
      providerName,
      providerPhone,
      serviceName,
      fee,
      location,
      contact
    });

    main.innerHTML = `
      <p class="fade-in">✅ Thank you, ${providerName}! Your service "<strong>${serviceName}</strong>" has been registered.</p>
      <p>📞 We may contact you at <strong>${providerPhone}</strong> for verification.</p>
    `;
  });
}
function toggleMenu() {
  const menu = document.getElementById("menuDropdown");
  menu.style.display = menu.style.display === "block" ? "none" : "block";
}
const teamCredits = [
  {
    name: "SHRI BLJ SARAN",
    role: " CHIEF PATORN",
    image: "images/principal.jpg",
    description: "Our guiding light and inspiration — Shri BLJ Saran Sir has always encouraged innovation, discipline, and pride in our work. His leadership made this project possible."
  },
  {
    name: "PREM SIR",
    role: "PATORN",
    image: "images/prem.jpg",
    description: "From HTML to JavaScript, Prem Sir supported every step of development. His patience, clarity, and encouragement helped us turn ideas into reality."
  },
  {
    name: "ROUNAK CHAKRABORTY",
    role: "CEO",
    image: "images/rounak.jpg",
    description: "The core structure, design, and logic of this website were built by me — from layout to cart system, every detail reflects my dedication to rural innovation."
  },
  {
    name: "CHETAN KR MALLIK",
    role: "CFO",
    image: "images/chetan.jpg",
    description: "Chetan handled all image editing and visual polish. His creative touch brought life to every service card and team photo."
  },
  {
    name: "CHETTRI SIDDHARTH",
    role: "MANAGER",
    image: "images/siddhart.png",
    description: "Siddhart helped with everything — from testing features to organizing content. His teamwork and energy kept us moving forward."
  },
  {
    name: "SNEHITA",
    role: "TEAM LEADER",
    image: "",
    description: "Snehita has leaded the team by contributing everything as possible ."
  },
  {
    name: "NEERAJ",
    role: "TEAM MEMBER",
    image: "images/neeraj.png",
    description: "Neeraj contributed across the board — helping with layout decisions, content flow, and testing. A true team player."
  },
  {
    name: "ROHIT",
    role: "LEARNER",
    image: "",
    description: "ROHIT contributed across the board — helping with layout decisions, content flow, and testing. A true team player."
  },

    {
    name: "UTSAV",
    role: "LEARNER",
    image: "",
    description: "UTSAV has contributed in documentation"
  },

    {
    name: "GAGAN",
    role: "LEARNER",
    image: "",
    description: "GAGAN has contributed in documentation."
  },
    {
    name: "RANJAN",
    role: "LEARNER",
    image: "",
    description: "RANJAN has contributed in documentation."
  },
  {
    name: "SUDERSNAN",
    role: "NO CONTRIBUTION",
    image: "",
    description: "Worked for other team, No contribution in our team"
  }

];

let creditSlide = 0;

function renderCreditCards() {
  const track = document.getElementById("creditTrack");
  track.innerHTML = "";

  teamCredits.forEach(member => {
    const card = document.createElement("div");
    card.className = "credit-card";
    card.innerHTML = `
      ${member.image ? `<img src="${member.image}" alt="${member.name}" />` : ""}
      <h3>${member.name}</h3>
      <p><em>${member.role}</em></p>
      <p>${member.description}</p>
    `;
    track.appendChild(card);
  });
}

function updateCreditCarousel() {
  const offset = -(creditSlide * 100);
  document.getElementById("creditTrack").style.transform = `translateX(${offset}%)`;
}

function nextCredit() {
  const maxSlide = Math.ceil(teamCredits.length / 3) - 1;
  if (creditSlide < maxSlide) {
    creditSlide++;
    updateCreditCarousel();
  }
}

function prevCredit() {
  if (creditSlide > 0) {
    creditSlide--;
    updateCreditCarousel();
  }
}

window.addEventListener("load", () => {
  renderCreditCards();
  updateCreditCarousel();
});