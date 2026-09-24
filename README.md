# Personal homepage

A single-page, no-build personal site, ready for GitHub Pages.
Cargo-courier HUD styling: black, white and courier blue, dark by default,
scanlines, and your work laid out as a delivery manifest.
All content lives in **`site.config.js`** — edit that one file and you have your own page.

```
index.html            page shell (rarely needs editing)
site.config.js        ← YOUR CONTENT: name, projects, experience, links, colors
assets/css/style.css  styling and theme tokens
assets/js/main.js     renders the page from the config
.nojekyll             tells GitHub Pages to serve the files as-is
```

## Run it locally

```bash
python3 -m http.server 8000
# then open http://localhost:8000
```

(Opening `index.html` directly with `file://` works too.)

## Make it yours

1. Open `site.config.js` and edit the content — it currently holds this site's own
   name, publications and experience, so swap in yours.
2. For a photo, create `assets/img/` (or use any path or URL), add a square image and
   set `avatar: "assets/img/me.jpg"`. Leave it `""` to show your initials instead.
3. Change `accent` to any CSS color — the whole site follows it.
   Courier blue `#2e3192` is the default; the dark theme lightens it for text.
4. Delete any section you don't want (`skills`, `projects`, `experience`, …).
   It disappears from the page *and* from the nav.
5. Edit the buttons under the intro in `actions`. To offer a résumé, add the file
   (e.g. `assets/resume.pdf`) and an entry like `{ label: "Résumé", href: "assets/resume.pdf" }`.
6. Rename the manifest labels to taste: `projects.numberLabel` (default `CARGO NO.`;
   this site uses `PAPER NO.`, since the section lists publications), and the `status`
   chips on each `experience` entry (`active: true` highlights one).
   A project or publication with an empty `href` renders as a plain, non-clickable card.

The styling is a cargo-courier homage — all shapes, marks and type here are original;
no third-party logos or game assets are used.

## Publish on GitHub Pages

**Option A — personal site at `https://<user>.github.io`**

```bash
gh repo create <user>.github.io --public --source=. --push
```

**Option B — project site at `https://<user>.github.io/<repo>`**

```bash
git add -A && git commit -m "Add personal homepage" && git push
```

Then: repo **Settings → Pages → Source: Deploy from a branch → `main` / `/ (root)`**.
First build takes about a minute.

## Built in

- Full-bleed layout — sticky `SEC.0x` labels in the left rail, content filling the width
- CSS scanlines and vignette (no image files)
- Status readout under your photo with animated signal bars — set it in `status`
- Numbered work cards (`CARGO NO. 001` by default, `PAPER NO. 001` here) with reticle corners on hover
- Delivery log with `In transit` / `Delivered` chips per role
- `NIGHT` / `DAY` toggle, remembered per visitor, follows your OS by default
- Barlow Condensed for headings, Barlow for text, IBM Plex Mono for data
- Quiet fade-in on scroll and an active-section nav
- Fully responsive, keyboard accessible, honours `prefers-reduced-motion`
- No build step, no dependencies, no tracking

## Easter egg

Type the word set in `easterEgg` (default: `party`) anywhere on the page. 🎉
