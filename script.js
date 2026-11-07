const collections = [
  { name: 'Apparel', description: 'Everyday essentials and seasonal layers.', image: 'https://images.unsplash.com/photo-1523381210434-271e8be1f52b?auto=format&fit=crop&w=900&q=80' },
  { name: 'Home', description: 'Objects that make spaces feel considered.', image: 'https://images.unsplash.com/photo-1519710164239-da123dc03ef4?auto=format&fit=crop&w=900&q=80' },
  { name: 'Accessories', description: 'Small details with everyday utility.', image: 'https://images.unsplash.com/photo-1523170335258-f5ed11844a49?auto=format&fit=crop&w=900&q=80' }
];

const products = [
  { id: 1, name: 'Canvas Tote Bag', category: 'Accessories', price: 28, featured: true, image: 'https://images.unsplash.com/photo-1544816155-12df9643f363?auto=format&fit=crop&w=900&q=80', description: 'Durable cotton canvas for daily carry.' },
  { id: 2, name: 'Minimal Desk Lamp', category: 'Home', price: 64, featured: true, image: 'https://images.unsplash.com/photo-1507473885765-e6ed057f782c?auto=format&fit=crop&w=900&q=80', description: 'Warm light with a compact footprint.' },
  { id: 3, name: 'Relaxed Cotton Tee', category: 'Apparel', price: 24, featured: true, image: 'https://images.unsplash.com/photo-1521572163474-6864f9cf17ab?auto=format&fit=crop&w=900&q=80', description: 'Soft cotton with a clean silhouette.' },
  { id: 4, name: 'Ceramic Mug Set', category: 'Home', price: 36, featured: false, image: 'https://images.unsplash.com/photo-1514228742587-6b1558fcf93a?auto=format&fit=crop&w=900&q=80', description: 'Two matte mugs for coffee or tea.' },
  { id: 5, name: 'Everyday Sneakers', category: 'Apparel', price: 89, featured: true, image: 'https://images.unsplash.com/photo-1542291026-7eec264c27ff?auto=format&fit=crop&w=900&q=80', description: 'Comfortable soles and breathable uppers.' },
  { id: 6, name: 'Leather Card Holder', category: 'Accessories', price: 32, featured: false, image: 'https://images.unsplash.com/photo-1627123424574-724758594e93?auto=format&fit=crop&w=900&q=80', description: 'Slim profile with room for essentials.' },
  { id: 7, name: 'Linen Throw Pillow', category: 'Home', price: 42, featured: false, image: 'https://images.unsplash.com/photo-1584100936595-c0654b55a2e2?auto=format&fit=crop&w=900&q=80', description: 'Textured linen with a soft fill.' },
  { id: 8, name: 'Classic Hoodie', category: 'Apparel', price: 58, featured: true, image: 'https://images.unsplash.com/photo-1556821840-3a63f95609a7?auto=format&fit=crop&w=900&q=80', description: 'Midweight fleece for year-round wear.' },
  { id: 9, name: 'Stainless Water Bottle', category: 'Accessories', price: 26, featured: false, image: 'https://images.unsplash.com/photo-1602143407151-7111542de6e8?auto=format&fit=crop&w=900&q=80', description: 'Insulated bottle for hot and cold drinks.' },
  { id: 10, name: 'Scented Candle', category: 'Home', price: 22, featured: false, image: 'https://images.unsplash.com/photo-1603006905003-be475563bc59?auto=format&fit=crop&w=900&q=80', description: 'Clean burn with a subtle cedar note.' },
  { id: 11, name: 'Utility Cap', category: 'Accessories', price: 21, featured: false, image: 'https://images.unsplash.com/photo-1588850561407-ed78c282e89b?auto=format&fit=crop&w=900&q=80', description: 'Adjustable fit with structured brim.' },
  { id: 12, name: 'Woven Jacket', category: 'Apparel', price: 96, featured: false, image: 'https://images.unsplash.com/photo-1591047139829-d91aecb6caea?auto=format&fit=crop&w=900&q=80', description: 'Light outer layer with tailored lines.' }
];

const state = {
  cart: [],
  query: '',
  category: 'all',
  sort: 'featured'
};

const $ = (id) => document.getElementById(id);
const money = (value) => `$${value.toFixed(2)}`;

function showToast(message) {
  const toast = $('toast');
  toast.textContent = message;
  toast.classList.add('show');
  clearTimeout(showToast.timer);
  showToast.timer = setTimeout(() => toast.classList.remove('show'), 1800);
}

function renderCollections() {
  $('collectionsGrid').innerHTML = collections.map((item) => `
    <article class="collection-card" data-category="${item.name}">
      <img src="${item.image}" alt="${item.name} collection">
      <div class="collection-body">
        <h3>${item.name}</h3>
        <p>${item.description}</p>
      </div>
    </article>
  `).join('');

  document.querySelectorAll('.collection-card').forEach((card) => {
    card.addEventListener('click', () => {
      state.category = card.dataset.category;
      $('categoryFilter').value = state.category;
      renderProducts();
      location.hash = '#products';
    });
  });
}

function renderCategoryOptions() {
  const categories = ['all', ...new Set(products.map((p) => p.category))];
  $('categoryFilter').innerHTML = categories.map((category) => (
    `<option value="${category}">${category === 'all' ? 'All categories' : category}</option>`
  )).join('');
}

function filteredProducts() {
  let list = [...products];
  if (state.category !== 'all') list = list.filter((p) => p.category === state.category);
  if (state.query) {
    const q = state.query.toLowerCase();
    list = list.filter((p) => `${p.name} ${p.category} ${p.description}`.toLowerCase().includes(q));
  }
  if (state.sort === 'price-asc') list.sort((a, b) => a.price - b.price);
  if (state.sort === 'price-desc') list.sort((a, b) => b.price - a.price);
  if (state.sort === 'name') list.sort((a, b) => a.name.localeCompare(b.name));
  if (state.sort === 'featured') list.sort((a, b) => Number(b.featured) - Number(a.featured));
  return list;
}

function renderProducts() {
  const list = filteredProducts();
  $('productGrid').innerHTML = list.length ? list.map((product) => `
    <article class="product-card">
      <img src="${product.image}" alt="${product.name}">
      <div class="product-body">
        ${product.featured ? '<span class="badge">Featured</span>' : ''}
        <h3>${product.name}</h3>
        <p class="product-meta">${product.category} · ${product.description}</p>
        <div class="product-row">
          <span class="price">${money(product.price)}</span>
          <button class="btn btn-primary" data-add="${product.id}">Add to cart</button>
        </div>
      </div>
    </article>
  `).join('') : '<p class="empty">No products match your search.</p>';

  document.querySelectorAll('[data-add]').forEach((button) => {
    button.addEventListener('click', () => addToCart(Number(button.dataset.add)));
  });
}

function addToCart(id) {
  const product = products.find((p) => p.id === id);
  const item = state.cart.find((entry) => entry.id === id);
  if (item) item.qty += 1;
  else state.cart.push({ id: product.id, name: product.name, price: product.price, image: product.image, qty: 1 });
  renderCart();
  showToast(`${product.name} added to cart`);
}

function updateQty(id, delta) {
  const item = state.cart.find((entry) => entry.id === id);
  if (!item) return;
  item.qty += delta;
  if (item.qty <= 0) state.cart = state.cart.filter((entry) => entry.id !== id);
  renderCart();
}

function renderCart() {
  const count = state.cart.reduce((sum, item) => sum + item.qty, 0);
  const total = state.cart.reduce((sum, item) => sum + item.price * item.qty, 0);
  $('cartCount').textContent = count;
  $('cartTotal').textContent = money(total);
  $('cartItems').innerHTML = state.cart.length ? state.cart.map((item) => `
    <div class="cart-item">
      <img src="${item.image}" alt="${item.name}">
      <div>
        <h4>${item.name}</h4>
        <p>${money(item.price)}</p>
        <div class="qty">
          <button aria-label="Decrease quantity" data-qty="${item.id}" data-delta="-1">-</button>
          <span>${item.qty}</span>
          <button aria-label="Increase quantity" data-qty="${item.id}" data-delta="1">+</button>
        </div>
      </div>
      <strong>${money(item.price * item.qty)}</strong>
    </div>
  `).join('') : '<p class="empty">Your cart is empty.</p>';

  document.querySelectorAll('[data-qty]').forEach((button) => {
    button.addEventListener('click', () => updateQty(Number(button.dataset.qty), Number(button.dataset.delta)));
  });
}

function toggleCart(open) {
  $('cartDrawer').classList.toggle('open', open);
  $('cartDrawer').setAttribute('aria-hidden', String(!open));
}

function init() {
  renderCollections();
  renderCategoryOptions();
  renderProducts();
  renderCart();

  $('menuBtn').addEventListener('click', () => $('navLinks').classList.toggle('open'));
  $('searchToggle').addEventListener('click', () => $('searchBar').classList.toggle('hidden'));
  $('searchInput').addEventListener('input', (event) => { state.query = event.target.value.trim(); renderProducts(); });
  $('categoryFilter').addEventListener('change', (event) => { state.category = event.target.value; renderProducts(); });
  $('sortFilter').addEventListener('change', (event) => { state.sort = event.target.value; renderProducts(); });
  $('cartBtn').addEventListener('click', () => toggleCart(true));
  $('closeCart').addEventListener('click', () => toggleCart(false));
  $('cartDrawer').addEventListener('click', (event) => { if (event.target.id === 'cartDrawer') toggleCart(false); });
  $('checkoutBtn').addEventListener('click', () => showToast(state.cart.length ? 'Demo checkout — no payment collected.' : 'Add a product before checkout.'));
  $('newsletterForm').addEventListener('submit', (event) => {
    event.preventDefault();
    event.target.reset();
    showToast('Thanks for joining the demo newsletter.');
  });
}

init();
