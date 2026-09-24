const seed = {
  settings: {
    brand: 'FET STORE',
    eyebrow: 'PREMIUM QBCORE SCRIPTS',
    headline: 'سكربتات ترفع مستوى سيرفرك.',
    highlight: 'سيرفرك.',
    description: 'متجر FET STORE لسكربتات FiveM المبنية لـ QBCore. أداء عالي، تجربة سلسة، وهوية فريدة.',
    accent: '#8cff36',
    discord: 'https://discord.gg/',
    announcement: '🔥 مرحباً بكم في متجر FET STORE — سكربتات QBCore الحصرية متوفرة الآن!',
    logo: 'assets/logo.png'
  },
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
      desc: 'نظام كراجات وسيارات متكامل وسلس مصمم لـ QBCore مع واجهة مميزة، نظام مشاركة المفاتيح، وتأمين وتعديل المركبات بأعلى أداء (0.00ms).',
      price: '$15.00',
      image: '',
      badge: 'الأكثر طلباً ⭐',
      checkoutUrl: '',
      featured: true
    },
    {
      id: 'luxury_inventory',
      name: 'انفنتوري وحقيبة متقدمة',
      category: 'ui',
      desc: 'حقيبة لاعبين عصرية وتفاعلية تدعم الوزن الواقعي، تخصيص الخزائن والمستودعات، وشريط وصول سريع للأسلحة بدون لاق.',
      price: '$20.00',
      image: '',
      badge: 'مميز 🔥',
      checkoutUrl: '',
      featured: true
    },
    {
      id: 'exclusive_jobs',
      name: 'حزمة وظائف واقتصاد حصرية',
      category: 'jobs',
      desc: 'باقة وظائف متقنة لتنشيط سيرفرك وجذب اللاعبين مع سجلات ديسكورد (Logs) ورتب رواتب واقعية ومدروسة.',
      price: '$12.00',
      image: '',
      badge: 'جديد ✦',
      checkoutUrl: '',
      featured: false
    }
  ]
};

const $ = id => document.getElementById(id);
const clone = x => JSON.parse(JSON.stringify(x));
const esc = x => String(x ?? '').replace(/[&<>"']/g, c => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' }[c]));

let store = clone(seed);
let server = false;
let authed = false;
let setup = false;
let tab = 'overview';
let filter = 'all';
let editIndex = -1;
let editType = '';

function toast(t) {
  const el = $('toast');
  el.textContent = t;
  el.classList.add('show');
  setTimeout(() => el.classList.remove('show'), 2800);
}

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
      store = JSON.parse(localStorage.getItem('fet_demo_v2')) || clone(seed);
    } catch {
      store = clone(seed);
    }
  }
  render();
  route();
  window.addEventListener('hashchange', route);
}

function render() {
  const s = store.settings;
  document.documentElement.style.setProperty('--accent', /^#[0-9a-fA-F]{6}$/.test(s.accent) ? s.accent : '#8cff36');
  $('announcement').textContent = s.announcement || '';
  for (const id of ['brandLogo', 'heroLogo']) {
    const el = $(id);
    if (el) el.src = s.logo || 'assets/logo.png';
  }
  $('eyebrow').textContent = s.eyebrow;
  $('headline').replaceChildren();
  const text = s.headline || '';
  const needle = s.highlight || '';
  const at = needle ? text.indexOf(needle) : -1;
  if (at >= 0) {
    $('headline').append(document.createTextNode(text.slice(0, at)));
    const span = document.createElement('span');
    span.textContent = needle;
    $('headline').append(span, document.createTextNode(text.slice(at + needle.length)));
  } else {
    $('headline').textContent = text;
  }
  $('description').textContent = s.description;
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
    cat.textContent = store.categories.find(c => c.id === p.category)?.name || 'QBCore';
    const h = document.createElement('h3');
    h.textContent = p.name;
    const d = document.createElement('p');
    d.textContent = p.desc;
    const bottom = document.createElement('div');
    bottom.className = 'bottom';
    const price = document.createElement('span');
    price.className = 'price';
    price.textContent = p.price || '—';
    const btn = document.createElement('button');
    btn.className = 'btn small';
    btn.textContent = p.checkoutUrl ? 'شراء الآن ↗' : 'التفاصيل 🔍';
    btn.onclick = () => {
      if (p.checkoutUrl) {
        try {
          const u = new URL(p.checkoutUrl);
          if (['https:', 'http:'].includes(u.protocol)) {
            window.open(u.href, '_blank');
            return;
          }
        } catch {}
      }
      $('detailTitle').textContent = p.name;
      $('detailDesc').textContent = p.desc;
      $('detailModal').showModal();
    };
    bottom.append(price, btn);
    body.append(cat, h, d, bottom);
    el.append(thumb, body);
    $('products').append(el);
  });
}

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
    $('loginInfo').textContent = server && setup ? 'أنشئ حساب المدير مرة واحدة فقط لتأمين المتجر.' : 'إدارة المنتجات، الأسعار، والنصوص';
    $('loginSubmit').textContent = server && setup ? 'إنشاء الحساب' : 'دخول الإدارة';
    $('demoNotice').hidden = server;
    $('password').minLength = server ? 6 : 1;
  } else {
    const tabs = [
      ['overview', 'نظرة عامة'],
      ['products', 'المنتجات والسكربتات'],
      ['categories', 'الأقسام'],
      ['navigation', 'القائمة العلوية'],
      ['content', 'النصوص والهوية'],
      ['settings', 'الروابط والإعدادات'],
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

function drawEditor() {
  const e = $('editor');
  if (tab === 'overview') {
    e.innerHTML = `<div class="panel">
      <div class="eyebrow">WELCOME TO FET MANAGER</div>
      <h3>أهلاً بك في لوحة تحكم FET STORE 👋</h3>
      <p class="muted">أضف سكربتاتك، عدّل الأسعار والأقسام، وغيّر روابط الشراء والدعم مباشرة من هنا.</p>
      <div class="stats" style="margin:20px 0 0">
        <div class="stat"><b>${store.products.length}</b><small>السكربتات</small></div>
        <div class="stat"><b>${store.categories.length}</b><small>الأقسام</small></div>
        <div class="stat"><b>${store.nav.length}</b><small>روابط القائمة</small></div>
      </div>
    </div>
    <div class="note warn">${server ? 'نظام الحفظ المباشر مفعل على السيرفر. يمكنك تنزيل نسخة احتياطية من تبويب النسخ الاحتياطي في أي وقت.' : 'أنت في وضع المعاينة المحلية. عند رفع المتجر على الاستضافة سيعمل حساب المدير المحمي تلقائياً.'}</div>`;
    return;
  }

  if (tab === 'backup') {
    e.innerHTML = `<div class="panel">
      <h3>النسخ الاحتياطي وإدارة البيانات 💾</h3>
      <p class="muted">احتفظ بنسخة كاملة من جميع سكربتاتك وأسعارك وإعدادات المتجر بملف واحد على جهازك، وتقدر تسترجعها بأي لحظة بنقرة زر.</p>
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
        toast('تم تحميل ملف النسخة الاحتياطية بنجاح ✓');
      } catch (err) {
        toast('تعذر التصدير: ' + err.message);
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
        if (!server) localStorage.setItem('fet_demo_v2', JSON.stringify(store));
        drawEditor();
        render();
        toast('تمت استعادة المتجر بنجاح ✓');
      } catch (err) {
        toast('خطأ في استيراد الملف: ' + err.message);
      }
    };
    return;
  }

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

  const s = store.settings;
  e.innerHTML = tab === 'content' ? `<div class="panel">
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
  </div>` : `<div class="panel">
    <h3>روابط وإعدادات المتجر</h3>
    <div class="fields">
      ${field('رابط ديسكورد الدعم والتذاكر', 'discord', s.discord, 'url', true)}
      ${field('الشريط الإعلاني العلوي', 'announcement', s.announcement, 'text', true)}
    </div>
    <div class="note">✅ يمكنك وضع رابط سيرفر ديسكورد أو رابط تكت أو صفحة الشراء الخاصة بك.</div>
  </div>`;

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

function openEdit(type, index) {
  editType = type;
  editIndex = index;
  const obj = index >= 0
    ? (type === 'products' ? store.products : type === 'categories' ? store.categories : store.nav)[index]
    : type === 'products'
    ? { id: '', name: '', category: store.categories[0]?.id || '', desc: '', price: '', image: '', badge: '', checkoutUrl: '', featured: false }
    : type === 'categories'
    ? { id: '', name: '' }
    : { id: '', label: '', href: '#home' };

  $('modalTitle').textContent = index >= 0 ? 'تعديل العنصر' : 'إضافة عنصر جديد';
  let html = '';
  if (type === 'products') {
    html = field('اسم السكربت', 'name', obj.name) +
      `<label class="field"><span>القسم</span><select data-key="category">${store.categories.map(c => `<option value="${esc(c.id)}" ${c.id === obj.category ? 'selected' : ''}>${esc(c.name)}</option>`).join('')}</select></label>` +
      field('السعر (مثال: $15.00 أو 50 ر.س)', 'price', obj.price) +
      field('شارة المنتج (مثال: جديد / مميز)', 'badge', obj.badge) +
      field('وصف السكربت ومميزاته', 'desc', obj.desc, 'textarea', true) +
      field('رابط صورة المنتج (أو ارفع بالأسفل)', 'image', obj.image, 'text', true) +
      field('رابط الشراء (Tebex، ديسكورد، سلة، أو أي رابط دفع)', 'checkoutUrl', obj.checkoutUrl, 'url', true) +
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
    toast('الصورة أكبر من 3MB');
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
    toast('تم الحفظ في معاينة المتصفح فقط');
  }
}

$('editForm').onsubmit = async e => {
  e.preventDefault();
  const type = editType;
  const arr = type === 'products' ? store.products : type === 'categories' ? store.categories : store.nav;
  const old = editIndex >= 0 ? arr[editIndex] : {};
  const o = { ...old };

  $('modalFields').querySelectorAll('[data-key]').forEach(x => o[x.dataset.key] = x.value);

  if (type === 'products') {
    o.id = o.id || 'p_' + Date.now();
    if (!o.name.trim()) return toast('أدخل اسم السكربت');
    if (o.checkoutUrl) {
      try {
        const u = new URL(o.checkoutUrl);
        if (!['https:', 'http:'].includes(u.protocol)) throw Error();
      } catch {
        return toast('رابط الشراء غير صحيح (يجب أن يبدأ بـ https://)');
      }
    }
    const f = $('productFile').files[0];
    if (f) {
      try {
        await upload(f, p => o.image = p);
      } catch (err) {
        return toast(err.message);
      }
    }
  }

  if (type === 'categories') {
    o.id = o.id || 'cat_' + Date.now();
    if (!o.name.trim()) return toast('أدخل اسم القسم');
  }

  if (type === 'navigation') {
    o.id = o.id || 'nav_' + Date.now();
    if (!o.label.trim()) return toast('أدخل اسماً للرابط');
  }

  if (editIndex < 0) arr.push(o);
  else arr[editIndex] = o;

  $('editModal').close();
  drawEditor();
  render();
  toast('تم التعديل بنجاح؛ اضغط "حفظ التعديلات" لتثبيتها');
};

$('loginForm').onsubmit = async e => {
  e.preventDefault();
  const username = $('username').value;
  const password = $('password').value;
  try {
    if (server) {
      if (setup) {
        await api('register', { username, password });
        setup = false;
        toast('تم إنشاء حساب المدير بنجاح؛ سجّل دخولك الآن');
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
    toast(err.message);
  }
};

$('saveBtn').onclick = async () => {
  try {
    if (server) {
      await api('save', {
        settings: store.settings,
        nav: store.nav,
        categories: store.categories,
        products: store.products
      });
    } else {
      localStorage.setItem('fet_demo_v2', JSON.stringify(store));
    }
    toast(server ? 'تم حفظ التغييرات على الخادم بنجاح ✓' : 'تم حفظ المعاينة في المتصفح ✓');
  } catch (err) {
    toast('تعذر الحفظ: ' + err.message);
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

init();
