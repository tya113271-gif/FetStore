// FET STORE Client Application
// Full E-commerce Engine: Shopping Cart, Customer Discord Accounts, Auto Slider, Admin Analytics

const defaultSlides = [
  {
    id: 'slide_1',
    eyebrow: 'PREMIUM QBCORE SCRIPTS',
    headline: 'سكربتات ترفع مستوى سيرفرك.',
    highlight: 'سيرفرك.',
    description: 'متجر FET STORE لسكربتات FiveM المبنية لـ QBCore. أداء عالي، تجربة سلسة، وهوية فريدة.',
    image: 'assets/logo.png',
    tag: '✦ BUILT FOR QBCORE',
    cta_text: 'استكشف السكربتات ←',
    cta_link: '#scripts'
  },
  {
    id: 'slide_2',
    eyebrow: 'EXCLUSIVE FIVEM SYSTEMS',
    headline: 'أنظمة متطورة بأداء 0.00ms',
    highlight: '0.00ms',
    description: 'سكربتات مبرمجة ومدروسة بدون أي استهلاك على السيرفر لتضمن أعلى فريمات وأفضل تجربة للاعبين.',
    image: 'assets/logo.png',
    tag: '⚡ 0.00 MS RESMON',
    cta_text: 'تصفح الأنظمة ←',
    cta_link: '#scripts'
  },
  {
    id: 'slide_3',
    eyebrow: '24/7 SUPPORT & AUTO ROLE',
    headline: 'تسليم فوري ورول تلقائي بدسكورد',
    highlight: 'تلقائي بدسكورد',
    description: 'سجل دخولك بحساب الديسكورد، اشترِ سكربتك، واستلم رتبتك وتذكرتك في سيرفرنا مباشرة وبكل سهولة.',
    image: 'assets/tickets.png',
    tag: '👑 INSTANT DISCORD ROLES',
    cta_text: 'انضم لديسكورد الدعم ↗',
    cta_link: '#support'
  }
];

const seed = {
  settings: {
    brand: 'FET STORE',
    eyebrow: 'PREMIUM QBCORE SCRIPTS',
    headline: 'سكربتات ترفع مستوى سيرفرك.',
    highlight: 'سيرفرك.',
    description: 'متجر FET STORE لسكربتات FiveM المبنية لـ QBCore. أداء عالي، تجربة سلسة، وهوية فريدة.',
    accent: '#8cff36',
    discord: 'https://discord.gg/fet',
    announcement: '🔥 مرحباً بكم في متجر FET STORE — سكربتات QBCore الحصرية متوفرة الآن!',
    logo: 'assets/logo.png',
    hero_interval: 5,
    discord_client_id: '1538093018299633724',
    discord_client_secret: '',
    discord_bot_token: '',
    discord_guild_id: '',
    discord_customer_role_id: ''
  },
  hero_slides: defaultSlides,
  nav: [
    { id: 'home', label: 'الرئيسية', href: '#home' },
    { id: 'scripts', label: 'السكربتات', href: '#scripts' },
    { id: 'support', label: 'الدعم والتذاكر', href: '#support' }
  ],
  categories: [
    { id: 'systems', name: 'أنظمة متطورة' },
    { id: 'jobs', name: 'وظائف واقعية' },
    { id: 'ui', name: 'واجهات حصرية' }
  ],
  products: [
    {
      id: 'garage_system',
      name: 'نظام كراجات وحجز متطور',
      category: 'systems',
      desc: 'السلام عليكم ورحمة الله وبركاته.\nنظام كراجات وسيارات متكامل وسلس مصمم خصيصاً لـ QBCore.\n\nالمميزات الأساسية:\n- واجهة عصرية وسلسة تفتح بسلاسة وبدون أي استهلاك (0.00ms)\n- نظام متكامل لمشاركة المفاتيح وإعارة المركبات للأصدقاء\n- نظام الحجز والتأمين واسترجاع المركبات بأسعار قابلة للتهيئة\n- متوافق بالكامل مع جميع سيرفرات الحياة الواقعية\n- دعم فني مستمر وتحديثات أسبوعية',
      price: '55 ر.س',
      image: '',
      badge: 'الأكثر طلباً ⭐',
      checkoutUrl: '',
      featured: true
    },
    {
      id: 'luxury_inventory',
      name: 'انفنتوري وحقيبة متقدمة',
      category: 'ui',
      desc: 'حقيبة لاعبين عصرية وتفاعلية مصممة بأعلى معايير التصميم.\n\nأهم الخصائص:\n- وزن واقعي وديناميكي لكل عنصر وسلاح\n- تخصيص كامل لمستودعات وخزائن المنازل والسيارات\n- شريط وصول سريع وسلس للأسلحة بدون تأخير\n- أيقونات واضحة وتصميم يتناسب مع كافة مقاسات الشاشات',
      price: '75 ر.س',
      image: '',
      badge: 'مميز 🔥',
      checkoutUrl: '',
      featured: true
    },
    {
      id: 'exclusive_jobs',
      name: 'حزمة وظائف واقتصاد حصرية',
      category: 'jobs',
      desc: 'باقة وظائف متقنة لتنشيط سيرفرك وجذب اللاعبين.\n\nتشمل الوظائف:\n- نظام توصيل ومهام تفاعلية\n- سجلات ديسكورد (Logs) لكل عملية بيع وشراء\n- رتب ورواتب واقعية ومتوازنة لحماية اقتصاد السيرفر',
      price: '45 ر.س',
      image: '',
      badge: 'جديد ✦',
      checkoutUrl: '',
      featured: false
    }
  ]
};

// Utilities
const $ = id => document.getElementById(id);
const clone = x => JSON.parse(JSON.stringify(x));
const esc = x => String(x ?? '').replace(/[&<>"']/g, c => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' }[c]));

function parseNumericPrice(p) {
  if (!p) return 0;
  const num = parseFloat(String(p).replace(/[^\d.]/g, ''));
  return isNaN(num) ? 0 : num;
}

function formatPrice(p) {
  if (p === undefined || p === null || p === '') return '0 ر.س';
  let s = String(p).trim();
  s = s.replace(/[$USD]/gi, '').trim();
  if (s.includes('ر.س') || s.includes('ريال')) return s;
  return s + ' ر.س';
}

// Global States
let store = clone(seed);
let server = false;
let authed = false;
let setup = false;
let tab = 'overview';
let filter = 'all';
let editIndex = -1;
let editType = '';

// Customer & Cart States
let currentCustomer = null;
let cart = [];
try {
  cart = JSON.parse(localStorage.getItem('fet_cart_items') || '[]');
  if (!Array.isArray(cart)) cart = [];
} catch {
  cart = [];
}

// Slider State
let currentSlide = 0;
let slideTimer = null;
let isSlidePaused = false;

// Toast Helper
function toast(message, icon = '🛒') {
  const el = $('toast');
  const msgEl = $('toastMsg');
  const iconEl = $('toastIcon');
  if (msgEl) msgEl.textContent = message;
  if (iconEl) iconEl.textContent = icon;
  el.classList.add('show');
  setTimeout(() => el.classList.remove('show'), 3200);
}

// API Helper
async function api(url, body) {
  const r = await fetch('/api/' + url, {
    method: body === undefined ? 'GET' : 'POST',
    headers: { 'content-type': 'application/json' },
    credentials: 'same-origin',
    ...(body === undefined ? {} : { body: JSON.stringify(body) })
  });
  const j = await r.json();
  if (!r.ok) throw Error(j.error || 'حدث خطأ');
  return j;
}

// -------------------------------------------------------------
// CART SYSTEM
// -------------------------------------------------------------
function saveCart() {
  localStorage.setItem('fet_cart_items', JSON.stringify(cart));
  renderCartBadge();
  renderCartDrawer();
}

function addToCart(product, qty = 1) {
  const existing = cart.find(i => i.id === product.id);
  const pNum = parseNumericPrice(product.price);
  if (existing) {
    existing.qty += qty;
  } else {
    cart.push({
      id: product.id,
      name: product.name,
      price: product.price,
      priceNum: pNum,
      image: product.image || '',
      qty: qty
    });
  }
  saveCart();
  toast(`تم إضافة «${product.name}» إلى السلة بنجاح 🛒`, '✅');
  
  // Bounce badge
  const badge = $('cartBadge');
  if (badge) {
    badge.classList.add('bounce');
    setTimeout(() => badge.classList.remove('bounce'), 300);
  }
}

function updateCartQty(id, delta) {
  const item = cart.find(i => i.id === id);
  if (!item) return;
  item.qty += delta;
  if (item.qty <= 0) {
    cart = cart.filter(i => i.id !== id);
  }
  saveCart();
}

function removeFromCart(id) {
  cart = cart.filter(i => i.id !== id);
  saveCart();
  toast('تمت إزالة المنتج من السلة', '🗑️');
}

function renderCartBadge() {
  const badge = $('cartBadge');
  if (!badge) return;
  const count = cart.reduce((sum, item) => sum + item.qty, 0);
  badge.textContent = count;
}

function calculateCartTotal() {
  return cart.reduce((sum, item) => {
    const num = item.priceNum || parseNumericPrice(item.price);
    return sum + (num * item.qty);
  }, 0);
}

function renderCartDrawer() {
  const container = $('cartItemsList');
  const totalDisplay = $('cartTotalDisplay');
  if (!container || !totalDisplay) return;

  if (cart.length === 0) {
    container.innerHTML = `
      <div class="cart-empty-view">
        <span>🛒</span>
        <b style="display:block;font-size:16px;color:#fff;margin-bottom:6px;">سلتك فارغة حالياً</b>
        <p style="font-size:12px;color:var(--muted);margin:0;">تصفح سكربتات المتجر وأضف ما يعجبك بنقرة زر!</p>
      </div>
    `;
    totalDisplay.textContent = '0 ر.س';
    return;
  }

  container.innerHTML = cart.map(item => `
    <div class="cart-item">
      <div class="cart-item-img">
        ${item.image ? `<img src="${esc(item.image)}" alt="${esc(item.name)}" style="width:100%;height:100%;object-fit:cover;border-radius:9px;">` : 'FET'}
      </div>
      <div class="cart-item-info">
        <strong>${esc(item.name)}</strong>
        <small>${formatPrice(item.price)}</small>
        <div class="cart-item-ctrls">
          <button class="cart-qty-btn" onclick="updateCartQty('${item.id}', -1)">-</button>
          <span class="cart-qty-num">${item.qty}</span>
          <button class="cart-qty-btn" onclick="updateCartQty('${item.id}', 1)">+</button>
        </div>
      </div>
      <button class="cart-del-btn" onclick="removeFromCart('${item.id}')" title="حذف">✕</button>
    </div>
  `).join('');

  totalDisplay.textContent = calculateCartTotal().toFixed(2) + ' ر.س';
}

function openCart() {
  $('cartDrawer').classList.add('open');
  $('cartBackdrop').classList.add('open');
  renderCartDrawer();
}

function closeCart() {
  $('cartDrawer').classList.remove('open');
  $('cartBackdrop').classList.remove('open');
}

// -------------------------------------------------------------
// CHECKOUT & CUSTOMER ORDERS
// -------------------------------------------------------------
async function handleCheckout() {
  if (cart.length === 0) {
    return toast('السلة فارغة! أضف سكربتات قبل إتمام الطلب', '⚠️');
  }

  // Check customer auth
  if (!currentCustomer) {
    closeCart();
    $('customerLoginModal').showModal();
    toast('يرجى تسجيل الدخول بحساب ديسكورد لحفظ مشترياتك ورول العميل', '🎮');
    return;
  }

  try {
    toast('جاري إتمام الطلب وتوثيق حسابك...', '⏳');
    let res;
    if (server) {
      res = await api('orders/checkout', { items: cart });
    } else {
      // Offline/Local Demo Checkout
      const orderId = 'FET-' + Math.floor(1000 + Math.random() * 9000);
      const totalNum = calculateCartTotal();
      const newOrder = {
        id: orderId,
        customer: currentCustomer,
        items: clone(cart),
        total: totalNum + ' ر.س',
        totalNum: totalNum,
        status: 'مكتمل ✅',
        date: new Date().toISOString(),
        paymentMethod: 'طلب مباشر / ديسكورد'
      };
      const demoOrders = JSON.parse(localStorage.getItem('fet_demo_orders') || '[]');
      demoOrders.unshift(newOrder);
      localStorage.setItem('fet_demo_orders', JSON.stringify(demoOrders));
      res = { ok: true, order: newOrder };
    }

    cart = [];
    saveCart();
    closeCart();
    toast(`تم إتمام الطلب #${res.order.id} بنجاح! تم حفظه في سجل طلباتك 🎉`, '✅');
    showMyOrders();
  } catch (err) {
    toast('تعذر إتمام الطلب: ' + err.message, '⚠️');
  }
}

async function showMyOrders() {
  const modal = $('myOrdersModal');
  const container = $('myOrdersContent');
  if (!modal || !container) return;

  if (!currentCustomer) {
    $('customerLoginModal').showModal();
    return;
  }

  modal.showModal();
  container.innerHTML = '<div style="text-align:center;padding:30px;color:var(--muted);">جاري تحميل طلباتك...</div>';

  try {
    let orderList = [];
    if (server) {
      const res = await api('orders/my-orders');
      orderList = res.orders || [];
    } else {
      const allDemo = JSON.parse(localStorage.getItem('fet_demo_orders') || '[]');
      orderList = allDemo.filter(o => o.customer && o.customer.id === currentCustomer.id);
    }

    if (orderList.length === 0) {
      container.innerHTML = `
        <div style="text-align:center;padding:40px 20px;">
          <span style="font-size:45px;display:block;margin-bottom:10px;">📦</span>
          <b style="font-size:16px;color:#fff;">لا توجد طلبات سابقة حتى الآن</b>
          <p class="muted" style="font-size:13px;margin:8px 0 0;">قم بإضافة سكربتات إلى السلة وإتمام الطلب لتظهر هنا!</p>
        </div>
      `;
      return;
    }

    container.innerHTML = orderList.map(o => `
      <div class="order-card">
        <div class="order-header">
          <div>
            <strong style="color:var(--accent);font-size:16px;">طلب #${esc(o.id)}</strong>
            <small style="display:block;color:var(--muted);font-size:11px;">${new Date(o.date).toLocaleString('ar-SA')}</small>
          </div>
          <span class="pill" style="border-color:#5ca846;color:#c0f9b0;">${esc(o.status || 'مكتمل')}</span>
        </div>
        <div class="order-items-list">
          ${(o.items || []).map(i => `
            <div style="display:flex;justify-content:space-between;padding:4px 0;">
              <span>• ${esc(i.name)} <b style="color:var(--accent);">×${i.qty}</b></span>
              <span>${formatPrice(i.price)}</span>
            </div>
          `).join('')}
        </div>
        <div style="display:flex;justify-content:space-between;align-items:center;margin-top:12px;padding-top:10px;border-top:1px solid rgba(42,57,43,0.5);">
          <small class="muted">طريقة التسليم: تسليم فوري + رول الديسكورد</small>
          <strong style="font-size:16px;color:#fff;">المجموع: <span style="color:var(--accent);">${esc(o.total)}</span></strong>
        </div>
      </div>
    `).join('');
  } catch (err) {
    container.innerHTML = `<div class="note warn">تعذر تحميل الطلبات: ${esc(err.message)}</div>`;
  }
}

// -------------------------------------------------------------
// CUSTOMER DISCORD AUTH
// -------------------------------------------------------------
async function checkCustomerAuth() {
  if (server) {
    try {
      const res = await api('auth/customer/me');
      currentCustomer = res.loggedIn ? res.user : null;
    } catch {
      currentCustomer = null;
    }
  } else {
    try {
      currentCustomer = JSON.parse(localStorage.getItem('fet_demo_customer'));
    } catch {
      currentCustomer = null;
    }
  }
  renderCustomerNav();
}

function loginWithDiscord() {
  const clientId = store.settings.discord_client_id || '1538093018299633724';
  const redirectUri = window.location.origin + window.location.pathname;
  // Official Discord OAuth2 Authorization URL
  const authUrl = `https://discord.com/oauth2/authorize?client_id=${clientId}&response_type=token&redirect_uri=${encodeURIComponent(redirectUri)}&scope=identify`;
  window.location.href = authUrl;
}

function renderCustomerNav() {
  const container = $('customerNavContainer');
  if (!container) return;

  if (currentCustomer) {
    container.innerHTML = `
      <div class="cust-menu-wrap">
        <button class="cust-profile-btn" id="custMenuToggleBtn" type="button" title="حسابي">
          <img class="cust-avatar" src="${esc(currentCustomer.avatar)}" alt="Discord">
          <span class="cust-name">${esc(currentCustomer.username)}</span>
          <span style="font-size:9px;color:var(--muted);margin-right:2px;">▼</span>
        </button>
        <div class="cust-dropdown" id="custDropdownMenu" hidden>
          <button class="cust-drop-item" id="menuMyOrdersBtn" type="button">
            <span>📦</span>
            <span>طلباتي</span>
          </button>
          <div class="cust-drop-divider"></div>
          <button class="cust-drop-item danger" id="menuLogoutBtn" type="button">
            <span>🚪</span>
            <span>تسجيل خروج</span>
          </button>
        </div>
      </div>
    `;

    const toggleBtn = $('custMenuToggleBtn');
    const dropdown = $('custDropdownMenu');

    if (toggleBtn && dropdown) {
      toggleBtn.onclick = (e) => {
        e.stopPropagation();
        dropdown.hidden = !dropdown.hidden;
      };

      const myOrdersBtn = $('menuMyOrdersBtn');
      if (myOrdersBtn) {
        myOrdersBtn.onclick = (e) => {
          e.stopPropagation();
          dropdown.hidden = true;
          showMyOrders();
        };
      }

      const logoutBtn = $('menuLogoutBtn');
      if (logoutBtn) {
        logoutBtn.onclick = (e) => {
          e.stopPropagation();
          dropdown.hidden = true;
          customerLogout();
        };
      }

      document.addEventListener('click', () => {
        if (dropdown) dropdown.hidden = true;
      });
    }
  } else {
    container.innerHTML = `
      <button class="btn discord small" id="loginCustBtn" type="button" style="display:inline-flex;align-items:center;gap:7px;padding:7px 15px;font-size:12px;font-weight:700;border-radius:10px;">
        <svg width="15" height="15" viewBox="0 0 127.14 96.36" fill="#fff"><path d="M107.7,8.07A105.15,105.15,0,0,0,81.47,0a72.06,72.06,0,0,0-3.36,6.83A97.68,97.68,0,0,0,49,6.83,72.37,72.37,0,0,0,45.64,0,105.89,105.89,0,0,0,19.39,8.09C2.79,32.65-1.71,56.6.54,80.21h0A105.73,105.73,0,0,0,32.71,96.36,77.7,77.7,0,0,0,39.6,85.25a68.42,68.42,0,0,1-10.85-5.18c.91-.66,1.8-1.34,2.66-2a75.57,75.57,0,0,0,64.32,0c.87.71,1.76,1.39,2.66,2a68.68,68.68,0,0,1-10.87,5.19,77,77,0,0,0,6.89,11.1A105.25,105.25,0,0,0,126.6,80.22h0C129.24,52.84,122.09,29.11,107.7,8.07ZM42.45,65.69C36.18,65.69,31,60,31,53s5-12.74,11.43-12.74S54,45.91,53.89,53,48.84,65.69,42.45,65.69Zm42.24,0C78.41,65.69,73.25,60,73.25,53s5-12.74,11.44-12.74S96.23,45.91,96.12,53,91.08,65.69,84.69,65.69Z"/></svg>
        <span>Sign in with Discord</span>
      </button>
    `;
    $('loginCustBtn').onclick = () => {
      loginWithDiscord();
    };
  }
}

async function customerLogout() {
  try {
    if (server) {
      await api('auth/customer/logout');
    } else {
      localStorage.removeItem('fet_demo_customer');
    }
    currentCustomer = null;
    renderCustomerNav();
    toast('تم تسجيل الخروج بنجاح 👋', 'ℹ️');
  } catch (err) {
    toast(err.message, '⚠️');
  }
}

// -------------------------------------------------------------
// DYNAMIC AUTO-SLIDING HERO BANNERS (5 SECONDS)
// -------------------------------------------------------------
function renderHeroSlider() {
  const container = $('heroSlidesContainer');
  const dotsContainer = $('sliderDots');
  if (!container || !dotsContainer) return;

  const slides = store.hero_slides && store.hero_slides.length > 0 ? store.hero_slides : defaultSlides;

  container.innerHTML = slides.map(sl => {
    const text = sl.headline || '';
    const needle = sl.highlight || '';
    const at = needle ? text.indexOf(needle) : -1;
    let headlineHtml = '';
    if (at >= 0) {
      headlineHtml = `${esc(text.slice(0, at))}<span>${esc(needle)}</span>${esc(text.slice(at + needle.length))}`;
    } else {
      headlineHtml = esc(text);
    }

    return `
      <div class="hero-slide">
        <div class="hero-content">
          <div class="eyebrow">${esc(sl.eyebrow || 'PREMIUM QBCORE SCRIPTS')}</div>
          <h1>${headlineHtml}</h1>
          <p>${esc(sl.description || '')}</p>
          <div class="actions">
            <a class="btn" href="${esc(sl.cta_link || '#scripts')}">${esc(sl.cta_text || 'استكشف السكربتات ←')}</a>
            <a class="btn outline" href="#support">الدعم والتذاكر</a>
          </div>
        </div>
        <div class="hero-art">
          <img src="${esc(sl.image || store.settings.logo || 'assets/logo.png')}" alt="Hero Image">
          <span class="float-tag">${esc(sl.tag || '✦ BUILT FOR QBCORE')}</span>
        </div>
      </div>
    `;
  }).join('');

  dotsContainer.innerHTML = slides.map((_, i) => `
    <div class="slider-dot ${i === currentSlide ? 'active' : ''}" data-idx="${i}"></div>
  `).join('');

  dotsContainer.querySelectorAll('.slider-dot').forEach(dot => {
    dot.onclick = () => {
      goToSlide(+dot.dataset.idx);
      resetSlideTimer();
    };
  });

  updateSlidePosition();
}

function updateSlidePosition() {
  const container = $('heroSlidesContainer');
  if (!container) return;
  container.style.transform = `translateX(${currentSlide * 100}%)`;

  const dots = document.querySelectorAll('.slider-dot');
  dots.forEach((d, i) => d.classList.toggle('active', i === currentSlide));
}

function nextSlide() {
  const slides = store.hero_slides && store.hero_slides.length > 0 ? store.hero_slides : defaultSlides;
  currentSlide = (currentSlide + 1) % slides.length;
  updateSlidePosition();
}

function prevSlide() {
  const slides = store.hero_slides && store.hero_slides.length > 0 ? store.hero_slides : defaultSlides;
  currentSlide = (currentSlide - 1 + slides.length) % slides.length;
  updateSlidePosition();
}

function goToSlide(index) {
  const slides = store.hero_slides && store.hero_slides.length > 0 ? store.hero_slides : defaultSlides;
  currentSlide = (index + slides.length) % slides.length;
  updateSlidePosition();
}

function startSlideTimer() {
  if (slideTimer) clearInterval(slideTimer);
  const intervalSec = Math.max(2, parseInt(store.settings.hero_interval) || 5);
  slideTimer = setInterval(() => {
    if (!isSlidePaused) {
      nextSlide();
    }
  }, intervalSec * 1000);
}

function resetSlideTimer() {
  startSlideTimer();
}

// -------------------------------------------------------------
// PRODUCT DETAILS MODAL & GRID
// -------------------------------------------------------------
let selectedProductForModal = null;

function openProductModal(p) {
  selectedProductForModal = p;
  $('detailTitle').textContent = p.name;
  $('detailCategory').textContent = store.categories.find(c => c.id === p.category)?.name || 'سكربتاتنا';

  const badgeEl = $('detailBadge');
  if (badgeEl) {
    if (p.badge) {
      badgeEl.textContent = p.badge;
      badgeEl.style.display = 'inline-block';
    } else {
      badgeEl.style.display = 'none';
    }
  }

  const thumbContainer = $('detailThumbContainer');
  if (thumbContainer) {
    if (p.image) {
      thumbContainer.innerHTML = `<img id="detailImage" src="${esc(p.image)}" alt="${esc(p.name)}">`;
    } else {
      thumbContainer.innerHTML = '<strong style="color:var(--accent);font-size:55px;letter-spacing:7px;font-style:italic;">FET</strong>';
    }
  }

  $('detailPrice').textContent = formatPrice(p.price);
  $('detailDesc').textContent = p.desc || 'لا توجد تفاصيل إضافية لهذا السكربت حالياً.';

  const buyBtn = $('detailBuyBtn');
  if (buyBtn) {
    if (p.checkoutUrl) {
      buyBtn.href = p.checkoutUrl;
      buyBtn.target = '_blank';
      buyBtn.onclick = () => toast('جاري نقلك لرابط الشراء المباشر ↗', '🛒');
    } else {
      const discLink = store.settings.discord || '#support';
      buyBtn.href = discLink;
      buyBtn.target = discLink.startsWith('http') ? '_blank' : '_self';
      buyBtn.onclick = () => {
        if (discLink.startsWith('#')) $('detailModal').close();
        else toast('جاري توجيهك إلى ديسكورد للشراء وفتح تذكرة 🛒', '🎮');
      };
    }
  }

  // Add to cart from modal
  $('modalAddToCartBtn').onclick = () => {
    addToCart(p, 1);
    $('detailModal').close();
    openCart();
  };

  $('detailModal').showModal();
}

// -------------------------------------------------------------
// APP INITIALIZATION & RENDERING
// -------------------------------------------------------------
async function init() {
  try {
    const s = await api('store');
    server = true;
    store = s;
    setup = s.setupRequired;
    const me = await api('me');
    authed = me.admin;
  } catch {
    server = false;
    try {
      store = JSON.parse(localStorage.getItem('fet_demo_v3')) || clone(seed);
    } catch {
      store = clone(seed);
    }
  }

  // Ensure default structures
  if (!store.hero_slides || store.hero_slides.length === 0) store.hero_slides = defaultSlides;
  if (!store.settings.hero_interval) store.settings.hero_interval = 5;

  // Check for Discord OAuth redirect token in URL hash
  const hash = window.location.hash;
  if (hash && hash.includes('access_token=')) {
    const params = new URLSearchParams(hash.slice(1));
    const token = params.get('access_token');
    if (token) {
      try {
        toast('جاري جلب بيانات حسابك من ديسكورد...', '⏳');
        const dRes = await fetch('https://discord.com/api/v10/users/@me', {
          headers: { 'Authorization': `Bearer ${token}` }
        });
        const discordUser = await dRes.json();
        if (discordUser && discordUser.id) {
          const avatarUrl = discordUser.avatar
            ? `https://cdn.discordapp.com/avatars/${discordUser.id}/${discordUser.avatar}.png?size=128`
            : `https://cdn.discordapp.com/embed/avatars/${(parseInt(discordUser.id) >> 22) % 6}.png`;
          const profile = {
            username: discordUser.global_name || discordUser.username,
            discord_id: discordUser.id,
            avatar: avatarUrl,
            joinedAt: new Date().toISOString()
          };

          if (server) {
            await api('auth/customer/authorize', profile);
          } else {
            localStorage.setItem('fet_demo_customer', JSON.stringify(profile));
          }

          currentCustomer = profile;
          window.history.replaceState(null, '', window.location.pathname);
          toast(`أهلاً بك يا ${profile.username}، تم تسجيل دخولك بديسكورد بنجاح 🎮`, '✅');
        }
      } catch (err) {
        toast('تعذر إكمال تسجيل الدخول: ' + err.message, '⚠️');
      }
    }
  } else if (window.location.search.includes('auth=success')) {
    window.history.replaceState(null, '', window.location.pathname);
    toast('تم تسجيل الدخول الرسمي عبر ديسكورد بنجاح 🎮', '✅');
  }

  render();
  checkCustomerAuth();
  route();
  window.addEventListener('hashchange', route);

  // Setup Cart & Slider Listeners
  $('cartBtn').onclick = openCart;
  $('closeCartBtn').onclick = closeCart;
  $('cartBackdrop').onclick = closeCart;
  $('checkoutBtn').onclick = handleCheckout;

  $('sliderNextBtn').onclick = () => { nextSlide(); resetSlideTimer(); };
  $('sliderPrevBtn').onclick = () => { prevSlide(); resetSlideTimer(); };

  const sliderWrap = $('home');
  if (sliderWrap) {
    sliderWrap.addEventListener('mouseenter', () => { isSlidePaused = true; });
    sliderWrap.addEventListener('mouseleave', () => { isSlidePaused = false; });
  }

  startSlideTimer();
}

function render() {
  const s = store.settings;
  document.documentElement.style.setProperty('--accent', /^#[0-9a-fA-F]{6}$/.test(s.accent) ? s.accent : '#8cff36');
  $('announcement').textContent = s.announcement || '';
  
  for (const id of ['brandLogo']) {
    const el = $(id);
    if (el) el.src = s.logo || 'assets/logo.png';
  }

  // Render Navlinks
  $('navlinks').replaceChildren();
  store.nav.forEach(n => {
    const a = document.createElement('a');
    a.textContent = n.label;
    a.href = n.href;
    $('navlinks').append(a);
  });

  $('discordLink').href = s.discord || '#support';
  $('discordLink').textContent = s.discord ? 'انضم إلى ديسكورد المتجر ↗' : 'رابط الدعم والتذاكر';
  $('year').textContent = new Date().getFullYear();
  $('count').textContent = store.products.length + ' PRODUCTS';

  // Render Filters
  $('filters').replaceChildren();
  [{ id: 'all', name: 'الكل' }, ...store.categories].forEach(c => {
    const b = document.createElement('button');
    b.className = 'chip' + (filter === c.id ? ' active' : '');
    b.textContent = c.name;
    b.onclick = () => {
      filter = c.id;
      render();
    };
    $('filters').append(b);
  });

  // Render Products Grid
  $('products').replaceChildren();
  const shown = store.products.filter(p => filter === 'all' || p.category === filter);
  if (!shown.length) {
    const d = document.createElement('div');
    d.className = 'empty';
    d.innerHTML = '<b>قريبًا في FET STORE ✦</b><span class="muted">المنتجات الجديدة بتنزل هنا، تابعنا!</span>';
    $('products').append(d);
  }

  shown.forEach(p => {
    const el = document.createElement('article');
    el.className = 'product';
    el.onclick = () => openProductModal(p);

    const thumb = document.createElement('div');
    thumb.className = 'thumb';
    if (p.image) {
      const img = document.createElement('img');
      img.src = p.image;
      img.alt = p.name;
      thumb.append(img);
    } else {
      const t = document.createElement('strong');
      t.textContent = 'FET';
      thumb.append(t);
    }
    if (p.badge) {
      const b = document.createElement('span');
      b.className = 'pill';
      b.textContent = p.badge;
      thumb.append(b);
    }

    const body = document.createElement('div');
    body.className = 'product-body';

    const cat = document.createElement('span');
    cat.className = 'eyebrow';
    cat.textContent = store.categories.find(c => c.id === p.category)?.name || 'سكربتاتنا';

    const h = document.createElement('h3');
    h.textContent = p.name;

    const footer = document.createElement('div');
    footer.className = 'product-card-footer';

    const price = document.createElement('span');
    price.className = 'price';
    price.textContent = formatPrice(p.price);

    const actions = document.createElement('div');
    actions.className = 'card-actions';

    const cartBtn = document.createElement('button');
    cartBtn.className = 'btn-quick-cart';
    cartBtn.type = 'button';
    cartBtn.title = 'إضافة سريعة للسلة';
    cartBtn.innerHTML = '🛒';
    cartBtn.onclick = (e) => {
      e.stopPropagation();
      addToCart(p, 1);
    };

    const detailsBtn = document.createElement('button');
    detailsBtn.className = 'btn small';
    detailsBtn.type = 'button';
    detailsBtn.textContent = '🔍 التفاصيل';
    detailsBtn.onclick = (e) => {
      e.stopPropagation();
      openProductModal(p);
    };

    actions.append(cartBtn, detailsBtn);
    footer.append(price, actions);
    body.append(cat, h, footer);
    el.append(thumb, body);
    $('products').append(el);
  });

  // Render Hero Slider
  renderHeroSlider();

  // Render Cart state
  renderCartBadge();
  renderCartDrawer();
}

// -------------------------------------------------------------
// ROUTER & FET MANAGER ADMIN PANEL
// -------------------------------------------------------------
function route() {
  const m = location.hash === '#manager';
  $('manager').classList.toggle('on', m);
  document.body.style.overflow = m ? 'hidden' : '';
  if (m) managerView();
}

function managerView() {
  const logged = server ? authed : sessionStorage.getItem('fet_demo_admin') === 'yes';
  $('loginView').hidden = logged;
  $('dashboard').hidden = !logged;

  if (!logged) {
    $('loginTitle').textContent = server && setup ? 'إنشاء حساب المدير الأول' : 'تسجيل دخول المدير';
    $('loginInfo').textContent = server && setup ? 'أنشئ حساب المدير مرة واحدة فقط لتأمين المتجر.' : 'إدارة المنتجات، الأسعار، السلايدر، والطلبات';
    $('loginSubmit').textContent = server && setup ? 'إنشاء الحساب' : 'دخول الإدارة';
    $('demoNotice').hidden = server;
    $('password').minLength = server ? 6 : 1;
  } else {
    const tabs = [
      ['overview', 'نظرة عامة'],
      ['orders', 'الطلبات والأرباح 💰'],
      ['heroSlides', 'سلايدر الواجهة (5 ثواني) 🎬'],
      ['products', 'المنتجات والسكربتات 📦'],
      ['categories', 'الأقسام'],
      ['navigation', 'القائمة العلوية'],
      ['content', 'النصوص والهوية'],
      ['settings', 'إعدادات ديسكورد والروابط ⚙️'],
      ['backup', 'النسخ والاحتياط 💾']
    ];

    $('sideitems').innerHTML = tabs.map(([id, label]) => `<button class="sidebtn ${tab === id ? 'active' : ''}" data-tab="${id}">${label}</button>`).join('');
    $('sideitems').querySelectorAll('[data-tab]').forEach(b => b.onclick = () => {
      tab = b.dataset.tab;
      managerView();
    });

    $('pageTitle').textContent = tabs.find(t => t[0] === tab)?.[1];
    $('modeLabel').textContent = server ? 'متصل بالخادم الحقيقي • الحفظ دائم ومحمي' : 'وضع معاينة محلي في المتصفح';
    drawEditor();
  }
}

function field(label, key, value, type = 'text', wide = false) {
  return `<label class="field ${wide ? 'wide' : ''}"><span>${label}</span>${type === 'textarea' ? `<textarea data-key="${key}">${esc(value)}</textarea>` : `<input data-key="${key}" type="${type}" value="${esc(value)}">`}</label>`;
}

async function drawEditor() {
  const e = $('editor');

  // Overview Tab
  if (tab === 'overview') {
    e.innerHTML = `<div class="panel">
      <div class="eyebrow">WELCOME TO FET MANAGER</div>
      <h3>أهلاً بك في لوحة تحكم FET STORE 👋</h3>
      <p class="muted">أدر سكربتاتك، راقب أرباح وطلبات العملاء، عدّل سلايدر الصفحة الأولى، وتحكم بكامل المتجر من مكان واحد.</p>
      <div class="stats" style="margin:20px 0 0">
        <div class="stat"><b>${store.products.length}</b><small>السكربتات</small></div>
        <div class="stat"><b>${(store.hero_slides || []).length}</b><small>شرائح السلايدر</small></div>
        <div class="stat"><b>${store.categories.length}</b><small>الأقسام</small></div>
      </div>
    </div>
    <div class="note warn">${server ? 'نظام الحفظ المباشر مفعل على السيرفر. يمكنك تنزيل نسخة احتياطية من تبويب النسخ الاحتياطي في أي وقت.' : 'أنت في وضع المعاينة المحلية. عند تشغيل server.js سيعمل حساب المدير المحمي تلقائياً.'}</div>`;
    return;
  }

  // Orders & Revenue Analytics Tab
  if (tab === 'orders') {
    e.innerHTML = `<div class="panel">
      <div class="eyebrow">REVENUE & ORDERS ANALYTICS</div>
      <h3>حساب الأرباح والطلبات 💰</h3>
      <p class="muted">متابعة دقيقة لكل عملية شراء وسجل حسابات العملاء المربوطة بديسكورد.</p>
      <div id="analyticsLoader" style="padding:20px;text-align:center;color:var(--muted);">جاري احتساب البيانات والأرباح...</div>
      <div id="analyticsView" hidden>
        <div class="kpi-grid">
          <div class="kpi-card">
            <small>إجمالي الأرباح المحققة</small>
            <b id="kpiRevenue">0.00 ر.س</b>
          </div>
          <div class="kpi-card">
            <small>عدد الطلبات الإجمالي</small>
            <b id="kpiOrders">0</b>
          </div>
          <div class="kpi-card">
            <small>العملاء المميزين</small>
            <b id="kpiCustomers">0</b>
          </div>
          <div class="kpi-card">
            <small>حالة الربط بديسكورد</small>
            <b style="font-size:18px;color:#c0f9b0;">${store.settings.discord_bot_token ? 'مفعل ✦' : 'غير متصل'}</b>
          </div>
        </div>
        <h4 style="margin:20px 0 12px;font-size:18px;">سجل الطلبات الأخير</h4>
        <div class="rows" id="ordersListRows"></div>
      </div>
    </div>`;

    try {
      let analytics = { totalRevenue: '0.00 ر.س', totalOrders: 0, totalCustomers: 0 };
      let ordersList = [];

      if (server) {
        analytics = await api('admin/analytics');
        const oRes = await api('admin/orders');
        ordersList = oRes.orders || [];
      } else {
        const demoOrders = JSON.parse(localStorage.getItem('fet_demo_orders') || '[]');
        let rev = 0;
        const custs = new Set();
        demoOrders.forEach(o => {
          rev += (o.totalNum || parseNumericPrice(o.total));
          if (o.customer && o.customer.id) custs.add(o.customer.id);
        });
        analytics = {
          totalRevenue: rev.toFixed(2) + ' ر.س',
          totalOrders: demoOrders.length,
          totalCustomers: custs.size
        };
        ordersList = demoOrders;
      }

      $('analyticsLoader').hidden = true;
      $('analyticsView').hidden = false;
      $('kpiRevenue').textContent = analytics.totalRevenue;
      $('kpiOrders').textContent = analytics.totalOrders;
      $('kpiCustomers').textContent = analytics.totalCustomers;

      const rowsEl = $('ordersListRows');
      if (ordersList.length === 0) {
        rowsEl.innerHTML = '<div class="muted">لا توجد طلبات مسجلة بعد. عند قيام العميل بالشراء ستظهر هنا فوراً.</div>';
      } else {
        rowsEl.innerHTML = ordersList.map(o => `
          <div class="editrow" style="align-items:flex-start;">
            <div>
              <strong style="color:var(--accent);font-size:16px;">طلب #${esc(o.id)}</strong>
              <small style="margin-top:2px;">العميل: <b style="color:#fff;">${esc(o.customer?.username || 'مجهول')}</b> (ID: ${esc(o.customer?.id || '—')})</small>
              <small style="color:var(--muted);">${new Date(o.date).toLocaleString('ar-SA')}</small>
              <div style="margin-top:8px;font-size:12px;color:#d5e5d3;">
                ${(o.items || []).map(i => `• ${esc(i.name)} (الكمية: ${i.qty}) — ${formatPrice(i.price)}`).join('<br>')}
              </div>
            </div>
            <div style="text-align:left;">
              <strong style="font-size:18px;color:var(--accent);">${esc(o.total)}</strong>
              <small style="color:#a4e59b;margin-top:4px;">${esc(o.status || 'مكتمل ✅')}</small>
            </div>
          </div>
        `).join('');
      }
    } catch (err) {
      $('analyticsLoader').innerHTML = `<div class="note warn">تعذر تحميل البيانات: ${esc(err.message)}</div>`;
    }
    return;
  }

  // Hero Slides Tab
  if (tab === 'heroSlides') {
    const slides = store.hero_slides || [];
    e.innerHTML = `<div class="panel">
      <div class="toolbar">
        <div>
          <h3>إدارة سلايدر الصفحة الأولى (Auto-Slider) 🎬</h3>
          <span class="muted">التحكم في البنرات الدوارة كل 5 ثوانٍ، النصوص، الصور وروابط الأزرار</span>
        </div>
        <button class="btn" id="addSlideBtn">+ إضافة بنر جديد</button>
      </div>

      <div class="fields" style="margin-bottom:20px;">
        <label class="field">
          <span>مدة دوران السلايدر التلقائي (بالثواني)</span>
          <input type="number" min="2" max="60" id="heroIntervalInput" value="${store.settings.hero_interval || 5}">
        </label>
      </div>

      <div class="rows">${slides.map((s, i) => `<div class="editrow">
        <div>
          <strong style="color:var(--accent);">${esc(s.headline)}</strong>
          <small>${esc(s.eyebrow || '')} • ${esc(s.description || '')}</small>
        </div>
        <div class="rowactions">
          <button class="btn ghost small" data-slide-up="${i}" ${i === 0 ? 'disabled' : ''}>↑</button>
          <button class="btn ghost small" data-slide-down="${i}" ${i === slides.length - 1 ? 'disabled' : ''}>↓</button>
          <button class="btn outline small" data-slide-edit="${i}">تعديل</button>
          <button class="btn ghost small" data-slide-del="${i}">حذف</button>
        </div>
      </div>`).join('') || '<div class="muted">لا توجد شرائح حالياً. اضغط على "إضافة بنر جديد".</div>'}</div>
    </div>`;

    $('heroIntervalInput').onchange = (ev) => {
      store.settings.hero_interval = Math.max(2, parseInt(ev.target.value) || 5);
      startSlideTimer();
    };

    $('addSlideBtn').onclick = () => openEdit('heroSlides', -1);

    e.querySelectorAll('[data-slide-edit]').forEach(b => b.onclick = () => openEdit('heroSlides', +b.dataset.slideEdit));
    e.querySelectorAll('[data-slide-del]').forEach(b => b.onclick = () => {
      if (confirm('هل أنت متأكد من حذف هذا البنر؟')) {
        slides.splice(+b.dataset.slideDel, 1);
        drawEditor();
        render();
      }
    });
    e.querySelectorAll('[data-slide-up],[data-slide-down]').forEach(b => b.onclick = () => {
      const i = +(b.dataset.slideUp ?? b.dataset.slideDown);
      const j = i + (b.hasAttribute('data-slide-up') ? -1 : 1);
      [slides[i], slides[j]] = [slides[j], slides[i]];
      drawEditor();
      render();
    });
    return;
  }

  // Backup Tab
  if (tab === 'backup') {
    e.innerHTML = `<div class="panel">
      <h3>النسخ الاحتياطي وإدارة البيانات 💾</h3>
      <p class="muted">احتفظ بنسخة كاملة من جميع سكربتاتك وأسعارك والطلبات وإعدادات المتجر بملف واحد على جهازك، وتقدر تسترجعها بأي لحظة بنقرة زر.</p>
      <div style="display:flex;gap:14px;flex-wrap:wrap;margin:22px 0">
        <button class="btn" id="exportBackupBtn">تصدير وتحميل النسخة الاحتياطية 📥</button>
        <label class="btn outline" style="margin:0;cursor:pointer">
          استيراد نسخة سابقة 📤
          <input type="file" id="importBackupFile" accept=".json,application/json" style="display:none">
        </label>
      </div>
      <div class="note warn">💡 <b>نصيحة ذهبية:</b> إذا كنت تستخدم استضافة سحابية مجانية، يُفضَّل دائماً تحميل نسخة احتياطية بعد إضافة منتجات جديدة لحفظها على جهازك للأمان.</div>
    </div>`;

    $('exportBackupBtn').onclick = async () => {
      try {
        let dataToExport = store;
        if (server) {
          const res = await api('backup/export');
          if (res.ok && res.data) dataToExport = res.data;
        }
        const blob = new Blob([JSON.stringify(dataToExport, null, 2)], { type: 'application/json' });
        const a = document.createElement('a');
        a.href = URL.createObjectURL(blob);
        a.download = `fet-store-backup-${new Date().toISOString().slice(0, 10)}.json`;
        a.click();
        toast('تم تحميل ملف النسخة الاحتياطية بنجاح ✓', '📥');
      } catch (err) {
        toast('تعذر التصدير: ' + err.message, '⚠️');
      }
    };

    $('importBackupFile').onchange = async ev => {
      const file = ev.target.files[0];
      if (!file) return;
      try {
        const text = await file.text();
        const parsed = JSON.parse(text);
        if (server) {
          await api('backup/import', { data: parsed });
        }
        store = parsed.settings ? parsed : clone(seed);
        if (!server) localStorage.setItem('fet_demo_v3', JSON.stringify(store));
        drawEditor();
        render();
        toast('تمت استعادة المتجر بنجاح ✓', '✅');
      } catch (err) {
        toast('خطأ في استيراد الملف: ' + err.message, '⚠️');
      }
    };
    return;
  }

  // Products, Categories, Navigation
  if (['products', 'categories', 'navigation'].includes(tab)) {
    const type = tab;
    const arr = type === 'products' ? store.products : type === 'categories' ? store.categories : store.nav;
    e.innerHTML = `<div class="panel">
      <div class="toolbar">
        <div>
          <h3>${type === 'products' ? 'إدارة السكربتات والمنتجات' : type === 'categories' ? 'أقسام المتجر' : 'روابط القائمة العلوية'}</h3>
          <span class="muted">إضافة، تعديل، حذف، وترتيب العناصر</span>
        </div>
        <button class="btn" id="addItem">+ إضافة جديد</button>
      </div>
      <div class="rows">${arr.map((x, i) => `<div class="editrow">
        <div>
          <strong>${esc(x.name || x.label)}</strong>
          <small>${esc(x.desc || x.href || x.id)}</small>
        </div>
        <div class="rowactions">
          <button class="btn ghost small" data-up="${i}" ${i === 0 ? 'disabled' : ''}>↑</button>
          <button class="btn ghost small" data-down="${i}" ${i === arr.length - 1 ? 'disabled' : ''}>↓</button>
          <button class="btn outline small" data-edit="${i}">تعديل</button>
          <button class="btn ghost small" data-del="${i}">حذف</button>
        </div>
      </div>`).join('') || '<div class="muted">ما فيه عناصر بعد. اضغط إضافة جديد.</div>'}</div>
    </div>`;

    $('addItem').onclick = () => openEdit(type, -1);
    e.querySelectorAll('[data-edit]').forEach(b => b.onclick = () => openEdit(type, +b.dataset.edit));
    e.querySelectorAll('[data-del]').forEach(b => b.onclick = () => {
      if (confirm('هل أنت متأكد من حذف هذا العنصر؟')) {
        arr.splice(+b.dataset.del, 1);
        drawEditor();
        render();
      }
    });
    e.querySelectorAll('[data-up],[data-down]').forEach(b => b.onclick = () => {
      const i = +(b.dataset.up ?? b.dataset.down);
      const j = i + (b.hasAttribute('data-up') ? -1 : 1);
      [arr[i], arr[j]] = [arr[j], arr[i]];
      drawEditor();
      render();
    });
    return;
  }

  // Content & Settings Tabs
  const s = store.settings;
  if (tab === 'content') {
    e.innerHTML = `<div class="panel">
      <h3>الهوية والنصوص</h3>
      <div class="fields">
        ${field('اسم المتجر', 'brand', s.brand)}
        ${field('السطر الإنجليزي العلوي', 'eyebrow', s.eyebrow)}
        ${field('عنوان الصفحة الرئيسية', 'headline', s.headline, 'text', true)}
        ${field('الكلمة المميزة بالأخضر', 'highlight', s.highlight)}
        ${field('اللون الأساسي', 'accent', s.accent, 'color')}
        ${field('وصف الصفحة الرئيسي', 'description', s.description, 'textarea', true)}
        ${field('مسار الشعار', 'logo', s.logo, 'text', true)}
      </div>
      <p class="muted">الشعار الأصلي موجود في assets/logo.png. لرفع شعار جديد استخدم الزر أدناه:</p>
      <div style="display:flex;gap:10px;align-items:center;margin-top:10px">
        <input id="logoFile" type="file" accept="image/png,image/jpeg,image/webp">
        <button class="btn ghost small" id="uploadLogo">رفع الشعار</button>
      </div>
    </div>`;
  } else {
    // Settings Tab (Discord Bot, Roles, Links)
    e.innerHTML = `<div class="panel">
      <h3>إعدادات ديسكورد والربط التلقائي ⚙️</h3>
      <div class="fields">
        ${field('رابط سيرفر ديسكورد الدعم والتذاكر', 'discord', s.discord, 'url', true)}
        ${field('الشريط الإعلاني العلوي', 'announcement', s.announcement, 'text', true)}
        ${field('Discord Client ID (معرف تطبيق الديسكورد للـ OAuth2)', 'discord_client_id', s.discord_client_id || '')}
        ${field('Discord Client Secret (الرمز السري لتطبيق الديسكورد)', 'discord_client_secret', s.discord_client_secret || '', 'password')}
        ${field('Discord Bot Token (توكن بوت الديسكورد للرول التلقائي)', 'discord_bot_token', s.discord_bot_token || '', 'password', true)}
        ${field('Discord Guild ID (آيدي سيرفرك بالديسكورد)', 'discord_guild_id', s.discord_guild_id || '')}
        ${field('Discord Customer Role ID (آيدي رول العميل)', 'discord_customer_role_id', s.discord_customer_role_id || '')}
      </div>
      <div class="note">✅ عند إدخال بيانات بوت الديسكورد، سيقوم المتجر تلقائياً بمنح رول العميل للمشتري فور قيامه بالطلب!</div>
    </div>`;
  }

  e.querySelectorAll('[data-key]').forEach(input => input.oninput = () => {
    store.settings[input.dataset.key] = input.value;
    render();
  });

  if ($('uploadLogo')) {
    $('uploadLogo').onclick = async () => {
      const f = $('logoFile').files[0];
      if (f) {
        await upload(f, p => {
          store.settings.logo = p;
          drawEditor();
          render();
        });
      }
    };
  }
}

// -------------------------------------------------------------
// EDIT MODAL HANDLER
// -------------------------------------------------------------
function openEdit(type, index) {
  editType = type;
  editIndex = index;
  let obj;

  if (type === 'heroSlides') {
    const slides = store.hero_slides || [];
    obj = index >= 0 ? slides[index] : {
      id: 'slide_' + Date.now(),
      eyebrow: 'PREMIUM QBCORE SCRIPTS',
      headline: '',
      highlight: '',
      description: '',
      image: '',
      tag: '✦ BUILT FOR QBCORE',
      cta_text: 'استكشف السكربتات ←',
      cta_link: '#scripts'
    };
  } else {
    const arr = type === 'products' ? store.products : type === 'categories' ? store.categories : store.nav;
    obj = index >= 0 ? arr[index] : (
      type === 'products'
        ? { id: '', name: '', category: store.categories[0]?.id || '', desc: '', price: '', image: '', badge: '', checkoutUrl: '', featured: false }
        : type === 'categories'
        ? { id: '', name: '' }
        : { id: '', label: '', href: '#home' }
    );
  }

  $('modalTitle').textContent = index >= 0 ? 'تعديل العنصر' : 'إضافة عنصر جديد';
  let html = '';

  if (type === 'heroSlides') {
    html = field('العنوان الإنجليزي الصغير (Eyebrow)', 'eyebrow', obj.eyebrow) +
      field('الكلمة المميزة بالأخضر في العنوان', 'highlight', obj.highlight) +
      field('عنوان البنر الرئيسي (Headline)', 'headline', obj.headline, 'text', true) +
      field('وصف البنر', 'description', obj.description, 'textarea', true) +
      field('الشارة العائمة (Tag مثل: ✦ BUILT FOR QBCORE)', 'tag', obj.tag) +
      field('نص زر الشراء/التصفح', 'cta_text', obj.cta_text) +
      field('رابط الزر (مثل: #scripts أو رابط خارجي)', 'cta_link', obj.cta_link, 'text', true) +
      field('رابط صورة البنر (أو ارفع بالأسفل)', 'image', obj.image, 'text', true) +
      `<label class="field wide">رفع صورة للبنر من جهازك (PNG / JPG / WebP)<input type="file" id="slideFile" accept="image/png,image/jpeg,image/webp"></label>`;
  } else if (type === 'products') {
    html = field('اسم السكربت', 'name', obj.name) +
      `<label class="field"><span>القسم</span><select data-key="category">${store.categories.map(c => `<option value="${esc(c.id)}" ${c.id === obj.category ? 'selected' : ''}>${esc(c.name)}</option>`).join('')}</select></label>` +
      field('السعر بالريال السعودي (مثال: 125 ر.س)', 'price', obj.price) +
      field('شارة المنتج (مثال: جديد / مميز)', 'badge', obj.badge) +
      field('وصف السكربت ومميزاته', 'desc', obj.desc, 'textarea', true) +
      field('رابط صورة المنتج (أو ارفع بالأسفل)', 'image', obj.image, 'text', true) +
      field('رابط شراء مباشر Tebex (اختياري)', 'checkoutUrl', obj.checkoutUrl, 'url', true) +
      `<label class="field wide">رفع صورة السكربت من جهازك (PNG / JPG / WebP، حتى 3MB)<input type="file" id="productFile" accept="image/png,image/jpeg,image/webp"></label>`;
  } else if (type === 'categories') {
    html = field('اسم القسم', 'name', obj.name) + field('معرف القسم (إنجليزي)', 'id', obj.id);
  } else {
    html = field('اسم الرابط', 'label', obj.label) + field('الرابط (#home أو رابط خارجي https)', 'href', obj.href);
  }

  $('modalFields').innerHTML = html;
  $('editModal').showModal();
}

async function upload(file, cb) {
  if (file.size > 3e6) {
    toast('الصورة أكبر من 3MB', '⚠️');
    return;
  }
  const data = await new Promise((ok, no) => {
    const r = new FileReader();
    r.onload = () => ok(r.result);
    r.onerror = no;
    r.readAsDataURL(file);
  });
  if (server) {
    const j = await api('upload', { image: data });
    cb(j.path);
  } else {
    cb(data);
    toast('تم حفظ الصورة في المتصفح', '✓');
  }
}

$('editForm').onsubmit = async e => {
  e.preventDefault();
  const type = editType;

  if (type === 'heroSlides') {
    if (!store.hero_slides) store.hero_slides = [];
    const arr = store.hero_slides;
    const old = editIndex >= 0 ? arr[editIndex] : {};
    const o = { ...old };
    $('modalFields').querySelectorAll('[data-key]').forEach(x => o[x.dataset.key] = x.value);
    o.id = o.id || 'slide_' + Date.now();
    if (!o.headline.trim()) return toast('يرجى إدخال عنوان البنر', '⚠️');

    const f = $('slideFile')?.files[0];
    if (f) {
      try {
        await upload(f, p => o.image = p);
      } catch (err) {
        return toast(err.message, '⚠️');
      }
    }

    if (editIndex < 0) arr.push(o);
    else arr[editIndex] = o;

    $('editModal').close();
    drawEditor();
    render();
    return toast('تم حفظ شريحة البنر بنجاح ✓', '🎬');
  }

  const arr = type === 'products' ? store.products : type === 'categories' ? store.categories : store.nav;
  const old = editIndex >= 0 ? arr[editIndex] : {};
  const o = { ...old };

  $('modalFields').querySelectorAll('[data-key]').forEach(x => o[x.dataset.key] = x.value);

  if (type === 'products') {
    o.id = o.id || 'p_' + Date.now();
    if (!o.name.trim()) return toast('أدخل اسم السكربت', '⚠️');
    if (o.price) o.price = formatPrice(o.price);
    if (o.checkoutUrl) {
      try {
        const u = new URL(o.checkoutUrl);
        if (!['https:', 'http:'].includes(u.protocol)) throw Error();
      } catch {
        return toast('رابط الشراء غير صحيح (يجب أن يبدأ بـ https://)', '⚠️');
      }
    }
    const f = $('productFile')?.files[0];
    if (f) {
      try {
        await upload(f, p => o.image = p);
      } catch (err) {
        return toast(err.message, '⚠️');
      }
    }
  }

  if (type === 'categories') {
    o.id = o.id || 'cat_' + Date.now();
    if (!o.name.trim()) return toast('أدخل اسم القسم', '⚠️');
  }

  if (type === 'navigation') {
    o.id = o.id || 'nav_' + Date.now();
    if (!o.label.trim()) return toast('أدخل اسماً للرابط', '⚠️');
  }

  if (editIndex < 0) arr.push(o);
  else arr[editIndex] = o;

  $('editModal').close();
  drawEditor();
  render();
  toast('تم التعديل بنجاح؛ اضغط "حفظ التعديلات" لتثبيتها', '✓');
};

// Discord OAuth Sign-In Handlers
if ($('discordSignInBtn')) {
  $('discordSignInBtn').onclick = () => {
    loginWithDiscord();
  };
}

if ($('confirmAuthorizeBtn')) {
  $('confirmAuthorizeBtn').onclick = () => {
    loginWithDiscord();
  };
}

// Admin Login Form Submit
$('loginForm').onsubmit = async e => {
  e.preventDefault();
  const username = $('username').value;
  const password = $('password').value;
  try {
    if (server) {
      if (setup) {
        await api('register', { username, password });
        setup = false;
        toast('تم إنشاء حساب المدير بنجاح؛ سجّل دخولك الآن', '✓');
        managerView();
        return;
      }
      await api('login', { username, password });
      authed = true;
    } else {
      sessionStorage.setItem('fet_demo_admin', 'yes');
    }
    managerView();
  } catch (err) {
    toast(err.message, '⚠️');
  }
};

// Admin Save All
$('saveBtn').onclick = async () => {
  try {
    if (server) {
      await api('save', {
        settings: store.settings,
        hero_slides: store.hero_slides,
        nav: store.nav,
        categories: store.categories,
        products: store.products
      });
    } else {
      localStorage.setItem('fet_demo_v3', JSON.stringify(store));
    }
    toast(server ? 'تم حفظ التغييرات على الخادم بنجاح ✓' : 'تم حفظ المعاينة في المتصفح ✓', '💾');
  } catch (err) {
    toast('تعذر الحفظ: ' + err.message, '⚠️');
  }
};

$('exitBtn').onclick = () => location.hash = 'home';

$('logoutBtn').onclick = async () => {
  if (server) {
    try {
      await api('logout');
    } catch {}
    authed = false;
  } else {
    sessionStorage.removeItem('fet_demo_admin');
  }
  managerView();
};

// Start application
init();
