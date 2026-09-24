'use strict';
const http = require('node:http');
const fs = require('node:fs');
const path = require('node:path');
const crypto = require('node:crypto');

const root = __dirname;
const dataDir = path.join(root, 'data');
const dbFile = path.join(dataDir, 'store.json');
fs.mkdirSync(dataDir, { recursive: true });

const initial = {
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
  ],
  admin: null,
  sessions: {}
};

let db;
try {
  db = JSON.parse(fs.readFileSync(dbFile, 'utf8'));
  if (!db.products || db.products.length === 0) {
    db.products = initial.products;
    save();
  }
} catch {
  db = initial;
  save();
}

function save() {
  const tmp = dbFile + '.tmp';
  fs.writeFileSync(tmp, JSON.stringify(db, null, 2), { mode: 0o600 });
  fs.renameSync(tmp, dbFile);
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
  return fresh.length <= 60;
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

function validSession(req) {
  const t = (req.headers.cookie || '').match(/(?:^|;\s*)fet_session=([a-f0-9]{64})/);
  if (!t) return false;
  const k = crypto.createHash('sha256').update(t[1]).digest('hex');
  return db.sessions && db.sessions[k] && db.sessions[k] > Date.now();
}

function publicData() {
  const { admin, sessions, ...pub } = db;
  return { ...pub, setupRequired: !admin };
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

function clean(payload) {
  if (!payload || typeof payload !== 'object') throw Error('Invalid data');
  const s = payload.settings || {};
  const nav = payload.nav || [];
  const cats = payload.categories || [];
  const prods = payload.products || [];

  if (!Array.isArray(nav) || !Array.isArray(cats) || !Array.isArray(prods) || nav.length > 30 || cats.length > 50 || prods.length > 500) {
    throw Error('Invalid collection');
  }

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
      logo: str(s.logo, 300)
    },
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
      desc: str(x.desc, 1200),
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
      if (req.method === 'GET' && url.pathname === '/api/store') return json(res, 200, publicData());
      if (req.method === 'GET' && url.pathname === '/api/me') return json(res, 200, { admin: !!validSession(req), setupRequired: !db.admin });

      if (req.method === 'GET' && url.pathname === '/api/backup/export') {
        if (!validSession(req)) return json(res, 401, { error: 'Please log in' });
        return json(res, 200, { ok: true, data: publicData() });
      }

      if (req.method !== 'POST') return json(res, 405, { error: 'Method not allowed' });

      // Origin check that works behind proxies (Render, Cloudflare, etc.)
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
      const b = await read(req);

      if (url.pathname === '/api/register') {
        if (db.admin) return json(res, 403, { error: 'Admin already registered' });
        if (typeof b.username !== 'string' || !/^[a-zA-Z0-9_]{3,32}$/.test(b.username) || typeof b.password !== 'string' || b.password.length < 6 || b.password.length > 128) {
          return json(res, 400, { error: 'اسم المستخدم يجب أن يكون 3-32 حرفاً، وكلمة المرور 6 أحرف على الأقل' });
        }
        const salt = crypto.randomBytes(24).toString('hex');
        db.admin = { username: b.username, salt, hash: hash(b.password, salt) };
        save();
        return json(res, 200, { ok: true });
      }

      if (url.pathname === '/api/login') {
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

      if (url.pathname === '/api/logout') {
        const m = (req.headers.cookie || '').match(/fet_session=([a-f0-9]{64})/);
        if (m && db.sessions) {
          delete db.sessions[crypto.createHash('sha256').update(m[1]).digest('hex')];
          save();
        }
        res.setHeader('Set-Cookie', 'fet_session=; HttpOnly; SameSite=Lax; Path=/; Max-Age=0');
        return json(res, 200, { ok: true });
      }

      if (!validSession(req)) return json(res, 401, { error: 'يرجى تسجيل الدخول أولاً' });

      if (url.pathname === '/api/save') {
        const cleaned = clean(b);
        Object.assign(db, cleaned);
        save();
        return json(res, 200, { ok: true });
      }

      if (url.pathname === '/api/backup/import') {
        const cleaned = clean(b.data || b);
        Object.assign(db, cleaned);
        save();
        return json(res, 200, { ok: true, message: 'تمت استعادة النسخة الاحتياطية بنجاح!' });
      }

      if (url.pathname === '/api/upload') {
        const match = /^data:image\/(png|jpeg|webp);base64,([A-Za-z0-9+/=]+)$/.exec(b.image || '');
        if (!match) return json(res, 400, { error: 'PNG, JPG or WebP only' });
        const bytes = Buffer.from(match[2], 'base64');
        if (bytes.length > 3e6) return json(res, 400, { error: 'حجم الصورة يتجاوز 3 ميجابايت' });
        const magic = match[1] === 'png'
          ? bytes.subarray(0, 8).equals(Buffer.from('89504e470d0a1a0a', 'hex'))
          : match[1] === 'jpeg'
          ? bytes[0] === 255 && bytes[1] === 216
          : bytes.toString('ascii', 0, 4) === 'RIFF' && bytes.toString('ascii', 8, 12) === 'WEBP';
        if (!magic) return json(res, 400, { error: 'Invalid image' });
        const dir = path.join(root, 'uploads');
        fs.mkdirSync(dir, { recursive: true });
        const name = crypto.randomBytes(16).toString('hex') + '.' + ({ jpeg: 'jpg', png: 'png', webp: 'webp' }[match[1]]);
        fs.writeFileSync(path.join(dir, name), bytes);
        return json(res, 200, { path: 'uploads/' + name });
      }

      return json(res, 404, { error: 'Not found' });
    }

    if (req.method !== 'GET' && req.method !== 'HEAD') {
      res.writeHead(405);
      return res.end();
    }

    let rel = decodeURIComponent(url.pathname === '/' ? '/index.html' : url.pathname);
    const file = path.resolve(root, '.' + rel);
    if (!file.startsWith(root + path.sep) || file.startsWith(dataDir + path.sep) || file === dbFile || !types[path.extname(file).toLowerCase()]) {
      res.writeHead(404);
      return res.end('Not found');
    }

    fs.readFile(file, (err, buf) => {
      if (err) {
        res.writeHead(404);
        return res.end('Not found');
      }
      res.writeHead(200, {
        'content-type': types[path.extname(file).toLowerCase()],
        'cache-control': 'public, max-age=3600'
      });
      res.end(req.method === 'HEAD' ? '' : buf);
    });
  } catch (e) {
    json(res, 400, { error: e.message || 'Request failed' });
  }
}).listen(port, host, () => console.log(`🚀 FET STORE running at http://${host}:${port}`));
