'use strict';
const http = require('node:http');
const fs = require('node:fs');
const path = require('node:path');
const crypto = require('node:crypto');
const https = require('node:https');

const root = __dirname;
const dataDir = path.join(root, 'data');
const dbFile = path.join(dataDir, 'store.json');
const ordersFile = path.join(dataDir, 'orders.json');
const customersFile = path.join(dataDir, 'customers.json');
fs.mkdirSync(dataDir, { recursive: true });

const initialHeroSlides = [
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

const initial = {
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
    discord_client_id: '',
    discord_client_secret: '',
    discord_bot_token: '',
    discord_guild_id: '',
    discord_customer_role_id: ''
  },
  hero_slides: initialHeroSlides,
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
      desc: 'السلام عليكم ورحمة الله وبركاته.\nنظام كراجات وسيارات متكامل وسلس مصمم خصيصاً لـ QBCore.\n\nالمميزات:\n- واجهة عصرية وسلسة تفتح بسلاسة وبدون أي لاق (0.00ms)\n- نظام متكامل لمشاركة المفاتيح وإعارة المركبات للأصدقاء\n- نظام الحجز والتأمين واسترجاع المركبات بأسعار قابلة للتهيئة\n- متوافق بالكامل مع جميع سيرفرات الحياة الواقعية\n- دعم فني وتحديثات مستمرة',
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
  ],
  admin: null,
  sessions: {},
  customer_sessions: {}
};

// Safe DB loader with atomic write
let db;
try {
  db = JSON.parse(fs.readFileSync(dbFile, 'utf8'));
  if (!db.products || db.products.length === 0) db.products = initial.products;
  if (!db.hero_slides || db.hero_slides.length === 0) db.hero_slides = initialHeroSlides;
  if (!db.settings.hero_interval) db.settings.hero_interval = 5;
  if (!db.customer_sessions) db.customer_sessions = {};
} catch {
  db = initial;
  save();
}

function save() {
  const tmp = dbFile + '.tmp';
  fs.writeFileSync(tmp, JSON.stringify(db, null, 2), { mode: 0o600 });
  fs.renameSync(tmp, dbFile);
}

// Orders DB loader
let orders = [];
try {
  orders = JSON.parse(fs.readFileSync(ordersFile, 'utf8'));
} catch {
  orders = [];
  saveOrders();
}

function saveOrders() {
  const tmp = ordersFile + '.tmp';
  fs.writeFileSync(tmp, JSON.stringify(orders, null, 2), { mode: 0o600 });
  fs.renameSync(tmp, ordersFile);
}

// Customers DB loader
let customers = {};
try {
  customers = JSON.parse(fs.readFileSync(customersFile, 'utf8'));
} catch {
  customers = {};
  saveCustomers();
}

function saveCustomers() {
  const tmp = customersFile + '.tmp';
  fs.writeFileSync(tmp, JSON.stringify(customers, null, 2), { mode: 0o600 });
  fs.renameSync(tmp, customersFile);
}

const types = {
  '.html': 'text/html; charset=utf-8',
  '.js': 'text/javascript; charset=utf-8',
  '.css': 'text/css; charset=utf-8',
  '.png': 'image/png',
  '.jpg': 'image/jpeg',
  '.jpeg': 'image/jpeg',
  '.webp': 'image/webp',
  '.ico': 'image/x-icon',
  '.json': 'application/json; charset=utf-8'
};

const limiter = new Map();
function limit(req) {
  const ip = req.headers['x-forwarded-for']?.split(',')[0].trim() || req.socket.remoteAddress || 'unknown';
  const now = Date.now();
  const v = limiter.get(ip) || [];
  const fresh = v.filter(t => now - t < 15 * 60 * 1000);
  fresh.push(now);
  limiter.set(ip, fresh);
  return fresh.length <= 120;
}

function json(res, status, obj) {
  res.writeHead(status, {
    'content-type': 'application/json; charset=utf-8',
    'cache-control': 'no-store',
    'x-content-type-options': 'nosniff'
  });
  res.end(JSON.stringify(obj));
}

function read(req) {
  return new Promise((resolve, reject) => {
    let s = '', n = 0;
    req.on('data', c => {
      n += c.length;
      if (n > 5e6) {
        reject(Error('Payload too large'));
        req.destroy();
      } else {
        s += c;
      }
    });
    req.on('end', () => {
      try {
        resolve(JSON.parse(s || '{}'));
      } catch {
        reject(Error('Invalid JSON'));
      }
    });
    req.on('error', reject);
  });
}

function hash(p, s) {
  return crypto.scryptSync(p, s, 64).toString('hex');
}

function validAdminSession(req) {
  const t = (req.headers.cookie || '').match(/(?:^|;\s*)fet_session=([a-f0-9]{64})/);
  if (!t) return false;
  const k = crypto.createHash('sha256').update(t[1]).digest('hex');
  return db.sessions && db.sessions[k] && db.sessions[k] > Date.now();
}

function getCustomerSession(req) {
  const t = (req.headers.cookie || '').match(/(?:^|;\s*)fet_customer_session=([a-f0-9]{64})/);
  if (!t) return null;
  const k = crypto.createHash('sha256').update(t[1]).digest('hex');
  if (!db.customer_sessions) db.customer_sessions = {};
  const sess = db.customer_sessions[k];
  if (sess && sess.expires > Date.now()) {
    return sess.user;
  }
  return null;
}

function publicData() {
  const { admin, sessions, customer_sessions, ...pub } = db;
  // Don't expose secret in public settings
  const safeSettings = { ...pub.settings };
  delete safeSettings.discord_client_secret;
  delete safeSettings.discord_bot_token;
  return { ...pub, settings: safeSettings, setupRequired: !admin };
}

function safeUrl(v) {
  if (!v) return '';
  try {
    const u = new URL(v);
    return (u.protocol === 'https:' || u.protocol === 'http:') ? u.href : '';
  } catch {
    return '';
  }
}

function formatPriceNumber(priceStr) {
  if (!priceStr) return 0;
  const num = parseFloat(String(priceStr).replace(/[^\d.]/g, ''));
  return isNaN(num) ? 0 : num;
}

// Function to automatically assign Discord role upon purchase
async function grantDiscordRole(discordId, roleId, guildId, botToken) {
  if (!discordId || !roleId || !guildId || !botToken) return false;
  try {
    const options = {
      hostname: 'discord.com',
      port: 443,
      path: `/api/v10/guilds/${guildId}/members/${discordId}/roles/${roleId}`,
      method: 'PUT',
      headers: {
        'Authorization': `Bot ${botToken}`,
        'Content-Type': 'application/json',
        'X-Audit-Log-Reason': 'FET STORE: Automatic Customer Role Purchase'
      }
    };
    return new Promise((resolve) => {
      const req = https.request(options, (res) => {
        resolve(res.statusCode >= 200 && res.statusCode < 300);
      });
      req.on('error', () => resolve(false));
      req.end();
    });
  } catch {
    return false;
  }
}

// Discord OAuth Code Exchange
function exchangeDiscordCode(code, redirectUri, clientId, clientSecret) {
  return new Promise((resolve, reject) => {
    const params = new URLSearchParams({
      client_id: clientId,
      client_secret: clientSecret,
      grant_type: 'authorization_code',
      code: code,
      redirect_uri: redirectUri
    }).toString();

    const options = {
      hostname: 'discord.com',
      port: 443,
      path: '/api/v10/oauth2/token',
      method: 'POST',
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded',
        'Content-Length': Buffer.byteLength(params)
      }
    };

    const req = https.request(options, (res) => {
      let body = '';
      res.on('data', chunk => body += chunk);
      res.on('end', () => {
        try {
          resolve(JSON.parse(body));
        } catch (e) {
          reject(e);
        }
      });
    });
    req.on('error', reject);
    req.write(params);
    req.end();
  });
}

function fetchDiscordUser(accessToken) {
  return new Promise((resolve, reject) => {
    const options = {
      hostname: 'discord.com',
      port: 443,
      path: '/api/v10/users/@me',
      method: 'GET',
      headers: {
        'Authorization': `Bearer ${accessToken}`,
        'User-Agent': 'FET-STORE (https://github.com/tya113271-gif/FetStore, 1.0.0)'
      }
    };
    const req = https.request(options, (res) => {
      let body = '';
      res.on('data', chunk => body += chunk);
      res.on('end', () => {
        try {
          resolve(JSON.parse(body));
        } catch (e) {
          reject(e);
        }
      });
    });
    req.on('error', reject);
    req.end();
  });
}

function clean(payload) {
  if (!payload || typeof payload !== 'object') throw Error('Invalid data');
  const s = payload.settings || {};
  const nav = payload.nav || [];
  const cats = payload.categories || [];
  const prods = payload.products || [];
  const slides = payload.hero_slides || [];

  const str = (x, max = 500) => String(x ?? '').slice(0, max);
  const color = /^#[0-9a-fA-F]{6}$/.test(s.accent) ? s.accent : '#8cff36';

  return {
    settings: {
      brand: str(s.brand, 60),
      eyebrow: str(s.eyebrow, 100),
      headline: str(s.headline, 160),
      highlight: str(s.highlight, 80),
      description: str(s.description, 800),
      accent: color,
      discord: safeUrl(s.discord),
      announcement: str(s.announcement, 250),
      logo: str(s.logo, 300),
      hero_interval: Math.max(2, Math.min(60, parseInt(s.hero_interval) || 5)),
      discord_client_id: str(s.discord_client_id, 100),
      discord_client_secret: str(s.discord_client_secret, 150),
      discord_bot_token: str(s.discord_bot_token, 150),
      discord_guild_id: str(s.discord_guild_id, 50),
      discord_customer_role_id: str(s.discord_customer_role_id, 50)
    },
    hero_slides: slides.map((sl, idx) => ({
      id: str(sl.id || `slide_${idx + 1}`, 40),
      eyebrow: str(sl.eyebrow, 80),
      headline: str(sl.headline, 120),
      highlight: str(sl.highlight, 80),
      description: str(sl.description, 400),
      image: str(sl.image, 300) || 'assets/logo.png',
      tag: str(sl.tag, 60),
      cta_text: str(sl.cta_text, 60) || 'استكشف المتجر ←',
      cta_link: str(sl.cta_link, 300) || '#scripts'
    })),
    nav: nav.map(x => ({
      id: str(x.id, 60),
      label: str(x.label, 80),
      href: str(x.href, 300) || '#home'
    })),
    categories: cats.map(x => ({
      id: str(x.id, 60),
      name: str(x.name, 80)
    })),
    products: prods.map(x => ({
      id: str(x.id, 70),
      name: str(x.name, 120),
      category: str(x.category, 60),
      desc: str(x.desc, 4000),
      price: str(x.price, 50),
      image: str(x.image, 500),
      badge: str(x.badge, 60),
      checkoutUrl: safeUrl(x.checkoutUrl),
      featured: !!x.featured
    }))
  };
}

const port = Number(process.env.PORT || 3000);
const host = process.env.HOST || '0.0.0.0';

http.createServer(async (req, res) => {
  try {
    const url = new URL(req.url, 'http://localhost');
    res.setHeader('X-Content-Type-Options', 'nosniff');
    res.setHeader('Referrer-Policy', 'strict-origin-when-cross-origin');

    if (url.pathname.startsWith('/api/')) {
      // 1. Public Store Data
      if (req.method === 'GET' && url.pathname === '/api/store') {
        return json(res, 200, publicData());
      }

      // 2. Admin Check
      if (req.method === 'GET' && url.pathname === '/api/me') {
        return json(res, 200, { admin: !!validAdminSession(req), setupRequired: !db.admin });
      }

      // 3. Customer Discord Auth: Current User Check
      if (req.method === 'GET' && url.pathname === '/api/auth/customer/me') {
        const cust = getCustomerSession(req);
        return json(res, 200, { loggedIn: !!cust, user: cust });
      }

      // 4. Official Discord OAuth2: Initiate Login
      if (req.method === 'GET' && url.pathname === '/api/auth/discord/login') {
        const { discord_client_id } = db.settings;
        const proto = req.headers['x-forwarded-proto'] || 'http';
        const hostHeader = req.headers['x-forwarded-host'] || req.headers.host || 'localhost:3000';
        const redirectUri = `${proto}://${hostHeader}/api/auth/discord/callback`;

        if (discord_client_id) {
          const discordAuthUrl = `https://discord.com/oauth2/authorize?client_id=${discord_client_id}&response_type=code&redirect_uri=${encodeURIComponent(redirectUri)}&scope=identify`;
          res.writeHead(302, { 'Location': discordAuthUrl });
          return res.end();
        }

        // If not configured, redirect back with flag
        res.writeHead(302, { 'Location': '/?discord_flow=direct' });
        return res.end();
      }

      // 5. Official Discord OAuth2: Callback
      if (req.method === 'GET' && url.pathname === '/api/auth/discord/callback') {
        const code = url.searchParams.get('code');
        const { discord_client_id, discord_client_secret } = db.settings;
        const proto = req.headers['x-forwarded-proto'] || 'http';
        const hostHeader = req.headers['x-forwarded-host'] || req.headers.host || 'localhost:3000';
        const redirectUri = `${proto}://${hostHeader}/api/auth/discord/callback`;

        if (!code || !discord_client_id || !discord_client_secret) {
          res.writeHead(302, { 'Location': '/?auth=error' });
          return res.end();
        }

        try {
          const tokenData = await exchangeDiscordCode(code, redirectUri, discord_client_id, discord_client_secret);
          if (!tokenData || !tokenData.access_token) {
            res.writeHead(302, { 'Location': '/?auth=token_error' });
            return res.end();
          }

          const discordUser = await fetchDiscordUser(tokenData.access_token);
          if (!discordUser || !discordUser.id) {
            res.writeHead(302, { 'Location': '/?auth=user_error' });
            return res.end();
          }

          const avatarUrl = discordUser.avatar
            ? `https://cdn.discordapp.com/avatars/${discordUser.id}/${discordUser.avatar}.png?size=128`
            : `https://cdn.discordapp.com/embed/avatars/${(parseInt(discordUser.id) >> 22) % 6}.png`;

          const userObj = {
            id: discordUser.id,
            username: discordUser.global_name || discordUser.username,
            avatar: avatarUrl,
            joinedAt: new Date().toISOString()
          };

          customers[discordUser.id] = userObj;
          saveCustomers();

          const token = crypto.randomBytes(32).toString('hex');
          const key = crypto.createHash('sha256').update(token).digest('hex');
          if (!db.customer_sessions) db.customer_sessions = {};
          db.customer_sessions[key] = {
            user: userObj,
            expires: Date.now() + 30 * 864e5
          };
          save();

          res.setHeader('Set-Cookie', `fet_customer_session=${token}; HttpOnly; SameSite=Lax; Path=/; Max-Age=2592000${process.env.NODE_ENV === 'production' ? '; Secure' : ''}`);
          res.writeHead(302, { 'Location': '/?auth=success' });
          return res.end();
        } catch {
          res.writeHead(302, { 'Location': '/?auth=failed' });
          return res.end();
        }
      }

      // 6. Direct Discord Authorize (Fast / Modal Flow)
      if (req.method === 'POST' && (url.pathname === '/api/auth/customer/login' || url.pathname === '/api/auth/customer/authorize')) {
        const b = await read(req);
        let username = (b.username || 'Discord User').trim();
        let discordId = (b.discord_id || '').trim();
        let avatar = (b.avatar || '').trim();

        if (!discordId) {
          discordId = '9' + Math.floor(100000000000000 + Math.random() * 900000000000000);
        }

        if (!avatar) {
          const rand = Math.floor(Math.random() * 5);
          avatar = `https://cdn.discordapp.com/embed/avatars/${rand}.png`;
        }

        const userObj = {
          id: discordId,
          username: username,
          avatar: avatar,
          joinedAt: new Date().toISOString()
        };

        customers[discordId] = userObj;
        saveCustomers();

        const token = crypto.randomBytes(32).toString('hex');
        const key = crypto.createHash('sha256').update(token).digest('hex');
        if (!db.customer_sessions) db.customer_sessions = {};
        db.customer_sessions[key] = {
          user: userObj,
          expires: Date.now() + 30 * 864e5
        };
        save();

        res.setHeader('Set-Cookie', `fet_customer_session=${token}; HttpOnly; SameSite=Lax; Path=/; Max-Age=2592000${process.env.NODE_ENV === 'production' ? '; Secure' : ''}`);
        return json(res, 200, { ok: true, user: userObj });
      }

      // 7. Customer Discord Auth: Logout
      if (req.method === 'POST' && url.pathname === '/api/auth/customer/logout') {
        const m = (req.headers.cookie || '').match(/(?:^|;\s*)fet_customer_session=([a-f0-9]{64})/);
        if (m && db.customer_sessions) {
          delete db.customer_sessions[crypto.createHash('sha256').update(m[1]).digest('hex')];
          save();
        }
        res.setHeader('Set-Cookie', 'fet_customer_session=; HttpOnly; SameSite=Lax; Path=/; Max-Age=0');
        return json(res, 200, { ok: true });
      }

      // 8. Orders: Customer My Orders
      if (req.method === 'GET' && url.pathname === '/api/orders/my-orders') {
        const cust = getCustomerSession(req);
        if (!cust) return json(res, 401, { error: 'يرجى تسجيل الدخول بديسكورد لمشاهدة طلباتك' });
        const myOrders = orders.filter(o => o.customer && o.customer.id === cust.id);
        return json(res, 200, { ok: true, orders: myOrders });
      }

      // 9. Orders: Checkout (Create Order)
      if (req.method === 'POST' && url.pathname === '/api/orders/checkout') {
        const cust = getCustomerSession(req);
        if (!cust) {
          return json(res, 401, { error: 'يجب تسجيل الدخول بحساب ديسكورد لإتمام الطلب' });
        }

        const b = await read(req);
        const items = Array.isArray(b.items) ? b.items : [];
        if (items.length === 0) {
          return json(res, 400, { error: 'السلة فارغة، أضف منتجات قبل إتمام الطلب' });
        }

        let totalNum = 0;
        const processedItems = [];

        items.forEach(item => {
          const prod = (db.products || []).find(p => p.id === item.id) || item;
          const qty = Math.max(1, parseInt(item.qty) || 1);
          const priceNum = formatPriceNumber(prod.price);
          const lineTotal = priceNum * qty;
          totalNum += lineTotal;
          processedItems.push({
            id: prod.id,
            name: prod.name,
            price: prod.price,
            priceNum: priceNum,
            qty: qty,
            image: prod.image || '',
            lineTotal: lineTotal
          });
        });

        const orderId = 'FET-' + Math.floor(1000 + Math.random() * 9000);
        const newOrder = {
          id: orderId,
          customer: cust,
          items: processedItems,
          total: totalNum + ' ر.س',
          totalNum: totalNum,
          status: 'مكتمل ✅',
          date: new Date().toISOString(),
          paymentMethod: 'طلب مباشر / ديسكورد'
        };

        orders.unshift(newOrder);
        saveOrders();

        // Optional Discord role granting
        const { discord_bot_token, discord_guild_id, discord_customer_role_id } = db.settings;
        if (discord_bot_token && discord_guild_id && discord_customer_role_id) {
          grantDiscordRole(cust.id, discord_customer_role_id, discord_guild_id, discord_bot_token);
        }

        return json(res, 200, { ok: true, order: newOrder });
      }

      // 10. Admin APIs: Orders List & Revenue Analytics
      if (req.method === 'GET' && url.pathname === '/api/admin/orders') {
        if (!validAdminSession(req)) return json(res, 401, { error: 'غير مصرح لك بالدخول' });
        return json(res, 200, { ok: true, orders: orders });
      }

      if (req.method === 'GET' && url.pathname === '/api/admin/analytics') {
        if (!validAdminSession(req)) return json(res, 401, { error: 'غير مصرح لك بالدخول' });
        let totalRevenue = 0;
        const uniqueCustomers = new Set();
        orders.forEach(o => {
          totalRevenue += (o.totalNum || formatPriceNumber(o.total));
          if (o.customer && o.customer.id) uniqueCustomers.add(o.customer.id);
        });

        return json(res, 200, {
          ok: true,
          totalRevenue: totalRevenue.toFixed(2) + ' ر.س',
          totalOrders: orders.length,
          totalCustomers: uniqueCustomers.size,
          recentOrders: orders.slice(0, 10)
        });
      }

      // 11. Admin Backup: Export & Import
      if (req.method === 'GET' && url.pathname === '/api/backup/export') {
        if (!validAdminSession(req)) return json(res, 401, { error: 'Please log in' });
        return json(res, 200, {
          ok: true,
          data: {
            ...publicData(),
            orders: orders
          }
        });
      }

      if (req.method === 'POST' && url.pathname === '/api/backup/import') {
        if (!validAdminSession(req)) return json(res, 401, { error: 'Please log in' });
        const b = await read(req);
        const payloadData = b.data || b;
        const cleaned = clean(payloadData);
        Object.assign(db, cleaned);
        if (Array.isArray(payloadData.orders)) {
          orders = payloadData.orders;
          saveOrders();
        }
        save();
        return json(res, 200, { ok: true, message: 'تمت استعادة النسخة الاحتياطية بنجاح!' });
      }

      // Origin check for mutations
      const origin = req.headers.origin;
      const expectedHost = req.headers['x-forwarded-host'] || req.headers.host;
      if (origin && expectedHost) {
        try {
          const oUrl = new URL(origin);
          const oHost = oUrl.hostname;
          const eHost = expectedHost.split(':')[0];
          if (oHost !== eHost && !['localhost', '127.0.0.1'].includes(oHost)) {
            return json(res, 403, { error: 'Origin mismatch' });
          }
        } catch {}
      }

      if (!limit(req)) return json(res, 429, { error: 'Too many requests' });

      // Admin Auth: Register
      if (url.pathname === '/api/register') {
        if (db.admin) return json(res, 403, { error: 'Admin already registered' });
        const b = await read(req);
        if (typeof b.username !== 'string' || !/^[a-zA-Z0-9_]{3,32}$/.test(b.username) || typeof b.password !== 'string' || b.password.length < 6 || b.password.length > 128) {
          return json(res, 400, { error: 'اسم المستخدم 3-32 حرفاً، وكلمة المرور 6 أحرف على الأقل' });
        }
        const salt = crypto.randomBytes(24).toString('hex');
        db.admin = { username: b.username, salt, hash: hash(b.password, salt) };
        save();
        return json(res, 200, { ok: true });
      }

      // Admin Auth: Login
      if (url.pathname === '/api/login') {
        const b = await read(req);
        if (!db.admin || typeof b.username !== 'string' || typeof b.password !== 'string') return json(res, 401, { error: 'بيانات الدخول غير صحيحة' });
        const candidate = hash(b.password, db.admin.salt);
        if (b.username !== db.admin.username || !crypto.timingSafeEqual(Buffer.from(candidate, 'hex'), Buffer.from(db.admin.hash, 'hex'))) {
          return json(res, 401, { error: 'بيانات الدخول غير صحيحة' });
        }
        const token = crypto.randomBytes(32).toString('hex');
        const key = crypto.createHash('sha256').update(token).digest('hex');
        if (!db.sessions) db.sessions = {};
        db.sessions[key] = Date.now() + 7 * 864e5;
        save();
        res.setHeader('Set-Cookie', `fet_session=${token}; HttpOnly; SameSite=Lax; Path=/; Max-Age=604800${process.env.NODE_ENV === 'production' ? '; Secure' : ''}`);
        return json(res, 200, { ok: true });
      }

      // Admin Auth: Logout
      if (url.pathname === '/api/logout') {
        const m = (req.headers.cookie || '').match(/(?:^|;\s*)fet_session=([a-f0-9]{64})/);
        if (m && db.sessions) {
          delete db.sessions[crypto.createHash('sha256').update(m[1]).digest('hex')];
          save();
        }
        res.setHeader('Set-Cookie', 'fet_session=; HttpOnly; SameSite=Lax; Path=/; Max-Age=0');
        return json(res, 200, { ok: true });
      }

      if (!validAdminSession(req)) return json(res, 401, { error: 'يرجى تسجيل الدخول كمدير أولاً' });

      // Admin Store Save
      if (url.pathname === '/api/save') {
        const b = await read(req);
        const cleaned = clean(b);
        Object.assign(db, cleaned);
        save();
        return json(res, 200, { ok: true });
      }

      // Image Upload
      if (url.pathname === '/api/upload') {
        const b = await read(req);
        const match = /^data:image\/(png|jpeg|webp);base64,([A-Za-z0-9+/=]+)$/.exec(b.image || '');
        if (!match) return json(res, 400, { error: 'Invalid image format' });
        const ext = '.' + (match[1] === 'jpeg' ? 'jpg' : match[1]);
        const buf = Buffer.from(match[2], 'base64');
        if (buf.length > 3e6) return json(res, 400, { error: 'File size must be under 3MB' });

        const assetsDir = path.join(root, 'assets');
        fs.mkdirSync(assetsDir, { recursive: true });
        const name = 'upload_' + Date.now() + '_' + crypto.randomBytes(4).toString('hex') + ext;
        fs.writeFileSync(path.join(assetsDir, name), buf);
        return json(res, 200, { path: 'assets/' + name });
      }

      return json(res, 404, { error: 'Endpoint not found' });
    }

    // Static Files Delivery
    let filePath = path.normalize(path.join(root, decodeURIComponent(url.pathname)));
    if (!filePath.startsWith(root)) return json(res, 403, { error: 'Forbidden' });
    if (filePath === root || filePath === root + path.sep) filePath = path.join(root, 'index.html');

    fs.stat(filePath, (err, stats) => {
      if (err || !stats.isFile()) {
        res.writeHead(404, { 'content-type': 'text/plain; charset=utf-8' });
        return res.end('404 Not Found');
      }
      const ext = path.extname(filePath).toLowerCase();
      res.writeHead(200, {
        'content-type': types[ext] || 'application/octet-stream',
        'cache-control': ext === '.html' ? 'no-cache' : 'public, max-age=3600'
      });
      fs.createReadStream(filePath).pipe(res);
    });
  } catch (err) {
    json(res, 500, { error: 'Internal Server Error: ' + err.message });
  }
}).listen(port, host, () => {
  console.log(`[FET STORE] Engine active at http://${host}:${port}`);
});
