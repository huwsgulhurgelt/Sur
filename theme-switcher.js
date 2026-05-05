/* ═══════════════════════════════════════════
   THEME SWITCHER  —  theme-switcher.js
   Drop this script at the bottom of every page
   <script src="theme-switcher.js"></script>
═══════════════════════════════════════════ */

(function () {
  /* ── Google Fonts for funky / flower ── */
  const gf = document.createElement('link');
  gf.rel  = 'stylesheet';
  gf.href = 'https://fonts.googleapis.com/css2?family=Fredoka+One&family=Nunito:wght@400;700;900&family=Cormorant+Garamond:ital,wght@0,400;0,700;1,400;1,700&display=swap';
  document.head.appendChild(gf);

  /* ── Config ── */
  const THEMES = {
    normal: {
      label: 'Normal',
      icon:  '◻',
      variants: [
        { key: 'classic', label: 'Classic',   color: '#1a1a1a' },
        { key: 'warm',    label: 'Warm',      color: '#c0623a' },
        { key: 'cool',    label: 'Cool',      color: '#2563eb' },
      ]
    },
    funky: {
      label: 'Funky',
      icon:  '★',
      variants: [
        { key: 'colorful', label: 'Colorful', color: '#ff3da6' },
        { key: 'dark',     label: 'Dark',     color: '#c084fc' },
        { key: 'pastel',   label: 'Pastel',   color: '#a855f7' },
      ]
    },
    flower: {
      label: 'Flower',
      icon:  '❀',
      variants: [
        { key: 'pink',  label: 'Pink',  color: '#e83e8c' },
        { key: 'blue',  label: 'Blue',  color: '#2563eb' },
        { key: 'bw',    label: 'B&W',   color: '#0a0a0a' },
      ]
    }
  };

  /* ── State ── */
  let state = JSON.parse(localStorage.getItem('site-theme') || 'null') || {
    theme:   'normal',
    variant: 'classic',
    stickers: []               /* [{ id, src, x, y, rot, size }] */
  };
  let panelOpen   = false;
  let dragging    = null;      /* { el, ox, oy } */
  let stickerData = state.stickers || [];

  /* ── Apply theme to <html> ── */
  function applyTheme() {
    const html = document.documentElement;
    html.setAttribute('data-theme',   state.theme);
    html.setAttribute('data-variant', state.variant);
    /* show/hide sticker layer */
    const layer = document.querySelector('.sticker-layer');
    if (layer) layer.style.display = state.theme === 'funky' ? 'block' : 'none';
    save();
  }

  function save() {
    state.stickers = stickerData;
    localStorage.setItem('site-theme', JSON.stringify(state));
  }

  /* ═══════════════════════════════════════
     BUILD PANEL HTML
  ═══════════════════════════════════════ */
  function buildPanel() {
    const wrap = document.createElement('div');
    wrap.id = 'ts-wrap';
    wrap.innerHTML = `
<style>
#ts-btn {
  position: fixed; bottom: 24px; right: 24px; z-index: 9998;
  width: 48px; height: 48px; border-radius: 50%;
  background: var(--accent); color: #fff; border: none;
  font-size: 1.3rem; cursor: pointer; display: flex;
  align-items: center; justify-content: center;
  box-shadow: 0 4px 18px rgba(0,0,0,0.18);
  transition: transform 0.2s, background 0.3s;
}
#ts-btn:hover { transform: scale(1.1); }
#ts-btn.open  { transform: rotate(45deg); }

#ts-panel {
  position: fixed; bottom: 84px; right: 24px; z-index: 9997;
  width: 300px;
  background: var(--surface);
  border: var(--bw, 1.5px) solid var(--border);
  border-radius: 16px;
  box-shadow: 0 12px 40px rgba(0,0,0,0.14);
  overflow: hidden;
  display: none;
  flex-direction: column;
  font-family: 'Inter', -apple-system, sans-serif;
  animation: tsIn 0.24s cubic-bezier(0.34,1.56,0.64,1);
}
#ts-panel.open { display: flex; }
@keyframes tsIn {
  from { transform: translateY(16px) scale(0.96); opacity: 0; }
  to   { transform: translateY(0) scale(1);       opacity: 1; }
}

.ts-head {
  padding: 14px 18px 10px;
  font-size: 0.72rem; font-weight: 800;
  letter-spacing: 0.1em; text-transform: uppercase;
  color: var(--muted); border-bottom: 1px solid var(--border);
}

.ts-section { padding: 12px 18px; border-bottom: 1px solid var(--border); }
.ts-section-label {
  font-size: 0.7rem; font-weight: 700; letter-spacing: 0.08em;
  text-transform: uppercase; color: var(--muted); margin-bottom: 8px;
}

/* Style buttons */
.ts-styles { display: flex; gap: 8px; }
.ts-style-btn {
  flex: 1; padding: 9px 6px; border-radius: 10px;
  border: 1.5px solid var(--border);
  background: var(--bg); color: var(--text);
  font-size: 0.78rem; font-weight: 700; cursor: pointer;
  transition: all 0.18s; text-align: center; font-family: inherit;
}
.ts-style-btn .ts-icon { display: block; font-size: 1.1rem; margin-bottom: 3px; }
.ts-style-btn:hover { border-color: var(--accent); transform: translateY(-2px); }
.ts-style-btn.active {
  background: var(--accent); color: #fff;
  border-color: var(--accent);
  box-shadow: 0 3px 10px rgba(0,0,0,0.12);
}

/* Variant dots */
.ts-variants { display: flex; gap: 8px; flex-wrap: wrap; }
.ts-var-btn {
  display: flex; align-items: center; gap: 6px;
  padding: 6px 12px; border-radius: 20px;
  border: 1.5px solid var(--border); background: var(--bg);
  color: var(--text); font-size: 0.76rem; font-weight: 700;
  cursor: pointer; transition: all 0.18s; font-family: inherit;
}
.ts-var-dot {
  width: 10px; height: 10px; border-radius: 50%;
  display: inline-block; flex-shrink: 0;
}
.ts-var-btn:hover   { border-color: var(--accent); }
.ts-var-btn.active  { border-color: var(--accent); background: var(--surface); }

/* Sticker section */
#ts-sticker-section { display: none; }
#ts-sticker-section.visible { display: block; }

.ts-sticker-actions { display: flex; gap: 8px; flex-wrap: wrap; margin-top: 6px; }
.ts-action-btn {
  flex: 1; padding: 8px 10px; border-radius: 8px;
  border: 1.5px solid var(--border); background: var(--bg);
  color: var(--text); font-size: 0.76rem; font-weight: 700;
  cursor: pointer; transition: all 0.18s; font-family: inherit; text-align: center;
}
.ts-action-btn:hover { border-color: var(--accent); background: var(--surface); }
.ts-action-btn.danger { border-color: #ff3b30; color: #ff3b30; }
.ts-action-btn.danger:hover { background: #fff0ee; }

#ts-file-input { display: none; }

.ts-size-row {
  display: flex; align-items: center; gap: 10px; margin-top: 10px;
}
.ts-size-row label {
  font-size: 0.72rem; font-weight: 700; color: var(--muted); flex-shrink: 0;
  letter-spacing: 0.05em; text-transform: uppercase;
}
.ts-size-row input[type=range] {
  flex: 1; accent-color: var(--accent); cursor: pointer;
}
.ts-size-val {
  font-size: 0.72rem; font-weight: 700; color: var(--muted);
  min-width: 28px; text-align: right;
}
</style>

<button id="ts-btn" title="Change theme">✦</button>

<div id="ts-panel">
  <div class="ts-head">Appearance</div>

  <div class="ts-section">
    <div class="ts-section-label">Style</div>
    <div class="ts-styles" id="ts-styles"></div>
  </div>

  <div class="ts-section">
    <div class="ts-section-label">Color</div>
    <div class="ts-variants" id="ts-variants"></div>
  </div>

  <div class="ts-section" id="ts-sticker-section">
    <div class="ts-section-label">Stickers</div>
    <div class="ts-sticker-actions">
      <button class="ts-action-btn" id="ts-add-sticker">+ Add photo</button>
      <button class="ts-action-btn danger" id="ts-clear-stickers">Clear all</button>
    </div>
    <div class="ts-size-row">
      <label>Size</label>
      <input type="range" id="ts-sticker-size" min="40" max="200" value="90" step="5">
      <span class="ts-size-val" id="ts-size-val">90px</span>
    </div>
    <input type="file" id="ts-file-input" accept="image/*" multiple>
  </div>
</div>`;

    document.body.appendChild(wrap);
  }

  /* ═══════════════════════════════════════
     STICKER LAYER
  ═══════════════════════════════════════ */
  function buildStickerLayer() {
    if (document.querySelector('.sticker-layer')) return;
    const layer = document.createElement('div');
    layer.className = 'sticker-layer';
    document.body.appendChild(layer);
    /* Restore saved stickers */
    stickerData.forEach(sd => createStickerEl(sd));
  }

  function makeid() {
    return Math.random().toString(36).slice(2, 9);
  }

  function createStickerEl(sd) {
    const layer = document.querySelector('.sticker-layer');
    if (!layer) return;

    const wrap = document.createElement('div');
    wrap.className = 'sticker-item';
    wrap.dataset.sid = sd.id;
    wrap.style.cssText = `left:${sd.x}px; top:${sd.y}px; transform: rotate(${sd.rot}deg);`;

    const img = document.createElement('img');
    img.src = sd.src;
    img.draggable = false;
    img.style.width  = sd.size + 'px';
    img.style.height = sd.size + 'px';

    const del = document.createElement('button');
    del.className   = 'sticker-delete';
    del.textContent = '×';
    del.title       = 'Remove';
    del.addEventListener('click', e => {
      e.stopPropagation();
      stickerData = stickerData.filter(s => s.id !== sd.id);
      wrap.remove();
      save();
    });

    wrap.appendChild(img);
    wrap.appendChild(del);
    layer.appendChild(wrap);

    /* ── drag ── */
    wrap.addEventListener('pointerdown', e => {
      if (e.target === del) return;
      e.preventDefault();
      wrap.setPointerCapture(e.pointerId);
      const rect = wrap.getBoundingClientRect();
      dragging = { el: wrap, id: sd.id, ox: e.clientX - rect.left, oy: e.clientY - rect.top };
      wrap.style.zIndex = 999;
    });
    window.addEventListener('pointermove', e => {
      if (!dragging || dragging.id !== sd.id) return;
      const x = e.clientX - dragging.ox;
      const y = e.clientY - dragging.oy;
      wrap.style.left = x + 'px';
      wrap.style.top  = y + 'px';
      /* update state */
      const s = stickerData.find(s => s.id === sd.id);
      if (s) { s.x = x; s.y = y; }
    });
    window.addEventListener('pointerup', e => {
      if (!dragging || dragging.id !== sd.id) return;
      dragging = null;
      wrap.style.zIndex = '';
      save();
    });
  }

  function addStickerFromFile(file, size) {
    const reader = new FileReader();
    reader.onload = function(e) {
      const sd = {
        id:   makeid(),
        src:  e.target.result,
        x:    80 + Math.random() * 300,
        y:    120 + Math.random() * 200,
        rot:  (Math.random() * 20) - 10,
        size: size
      };
      stickerData.push(sd);
      createStickerEl(sd);
      save();
    };
    reader.readAsDataURL(file);
  }

  /* ═══════════════════════════════════════
     RENDER STYLES / VARIANTS
  ═══════════════════════════════════════ */
  function renderStyles() {
    const container = document.getElementById('ts-styles');
    container.innerHTML = '';
    Object.entries(THEMES).forEach(([key, cfg]) => {
      const btn = document.createElement('button');
      btn.className = 'ts-style-btn' + (state.theme === key ? ' active' : '');
      btn.innerHTML = `<span class="ts-icon">${cfg.icon}</span>${cfg.label}`;
      btn.addEventListener('click', () => {
        state.theme   = key;
        state.variant = THEMES[key].variants[0].key;
        applyTheme();
        renderStyles();
        renderVariants();
        toggleStickerSection();
      });
      container.appendChild(btn);
    });
  }

  function renderVariants() {
    const container = document.getElementById('ts-variants');
    container.innerHTML = '';
    THEMES[state.theme].variants.forEach(v => {
      const btn = document.createElement('button');
      btn.className = 'ts-var-btn' + (state.variant === v.key ? ' active' : '');
      btn.innerHTML = `<span class="ts-var-dot" style="background:${v.color}"></span>${v.label}`;
      btn.addEventListener('click', () => {
        state.variant = v.key;
        applyTheme();
        renderVariants();
      });
      container.appendChild(btn);
    });
  }

  function toggleStickerSection() {
    const sec = document.getElementById('ts-sticker-section');
    if (!sec) return;
    if (state.theme === 'funky') {
      sec.classList.add('visible');
    } else {
      sec.classList.remove('visible');
    }
  }

  /* ═══════════════════════════════════════
     INIT
  ═══════════════════════════════════════ */
  function init() {
    buildPanel();
    buildStickerLayer();
    applyTheme();
    renderStyles();
    renderVariants();
    toggleStickerSection();

    /* Toggle panel */
    const btn   = document.getElementById('ts-btn');
    const panel = document.getElementById('ts-panel');
    btn.addEventListener('click', () => {
      panelOpen = !panelOpen;
      panel.classList.toggle('open', panelOpen);
      btn.classList.toggle('open', panelOpen);
    });
    /* Close on outside click */
    document.addEventListener('click', e => {
      if (panelOpen && !panel.contains(e.target) && e.target !== btn) {
        panelOpen = false;
        panel.classList.remove('open');
        btn.classList.remove('open');
      }
    });

    /* Hamburger (existing logic) */
    const hamburger = document.getElementById('navHamburger');
    const drawer    = document.getElementById('navDrawer');
    if (hamburger && drawer) {
      hamburger.addEventListener('click', () => {
        hamburger.classList.toggle('open');
        drawer.classList.toggle('open');
      });
    }

    /* Sticker: add photo */
    const fileInput   = document.getElementById('ts-file-input');
    const addBtn      = document.getElementById('ts-add-sticker');
    const sizeSlider  = document.getElementById('ts-sticker-size');
    const sizeVal     = document.getElementById('ts-size-val');
    const clearBtn    = document.getElementById('ts-clear-stickers');

    addBtn.addEventListener('click', () => fileInput.click());

    fileInput.addEventListener('change', () => {
      const size = parseInt(sizeSlider.value, 10);
      Array.from(fileInput.files).forEach(f => addStickerFromFile(f, size));
      fileInput.value = '';
    });

    sizeSlider.addEventListener('input', () => {
      sizeVal.textContent = sizeSlider.value + 'px';
    });

    clearBtn.addEventListener('click', () => {
      stickerData = [];
      const layer = document.querySelector('.sticker-layer');
      if (layer) layer.innerHTML = '';
      save();
    });
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', init);
  } else {
    init();
  }
})();
