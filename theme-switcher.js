(function () {

  /* ── Google Fonts ── */
  var gf = document.createElement('link');
  gf.rel  = 'stylesheet';
  gf.href = 'https://fonts.googleapis.com/css2?family=Fredoka+One&family=Nunito:wght@400;700;900&family=Cormorant+Garamond:ital,wght@0,400;0,700;1,400;1,700&display=swap';
  document.head.appendChild(gf);

  /* ═══════════════════════════════════════════════════════
     VIDEO STICKERS — edit this array to add your own looping
     videos. They appear in Funky mode and scroll with the page.
     
     EXAMPLE:
     { src: 'videos/myclip.mp4', x: 60,  y: 200, width: 260 },
     { src: 'videos/other.mp4',  x: 800, y: 400, width: 220 },
     
     x / y   = position in pixels from top-left of page
     width   = how wide the video plays (height is auto)
  ═══════════════════════════════════════════════════════ */
  var VIDEO_STICKERS = [
    // { src: 'videos/myclip.mp4', x: 60, y: 200, width: 260 },
  ];

  /* ── Theme config ── */
  var THEMES = {
    normal: { label:'Normal', icon:'◻', variants:[
      { key:'classic', label:'Classic', color:'#2d3a8c' },
      { key:'warm',    label:'Warm',    color:'#b85c2c' },
      { key:'cool',    label:'Cool',    color:'#1d56d8' },
    ]},
    funky: { label:'Funky', icon:'★', variants:[
      { key:'colorful', label:'Colorful', color:'#f7008e' },
      { key:'dark',     label:'Dark',     color:'#c084fc' },
      { key:'pastel',   label:'Pastel',   color:'#a855f7' },
    ]},
    flower: { label:'Flower', icon:'❀', variants:[
      { key:'pink', label:'Pink', color:'#d8227a' },
      { key:'blue', label:'Blue', color:'#1a4fd6' },
      { key:'bw',   label:'B&W',  color:'#0e0e0e' },
    ]}
  };

  /* ── State ── */
  var raw = null;
  try { raw = JSON.parse(localStorage.getItem('site-theme') || 'null'); } catch(e){}
  var state = raw || { theme:'normal', variant:'classic', stickers:[] };
  if (!Array.isArray(state.stickers)) state.stickers = [];

  var stickerData = state.stickers; // image stickers only (video stickers handled separately)
  var panelOpen   = false;
  var dragState   = null;           // active pointer operation

  /* ── Helpers ── */
  function save() {
    state.stickers = stickerData;
    try { localStorage.setItem('site-theme', JSON.stringify(state)); } catch(e){}
  }

  function applyTheme() {
    var html = document.documentElement;
    html.setAttribute('data-theme',   state.theme);
    html.setAttribute('data-variant', state.variant);
    var layer = document.querySelector('.sticker-layer');
    if (layer) layer.style.display = state.theme === 'funky' ? 'block' : 'none';
    if (state.theme === 'funky') renderVideoStickers();
    save();
  }

  function makeid() { return Math.random().toString(36).slice(2,9); }

  function setEditMode(on) {
    document.body.classList.toggle('sticker-editing', on && state.theme === 'funky');
  }

  /* ═══════════════════════════════════════════════════════
     INJECT CSS
  ═══════════════════════════════════════════════════════ */
  function injectCSS() {
    var s = document.createElement('style');
    s.textContent = `
      /* Page is the sticker canvas */
      body { position: relative; }

      /* Layer sits in the page, not fixed to screen — scrolls with content */
      .sticker-layer {
        position: absolute;
        top: 0; left: 0;
        width: 100%;
        min-height: 100%;
        pointer-events: none;
        z-index: 6;
        overflow: visible;
      }

      /* Stickers — only interactive when sticker-editing class is on body */
      .sticker-item {
        position: absolute;
        pointer-events: none;
        user-select: none;
        touch-action: none;
        transform-origin: center center;
        will-change: transform;
      }
      body.sticker-editing .sticker-item {
        pointer-events: auto;
        cursor: grab;
      }
      body.sticker-editing .sticker-item:active { cursor: grabbing; }

      /* Media inside stickers */
      .sticker-item img,
      .sticker-item video {
        display: block;
        border-radius: 12px;
        filter: drop-shadow(2px 4px 10px rgba(0,0,0,0.22));
        pointer-events: none;
        user-select: none;
      }
      .sticker-item video {
        object-fit: cover;
      }

      /* Handles — only visible in edit mode */
      .sticker-handle {
        position: absolute;
        display: none;
        align-items: center;
        justify-content: center;
        border-radius: 50%;
        border: 2px solid #fff;
        box-shadow: 0 2px 8px rgba(0,0,0,0.3);
        z-index: 3;
        pointer-events: auto;
        transition: transform 0.12s;
        cursor: pointer;
        line-height: 1;
      }
      body.sticker-editing .sticker-handle { display: flex; }
      .sticker-handle:hover { transform: scale(1.25) !important; }

      /* Delete — top right */
      .sticker-delete {
        top: -11px; right: -11px;
        width: 22px; height: 22px;
        background: #ff3b30; color: #fff;
        font-size: 13px; font-weight: 900;
      }
      /* Rotate — top center */
      .sticker-rotate {
        top: -11px; left: 50%;
        transform: translateX(-50%);
        width: 22px; height: 22px;
        background: #6366f1; color: #fff;
        font-size: 12px;
        cursor: grab;
      }
      .sticker-rotate:active { cursor: grabbing; }
      /* Scale — bottom right */
      .sticker-scale {
        bottom: -11px; right: -11px;
        width: 22px; height: 22px;
        background: #22c55e; color: #fff;
        font-size: 10px;
        cursor: nwse-resize;
      }

      /* ── Theme button ── */
      #ts-btn {
        position: fixed; bottom: 24px; right: 24px; z-index: 9998;
        width: 48px; height: 48px; border-radius: 50%;
        background: var(--accent,#111); color: #fff; border: none;
        font-size: 1.3rem; cursor: pointer;
        display: flex; align-items: center; justify-content: center;
        box-shadow: 0 4px 18px rgba(0,0,0,0.22);
        transition: transform 0.22s, background 0.3s;
      }
      #ts-btn:hover { transform: scale(1.1); }
      #ts-btn.open  { transform: rotate(45deg) scale(1.05); }

      /* ── Panel ── */
      #ts-panel {
        position: fixed; bottom: 82px; right: 24px; z-index: 9997;
        width: 290px;
        background: var(--surface,#fff);
        border: var(--bw,1.5px) solid var(--border,rgba(0,0,0,0.1));
        border-radius: 18px;
        box-shadow: 0 14px 44px rgba(0,0,0,0.16);
        display: none; flex-direction: column; overflow: hidden;
        font-family: 'Inter', -apple-system, sans-serif;
        animation: tsSlide 0.22s cubic-bezier(0.34,1.56,0.64,1);
      }
      #ts-panel.open { display: flex; }
      @keyframes tsSlide {
        from { transform: translateY(14px) scale(0.96); opacity: 0; }
        to   { transform: translateY(0) scale(1); opacity: 1; }
      }
      .ts-head {
        padding: 12px 16px 8px;
        font-size: 0.66rem; font-weight: 800;
        letter-spacing: 0.12em; text-transform: uppercase;
        color: var(--muted,#666); border-bottom: 1px solid var(--border,rgba(0,0,0,0.08));
      }
      .ts-section { padding: 10px 16px; border-bottom: 1px solid var(--border,rgba(0,0,0,0.08)); }
      .ts-label {
        font-size: 0.64rem; font-weight: 800; letter-spacing: 0.1em;
        text-transform: uppercase; color: var(--muted,#888); margin-bottom: 8px;
      }
      .ts-styles { display: flex; gap: 7px; }
      .ts-style-btn {
        flex: 1; padding: 8px 4px; border-radius: 10px;
        border: 1.5px solid var(--border,rgba(0,0,0,0.1));
        background: var(--bg,#f5f5f3); color: var(--text,#111);
        font-size: 0.74rem; font-weight: 700; cursor: pointer;
        transition: all 0.18s; text-align: center; font-family: inherit;
      }
      .ts-style-btn .ts-icon { display: block; font-size: 1.05rem; margin-bottom: 2px; }
      .ts-style-btn:hover { border-color: var(--accent,#111); transform: translateY(-1px); }
      .ts-style-btn.active { background: var(--accent,#111); color: #fff; border-color: var(--accent,#111); }
      .ts-variants { display: flex; gap: 6px; flex-wrap: wrap; }
      .ts-var-btn {
        display: flex; align-items: center; gap: 5px;
        padding: 5px 11px; border-radius: 999px;
        border: 1.5px solid var(--border,rgba(0,0,0,0.1));
        background: var(--bg,#f5f5f3); color: var(--text,#111);
        font-size: 0.73rem; font-weight: 700; cursor: pointer;
        transition: all 0.18s; font-family: inherit;
      }
      .ts-var-dot { width: 9px; height: 9px; border-radius: 50%; flex-shrink: 0; }
      .ts-var-btn:hover  { border-color: var(--accent,#111); }
      .ts-var-btn.active { border-color: var(--accent,#111); font-weight: 900; }

      #ts-sticker-section       { display: none; }
      #ts-sticker-section.show  { display: block; }

      .ts-sticker-actions { display: flex; gap: 7px; margin-top: 6px; }
      .ts-action-btn {
        flex: 1; padding: 7px 8px; border-radius: 8px;
        border: 1.5px solid var(--border,rgba(0,0,0,0.1));
        background: var(--bg,#f5f5f3); color: var(--text,#111);
        font-size: 0.73rem; font-weight: 700;
        cursor: pointer; transition: all 0.18s;
        font-family: inherit; text-align: center;
      }
      .ts-action-btn:hover { border-color: var(--accent,#111); }
      .ts-action-btn.danger { border-color: #ff3b30; color: #ff3b30; }
      .ts-action-btn.danger:hover { background: rgba(255,59,48,0.06); }
      #ts-file-input { display: none; }
      .ts-size-row { display: flex; align-items: center; gap: 8px; margin-top: 9px; }
      .ts-size-row label { font-size: 0.64rem; font-weight: 700; color: var(--muted,#888); flex-shrink: 0; text-transform: uppercase; letter-spacing: 0.06em; }
      .ts-size-row input[type=range] { flex: 1; accent-color: var(--accent,#111); cursor: pointer; }
      .ts-size-val { font-size: 0.68rem; font-weight: 700; color: var(--muted,#888); min-width: 32px; text-align: right; }

      /* Edit mode hint badge */
      #ts-edit-hint {
        display: none; position: fixed;
        bottom: 82px; left: 50%; transform: translateX(-50%);
        background: rgba(0,0,0,0.72); color: #fff;
        font-size: 0.74rem; font-weight: 700;
        padding: 6px 16px; border-radius: 999px;
        backdrop-filter: blur(10px);
        z-index: 9996; pointer-events: none;
        white-space: nowrap;
        animation: hintFade 0.2s ease;
      }
      @keyframes hintFade { from { opacity:0; transform:translateX(-50%) translateY(6px); } to { opacity:1; transform:translateX(-50%) translateY(0); } }
      #ts-edit-hint.show { display: block; }
    `;
    document.head.appendChild(s);
  }

  /* ═══════════════════════════════════════════════════════
     BUILD PANEL HTML
  ═══════════════════════════════════════════════════════ */
  function buildPanel() {
    var wrap = document.createElement('div');
    wrap.id = 'ts-wrap';
    wrap.innerHTML =
      '<button id="ts-btn" title="Change theme">✦</button>' +
      '<div id="ts-panel">' +
        '<div class="ts-head">Appearance</div>' +
        '<div class="ts-section"><div class="ts-label">Style</div><div class="ts-styles" id="ts-styles"></div></div>' +
        '<div class="ts-section"><div class="ts-label">Color</div><div class="ts-variants" id="ts-variants"></div></div>' +
        '<div class="ts-section" id="ts-sticker-section">' +
          '<div class="ts-label">Stickers</div>' +
          '<div class="ts-sticker-actions">' +
            '<button class="ts-action-btn" id="ts-add-sticker">+ Add image</button>' +
            '<button class="ts-action-btn danger" id="ts-clear-stickers">Clear all</button>' +
          '</div>' +
          '<div class="ts-size-row"><label>Size</label><input type="range" id="ts-sticker-size" min="40" max="280" value="100" step="5"><span class="ts-size-val" id="ts-size-val">100px</span></div>' +
          '<input type="file" id="ts-file-input" accept="image/*" multiple>' +
        '</div>' +
      '</div>' +
      '<div id="ts-edit-hint">✦ Sticker edit mode — drag, rotate, scale</div>';
    document.body.appendChild(wrap);
  }

  /* ═══════════════════════════════════════════════════════
     STICKER LAYER SETUP
  ═══════════════════════════════════════════════════════ */
  function buildStickerLayer() {
    if (document.querySelector('.sticker-layer')) return;
    var layer = document.createElement('div');
    layer.className = 'sticker-layer';
    document.body.appendChild(layer);
    stickerData.forEach(function(sd) { createStickerEl(sd); });
  }

  /* ═══════════════════════════════════════════════════════
     GLOBAL POINTER MOVE / UP (handles move, rotate, scale)
  ═══════════════════════════════════════════════════════ */
  function setupPointerHandlers() {
    window.addEventListener('pointermove', function(e) {
      if (!dragState) return;
      e.preventDefault();

      var sd = stickerData.find(function(s) { return s.id === dragState.id; });
      var el = document.querySelector('.sticker-item[data-sid="' + dragState.id + '"]');
      if (!el) { // might be video sticker — find without stickerData
        el = document.querySelector('.sticker-item[data-vid="' + dragState.id + '"]');
        sd = null; // we'll update DOM only for video stickers
      }
      if (!el) return;

      if (dragState.type === 'move') {
        var x = e.pageX - dragState.ox;
        var y = e.pageY - dragState.oy;
        el.style.left = x + 'px';
        el.style.top  = y + 'px';
        if (sd) { sd.x = x; sd.y = y; }
        else {
          // video sticker — store in videoPositions
          videoPositions[dragState.id] = { x: x, y: y };
          try { localStorage.setItem('vs-pos', JSON.stringify(videoPositions)); } catch(e2){}
        }

      } else if (dragState.type === 'rotate') {
        var angle = Math.atan2(e.pageY - dragState.cy, e.pageX - dragState.cx) * 180 / Math.PI;
        var newRot = dragState.startRot + (angle - dragState.startAngle);
        el.style.transform = 'rotate(' + newRot + 'deg)';
        if (sd) { sd.rot = newRot; }
        else    { if (!videoRots) videoRots = {}; videoRots[dragState.id] = newRot; try { localStorage.setItem('vs-rot', JSON.stringify(videoRots)); } catch(e2){} }

      } else if (dragState.type === 'scale') {
        var dist    = Math.max(30, Math.hypot(e.pageX - dragState.cx, e.pageY - dragState.cy));
        var newSize = Math.max(40, Math.min(400, Math.round(dragState.startSize * (dist / dragState.startDist))));
        var media   = el.querySelector('img, video');
        if (media) { media.style.width = newSize + 'px'; media.style.height = 'auto'; }
        if (sd) { sd.size = newSize; }
        else    { if (!videoSizes) videoSizes = {}; videoSizes[dragState.id] = newSize; try { localStorage.setItem('vs-size', JSON.stringify(videoSizes)); } catch(e2){} }
      }

    }, { passive: false });

    window.addEventListener('pointerup', function() {
      if (dragState) { dragState = null; save(); }
    });
  }

  var videoPositions = {};
  var videoRots      = {};
  var videoSizes     = {};
  try { videoPositions = JSON.parse(localStorage.getItem('vs-pos')  || '{}'); } catch(e){}
  try { videoRots      = JSON.parse(localStorage.getItem('vs-rot')  || '{}'); } catch(e){}
  try { videoSizes     = JSON.parse(localStorage.getItem('vs-size') || '{}'); } catch(e){}

  /* ═══════════════════════════════════════════════════════
     CREATE STICKER ELEMENT (image or video)
  ═══════════════════════════════════════════════════════ */
  function createStickerEl(sd) {
    var layer = document.querySelector('.sticker-layer');
    if (!layer) return;

    var wrap = document.createElement('div');
    wrap.className = 'sticker-item';
    wrap.dataset.sid = sd.id;
    wrap.style.left      = (sd.x || 60) + 'px';
    wrap.style.top       = (sd.y || 120) + 'px';
    wrap.style.transform = 'rotate(' + (sd.rot || 0) + 'deg)';

    /* media */
    var media;
    if (sd.type === 'video') {
      media = document.createElement('video');
      media.src        = sd.src;
      media.loop       = true;
      media.muted      = true;
      media.autoplay   = true;
      media.playsInline = true;
    } else {
      media = document.createElement('img');
      media.src       = sd.src;
      media.draggable = false;
    }
    media.style.width    = (sd.size || 100) + 'px';
    media.style.height   = 'auto';
    media.style.maxWidth = '360px';
    media.style.minWidth = '40px';

    /* handles */
    var delBtn   = makeHandle('sticker-delete',  '×',  'Remove sticker');
    var rotBtn   = makeHandle('sticker-rotate',  '↻',  'Rotate');
    var scaleBtn = makeHandle('sticker-scale',   '⤡', 'Scale');

    wrap.appendChild(media);
    wrap.appendChild(delBtn);
    wrap.appendChild(rotBtn);
    wrap.appendChild(scaleBtn);
    layer.appendChild(wrap);

    /* ── MOVE (drag sticker body) ── */
    wrap.addEventListener('pointerdown', function(e) {
      if (!document.body.classList.contains('sticker-editing')) return;
      if (e.target.classList.contains('sticker-handle')) return;
      e.preventDefault();
      dragState = {
        type: 'move', id: sd.id,
        ox: e.pageX - parseFloat(wrap.style.left || 0),
        oy: e.pageY - parseFloat(wrap.style.top  || 0),
      };
    });

    /* ── ROTATE ── */
    rotBtn.addEventListener('pointerdown', function(e) {
      e.stopPropagation(); e.preventDefault();
      var c = centerOf(wrap);
      dragState = {
        type: 'rotate', id: sd.id,
        cx: c.x, cy: c.y,
        startRot:   sd.rot || 0,
        startAngle: Math.atan2(e.pageY - c.y, e.pageX - c.x) * 180 / Math.PI,
      };
    });

    /* ── SCALE ── */
    scaleBtn.addEventListener('pointerdown', function(e) {
      e.stopPropagation(); e.preventDefault();
      var c = centerOf(wrap);
      dragState = {
        type: 'scale', id: sd.id,
        cx: c.x, cy: c.y,
        startSize: sd.size || 100,
        startDist: Math.max(30, Math.hypot(e.pageX - c.x, e.pageY - c.y)),
      };
    });

    /* ── DELETE ── */
    delBtn.addEventListener('click', function(e) {
      e.stopPropagation();
      stickerData = stickerData.filter(function(s) { return s.id !== sd.id; });
      wrap.remove();
      save();
    });
  }

  /* ── video stickers (from VIDEO_STICKERS config) ── */
  function renderVideoStickers() {
    if (!VIDEO_STICKERS.length) return;
    var layer = document.querySelector('.sticker-layer');
    if (!layer) return;

    VIDEO_STICKERS.forEach(function(vs, i) {
      var vid = 'vs-' + i;
      if (layer.querySelector('[data-vid="' + vid + '"]')) return; // already rendered

      var x    = (videoPositions[vid] && videoPositions[vid].x != null) ? videoPositions[vid].x : (vs.x   != null ? vs.x   : 60);
      var y    = (videoPositions[vid] && videoPositions[vid].y != null) ? videoPositions[vid].y : (vs.y   != null ? vs.y   : 200);
      var size = videoSizes[vid]     != null ? videoSizes[vid]     : (vs.width != null ? vs.width : 260);
      var rot  = videoRots[vid]      != null ? videoRots[vid]      : 0;

      var wrap = document.createElement('div');
      wrap.className   = 'sticker-item';
      wrap.dataset.vid = vid;
      wrap.style.left      = x + 'px';
      wrap.style.top       = y + 'px';
      wrap.style.transform = 'rotate(' + rot + 'deg)';

      var video        = document.createElement('video');
      video.src        = vs.src;
      video.loop       = true;
      video.muted      = true;
      video.autoplay   = true;
      video.playsInline = true;
      video.style.width    = size + 'px';
      video.style.height   = 'auto';
      video.style.maxWidth = '360px';

      var delBtn   = makeHandle('sticker-delete',  '×',  'Remove');
      var rotBtn   = makeHandle('sticker-rotate',  '↻',  'Rotate');
      var scaleBtn = makeHandle('sticker-scale',   '⤡', 'Scale');

      wrap.appendChild(video);
      wrap.appendChild(delBtn);
      wrap.appendChild(rotBtn);
      wrap.appendChild(scaleBtn);
      layer.appendChild(wrap);

      /* move */
      wrap.addEventListener('pointerdown', function(e) {
        if (!document.body.classList.contains('sticker-editing')) return;
        if (e.target.classList.contains('sticker-handle')) return;
        e.preventDefault();
        dragState = {
          type: 'move', id: vid,
          ox: e.pageX - parseFloat(wrap.style.left || 0),
          oy: e.pageY - parseFloat(wrap.style.top  || 0),
        };
      });
      rotBtn.addEventListener('pointerdown', function(e) {
        e.stopPropagation(); e.preventDefault();
        var c = centerOf(wrap);
        dragState = { type:'rotate', id:vid, cx:c.x, cy:c.y, startRot: rot, startAngle: Math.atan2(e.pageY - c.y, e.pageX - c.x) * 180 / Math.PI };
      });
      scaleBtn.addEventListener('pointerdown', function(e) {
        e.stopPropagation(); e.preventDefault();
        var c = centerOf(wrap);
        dragState = { type:'scale', id:vid, cx:c.x, cy:c.y, startSize: size, startDist: Math.max(30, Math.hypot(e.pageX-c.x, e.pageY-c.y)) };
      });
      delBtn.addEventListener('click', function(e) {
        e.stopPropagation();
        wrap.remove();
        // mark as hidden so it doesn't re-render
        videoPositions[vid] = null;
        try { localStorage.setItem('vs-hidden-' + vid, '1'); } catch(ex){}
      });
    });
  }

  /* ── helpers ── */
  function makeHandle(cls, icon, title) {
    var el = document.createElement('button');
    el.className   = 'sticker-handle ' + cls;
    el.textContent = icon;
    el.title       = title;
    return el;
  }

  function centerOf(wrap) {
    var rect = wrap.getBoundingClientRect();
    var sx   = window.scrollX || window.pageXOffset || 0;
    var sy   = window.scrollY || window.pageYOffset || 0;
    return { x: rect.left + rect.width / 2 + sx, y: rect.top + rect.height / 2 + sy };
  }

  /* ── add sticker from file ── */
  function addStickerFromFile(file, size) {
    var reader = new FileReader();
    reader.onload = function(ev) {
      var sd = {
        id:   makeid(),
        type: 'image',
        src:  ev.target.result,
        x:    Math.round(60  + Math.random() * Math.max(200, window.innerWidth  - 200)),
        y:    Math.round((window.scrollY||0) + 100 + Math.random() * 220),
        rot:  Math.round((Math.random() * 30) - 15),
        size: size,
      };
      stickerData.push(sd);
      createStickerEl(sd);
      save();
    };
    reader.readAsDataURL(file);
  }

  /* ═══════════════════════════════════════════════════════
     RENDER THEME CONTROLS
  ═══════════════════════════════════════════════════════ */
  function renderStyles() {
    var c = document.getElementById('ts-styles');
    c.innerHTML = '';
    Object.keys(THEMES).forEach(function(key) {
      var cfg = THEMES[key];
      var btn = document.createElement('button');
      btn.className = 'ts-style-btn' + (state.theme === key ? ' active' : '');
      btn.innerHTML = '<span class="ts-icon">' + cfg.icon + '</span>' + cfg.label;
      btn.addEventListener('click', function() {
        state.theme   = key;
        state.variant = THEMES[key].variants[0].key;
        applyTheme(); renderStyles(); renderVariants(); toggleStickers();
      });
      c.appendChild(btn);
    });
  }

  function renderVariants() {
    var c = document.getElementById('ts-variants');
    c.innerHTML = '';
    THEMES[state.theme].variants.forEach(function(v) {
      var btn = document.createElement('button');
      btn.className = 'ts-var-btn' + (state.variant === v.key ? ' active' : '');
      btn.innerHTML = '<span class="ts-var-dot" style="background:' + v.color + '"></span>' + v.label;
      btn.addEventListener('click', function() {
        state.variant = v.key; applyTheme(); renderVariants();
      });
      c.appendChild(btn);
    });
  }

  function toggleStickers() {
    var sec = document.getElementById('ts-sticker-section');
    if (sec) sec.classList.toggle('show', state.theme === 'funky');
    setEditMode(panelOpen);
  }

  /* ═══════════════════════════════════════════════════════
     INIT
  ═══════════════════════════════════════════════════════ */
  function init() {
    injectCSS();
    buildPanel();
    buildStickerLayer();
    setupPointerHandlers();
    applyTheme();
    renderStyles();
    renderVariants();
    toggleStickers();

    var btn   = document.getElementById('ts-btn');
    var panel = document.getElementById('ts-panel');
    var hint  = document.getElementById('ts-edit-hint');

    /* panel toggle */
    btn.addEventListener('click', function(e) {
      e.stopPropagation();
      panelOpen = !panelOpen;
      panel.classList.toggle('open', panelOpen);
      btn.classList.toggle('open', panelOpen);
      setEditMode(panelOpen);
      if (hint) hint.classList.toggle('show', panelOpen && state.theme === 'funky');
    });

    document.addEventListener('click', function(e) {
      if (panelOpen && !panel.contains(e.target) && e.target !== btn) {
        panelOpen = false;
        panel.classList.remove('open');
        btn.classList.remove('open');
        setEditMode(false);
        if (hint) hint.classList.remove('show');
      }
    });

    /* sticker controls */
    var fileInput  = document.getElementById('ts-file-input');
    var addBtn     = document.getElementById('ts-add-sticker');
    var sizeSlider = document.getElementById('ts-sticker-size');
    var sizeVal    = document.getElementById('ts-size-val');
    var clearBtn   = document.getElementById('ts-clear-stickers');

    addBtn.addEventListener('click', function() { fileInput.click(); });
    fileInput.addEventListener('change', function() {
      var size = parseInt(sizeSlider.value, 10);
      Array.from(fileInput.files).forEach(function(f) { addStickerFromFile(f, size); });
      fileInput.value = '';
    });
    sizeSlider.addEventListener('input', function() { sizeVal.textContent = sizeSlider.value + 'px'; });
    clearBtn.addEventListener('click', function() {
      stickerData = [];
      var layer = document.querySelector('.sticker-layer');
      if (layer) {
        // remove image stickers only, keep video stickers
        layer.querySelectorAll('.sticker-item[data-sid]').forEach(function(el) { el.remove(); });
      }
      save();
    });
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', init);
  } else {
    init();
  }

})();
