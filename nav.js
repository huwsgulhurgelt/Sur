/* ═══════════════════════════════════════════════════════
   nav.js  —  handles:
   1. Hamburger mobile menu
   2. Account icon in nav (auto-injected)
   3. Slash text / message of the day banner
═══════════════════════════════════════════════════════ */

(function () {

  /* ════════════════════════════════════
     1. HAMBURGER  (fixed, no conflicts)
  ════════════════════════════════════ */
  function initHamburger() {
    var btn    = document.getElementById('navHamburger');
    var drawer = document.getElementById('navDrawer');
    if (!btn || !drawer) return;

    /* remove any old listeners by cloning */
    var newBtn = btn.cloneNode(true);
    btn.parentNode.replaceChild(newBtn, btn);
    btn = newBtn;

    btn.addEventListener('click', function (e) {
      e.stopPropagation();
      var open = drawer.classList.toggle('open');
      btn.classList.toggle('open', open);
    });

    drawer.addEventListener('click', function (e) {
      if (e.target.tagName === 'A') {
        drawer.classList.remove('open');
        btn.classList.remove('open');
      }
    });

    document.addEventListener('click', function (e) {
      if (!btn.contains(e.target) && !drawer.contains(e.target)) {
        drawer.classList.remove('open');
        btn.classList.remove('open');
      }
    });
  }

  /* ════════════════════════════════════
     2. ACCOUNT ICON in nav
  ════════════════════════════════════ */
  function injectAccountIcon() {
    var inner = document.querySelector('.nav-inner');
    if (!inner || inner.querySelector('.nav-account')) return;

    /* inject CSS */
    var style = document.createElement('style');
    style.textContent = `
      .nav-account {
        flex-shrink: 0;
        width: 36px; height: 36px;
        border-radius: 50%;
        border: var(--bw, 1.5px) solid var(--border, rgba(0,0,0,0.1));
        background: var(--surface2, #f0f0f0);
        cursor: pointer;
        display: flex; align-items: center; justify-content: center;
        font-size: 0.8rem; font-weight: 800;
        color: var(--muted, #666);
        text-decoration: none;
        overflow: hidden;
        transition: all 200ms ease;
        position: relative;
      }
      .nav-account:hover {
        border-color: var(--accent, #111);
        transform: scale(1.08);
        box-shadow: 0 4px 12px rgba(0,0,0,0.12);
      }
      .nav-account img {
        width: 100%; height: 100%;
        object-fit: cover; display: block;
      }
      /* green online dot when signed in */
      .nav-account.signed-in::after {
        content: '';
        position: absolute; bottom: 1px; right: 1px;
        width: 9px; height: 9px; border-radius: 50%;
        background: #22c55e;
        border: 1.5px solid var(--surface, #fff);
      }
    `;
    document.head.appendChild(style);

    /* create the icon link */
    var link = document.createElement('a');
    link.href      = 'profile.html';
    link.className = 'nav-account';
    link.title     = 'My account';
    link.textContent = '👤';

    /* insert before hamburger or at end */
    var burger = inner.querySelector('.nav-hamburger');
    if (burger) {
      inner.insertBefore(link, burger);
    } else {
      inner.appendChild(link);
    }

    /* also add to drawer */
    var drawer = document.getElementById('navDrawer');
    if (drawer && !drawer.querySelector('a[href="profile.html"]')) {
      var da = document.createElement('a');
      da.href = 'profile.html';
      da.textContent = '👤 My Profile';
      if (window.location.pathname.endsWith('profile.html')) da.className = 'active';
      drawer.appendChild(da);
    }

    return link;
  }

  /* update icon once Firebase auth loads */
  function connectAccountIcon(iconEl) {
    if (!iconEl) return;
    /* dynamically import Firebase — only if config exists */
    try {
      import('./firebase-config.js').then(function (mod) {
        var auth = mod.auth;
        import('https://www.gstatic.com/firebasejs/10.12.0/firebase-auth.js')
          .then(function (fbAuth) {
            fbAuth.onAuthStateChanged(auth, function (user) {
              if (user) {
                iconEl.classList.add('signed-in');
                if (user.photoURL) {
                  iconEl.innerHTML = '<img src="' + user.photoURL + '" alt="">';
                } else {
                  var init = (user.displayName || user.email || '?')
                    .trim().split(' ').map(function(w){return w[0];}).join('').slice(0,2).toUpperCase();
                  iconEl.textContent = init;
                }
              } else {
                iconEl.classList.remove('signed-in');
                iconEl.textContent = '👤';
              }
            });
          });
      });
    } catch(e) { /* firebase-config.js not present — icon stays as default */ }
  }

  /* ════════════════════════════════════
     3. SLASH TEXT — message of the day
  ════════════════════════════════════ */

  /*
    HOW TO USE SLASH TEXT:
    ─────────────────────
    Option A — set it right here in the code:
      Set STATIC_SLASH_TEXT to any string. It will show on every page.
      Set it to '' (empty) to hide it.

    Option B — store in Firestore:
      Go to Firebase console → Firestore → add a document:
        Collection: site_config
        Document ID: slash_text
        Field: text  (string)  → your message
        Field: active (boolean) → true
      Then the banner auto-updates without touching code.
  */
  var STATIC_SLASH_TEXT = ''; /* ← put your message here, e.g. "🎉 Welcome back everyone!" */

  function injectSlashBanner() {
    if (document.getElementById('slash-banner')) return;

    var style = document.createElement('style');
    style.textContent = `
      #slash-banner {
        display: none;
        width: 100%;
        background: var(--accent, #111);
        color: #fff;
        font-size: 0.82rem;
        font-weight: 700;
        text-align: center;
        padding: 9px 40px;
        position: relative;
        z-index: 101;
        letter-spacing: 0.02em;
        line-height: 1.5;
        animation: slashIn 0.4s ease;
      }
      #slash-banner.show { display: block; }
      @keyframes slashIn {
        from { opacity: 0; transform: translateY(-100%); }
        to   { opacity: 1; transform: translateY(0); }
      }
      #slash-banner .slash-close {
        position: absolute; right: 14px; top: 50%;
        transform: translateY(-50%);
        background: none; border: none; color: rgba(255,255,255,0.7);
        font-size: 1rem; cursor: pointer; padding: 0 4px;
        transition: color 0.15s;
      }
      #slash-banner .slash-close:hover { color: #fff; }
      /* funky style */
      [data-theme="funky"] #slash-banner {
        background: linear-gradient(90deg, var(--accent, #f7008e), var(--accent2, #ffe135));
        color: #111;
      }
      /* flower style */
      [data-theme="flower"] #slash-banner {
        background: color-mix(in srgb, var(--accent, #d8227a) 85%, transparent);
        font-style: italic;
      }
    `;
    document.head.appendChild(style);

    var banner = document.createElement('div');
    banner.id = 'slash-banner';
    banner.innerHTML = '<span id="slash-text"></span><button class="slash-close" id="slashClose">✕</button>';

    /* insert above nav */
    var nav = document.querySelector('.nav');
    if (nav) {
      document.body.insertBefore(banner, nav);
    } else {
      document.body.prepend(banner);
    }

    document.getElementById('slashClose').addEventListener('click', function () {
      banner.classList.remove('show');
    });

    return banner;
  }

  function showSlashText(text) {
    var banner  = document.getElementById('slash-banner');
    var textEl  = document.getElementById('slash-text');
    if (!banner || !textEl || !text || !text.trim()) return;
    textEl.textContent = text.trim();
    banner.classList.add('show');
  }

  function loadSlashFromFirestore() {
    try {
      import('./firebase-config.js').then(function (mod) {
        var db = mod.db;
        import('https://www.gstatic.com/firebasejs/10.12.0/firebase-firestore.js')
          .then(function (fs) {
            fs.getDoc(fs.doc(db, 'site_config', 'slash_text'))
              .then(function (snap) {
                if (snap.exists()) {
                  var d = snap.data();
                  if (d.active && d.text) showSlashText(d.text);
                }
              });
          });
      });
    } catch(e) { /* no firebase */ }
  }

  /* ════════════════════════════════════
     INIT
  ════════════════════════════════════ */
  function init() {
    initHamburger();
    var icon = injectAccountIcon();
    connectAccountIcon(icon);
    injectSlashBanner();

    /* show static text if set */
    if (STATIC_SLASH_TEXT) {
      showSlashText(STATIC_SLASH_TEXT);
    } else {
      /* try loading from Firestore */
      loadSlashFromFirestore();
    }
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', init);
  } else {
    init();
  }

})();
