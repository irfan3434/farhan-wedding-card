# Digital Wedding Invitation

A mobile-first, single-page wedding invitation (React + Vite). Fully static: no backend.

## Run

```bash
npm install
npm run dev      # local preview at http://localhost:5173
npm run build    # static site in dist/ — upload to Netlify, Vercel, GitHub Pages, etc.
```

## Customise

Everything personal lives in **`src/config/wedding.json`**:

| Key | What it controls |
| --- | --- |
| `couple` | Names, parents, qualifications, profession, seal initials |
| `event` | Ceremony start/end (ISO with offset), `timeZone`: drives Save the Date, countdown, calendar |
| `welcome`, `scratch`, `gate`, `hero` | Section copy |
| `gallery.images` | `{ src, alt, srcSet? }`: put photos in `public/gallery/` |
| `timeline.days` | Programme grouped by date: `{ date, label, items: [{ time, title, note }] }` |
| `venue` | Name, address, `lat`/`lng` for the map pin and directions |
| `music.src` | Background track in `public/music/` (an mp3 is recommended) |

The photos in `public/gallery/` and the music-box loop in `public/music/` are placeholders.

**Photos:** export JPG/WebP at about 1200px on the long edge. You can add a `srcSet`
(`"gallery/a-600.webp 600w, gallery/a-1200.webp 1200w"`) for responsive loading.

## Structure

- `src/components/`: Gate (gatefold), ScratchCard (canvas), Section (scroll reveal + vines), MusicToggle
- `src/sections/`: one file per section, in scroll order
- `src/assets/`: hand-drawn SVG florals (`vine.svg`, `corner.svg`) and the linen texture. Each is a single small cached file, reused by every section.
