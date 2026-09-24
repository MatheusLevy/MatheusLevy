/* ---------------------------------------------------------------------------
 *  Renders the whole page from window.SITE (see site.config.js).
 *  You normally don't need to touch this file.
 * ------------------------------------------------------------------------- */
(function () {
  "use strict";

  var S = window.SITE || {};
  var $ = function (sel) { return document.querySelector(sel); };

  /* --- tiny DOM helper ---------------------------------------------------
     el("div.card", { href: "#" }, [child, "text"])                        */
  function el(spec, attrs, children) {
    var parts = spec.split(".");
    var node = document.createElement(parts.shift() || "div");
    if (parts.length) node.className = parts.join(" ");
    Object.keys(attrs || {}).forEach(function (k) {
      if (k === "html") node.innerHTML = attrs[k];
      else if (k === "text") node.textContent = attrs[k];
      else if (attrs[k] != null) node.setAttribute(k, attrs[k]);
    });
    (children || []).forEach(function (c) {
      if (c == null) return;
      node.appendChild(typeof c === "string" ? document.createTextNode(c) : c);
    });
    return node;
  }

  function svgIcon(path, viewBox) {
    var ns = "http://www.w3.org/2000/svg";
    var svg = document.createElementNS(ns, "svg");
    svg.setAttribute("viewBox", viewBox || "0 0 24 24");
    svg.setAttribute("aria-hidden", "true");
    var p = document.createElementNS(ns, "path");
    p.setAttribute("d", path);
    svg.appendChild(p);
    return svg;
  }

  /* ----------------------------------------------------------------- head */
  function applyHead() {
    if (S.accent) document.documentElement.style.setProperty("--brand", S.accent);
    var title = S.tabTitle || S.name || document.title;
    document.title = title;
    [["meta[name=description]", S.description], ["meta[property='og:description']", S.description],
     ["meta[property='og:title']", title]].forEach(function (pair) {
      var m = $(pair[0]);
      if (m && pair[1]) m.setAttribute("content", pair[1]);
    });
    document.querySelectorAll("[data-site=name]").forEach(function (n) { n.textContent = S.name || ""; });
  }

  /* ---------------------------------------------------------------- pieces */
  function socialList(className) {
    var wrap = el("div." + className);
    (S.socials || []).forEach(function (s) {
      var a = el("a", { href: s.href, text: s.label || s.icon });
      if (s.href && s.href.indexOf("mailto:") !== 0) { a.target = "_blank"; a.rel = "noopener"; }
      wrap.appendChild(a);
    });
    return wrap;
  }

  var sectionNo = 0;

  function section(id, title, body) {
    var s = el("section.section.reveal", { id: id });
    if (!title) { s.appendChild(body); return s; }
    sectionNo++;
    var label = el("h2.section__title", {}, [
      el("span.idx", { text: "SEC." + ("0" + sectionNo).slice(-2) }),
      document.createTextNode(title),
    ]);
    s.appendChild(el("div.row", {}, [label, el("div.row__body", {}, [body])]));
    return s;
  }

  function initials(name) {
    return (name || "?").split(/\s+/).slice(0, 2).map(function (w) { return w[0]; }).join("").toUpperCase();
  }

  function beacon() {
    var b = S.status;
    if (!b || !b.value) return null;

    var value = el("div.beacon__value");
    value.appendChild(b.href
      ? el("a", { href: b.href, target: "_blank", rel: "noopener", text: b.value })
      : document.createTextNode(b.value));
    value.appendChild(el("div.eq", { "aria-hidden": "true" },
      [el("span"), el("span"), el("span"), el("span")]));

    return el("div.beacon", {}, [
      el("div.beacon__label", { text: b.label || "status" }),
      value,
      b.detail ? el("div.beacon__detail", { text: b.detail }) : null,
    ]);
  }

  function hero() {
    var frag = document.createDocumentFragment();

    var left = el("div.hero__text");
    left.appendChild(el("h1.hero__name", { text: S.name || "" }));
    left.appendChild(el("p.hero__role", { id: "role" }, [el("span", { id: "role-text" }), el("span.caret")]));
    if (S.location) left.appendChild(el("div.hero__location", { text: S.location }));
    if (S.intro) left.appendChild(el("p.hero__intro", { html: S.intro }));

    var actions = el("div.actions");
    (S.actions || []).forEach(function (a) {
      actions.appendChild(el("a.btn" + (a.primary ? ".btn--primary" : ""), { href: a.href, text: a.label }));
    });
    left.appendChild(actions);

    var portrait = el("div.hero__portrait");
    portrait.appendChild(S.avatar
      ? el("img.avatar", { src: S.avatar, alt: S.name || "", loading: "eager" })
      : el("div.avatar.avatar--initials", { text: initials(S.name), "aria-hidden": "true" }));

    var side = el("div.hero__side", {}, [portrait]);
    var link = beacon();
    if (link) side.appendChild(link);

    var h = el("section.hero", { id: "top" }, [left, side]);
    frag.appendChild(h);

    if ((S.facts || []).length) {
      var facts = el("div.facts.reveal");
      S.facts.forEach(function (f) {
        facts.appendChild(el("span.fact", {}, [
          el("span.fact__value", { text: f.value }), " " + f.label,
        ]));
      });
      frag.appendChild(facts);
    }
    return frag;
  }

  function about() {
    var a = S.about;
    var grid = el("div.about");
    var text = el("div.about__prose");
    (a.body || []).forEach(function (p) { text.appendChild(el("p", { html: p })); });
    grid.appendChild(text);
    if ((a.highlights || []).length) {
      var list = el("ul.highlights");
      a.highlights.forEach(function (h) { list.appendChild(el("li", { html: h })); });
      grid.appendChild(el("aside.card", {}, [list]));
    }
    return section("about", a.title || "About", grid);
  }

  function skills() {
    var wrap = el("div.skill-groups");
    (S.skills.groups || []).forEach(function (g) {
      var chips = el("div.chips");
      (g.items || []).forEach(function (i) { chips.appendChild(el("span.chip", { text: i })); });
      wrap.appendChild(el("div.skill-group.card", {}, [el("h3", { text: g.name }), chips]));
    });
    return section("skills", S.skills.title || "Skills", wrap);
  }

  function projects() {
    var grid = el("div.projects-grid");
    var ARROW = "M7 17 17 7M9 7h8v8";
    var numberLabel = S.projects.numberLabel || "CARGO NO.";
    (S.projects.items || []).forEach(function (p, i) {
      // No href → a plain card (e.g. an accepted paper with no link yet).
      var card = p.href
        ? el("a.project", { href: p.href, target: "_blank", rel: "noopener" })
        : el("div.project.project--static");
      card.appendChild(el("div.project__no", {
        text: numberLabel + " " + ("00" + (i + 1)).slice(-3),
      }));
      var arrow = svgIcon(ARROW);
      arrow.setAttribute("class", "project__arrow");
      arrow.style.width = arrow.style.height = "18px";
      arrow.style.fill = "none";
      arrow.style.stroke = "currentColor";
      arrow.style.strokeWidth = "2";
      arrow.style.strokeLinecap = "round";

      card.appendChild(el("div.project__top", {}, [
        el("span.project__name", { text: p.name }), p.href ? arrow : null,
      ]));
      card.appendChild(el("p.project__blurb", { html: p.blurb || "" }));
      if ((p.tags || []).length) {
        var tags = el("div.chips");
        // A tag is a string, or { text, highlight: true } for a filled chip.
        p.tags.forEach(function (t) {
          tags.appendChild(el("span.chip" + (t.highlight ? ".chip--highlight" : ""), { text: t.text || t }));
        });
        card.appendChild(tags);
      }
      grid.appendChild(card);
    });
    return section("projects", S.projects.title || "Projects", grid);
  }

  function experience() {
    var tl = el("div.timeline");
    (S.experience.items || []).forEach(function (it) {
      var org = it.orgHref
        ? '<a href="' + it.orgHref + '" target="_blank" rel="noopener">' + it.org + "</a>"
        : it.org;
      var status = it.status
        ? el("span.tl-item__status" + (it.active ? ".tl-item__status--active" : ""),
             { text: it.status })
        : null;
      tl.appendChild(el("div.tl-item", {}, [
        el("div.tl-item__period", { text: it.period }),
        el("div.tl-item__role", { text: it.role }),
        el("div.tl-item__org", { html: org || "" }),
        status,
        it.detail ? el("p.tl-item__detail", { html: it.detail }) : null,
      ]));
    });
    return section("experience", S.experience.title || "Experience", tl);
  }

  function contact() {
    var c = S.contact;
    var box = el("div.contact", {}, [
      c.body ? el("p", { html: c.body }) : null,
      c.email ? el("a.contact__mail", { href: "mailto:" + c.email, text: c.email }) : null,
      socialList("socials"),
    ]);
    return section("contact", c.title || "Contact", box);
  }

  function footer() {
    var f = $("#footer");
    var year = new Date().getFullYear();
    f.appendChild(el("div", { html: "© " + year + " " + (S.name || "") + (S.footer && S.footer.note ? " · " + S.footer.note : "") }));
    if (S.footer && S.footer.sourceHref) {
      f.appendChild(el("a", { href: S.footer.sourceHref, target: "_blank", rel: "noopener", text: "View source ↗" }));
    }
  }

  /* ----------------------------------------------------------------- build */
  function build() {
    applyHead();
    var main = $("#main");
    main.appendChild(hero());

    var sections = [];
    if (S.about) sections.push(["about", S.about.title || "About", about()]);
    if (S.skills) sections.push(["skills", S.skills.title || "Skills", skills()]);
    if (S.projects) sections.push(["projects", S.projects.title || "Projects", projects()]);
    if (S.experience) sections.push(["experience", S.experience.title || "Experience", experience()]);
    if (S.contact) sections.push(["contact", S.contact.title || "Contact", contact()]);
    sections.forEach(function (s) { main.appendChild(s[2]); });

    var nav = $("#nav");
    sections.forEach(function (s) {
      nav.appendChild(el("a", { href: "#" + s[0], text: s[1] }));
    });

    footer();
  }

  /* ------------------------------------------------------------ behaviours */
  function typewriter() {
    var out = document.getElementById("role-text");
    var roles = S.roles || [];
    if (!out || !roles.length) return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      out.textContent = roles[0];
      return;
    }
    var i = 0, c = 0, deleting = false;
    (function tick() {
      var word = roles[i % roles.length];
      c += deleting ? -1 : 1;
      out.textContent = word.slice(0, c);
      var delay = deleting ? 45 : 85;
      if (!deleting && c === word.length) { deleting = true; delay = 1700; }
      else if (deleting && c === 0) { deleting = false; i++; delay = 320; }
      setTimeout(tick, delay);
    })();
  }

  // localStorage throws on some origins (file://, blocked cookies, private mode).
  var store = {
    get: function (k) { try { return localStorage.getItem(k); } catch (e) { return null; } },
    set: function (k, v) { try { localStorage.setItem(k, v); } catch (e) { /* ignore */ } },
  };

  // Match the mobile browser chrome to the page background.
  function paintBrowserChrome() {
    var meta = $("meta[name=theme-color]");
    if (!meta) return;
    var bg = getComputedStyle(document.body).backgroundColor;
    // Skip unresolved/transparent values rather than shipping a bad color.
    if (bg && bg.indexOf("rgba(0, 0, 0, 0") !== 0) meta.setAttribute("content", bg);
  }

  function theme() {
    var root = document.documentElement;
    var saved = store.get("theme");
    if (saved) root.setAttribute("data-theme", saved);
    paintBrowserChrome();
    $("#theme-toggle").addEventListener("click", function () {
      var dark = !root.hasAttribute("data-theme")
        ? !window.matchMedia("(prefers-color-scheme: light)").matches
        : root.getAttribute("data-theme") === "dark";
      var next = dark ? "light" : "dark";
      root.setAttribute("data-theme", next);
      store.set("theme", next);
      paintBrowserChrome();
    });
  }

  function reveal() {
    var io = new IntersectionObserver(function (entries) {
      entries.forEach(function (e) {
        if (e.isIntersecting) { e.target.classList.add("is-visible"); io.unobserve(e.target); }
      });
    }, { rootMargin: "0px 0px -8% 0px" });
    document.querySelectorAll(".reveal").forEach(function (n) { io.observe(n); });
  }

  function scrollSpy() {
    var header = $(".site-header");
    var links = Array.prototype.slice.call(document.querySelectorAll(".nav a"));
    window.addEventListener("scroll", function () {
      header.classList.toggle("is-stuck", window.scrollY > 8);
      var current = null;
      links.forEach(function (a) {
        var t = document.querySelector(a.getAttribute("href"));
        if (t && t.getBoundingClientRect().top <= 140) current = a;
      });
      links.forEach(function (a) { a.classList.toggle("is-active", a === current); });
    }, { passive: true });
  }

  function easterEgg() {
    var word = (S.easterEgg || "").toLowerCase();
    if (!word) return;
    var buf = "";
    document.addEventListener("keydown", function (e) {
      if (e.key.length !== 1) return;
      buf = (buf + e.key.toLowerCase()).slice(-word.length);
      if (buf !== word) return;
      buf = "";
      var colors = [S.accent || "#2e3192", "#ffffff", "#7b86ff", "#b9bfff"];
      for (var i = 0; i < 90; i++) {
        var p = document.createElement("span");
        p.className = "confetti";
        p.style.left = Math.random() * 100 + "vw";
        p.style.background = colors[i % colors.length];
        p.style.animationDuration = (2 + Math.random() * 2) + "s";
        p.style.animationDelay = (Math.random() * 0.6) + "s";
        document.body.appendChild(p);
        setTimeout(function (node) { return function () { node.remove(); }; }(p), 5000);
      }
    });
  }

  build();
  [typewriter, theme, reveal, scrollSpy, easterEgg].forEach(function (fn) {
    try { fn(); } catch (e) { console.warn(fn.name + " failed:", e); }
  });
})();
