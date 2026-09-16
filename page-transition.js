/* ═══════════════════════════════════════════════════════
   page-transition.js  — REMOVED animation, instant page loads
═══════════════════════════════════════════════════════ */
(function () {

  /* ── Paint background IMMEDIATELY before any render ── */
  (function prePaint() {
    try {
      var t = JSON.parse(localStorage.getItem('site-theme') || 'null');
      if (t && t.bg) {
        document.documentElement.style.background = t.bg;
        document.documentElement.style.backgroundAttachment = 'fixed';
      }
    } catch (e) {}
  })();

  var transitioning = false;

  function saveBg() {
    try {
      var cs   = getComputedStyle(document.documentElement);
      var bg   = cs.getPropertyValue('--body-bg').trim() ||
                 cs.getPropertyValue('background').trim() ||
                 getComputedStyle(document.body).background;
      var t    = JSON.parse(localStorage.getItem('site-theme') || '{}');
      t.bg     = bg;
      localStorage.setItem('site-theme', JSON.stringify(t));
    } catch (e) {}
  }

  function doExit(href) {
    if (transitioning) return;
    transitioning = true;
    saveBg();
    // Instant navigation - no animation
    window.location.href = href;
  }

  function doEnter() {
    transitioning = false;
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
    doExit(href);
  }, true);

  function onReady() {
    doEnter();
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', onReady);
  } else {
    onReady();
  }

})();
