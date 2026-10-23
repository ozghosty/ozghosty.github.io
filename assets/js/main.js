(function () {
  var root = document.documentElement;

  // Theme toggle
  function currentTheme() {
    if (root.dataset.theme) return root.dataset.theme;
    return window.matchMedia("(prefers-color-scheme: light)").matches ? "light" : "dark";
  }
  function setTheme(theme) {
    root.dataset.theme = theme;
    try { localStorage.setItem("theme", theme); } catch (e) {}
    var frame = document.querySelector("iframe.giscus-frame");
    if (frame) {
      frame.contentWindow.postMessage(
        { giscus: { setConfig: { theme: theme === "light" ? "light" : "dark_dimmed" } } },
        "https://giscus.app"
      );
    }
  }
  document.querySelectorAll("[data-theme-toggle]").forEach(function (btn) {
    btn.addEventListener("click", function () {
      setTheme(currentTheme() === "light" ? "dark" : "light");
    });
  });

  // Mobile nav
  var navToggle = document.querySelector("[data-nav-toggle]");
  var nav = document.getElementById("site-nav");
  if (navToggle && nav) {
    navToggle.addEventListener("click", function () {
      var open = nav.classList.toggle("open");
      navToggle.setAttribute("aria-expanded", open ? "true" : "false");
    });
  }

  // Search
  var overlay = document.querySelector("[data-search]");
  if (!overlay) return;
  var input = overlay.querySelector("[data-search-input]");
  var results = overlay.querySelector("[data-search-results]");
  var index = null;
  var lastFocus = null;

  function loadIndex() {
    if (index) return Promise.resolve(index);
    var url = (document.querySelector('link[rel="stylesheet"][href*="main.css"]').getAttribute("href") || "")
      .replace(/assets\/css\/main\.css.*$/, "search.json");
    return fetch(url).then(function (r) { return r.json(); }).then(function (data) { index = data; return data; });
  }
  function escapeHtml(s) {
    return String(s).replace(/[&<>"']/g, function (c) {
      return { "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;" }[c];
    });
  }
  function render(query) {
    var q = query.trim().toLowerCase();
    if (!q || !index) { results.innerHTML = ""; return; }
    var terms = q.split(/\s+/);
    var hits = index.filter(function (p) {
      var hay = (p.title + " " + p.tags.join(" ") + " " + p.content).toLowerCase();
      return terms.every(function (t) { return hay.indexOf(t) !== -1; });
    }).slice(0, 8);
    results.innerHTML = hits.length
      ? hits.map(function (p) {
          return '<li><a href="' + escapeHtml(p.url) + '"><strong>' + escapeHtml(p.title) +
            "</strong><small>" + escapeHtml(p.date) + (p.tags.length ? " · " + escapeHtml(p.tags.join(", ")) : "") +
            "</small></a></li>";
        }).join("")
      : '<li class="search-empty">No posts match “' + escapeHtml(query) + "”.</li>";
  }
  function openSearch() {
    lastFocus = document.activeElement;
    overlay.hidden = false;
    document.body.style.overflow = "hidden";
    input.focus();
    loadIndex().then(function () { render(input.value); }).catch(function () {
      results.innerHTML = '<li class="search-empty">Search is unavailable right now.</li>';
    });
  }
  function closeSearch() {
    overlay.hidden = true;
    document.body.style.overflow = "";
    if (lastFocus) lastFocus.focus();
  }

  document.querySelectorAll("[data-search-open]").forEach(function (b) { b.addEventListener("click", openSearch); });
  overlay.querySelector("[data-search-close]").addEventListener("click", closeSearch);
  overlay.addEventListener("click", function (e) { if (e.target === overlay) closeSearch(); });
  input.addEventListener("input", function () { render(input.value); });
  document.addEventListener("keydown", function (e) {
    if (e.key === "Escape" && !overlay.hidden) closeSearch();
    var typing = /input|textarea|select/i.test(document.activeElement.tagName) || document.activeElement.isContentEditable;
    if ((e.key === "/" && !typing) || ((e.metaKey || e.ctrlKey) && e.key.toLowerCase() === "k")) {
      e.preventDefault();
      openSearch();
    }
  });
})();
