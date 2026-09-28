# Stisla: Bootstrap to Tailwind CSS Migration Documentation

## 1. Project Overview & Context
This project is an ongoing migration of the **Stisla Admin Template** from its original **Bootstrap 4** foundation to **Tailwind CSS**. 

The goal of this migration is to replace Bootstrap's CSS framework and Stisla's custom CSS components with Tailwind CSS utility classes and `@apply` directives, while maintaining 100% visual parity with the original template ("tanpa improvisasi yang udah" / without improvising the existing design).

## 2. Migration Strategy and Methodology
Instead of manually rewriting thousands of lines of HTML or CSS, this project uses a programmatic migration strategy through NodeJS generator scripts. 

### How it works:
1. **CSS Generators:** Several NodeJS scripts (e.g., `generate-bs-tw.js`, `generate-components.js`, `generate-components2.js`, `generate-components3.js`) parse the required Bootstrap and Stisla styles and map them to Tailwind CSS `@apply` directives. 
2. **Intermediate CSS:** These generators output intermediate files:
   - `assets/css/bootstrap-tailwind.css` (replaces `bootstrap.min.css`)
   - `assets/css/style-tailwind.css` (replaces `style.css`)
   - `assets/css/components-tailwind.css` (replaces `components.css`)
3. **Compilation:** The intermediate CSS files containing `@apply` directives are then compiled by the Tailwind CLI (`./tailwindcss-linux-x64`) into final browser-readable `.compiled.css` files.
4. **HTML Linking:** Node scripts like `update-bootstrap-to-tw.js` and `update-components-link.js` traverse the `pages/` directory and update the `<link href="...">` tags to point to the new `.compiled.css` files instead of the old `.min.css` files.

## 3. What Has Been Migrated So Far
- **HTML Files:** All HTML files in the `pages/` directory have had their `<link>` tags updated to use the new `*-tailwind.compiled.css` files.
- **Bootstrap Utilities:** Core Bootstrap utilities (grid, spacing, flexbox, text alignment, colors) have been generated into `bootstrap-tailwind.css`.
- **Stisla Components & Styling:** The custom Stisla styling (`style.css` and `components.css`) have been translated into `style-tailwind.css` and `components-tailwind.css`. 

## 4. Known Issues, Gotchas, and Fixes (Action Log)

During the migration, mapping Bootstrap's object-oriented CSS directly to Tailwind utilities can sometimes cause layout or specificity regressions. Below are documented cases of issues that have been solved, serving as a guide for future development and AI context.

### Issue 1: Card Statistic Layout Broken (`card-statistic-1`, `card-statistic-2`)
**The Bug (Sept 27, 2026):**
The generator initially replaced `display: inline-block` and `float: left` in `.card-statistic-1` and `.card-statistic-2` with Flexbox utilities (`@apply flex flex-row w-full items-center`). 
- This caused `.card-wrap` text to be pushed down because flex `items-center` conflicted with `.card-header`'s `padding-top: 25px`.
- It also completely broke `.card-statistic-2` because that card contains full-width block elements (`.card-stats`, `.card-chart`) that were forced onto the same horizontal row as the icon.

**The Fix:**
Reverted the components in `assets/css/style-tailwind.css` to use the original block-formatting context:
- Container: `@apply inline-block w-full;`
- Icon (`.card-icon`): Added `@apply float-left;`
- Wrapper (`.card-wrap`): Replaced flex utilities with `@apply block;`

### Issue 2: Invalid CSS Selectors (Literal Newlines)
**The Bug (Sept 27, 2026):**
The generator scripts or manual edits accidentally output literal `\n` characters directly into the CSS file `assets/css/style-tailwind.css`. 
```css
\n
.card.card-statistic-1 .card-header h4 { ... }
```
When compiled, the `\n` remained, causing the browser to silently drop the entire CSS block because `\n` is an invalid selector. This caused the text "Total Admin" to fall back to the default `h4` styling (blue and large).

**The Fix:**
Removed the stray `\n` at line 2138 of `assets/css/style-tailwind.css`. **Takeaway:** Always ensure generator scripts output actual newlines, not escaped literal `\n` strings.

### Issue 3: Missing Close Button & Dismissible Alert Styles (`.close`, `.alert-dismissible`)
**The Bug (Sept 28, 2026):**
The generator script `generate-bs-tw.js` omitted the Bootstrap close button (`.close`) and dismissible alert positioning (`.alert-dismissible`, `.alert-dismissible .close`). 
- This caused `<button class="close">` inside `.alert-dismissible` to render as an unstyled inline button placed before the alert text (e.g. `× This is a primary alert.`), rather than floating/positioning to the right side of the alert card.

**The Fix:**
Added standard Bootstrap 4 `.close`, `.modal-header .close`, `.alert-dismissible`, and `.fade` styles into `generate-bs-tw.js`:
- `.close`: `float: right`, font size `1.5rem`, line height `1`, `opacity: 0.5`, transparent button styling, hover/focus opacity `0.75`.
- `.alert-dismissible`: `padding-right: 4rem`.
- `.alert-dismissible .close`: `position: absolute`, `top: 0`, `right: 0`, `padding: .75rem 1.25rem`, `color: inherit` (inherits text color of each alert theme).
- Re-ran `node generate-bs-tw.js` and recompiled `./assets/css/bootstrap-tailwind.compiled.css`.

### Issue 4: Broken Badge Colors, Typography Headings, and Breadcrumbs
**The Bug (Sept 28, 2026):**
On badge pages (`bootstrap-badge.html`):
- Headings (`h1` - `h6`) in the "Heading" card had no base font-sizes generated in `bootstrap-tailwind.css`, causing them to collapse to body font size (14px).
- `.badge.badge-secondary` used `#cdd3d8` instead of Stisla's dark theme color `#34395e`, and badge text color was missing `color: #fff`.
- `.badge.badge-warning` was missing its background color (`#ffa426`), rendering as white text on transparent/white background.
- Links formatted as badges (`<a class="badge ...">`) inherited the default link color `#6777ef`, making `a.badge-primary` invisible (blue text on blue background) and other badges display incorrect text color.
- Breadcrumb separators (`/`) were missing due to omitted `.breadcrumb-item + .breadcrumb-item::before` styles.

**The Fix:**
- Added standard Bootstrap 4 typography heading sizes (`h1` - `h6`), `.breadcrumb` / `.breadcrumb-item`, and base `.badge` variants into `generate-bs-tw.js`.
- Corrected `.badge.badge-secondary` to `@apply bg-[#34395e] text-white;` and `.badge.badge-warning` to `@apply bg-[#ffa426] text-white;` in `assets/css/style-tailwind.css`.
- Added explicit `text-white` to all color variants and added `a.badge { @apply text-white no-underline; }` rules.
- Re-ran `node generate-bs-tw.js` and recompiled both `bootstrap-tailwind.compiled.css` and `style-tailwind.compiled.css`.

### Issue 5: Missing Bootstrap 4 Components (Batch A)
**The Bug (Sept 28, 2026):**
An audit comparing class tokens used in `pages/*.html` against the three compiled CSS files found 83 classes with no replacement. Notable ones: dropdown (`dropdown`, `dropdown-toggle`, `dropup/dropright/dropleft`, `dropdown-toggle-split`), `navbar-toggler(-icon)`, carousel (`carousel-inner/item/fade`, `carousel-control-*`, `carousel-indicators`), form controls (`form-check*`, `col-form-label`, `form-row`, `form-control-plaintext`, `is-valid`/`is-invalid`, `valid-feedback`/`invalid-feedback`), `input-group`, `list-group`, `pagination`, `progress`, table variants (`table-borderless/dark/hover`, `thead-dark/light`), `img-fluid`, `initialism`, `blockquote`, `display-1..4`, `card-title/text/link`, `btn-group-sm/lg/vertical`, plus utilities (`position-relative`, `min-vh-100`, `order-lg-*`, `float-lg-*`).

**The Fix:**
- Added all missing Bootstrap 4.3.1 rules to `generate-bs-tw.js` (translated to Tailwind `@apply`, with raw CSS for data-URI icons, `content` pseudo-elements, gradients, keyframes, and `calc()` values) using `assets/css/bootstrap.min.css` as the exact 1:1 reference.
- Re-ran `node generate-bs-tw.js` and recompiled `bootstrap-tailwind.compiled.css`.
- Note: some classes are only added dynamically by JS. Added `modal-dialog-centered` for that reason.

### Issue 6: Missing Stisla Custom Components (Batch B)
**The Bug (Sept 28, 2026):**
Stisla-specific controls were never migrated: `custom-switch*`, `custom-switches-stacked`, `custom-control-inline`, `imagecheck*`, `colorinput*`, `selectgroup*`, `card-hero`/`card-description`, payment backgrounds (`bg-visa/mastercard/paypal/jcb/americanexpress/dinersclub/discover`), and `card-progress`/`card-progress-dismiss`/`remove-spinner` (added dynamically by `assets/js/stisla.js`).

**The Fix:**
- Created a new generator `generate-stisla-missing.js` that appends the translated rules to `assets/css/style-tailwind.css`, extracting the large base64 payment images and the card-progress loader SVG directly from `assets/css/style.css` to guarantee 1:1 fidelity.
- The generator is idempotent (writes between `generate-stisla-missing START/END` markers), so it can be safely re-run.
- Recompiled `style-tailwind.compiled.css`.

**Verification:** Run `node audit-classes.js` (added at the project root). It reports **0 classes used in HTML without a replacement**, and lists any classes only referenced dynamically from `assets/js` so they are not missed.

### Issue 7: Avatar Radius, Bootstrap Nav/Tabs, and Modal Footer (Final Parity Pass)
**The Bug (Sept 28, 2026):**
A final parity sweep found three remaining gaps:
- **Avatar:** `.avatar`, `.avatar img`, and `.avatar .avatar-presence` used Tailwind's `rounded-full` (`border-radius: 9999px`) instead of the original `border-radius: 50%`; `.avatar .avatar-presence` also omitted `padding: .1rem` (`.avatar .avatar-icon` already had it).
- **Bootstrap nav/tabs:** The base rules were never migrated — `.nav`, `.nav-tabs`, `.nav-pills`, `.nav-item`, the `.nav-link` states (`:focus`/`:hover`, `.disabled`, `.active`), and `.tab-content > .tab-pane` (`display: none`) / `.tab-content > .active` (`display: block`). Stisla's `.nav-tabs`/`.nav-pills` enhancements existed but relied on those missing base rules, so `components-tab.html` and `bootstrap-nav.html` rendered incorrectly.
- **Bootstrap modal:** `.modal-footer` incorrectly used `flex-wrap`, missed the child spacing (`> :not(:first-child){margin-left:.25rem}` / `> :not(:last-child){margin-right:.25rem}`), and the `@media (min-width: 576px) .modal-dialog { max-width: 500px; margin: 1.75rem auto; }` rule was absent.

**The Fix:**
- Updated `generate-components3.js` **and** `assets/css/components-tailwind.css`: `rounded-full` -> `rounded-[50%]` on `.avatar`, `.avatar img`, and `.avatar .avatar-presence`, plus `p-[.1rem]` on `.avatar .avatar-presence`.
- Added the full Bootstrap 4.3.1 nav/tab base block to `generate-bs-tw.js`, verified 1:1 against `assets/css/bootstrap.min.css`.
- Fixed `.modal-footer` (removed `flex-wrap`, added the two child-margin rules) and added the `576px` `.modal-dialog` rule to `generate-bs-tw.js`.
- Fixed a latent generator bug: `generate-components3.js` appended with a literal `'\\n'` (backslash-n) instead of a newline. Corrected to `'\n'` and removed the stray `\n` token that was already sitting in `components-tailwind.css` (same class of bug as Issue 2). Note: `components-tailwind.css` still contains manual fixes not reproduced by the generators, so **do not blindly regenerate it** — edit the `.css` directly (and mirror the change in the generator) or diff against a backup first.
- Re-ran `node generate-bs-tw.js` and recompiled all three `*-tailwind.compiled.css` files.
- Removed **175 temporary `_*` harness/probe HTML files** from `pages/` (leaving the 82 real template pages).

**Verification:** `node audit-classes.js` reports **0 classes used in HTML without a replacement**. The plugin-originated tokens still listed as "missing" (Chart.js, DataTables, CodeMirror, timing animations) come from `node_modules`/plugin CSS, not from this shim, and are out of scope.

### Issue 8: Everywhere Looks Bold (Nunito Never Loaded) & Button Text Turns Black on Hover
**The Bug (Sept 28, 2026):**
- **Bold text:** The Google Fonts rule `@import url("//fonts.googleapis.com/css?family=Nunito:...")` sat on line 4 of `style-tailwind.css`, *after* `@import "tailwindcss"`. Tailwind inlines its own rules inline where the import was, so the font `@import` ended up around the middle of the compiled output (line ~2006 of `style-tailwind.compiled.css`). Per CSS spec, `@import` is only valid before any other rules, so the browser silently ignored it — **Nunito was never loaded** and every weight (400/600/700/800) fell back to Segoe UI/Arial, which read as "everything is bold". The original `style.css` keeps its font `@import` near the top (line 56, after only `@charset`/comments), so it loads correctly.
- **Black button text on hover:** `generate-bs-tw.js` emitted `.btn-primary`, `.btn-secondary`, etc. but **omitted Bootstrap's per-variant `:hover/:focus/:active` rules**. The base `.btn:hover { color:#212529 }` (specificity 0,2,0) therefore beat the variant color rules (0,1,0), turning white button labels dark on hover. In original Bootstrap each `.btn-<variant>:hover { color:#fff }` overrides the base rule.

**The Fix:**
- **Font decision (user preference):** The webfont Nunito is **intentionally not used**. Removed the Google Fonts `@import` entirely and dropped `font-family: "Nunito", "Segoe UI", arial;` from the `body` rule in `assets/css/style-tailwind.css`, so the site falls back to Tailwind's `font-sans` / the OS system font (`-apple-system, "Segoe UI", Roboto, ...`). This is the look the user prefers. *(If Nunito is ever wanted back, put `@import url("//fonts.googleapis.com/css?family=Nunito:...")` as the **very first line** — before `@import "tailwindcss"` — otherwise it lands mid-file and is ignored. See "Bold text" below.)*
- **Bold text (user preference):** Reduced the weight of form/button text in `assets/css/style-tailwind.css`: `.form-group .control-label` / `.form-group > label` and `.form-divider` `font-semibold` → `font-normal` (600 → 400); `.btn` `font-semibold` → `font-medium` (600 → 500). Headings and other component text keep the original Stisla weights.
- **Button hover color:** Added the missing text colors to the Stisla hover groups (these are hand-maintained, not generator-produced): `!text-white` on `.btn-primary`, `.btn-danger`, `.btn-dark`, `.btn-info` and `!text-[#212529]` on `.btn-light`.
- Recompiled `assets/css/style-tailwind.compiled.css`.

**Verification:** Computed styles after recompile: `body` = system font stack with `nunitoLoaded=false`, form label `font-weight: 400`, `.btn` `font-weight: 500`. A CDP harness forced `:hover` on each button variant (with transitions disabled) and compared computed `color`/`background-color` against the original Bootstrap build — **no differences**. `node audit-classes.js` still reports `USED in HTML & MISSING: 0`.

### Issue 9: Soft Badges & Modern Table (User Design Override)
**The Request (Sept 28, 2026):**
The user wants the badge style to be "soft" (light tinted background + matching darker text + subtle border) and the tables restyled to a modern soft look, referencing their `project-management` app (`client/src/components/common/Badge.tsx` and `client/src/components/kanban/TaskListView.tsx`). This intentionally overrides the strict Stisla 1:1 parity for these two components.

**Reference patterns:**
- Badge: `bg-{color}-50 text-{color}-700 border border-{color}-200/80`, `font-medium`, small padding.
- Table: header `bg-slate-50 text-slate-500 uppercase text-[10px] tracking-wider font-semibold border-b`, rows `divide-y`, row `hover:bg-slate-50`, cell text `text-slate-700`.

**The Fix (all in `assets/css/style-tailwind.css`):**
- Badges (`.badge.badge-*`) converted to soft tints of the Stisla hues (e.g. primary `bg #eaecfe / text #4d5ce0 / border #d7dbfc`, success `#e9f8ed / #2e9e49 / #ccefd5`, danger `#feeceb / #d93b32 / #fcd2cf`, etc.). The base `.badge` gained `border border-transparent` and `font-medium`; anchor badges (`a.badge`) no longer force `text-white` (which made soft badges unreadable on hover).
- Table: `thead th` → `bg #f8fafc`, `text #64748b`, `11px`, `uppercase`, `tracking .05em`, `font-semibold`, `border-b #e2e8f0`; body rows get `border-top #f1f5f9` dividers (first row excluded) and `tr:hover` `bg #f8fafc`; body text `#334155`.
- Recompiled `assets/css/style-tailwind.compiled.css`.

**Verification (computed styles on `bootstrap-badge.html` / `bootstrap-table.html`):** all badge variants resolve to soft bg/text/border (e.g. primary `rgb(234,236,254)` / `rgb(77,92,224)` / `rgb(215,219,252)`); table header `bg rgb(248,250,252)`, `color rgb(100,116,139)`, `text-transform: uppercase`, `font-weight 600`; body text `rgb(51,65,85)`. `node audit-classes.js`: `USED in HTML & MISSING: 0`.

### Issue 10: Modal → Bottom Sheet on Mobile (User Design Override)
**The Request (Sept 28, 2026):**
On mobile (< 768px), all Bootstrap modals should look like Flutter's `showModalBottomSheet`: slide up from the bottom, full width, rounded top corners, and a drag handle at the top.

**The Fix (all in `assets/css/style-tailwind.css`, section `/* 3.8b */`):** a single `@media (max-width: 767.98px)` block:
- `.modal .modal-dialog` / `.modal-dialog-centered` → `position: absolute; inset-x 0; bottom 0; margin 0; width 100%; max-width 100%`.
- `.modal.fade .modal-dialog` → `translate-y-full`; `.modal.show .modal-dialog` → `translate-y-0` (slide-up using Tailwind v4 `translate`).
- `.modal .modal-content` → `max-height 90vh`, `border-radius: 16px 16px 0 0`, no border, `padding-bottom: env(safe-area-inset-bottom)`.
- `.modal .modal-header` → `position: relative; padding-top: 20px; cursor: grab; touch-action: none; user-select: none`; `.modal-header::before` renders the drag handle (`40x4px`, rounded, `#9ca3af`, centered).
- `.modal-body` → `overflow-y: auto`.
- Recompiled `assets/css/style-tailwind.compiled.css`.

**Drag-to-dismiss (`assets/js/custom.js`):** the handle is interactive. `custom.js` adds delegated `pointerdown/move/up` listeners on `document` (vanilla, no dependency beyond optional jQuery for the final `hide`). Dragging down on `.modal-header` translates the `.modal-dialog` inline (`style.translate`), rubber-bands when pulled up (`dy * 0.2`), and on release either snaps back or dismisses when `dy > max(80px, 25% of sheet height)`. Dismissal animates the sheet down then calls `jQuery(modal).modal("hide")` (fallback: remove `.show`). It is a no-op on desktop (guarded by `matchMedia("(max-width: 767.98px)")`).

**Gotchas:**
- Do **not** use `.modal.show { display:flex; align-items:flex-end }` to bottom-align: Bootstrap's JS sets inline `display:block` on the `.modal` element when opening, which beats any stylesheet rule. Position the `.modal-dialog` absolutely instead.
- Selectors are scoped under `.modal` (e.g. `.modal .modal-dialog`, not `.modal-dialog`) because `pages/bootstrap-modal.html` and others embed **static** `.modal-dialog` previews outside an actual `.modal`. Un-scoped rules would hijack those previews on mobile.
- The header needs `touch-action: none` (and `user-select: none`); otherwise the browser treats a touch drag as a scroll and fires `pointercancel`, so the sheet never moves.

**Verification:** Headless Chrome (500px-wide viewport, `< 768px`): `.modal-dialog` computes `position: absolute`, `rect.bottom === innerHeight` (pinned to bottom), `.modal-content` top radius `16px` / bottom `0`, `max-height 90vh`; `::before` handle `40x4px` `rgb(156,163,175)`; static `.modal-dialog` preview stays `position: relative`. Synthetic `PointerEvent` drag on `.modal-header`: a 30px pull updates `style.translate` then snaps back to `""` with modal still shown; a 300px pull dismisses (`stillShown=false`). Desktop (1200px): unchanged (relative dialog, `max-width 500px`, radius `4.8px`, no handle; drag disabled). `node audit-classes.js`: `USED in HTML & MISSING: 0`.

## 5. Guide for Future AI / Development
- **Do not edit `.compiled.css` files directly.** They will be overwritten.
- **Edit the intermediate files** (`style-tailwind.css`, `components-tailwind.css`) or the generator scripts (`generate-*.js`).
- **Compilation is required:** If you modify `*-tailwind.css` files, you MUST recompile them using the Tailwind CLI binary provided in the root:
  ```bash
  ./tailwindcss-linux-x64 -i ./assets/css/style-tailwind.css -o ./assets/css/style-tailwind.compiled.css
  ```
  *(Repeat for other CSS files if modified).*
- **Respect Original Design:** The goal is strict visual parity with the original Stisla Bootstrap template. Do not introduce new design concepts. When translating a class, look at the original Stisla `style.css` to see exactly what CSS attributes were used, and find the 1:1 Tailwind equivalent.

## 6. New Session Workflow (Handoff)
This project keeps its memory **outside the chat** so a fresh session can continue without re-explaining the migration.

- **Read first:** the root `AGENTS.md` (auto-loaded by opencode every session) then the latest Issue in this file. That is the "handoff".
- **Do not dump the big generated files into context.** `*.compiled.css` are 150–260 KB each; read only the source (`generate-*.js`, `*-tailwind.css`) or use `grep`/`glob` plus `read` with `offset`/`limit`. Use the `explore` subagent for large-file reconnaissance so its full contents stay out of the main context.
- **Session commands:**
  - `/new` — start a fresh session when switching tasks (frees all context).
  - `/compact` — same session, but summarizes old history when context grows large.
  - `/fork` — create a **new session from a chosen previous message**, keeping the useful context up to that point and dropping the wasteful tail. Ideal right after a big migration task.
- **Keep permanent knowledge in `AGENTS.md` / this doc**, not in conversation history. New sessions auto-load `AGENTS.md`, so no manual "retraining" is needed.
- **Cost discipline:** prefer Plan mode first to narrow scope, pick a cheaper model for mechanical edits, and avoid attaching large images unless necessary.
