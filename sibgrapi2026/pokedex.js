/* UDF Tutorial Pokédex: dialog box, theme toggle and the "catch" (download) counter. */
(function () {
  "use strict";

  var root = document.documentElement;
  var reduced = window.matchMedia && window.matchMedia("(prefers-reduced-motion: reduce)").matches;

  // localStorage can throw (file://, blocked site data, private mode).
  var store = {
    get: function (k) { try { return localStorage.getItem(k); } catch (e) { return null; } },
    set: function (k, v) { try { localStorage.setItem(k, v); } catch (e) { /* ignore */ } },
  };

  /* ---- Theme: same key as the main site, so the choice carries over ---- */
  document.getElementById("theme-toggle").addEventListener("click", function () {
    var dark = root.hasAttribute("data-theme")
      ? root.getAttribute("data-theme") === "dark"
      : window.matchMedia("(prefers-color-scheme: dark)").matches;
    var next = dark ? "light" : "dark";
    root.setAttribute("data-theme", next);
    store.set("theme", next);
  });

  /* ---- Dialog box with a typewriter ----------------------------------- */
  var dialog = document.getElementById("dialog");
  var text = document.getElementById("dialog-text");
  var intro = [
    "A wild TUTORIAL appeared!",
    "Four starters are waiting in the tall grass: two slide decks and two notebooks.",
    "Choose one and press CATCH. The notebooks train on a plain CPU, or online in Colab.",
  ];
  var timer = null;
  var queue = [];
  var full = "";

  function type(line) {
    clearInterval(timer);
    full = line;
    if (reduced) { text.textContent = line; return; }
    var i = 0;
    text.textContent = "";
    timer = setInterval(function () {
      i += 1;
      text.textContent = line.slice(0, i);
      if (i >= line.length) clearInterval(timer);
    }, 28);
  }

  function say(lines) {
    queue = lines.slice(1);
    type(lines[0]);
  }

  dialog.addEventListener("click", function () {
    if (text.textContent !== full) { clearInterval(timer); text.textContent = full; return; }
    if (queue.length) type(queue.shift());
  });

  /* ---- Caught counter -------------------------------------------------- */
  var KEY = "sibgrapi2026-caught";
  var cards = Array.prototype.slice.call(document.querySelectorAll(".card"));
  var caught = {};
  try { caught = JSON.parse(store.get(KEY) || "{}") || {}; } catch (e) { caught = {}; }

  function refresh() {
    var n = 0;
    cards.forEach(function (card) {
      var on = !!caught[card.dataset.id];
      card.classList.toggle("is-caught", on);
      if (on) n += 1;
    });
    var balls = document.querySelectorAll("#progress-balls i");
    for (var i = 0; i < balls.length; i++) balls[i].classList.toggle("is-on", i < n);
    document.getElementById("progress-count").textContent = n + " / " + cards.length;
    return n;
  }

  cards.forEach(function (card) {
    var link = card.querySelector(".catch");
    link.addEventListener("click", function () {
      // The download itself is the link's default action; this only adds the fanfare.
      var name = card.dataset.name;
      card.classList.remove("is-catching");
      void card.offsetWidth;                         // restart the animation
      card.classList.add("is-catching");
      setTimeout(function () { card.classList.remove("is-catching"); }, 950);

      var already = !!caught[card.dataset.id];
      caught[card.dataset.id] = true;
      store.set(KEY, JSON.stringify(caught));
      var n = refresh();
      if (already) {
        say([name + " is already in your party. Downloading it again!"]);
      } else if (n === cards.length) {
        say(["Gotcha! " + name + " was caught!", "You caught them all! Now go train some UDFs."]);
      } else {
        say(["Gotcha! " + name + " was caught!", (cards.length - n) + " left in the tall grass."]);
      }
    });
  });

  var start = refresh();
  say(start === cards.length
    ? ["Welcome back, Trainer! Your Pokédex is complete.", "Downloads stay here whenever you need them again."]
    : intro);
})();
