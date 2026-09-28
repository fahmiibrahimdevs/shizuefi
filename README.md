<p align="center">
  <img src="https://avatars.githubusercontent.com/u/45754626?s=75&v=4" alt="Logo" width="75" height="75">
</p>

<h1 align="center">SHIZUEFI</h1>

<p align="center">
  Template admin statis — hasil migrasi <b>Stisla</b> dari Bootstrap 4 ke <b>Tailwind CSS v4</b>.
</p>

---

## Tentang

SHIZUEFI adalah template dashboard admin berbasis HTML statis. Migrasi ke Tailwind CSS dilakukan lewat shim/generator agar tampilannya tetap mendekati template Stisla asli, dengan beberapa penyesuaian desain (card, tabel, badge, dsb.).

- **82 halaman demo** ada di folder `pages/`
- **Aset** (CSS, JS, gambar, font) ada di `assets/`

## Menjalankan

Halaman mereferensikan sebagian library langsung dari `node_modules`, jadi install dependensi dulu:

```bash
npm install
```

Jalankan static server dari root project, misalnya:

```bash
python3 -m http.server 5500
# atau
npx serve .
```

Lalu buka `pages/index.html` di browser.

> Catatan: untuk hosting statis (mis. GitHub Pages), library dari `node_modules` perlu ikut di-bundle/atau server menyediakannya, karena folder tersebut tidak disertakan di repo ini.

## Build CSS (Tailwind)

Sumber Tailwind ada di `assets/css/*-tailwind.css`. Setelah mengubahnya, **wajib** recompile file `*.compiled.css` terkait:

```bash
./tailwindcss-linux-x64 -i ./assets/css/bootstrap-tailwind.css   -o ./assets/css/bootstrap-tailwind.compiled.css
./tailwindcss-linux-x64 -i ./assets/css/style-tailwind.css       -o ./assets/css/style-tailwind.compiled.css
./tailwindcss-linux-x64 -i ./assets/css/components-tailwind.css -o ./assets/css/components-tailwind.compiled.css
```

Regenerate shim Bootstrap intermediate:

```bash
node generate-bs-tw.js
```

Verifikasi class (harus `USED in HTML & MISSING: 0`):

```bash
node audit-classes.js
```

> Binary `tailwindcss-linux-x64` **tidak** disertakan di repo karena ukurannya > 100 MB. Unduh dari
> [Tailwind CSS releases](https://github.com/tailwindlabs/tailwindcss/releases) atau pakai
> `npx @tailwindcss/cli`.

## Struktur

```
.
├── pages/                    # 82 halaman demo (HTML)
├── assets/
│   ├── css/                  # sumber *-tailwind.css + hasil *.compiled.css
│   ├── js/                   # js template & halaman
│   ├── img/ , fonts/
├── docs/                     # dokumentasi migrasi
├── generate-*.js             # generator shim Bootstrap / components
├── audit-classes.js          # verifier class Tailwind
└── tailwind.config.js
```

## Kredit

- Template dasar: [Stisla](https://getstisla.com) oleh Muhamad Nauval Azhar.
- Re-Design By [Fahmi Ibrahim](https://fahmiibrahim.my.id/).

## Lisensi

[MIT](LICENSE)
