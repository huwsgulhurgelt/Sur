(function () {
  function init() {
    var btn    = document.getElementById('navHamburger');
    var drawer = document.getElementById('navDrawer');
    if (!btn || !drawer) return;

    btn.addEventListener('click', function (e) {
      e.stopPropagation();
      var open = drawer.classList.toggle('open');
      btn.classList.toggle('open', open);
    });

    /* close when a drawer link is tapped */
    drawer.addEventListener('click', function (e) {
      if (e.target.tagName === 'A') {
        drawer.classList.remove('open');
        btn.classList.remove('open');
      }
    });

    /* close when tapping anywhere outside */
    document.addEventListener('click', function (e) {
      if (!btn.contains(e.target) && !drawer.contains(e.target)) {
        drawer.classList.remove('open');
        btn.classList.remove('open');
      }
    });
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', init);
  } else {
    init();
  }
})();
