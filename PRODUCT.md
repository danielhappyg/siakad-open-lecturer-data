# Product

<!-- impeccable:product-schema 1 -->

## Platform

web

## Stack

delegated: static HTML/CSS/JS in `prototype/`, CDN fonts only. Chosen because this run is a throwaway presentation mockup for 18 Sep 2026, not the production SIAKAD module. The Prototype playbook forbids a production framework here.

## Users

Primary user is Kepala Program Studi (Kaprodi) at Universitas Esa Unggul, working from a campus office or home, in daylight, on a laptop, during teaching-load planning for a semester.

Secondary audience for this mockup is other units and the developer team in an internal presentation. They are judging whether the module is worth building inside SIAKAD.

## Product Purpose

Give every Kaprodi one university-wide list of lecturers, one row per name, so they can see who still has SKS headroom before asking someone to teach in their programme.

Success for the mockup is that tomorrow’s audience can complete this path without explanation: scan the list, notice an at-max lecturer, skip them, open a name, open a course RPS.

## Positioning

The mechanism is a shared internal directory that joins three systems Kaprodi already use: SIAKAD load, SIM HRM profile, SIAKAD RPS. Neighboring Summary Dosen V2 cannot copy this because it stays inside one homebase and does not link name to profile or course to RPS.

## Operating Context

- Existing page used as column example: SIAKAD `summary_sksdosen` (Summary Dosen V2), one-prodi view.
- Existing profile: SIM HRM Data Pegawai.
- Existing course plan: SIAKAD RPS, example RME131 Pengantar Teknologi Informasi.
- Visual chrome to copy: SIAKAD Kemahasiswaan Dashboard Verifikasi SKPI (`/kemahasiswaan/.../page=home`).
- Presentation date: 18 Sep 2026.

## Capabilities and Constraints

Confirmed for v1 of the mockup:

- University-wide lecturer table, one row per name.
- Columns from Summary Dosen V2 except Dalam Prodi and Luar Prodi, which are removed.
- Added column: Rumpun Bidang Dosen.
- Current total SKS and Batas Maksimal stay visible so an at-max lecturer is not chosen again.
- Kepangkatan (Jabatan) stays on the row.
- Click name → existing SIM HRM profile (mocked).
- On that profile, click a taught course → existing RPS (mocked).
- Read-only. No assignment, no public open data.

Open / inferred:

- [inferred] Production later lives as a SIAKAD page, not this static folder.
- [inferred] Kaprodi of every faculty may see the university-wide list.
- [undecided] Exact SIAKAD menu placement and role ACL.

## Brand Commitments

- Copy the 2026 SIAKAD Kemahasiswaan shell: blue top bar, white rounded workspace, left identity card, orange initial avatar, blue active nav pill, Indonesian labels.
- Do not use the older public-website header blues as the shell.
- UEU wordmark (Powered by ASU) on the workspace header.

## Evidence on Hand

- Screenshot of Summary Dosen V2 for Fikes / Rekam Medis (12 rows, 8 visible).
- Screenshot of Dashboard Verifikasi SKPI (theme source).
- `/Users/danielhappyg/Downloads/[SIM HRM ESA UNGGUL] Data Pegawai.pdf` (Daniel Happy Putra, NIP 219080813).
- `/Users/danielhappyg/Downloads/RPS 2026-RME131 Pengantar Teknologi Informasi.pdf`.
- Visible load numbers from the Rekam Medis screenshot are real portal values as of 17 Sep 2026.
- Extra rows from other programmes in the mockup are synthetic and labeled.

## Product Principles

- Show the stop rule on the list: total SKS versus max SKS.
- Do not rebuild profile or RPS; connect them.
- One row per lecturer. Course detail lives behind the name.
- Internal Kaprodi visibility, not public open data.
- Presentation mockup first; production SIAKAD wiring later.

## Accessibility & Inclusion

Keyboard access to the name link, filters, and layout switcher. Focus rings on interactive controls. Body text contrast at least 4.5:1 on the white workspace.
