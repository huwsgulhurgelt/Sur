(function () {

  var css = document.createElement('style');
  css.textContent = [
    '.pt-wrap{position:fixed;inset:0;z-index:9990;pointer-events:none;perspective:1600px;perspective-origin:50% 48%;display:flex;overflow:hidden;}',
    '.pt-wrap.blocking{pointer-events:all;}',
    '.pt-door{flex:1;height:100%;position:relative;will-change:transform;}',
    '.pt-door-l{transform-origin:left center;}',
    '.pt-door-r{transform-origin:right center;}',
    '.pt-door::after{content:"";position:absolute;inset:0;background:linear-gradient(150deg,rgba(255,255,255,.12) 0%,rgba(255,255,255,.04) 40%,rgba(0,0,0,.06) 100%);pointer-events:none;}',
    '.pt-door-l::before{content:"";position:absolute;top:0;right:0;width:2px;height:100%;background:rgba(255,255,255,.25);}',
    '.pt-door-r::before{content:"";position:absolute;top:0;left:0;width:2px;height:100%;background:rgba(255,255,255,.25);}',
    '.pt-logo{position:absolute;top:50%;left:50%;transform:translate(-50%,-50%);color:rgba(255,255,255,.92);font-family:Inter,-apple-system,sans-serif;font-size:2rem;font-weight:900;z-index:2;pointer-events:none;opacity:0;user-select:none;}',
    '.pt-wrap.exit .pt-door-l{animation:ptCloseL .44s cubic-bezier(.86,0,.07,1) 0s both;}',
    '.pt-wrap.exit .pt-door-r{animation:ptCloseR .44s cubic-bezier(.86,0,.07,1) .05s both;}',
    '.pt-wrap.exit .pt-logo{animation:ptLogoIn .28s ease .32s both;}',
    '.pt-wrap.enter .pt-door-l{transform:rotateY(0deg);transform-origin:left center;animation:ptOpenL .52s cubic-bezier(.86,0,.07,1) .1s both;}',
    '.pt-wrap.enter .pt-door-r{transform:rotateY(0deg);transform-origin:right center;animation:ptOpenR .52s cubic-bezier(.86,0,.07,1) .06s both;}',
    '.pt-wrap.enter .pt-logo{opacity:1;animation:ptLogoOut .18s ease 0s both;}',
    '@keyframes ptCloseL{from{transform:rotateY(-90deg)}to{transform:rotateY(0deg)}}',
    '@keyframes ptCloseR{from{transform:rotateY(90deg)}to{transform:rotateY(0deg)}}',
    '@keyframes ptLogoIn{from{opacity:0;transform:translate(-50%,-44%) scale(.7)}to{opacity:1;transform:translate(-50%,-50%) scale(1)}}',
    '@keyframes ptOpenL{from{transform:rotateY(0deg)}to{transform:rotateY(-90deg)}}',
    '@keyframes ptOpenR{from{transform:rotateY(0deg)}to{transform:rotateY(90deg)}}',
    '@keyframes ptLogoOut{from{opacity:1}to{opacity:0}}',
    'body.pt-entering .nav{animation:ptNavIn .5s cubic-bezier(.22,1,.36,1) .28s both;}',
    'body.pt-entering .page-wrap{animation:ptContentIn .65s cubic-bezier(.22,1,.36,1) .3s both;}',
    'body.pt-entering .home-hero{animation:ptContentIn .65s cubic-bezier(.22,1,.36,1) .28s both;}',
    'body.pt-entering .home-grid{animation:ptContentIn .7s cubic-bezier(.22,1,.36,1) .38s both;}',
    '@keyframes ptNavIn{from{opacity:0;transform:translateY(-8px)}to{opacity:1;transform:translateY(0)}}',
    '@keyframes ptContentIn{from{opacity:0;transform:translateY(28px) scale(.99)}to{opacity:1;transform:translateY(0) scale(1)}}'
  ].join('');
  document.head.appendChild(css);

  var transitioning = false;

  function killOverlays() {
    var old = document.querySelectorAll('.pt-wrap');
    for (var i = 0; i < old.length; i++) old[i].remove();
  }

  function getDoorColors() {
    try {
      var cs     = getComputedStyle(document.documentElement);
      var accent = cs.getPropertyValue('--accent').trim() || '#1a1a1a';
      var alt    = cs.getPropertyValue('--funky-alt').trim();
      var theme  = document.documentElement.getAttribute('data-theme') || 'normal';
      var cL     = accent;
      var cR     = (theme === 'funky' && alt && alt !== accent) ? alt : accent;
      if (theme === 'flower') {
        cR = cs.getPropertyValue('--border').trim() || '#e4e4e0';
      }
      return { cL: cL, cR: cR };
    } catch (e) {
      return { cL: '#1a1a1a', cR: '#1a1a1a' };
    }
  }

  function createOverlay(mode) {
    killOverlays();
    var colors = getDoorColors();
    var wrap   = document.createElement('div');
    wrap.className = 'pt-wrap ' + mode;
    if (mode === 'exit') wrap.classList.add('blocking');

    var dL = document.createElement('div');
    dL.className = 'pt-door pt-door-l';
    dL.style.background = colors.cL;

    var dR = document.createElement('div');
    dR.className = 'pt-door pt-door-r';
    dR.style.background = colors.cR;

    var logo = document.createElement('div');
    logo.className = 'pt-logo';
    logo.textContent = '\u2736';

    wrap.appendChild(dL);
    wrap.appendChild(dR);
    wrap.appendChild(logo);
    document.body.appendChild(wrap);
    return wrap;
  }

  function doExit(href) {
    if (transitioning) return;
    transitioning = true;
    createOverlay('exit');
    setTimeout(function () { window.location.href = href; }, 500);
  }

  function doEnter() {
    transitioning = false;
    var wrap = createOverlay('enter');
    wrap.classList.add('blocking');
    document.body.classList.add('pt-entering');
    var done = false;
    function finish() {
      if (done) return;
      done = true;
      wrap.remove();
      document.body.classList.remove('pt-entering');
      transitioning = false;
    }
    setTimeout(finish, 750);
    setTimeout(finish, 1400);
  }

  function isInternal(href) {
    if (!href || href === '#' || href.charAt(0) === '#') return false;
    if (href.indexOf('http') === 0 || href.indexOf('//') === 0) return false;
    if (href.indexOf('mailto:') === 0 || href.indexOf('tel:') === 0) return false;
    return true;
  }

  document.addEventListener('click', function (e) {
    var link = e.target.closest('a');
    if (!link) return;
    var href = link.getAttribute('href');
    if (!isInternal(href)) return;
    if (transitioning) { e.preventDefault(); return; }
    e.preventDefault();
    setTimeout(function () { doExit(href); }, 60);
  }, true);

  function onReady() {
    requestAnimationFrame(function () { requestAnimationFrame(doEnter); });
  }
  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', onReady);
  } else {
    onReady();
  }

})();
