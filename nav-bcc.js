(function() {
  var NAV_HTML = `
  <div id="announce-bar" style="display:none;position:fixed;top:0;left:0;right:0;z-index:10003;background:#8C2F2F;min-height:36px;display:flex;align-items:center;justify-content:center;gap:20px;padding:6px 16px;flex-wrap:wrap;">
    <span class="announce-text" id="announce-text"></span>
    <a class="announce-link" id="announce-link" href="#" target="_blank" rel="noopener noreferrer"></a>
  </div>
  <nav id="navbar">
    <a href="/" aria-label="Blue Claw Country — Home"><img src="/bclogo_transparent.png" alt="Blue Claw Country" class="nav-logo" /></a>
    <ul class="nav-links">
      <li><a href="/music.html">Music</a></li>
      <li><a href="/shows.html">Shows</a></li>
      <li><a href="/news.html">News</a></li>
      <li><a href="/#manifesto">Story</a></li>
      <li><a href="/#join">Citizenship</a></li>
      <li><a href="https://shop.blueclawcountry.com" target="_blank" rel="noopener noreferrer">Shop</a></li>
      <li><a href="https://craigwhitakermusic.com" target="_blank" rel="noopener noreferrer" class="nav-bcc">Craig Whitaker ↗</a></li>
    </ul>
    <div class="hamburger" id="hamburger" onclick="toggleMobileMenu()">
      <span></span><span></span><span></span>
    </div>
  </nav>
  <div class="mobile-menu" id="mobile-menu">
    <button class="mobile-menu-close" id="menu-close" onclick="closeMobileMenu()">&#x2715;</button>
    <a href="/music.html">Music</a>
    <a href="/shows.html">Shows</a>
    <a href="/news.html">News</a>
    <a href="/#manifesto">Story</a>
    <a href="/#join">Citizenship</a>
    <a href="https://shop.blueclawcountry.com" target="_blank" rel="noopener noreferrer">Shop</a>
    <a href="https://craigwhitakermusic.com" target="_blank" rel="noopener noreferrer">Craig Whitaker ↗</a>
  </div>`;

  document.write(NAV_HTML);

  // Load banner from shared JSON — fetches from CWM as single source of truth
  fetch('https://craigwhitakermusic.com/banner.json')
    .then(function(r) { return r.json(); })
    .then(function(b) {
      var bar = document.getElementById('announce-bar');
      if (!b.active) { bar.style.display = 'none'; return; }
      document.getElementById('announce-text').textContent = b.text;
      var link = document.getElementById('announce-link');
      link.textContent = b.linkLabel + ' ↗';
      link.href = b.linkUrl;
      bar.style.display = 'flex';
    })
    .catch(function() {
      document.getElementById('announce-bar').style.display = 'none';
    });

  // Nav scroll behavior
  window.addEventListener('DOMContentLoaded', function() {
    var nav = document.getElementById('navbar');
    var bar = document.getElementById('announce-bar');
    function syncNav() { if (bar && bar.style.display !== 'none') nav.style.top = bar.offsetHeight + 'px'; else nav.style.top = '0'; }
    syncNav();
    window.addEventListener('resize', syncNav, { passive: true });
    window.addEventListener('scroll', function() {
      if (window.scrollY > 40) nav.classList.add('scrolled');
      else nav.classList.remove('scrolled');
    }, { passive: true });
  });

  // Mobile menu functions
  window.toggleMobileMenu = function() {
    var h = document.getElementById('hamburger');
    var m = document.getElementById('mobile-menu');
    h.classList.toggle('active');
    m.classList.toggle('open');
    document.body.style.overflow = m.classList.contains('open') ? 'hidden' : '';
  };
  window.closeMobileMenu = function() {
    var h = document.getElementById('hamburger');
    var m = document.getElementById('mobile-menu');
    h.classList.remove('active');
    m.classList.remove('open');
    document.body.style.overflow = '';
  };
})();
