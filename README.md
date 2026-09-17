# Open Lecturer Data Module

Throwaway Kaprodi presentation mockup for **SIAKAD Direktori Dosen** at Universitas Esa Unggul. Built for an internal walkthrough on **18 Sep 2026**. Not the production SIAKAD module.

**Live demo:** [https://direktori-dosen-kaprodi.vercel.app/](https://direktori-dosen-kaprodi.vercel.app/)

## What this is for

Kaprodi need one university-wide list of lecturers so they can see who still has SKS headroom before asking someone to teach in their programme.

Today’s Summary Dosen V2 stays inside one homebase and does not link a name to SIM HRM or a course to RPS. This mockup shows that path in one click-through.

**Success path for the room**

1. Open the live URL.
2. Scan the list. Red rows are at max SKS (`Penuh`).
3. Click a name → mock SIM HRM Data Pegawai.
4. Click a taught course → detailed RPS (example RME131).

## What is in scope

- University-wide table, one row per lecturer
- Columns from Summary Dosen V2 **except** Dalam Prodi / Luar Prodi
- Extra column: Rumpun Bidang Dosen
- Total SKS vs Batas Maksimal, kepangkatan, load bar, `Penuh` / `Sisa n SKS` pills
- Sorted by remaining SKS (most headroom first)
- Name → profile → RPS
- Read-only directory. No Keputusan column, no assignment workflow, not public open data

## Demo script (2 minutes)

| Step | Action | What to say |
| --- | --- | --- |
| 1 | Open live URL | This is the Kaprodi directory, not Summary Dosen alone |
| 2 | Point at green `Sisa` rows | These lecturers still have room |
| 3 | Point at red `Penuh` rows | At max. Still openable for data, not for adding load |
| 4 | Click **Daniel Happy Putra** | Profile comes from SIM HRM shape |
| 5 | Click **Pengantar Teknologi Informasi** | Full RPS: identitas, CPL, CPMK, Sub-CPMK, weekly plan, penilaian, referensi |

## Layout switcher

- **Pindai cepat** (default). Recommended for the room. Load and status stay visible without horizontal scroll.
- **Kolom lengkap**. Closer to Summary Dosen V2 shape, plus rumpun. Needs horizontal scroll.

Keys `1` / `2` also switch layouts.

## Stack

Static HTML / CSS / JS in `prototype/`. Nunito Sans from Google Fonts. No framework. Chosen because this is a throwaway presentation artifact, not the production build.

| Path | Role |
| --- | --- |
| `prototype/` | Deployed site (Vercel root directory) |
| `PRODUCT.md` | Product brief and constraints |
| `DESIGN.md` | Visual contract (Kemahasiswaan shell) |

## Design notes

Chrome copies SIAKAD Kemahasiswaan Dashboard Verifikasi SKPI:

- Blue top bar `#1b75bc`
- White rounded workspace on gray wash
- Orange initial avatar `#f4a018`
- Blue active nav pill
- Indonesian UI labels

## Local preview (optional)

Only needed if you want to edit offline. Vercel is enough for sharing.

```bash
python3 -m http.server 8765 --directory prototype
```

Open http://127.0.0.1:8765/

## Evidence used

- Summary Dosen V2 screenshot (Fikes / Rekam Medis load numbers)
- SIM HRM Data Pegawai export (Daniel Happy Putra)
- RPS PDF RME131 Pengantar Teknologi Informasi
- Kemahasiswaan Verifikasi SKPI screenshot (theme)

Extra rows from other programmes in the mock are synthetic so the room can see university-wide scope.

## Out of scope for this mockup

- Production SIAKAD menu / ACL
- Live joins to SIM HRM and RPS APIs
- Assignment or approval actions
- Public open-data portal

If the room agrees, the real build is a SIAKAD page with these columns, person join to SIM HRM, and MK join to RPS.
