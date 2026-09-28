# Stisla — Bootstrap → Tailwind Migration

Static admin template. Migrasi dari **Bootstrap 4.3.1** ke **Tailwind CSS v4** lewat shim/generator. Tujuan utama: **strict visual parity** dengan template asli — jangan improvisasi desain.

Detail lengkap, keputusan, dan action log ada di **`docs/documentation.md`**. Baca hanya saat task terkait (jangan dump seluruhnya ke context).

## Aturan wajib

- **JANGAN edit** file `assets/css/*.compiled.css` — itu hasil kompilasi dan akan ditimpa.
- **JANGAN baca** file `*.compiled.css` (ukurannya 150–260 KB) kecuali benar-benar perlu; cukup sumbernya atau `grep`.
- Edit sumbernya: `generate-*.js`, `assets/css/*-tailwind.css`, `tailwind.config.js`.
- **`components-tailwind.css` punya fix manual** yang tidak direproduksi generator (`generate-components.js` + `generate-components2.js` + `generate-components3.js`). Jangan regenerate membabi buta: edit `.css` langsung, sinkronkan ke generator, atau `diff` dulu lawan backup.
- Setelah mengubah `*-tailwind.css`, **wajib recompile** file compiled yang terkait (lihat perintah di bawah).
- Pertahankan desain asli Stisla/Bootstrap; cari padanan 1:1.

## Perintah penting

Regenerate shim Bootstrap intermediate (menulis `assets/css/bootstrap-tailwind.css`):

```bash
node generate-bs-tw.js
```

Compile intermediate `@apply` → CSS browser-readable (wajib setelah ubah sumber):

```bash
./tailwindcss-linux-x64 -i ./assets/css/bootstrap-tailwind.css   -o ./assets/css/bootstrap-tailwind.compiled.css
./tailwindcss-linux-x64 -i ./assets/css/style-tailwind.css       -o ./assets/css/style-tailwind.compiled.css
./tailwindcss-linux-x64 -i ./assets/css/components-tailwind.css -o ./assets/css/components-tailwind.compiled.css
```

Verifikasi (harus melaporkan `USED in HTML & MISSING: 0`):

```bash
node audit-classes.js
```

## Struktur singkat

- `pages/` — 82 halaman demo Stisla (HTML). `assets/css/`, `assets/js/`, `assets/img/`, `assets/fonts/` — aset.
- `assets/css/bootstrap-tailwind.{css,compiled.css}` — pengganti `bootstrap.min.css`.
- `assets/css/style-tailwind.{css,compiled.css}` — pengganti `style.css`.
- `assets/css/components-tailwind.{css,compiled.css}` — pengganti `components.css`.
- Generator di root: `generate-*.js`, verifier `audit-classes.js`.
- Referensi 1:1: `assets/css/bootstrap.min.css`, `assets/css/style.css`, `assets/css/components.css`.
