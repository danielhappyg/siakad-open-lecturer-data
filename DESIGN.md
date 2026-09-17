# Design

Recorded from the throwaway `prototype/` mockup on 17 Sep 2026. Not a production design system.

## Surface

Operate. Kaprodi laptop, daylight, SIAKAD Kemahasiswaan chrome.

## World

Pinned to Dashboard Verifikasi SKPI. Blue 48px top bar `#1b75bc`, gray wash around a white rounded workspace, orange initial avatar `#f4a018`, blue pill for current nav, 14px Nunito Sans. One family is intentional. Operate surfaces in this campus SI do not pair a display face.

## Type

Nunito Sans 400 / 600 / 800. Module title 22px. Table 12.5px. Indonesian labels.

## Color

Restrained. Blue for primary selection and name links. Red for at-max load. Green for remaining SKS. Neutrals for everything else.

## Components

- Identity card with orange initial.
- Side nav status filters (Direktori, Ada sisa SKS, Beban penuh).
- Filter row plus layout switcher.
- Sticky-name table sorted by remaining SKS.
- Load bar under SKS / max.
- Status pill: Penuh, or Sisa n SKS. No Keputusan column.
- Full rows use a light red tint and ink-colored names that stay openable.
- Profile definition list with marked empty HRM fields.
- Teaching rows that open a detailed RPS (identitas, otorisasi, deskripsi, CPL, IK, CPMK, Sub-CPMK, rencana minggu, penilaian, referensi).

## Layout variants

- Pindai cepat. Recommended. Load and capacity pill visible without horizontal scroll.
- Kolom lengkap. Closer to Summary Dosen V2, minus dalam/luar, plus rumpun. Needs horizontal scroll.

## Motion

Name-link color uses 150ms ease. Other hovers snap.
