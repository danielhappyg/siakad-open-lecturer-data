(function () {
  const root = document.getElementById("app");
  const { lecturers, teaching, profiles, rps, statusOf, headroom } = window.MOCK;

  const state = {
    view: "list",
    lecturerId: null,
    rpsKode: null,
    q: "",
    homebase: "",
    rumpun: "",
    status: "",
    layout: "scan",
  };

  const icon = {
    grid: '<svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8"><rect x="3" y="3" width="7" height="7" rx="1.5"/><rect x="14" y="3" width="7" height="7" rx="1.5"/><rect x="3" y="14" width="7" height="7" rx="1.5"/><rect x="14" y="14" width="7" height="7" rx="1.5"/></svg>',
    users: '<svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8"><path d="M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2"/><circle cx="9" cy="7" r="4"/><path d="M22 21v-2a4 4 0 0 0-3-3.87"/><path d="M16 3.13a4 4 0 0 1 0 7.75"/></svg>',
    check: '<svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8"><path d="M20 6 9 17l-5-5"/></svg>',
    ban: '<svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8"><circle cx="12" cy="12" r="9"/><path d="M7 7l10 10"/></svg>',
    file: '<svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8"><path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"/><path d="M14 2v6h6"/></svg>',
  };

  function parseHash() {
    const h = location.hash.replace(/^#/, "") || "/dosen";
    const rpsMatch = h.match(/^\/rps\/([^/]+)/);
    const dosMatch = h.match(/^\/dosen\/([^/]+)/);
    if (rpsMatch) {
      state.view = "rps";
      state.rpsKode = decodeURIComponent(rpsMatch[1]);
      return;
    }
    if (dosMatch) {
      state.view = "profile";
      state.lecturerId = decodeURIComponent(dosMatch[1]);
      return;
    }
    state.view = "list";
  }

  function go(path) {
    location.hash = path;
  }

  function unique(key) {
    return [...new Set(lecturers.map((row) => row[key]))].sort();
  }

  function filtered() {
    return lecturers
      .filter((row) => {
        const hay = (row.name + row.nidn + row.homebase + row.rumpun).toLowerCase();
        if (state.q && !hay.includes(state.q.toLowerCase())) return false;
        if (state.homebase && row.homebase !== state.homebase) return false;
        if (state.rumpun && row.rumpun !== state.rumpun) return false;
        const st = statusOf(row);
        if (state.status === "open" && st !== "under") return false;
        if (state.status === "full" && st === "under") return false;
        return true;
      })
      .sort((a, b) => headroom(b) - headroom(a) || a.name.localeCompare(b.name));
  }

  function pill(row) {
    const st = statusOf(row);
    const left = headroom(row);
    if (st === "under" && left <= 1) return `<span class="pill pill-tight">Sisa ${left} SKS</span>`;
    if (st === "under") return `<span class="pill pill-open">Sisa ${left} SKS</span>`;
    return `<span class="pill pill-full">Penuh</span>`;
  }

  function loadCell(row) {
    const pct = Math.min(100, Math.round((row.sks / row.maxSks) * 100));
    const full = statusOf(row) !== "under";
    return `<div class="load">${row.sks} / ${row.maxSks} SKS<div class="load-bar ${full ? "is-full" : ""}"><i style="width:${pct}%"></i></div></div>`;
  }

  function shell(main, title, sub) {
    const status = state.status;
    return `
      <header class="app-header">
        <div class="brand-nav">
          <button class="nav-btn" type="button">${icon.grid} Menu</button>
          <button class="nav-btn" type="button">Akademik</button>
          <button class="nav-btn" type="button">Sumber Daya</button>
          <button class="nav-btn" type="button">Laporan</button>
        </div>
        <div class="header-module">Sistem Informasi Akademik</div>
      </header>
      <div class="stage">
        <div class="workspace">
          <div class="workspace-head">
            <img class="kicker-logo" src="assets/logo-ueu.png" alt="Universitas Esa Unggul">
            <div style="flex:1">
              <h1>${title}</h1>
              <p class="sub">${sub}</p>
            </div>
          </div>
          <div class="layout">
            <aside>
              <div class="identity">
                <div class="avatar">D</div>
                <strong>DANIEL HAPPY PUTRA, S.KM., M.K.M.</strong>
              </div>
              <nav class="side-nav">
                <button class="side-link ${state.view === "list" && status === "" ? "is-active" : ""}" data-status="" type="button">${icon.users} Direktori Dosen</button>
                <button class="side-link ${status === "open" ? "is-active" : ""}" data-status="open" type="button">${icon.check} Ada sisa SKS</button>
                <button class="side-link ${status === "full" ? "is-active" : ""}" data-status="full" type="button">${icon.ban} Beban penuh</button>
                <button class="side-link" data-go="#/dosen/7979" type="button">${icon.file} Data pegawai</button>
              </nav>
              <div class="side-foot">SIAKAD · Direktori Dosen · UEU</div>
            </aside>
            <section class="panel">${main}</section>
          </div>
        </div>
      </div>`;
  }

  function listView() {
    const rows = filtered();
    const full = lecturers.filter((row) => statusOf(row) !== "under").length;
    const open = lecturers.filter((row) => statusOf(row) === "under").length;
    const homeOpts = unique("homebase")
      .map((v) => `<option ${state.homebase === v ? "selected" : ""}>${v}</option>`)
      .join("");
    const rumpunOpts = unique("rumpun")
      .map((v) => `<option ${state.rumpun === v ? "selected" : ""}>${v}</option>`)
      .join("");

    const body = rows
      .map((row, i) => {
        const st = statusOf(row);
        if (state.layout === "dense") {
          return `<tr class="${st !== "under" ? "is-full" : ""}">
            <td>${i + 1}</td>
            <td class="name"><button class="name-btn" data-go="#/dosen/${row.id}" type="button">${row.name}</button>
              <span class="meta">${row.nidn} (${row.nidnNote})</span></td>
            <td>${row.kriteria}</td>
            <td>${row.kelompok}</td>
            <td>${row.jabatan}</td>
            <td>${row.homebase}</td>
            <td>${row.rumpun}</td>
            <td>${row.penelitian}</td>
            <td>${row.abdimas}</td>
            <td>${row.kewajiban}</td>
            <td>${row.mk}</td>
            <td>${row.kelas}</td>
            <td>${row.sks}</td>
            <td>${row.maxSks} ${pill(row)}</td>
          </tr>`;
        }
        return `<tr class="${st !== "under" ? "is-full" : ""}">
          <td class="name"><button class="name-btn" data-go="#/dosen/${row.id}" type="button">${row.name}</button>
            <span class="meta">${row.nidn} · ${row.kriteria}</span></td>
          <td>${row.jabatan}<span class="meta">${row.kelompok}</span></td>
          <td>${row.homebase}<span class="meta">${row.rumpun}</span></td>
          <td>${row.penelitian} / ${row.abdimas}<span class="meta">penelitian / abdimas 2 th</span></td>
          <td>${loadCell(row)} ${pill(row)}</td>
        </tr>`;
      })
      .join("");

    const head =
      state.layout === "dense"
        ? `<tr>
            <th>No</th><th class="name">Nama</th><th>Kriteria</th><th>Kelompok</th>
            <th>Jabatan</th><th>Homebase</th><th>Rumpun</th><th>Pen.</th><th>Abd.</th>
            <th>Kewajiban</th><th>MK</th><th>Kelas</th><th>SKS</th><th>Maks</th>
          </tr>`
        : `<tr>
            <th class="name">Nama / NIDN</th><th>Kepangkatan</th><th>Homebase / rumpun</th>
            <th>Tridharma 2 th</th><th>Beban vs maks</th>
          </tr>`;

    return `
      <div class="stats">
        <div class="stat"><b>${lecturers.length}</b><span>Total dosen</span></div>
        <div class="stat ok"><b>${open}</b><span>Masih ada sisa SKS</span></div>
        <div class="stat danger"><b>${full}</b><span>Sudah penuh</span></div>
        <div class="stat"><b>${rows.length}</b><span>Baris setelah filter</span></div>
      </div>
      <div class="toolbar">
        <input class="search" id="q" value="${state.q}" placeholder="Cari nama, NIDN, homebase, rumpun">
        <select class="select" id="homebase"><option value="">Semua homebase</option>${homeOpts}</select>
        <select class="select" id="rumpun"><option value="">Semua rumpun</option>${rumpunOpts}</select>
        <select class="select" id="status">
          <option value="" ${state.status === "" ? "selected" : ""}>Semua status</option>
          <option value="open" ${state.status === "open" ? "selected" : ""}>Ada sisa</option>
          <option value="full" ${state.status === "full" ? "selected" : ""}>Penuh</option>
        </select>
        <div class="switcher" role="group" aria-label="Tata letak">
          <button type="button" data-layout="scan" class="${state.layout === "scan" ? "is-on" : ""}">Pindai cepat</button>
          <button type="button" data-layout="dense" class="${state.layout === "dense" ? "is-on" : ""}">Kolom lengkap</button>
        </div>
      </div>
      <div class="table-wrap">
        <table>
          <thead>${head}</thead>
          <tbody>${body || `<tr><td colspan="${state.layout === "dense" ? 14 : 5}" class="empty">Tidak ada dosen pada filter ini. <button class="back" data-status="" type="button">Reset filter</button></td></tr>`}</tbody>
        </table>
      </div>
      <p class="table-foot">Menampilkan ${rows.length} dari ${lecturers.length} dosen · diurutkan dari sisa SKS terbesar</p>`;
  }

  function profileView() {
    const row = lecturers.find((item) => item.id === state.lecturerId);
    if (!row) return `<p class="empty">Dosen tidak ditemukan.</p>`;
    const extra = profiles[row.id] || {};
    const courses = teaching[row.id] || [];
    const edu = (extra.education || [])
      .map((item) => `<div>${item.jenjang} · ${item.institusi} · ${item.tahun}</div>`)
      .join("");
    const nip = row.hrmNip || "Belum ditarik dari SIM HRM";
    const nidnLabel =
      !row.nidn || row.nidn === "—"
        ? `Belum tercatat (${row.nidnNote})`
        : `${row.nidn} (${row.nidnNote})`;
    return `
      <button class="back" data-go="#/dosen" type="button">Kembali ke direktori</button>
      <div class="cards" style="margin-top:14px">
        <div class="card">
          <h2>${row.name}</h2>
          <dl class="kv">
            <dt>NIP / ID HRM</dt><dd>${nip}</dd>
            <dt>NIDN / NIDK</dt><dd>${nidnLabel}</dd>
            <dt>Kriteria</dt><dd>${row.kriteria}</dd>
            <dt>Kepangkatan</dt><dd>${row.jabatan}</dd>
            <dt>Kelompok</dt><dd>${row.kelompok}</dd>
            <dt>Homebase</dt><dd>${row.homebase}</dd>
            <dt>Rumpun</dt><dd>${row.rumpun}</dd>
            <dt>Beban SKS</dt><dd>${row.sks} / ${row.maxSks} · kewajiban ${row.kewajiban} ${pill(row)}</dd>
            ${extra.sinta ? `<dt>Sinta</dt><dd>${extra.sinta} <span class="meta">dari SIM HRM Data Pegawai</span></dd>` : ""}
            ${extra.scholar ? `<dt>Google Scholar</dt><dd><a href="${extra.scholar}" target="_blank" rel="noopener">Buka profil</a></dd>` : ""}
          </dl>
        </div>
        <div class="card">
          <h2>Pendidikan</h2>
          ${edu || `<p class="sub">Data pendidikan belum ditarik dari SIM HRM untuk dosen ini.</p>`}
        </div>
        <div class="card">
          <h2>Pengajaran</h2>
          <p class="sub">Klik mata kuliah untuk membuka RPS.</p>
          ${
            courses.length
              ? courses
                  .map(
                    (c) => `<button class="course" data-go="#/rps/${c.kode}" type="button">
                <span><span class="course-name">${c.nama}</span><span class="meta">${c.kode} · ${c.periode}</span></span>
                <span class="meta">Buka RPS</span>
              </button>`
                  )
                  .join("")
              : `<p class="sub">Riwayat pengajaran belum tersedia.</p>`
          }
        </div>
      </div>`;
  }

  function rpsView() {
    const doc = rps[state.rpsKode];
    if (!doc) {
      return `<button class="back" data-go="#/dosen/${state.lecturerId || ""}" type="button">Kembali ke profil</button>
        <p class="empty">RPS untuk kode ${state.rpsKode} belum tersedia.</p>`;
    }
    const pengampu = Array.isArray(doc.pengampu) ? doc.pengampu.join("<br>") : doc.pengampu;
    return `
      <button class="back" data-go="#/dosen/${state.lecturerId || "7979"}" type="button">Kembali ke profil</button>
      <div class="cards" style="margin-top:14px">
        <div class="card">
          <h2>Identitas Mata Kuliah</h2>
          <dl class="kv">
            <dt>Mata kuliah</dt><dd>${doc.nama}</dd>
            <dt>Kode</dt><dd>${doc.kode}</dd>
            <dt>Fakultas</dt><dd>${doc.fakultas || "—"}</dd>
            <dt>Program studi</dt><dd>${doc.prodi}</dd>
            <dt>Bobot (SKS)</dt><dd>${doc.sks}</dd>
            <dt>Semester</dt><dd>${doc.semester}</dd>
            <dt>Tanggal penyusunan</dt><dd>${doc.tanggal}</dd>
          </dl>
        </div>
        <div class="card">
          <h2>Otorisasi</h2>
          <dl class="kv">
            <dt>Pengembang RPS</dt><dd>${doc.pengembang || "—"}</dd>
            <dt>Koordinator RPS</dt><dd>${doc.koordinator || "—"}</dd>
            <dt>Ketua Prodi</dt><dd>${doc.ketuaProdi || "—"}</dd>
            <dt>Dosen pengampu</dt><dd>${pengampu}</dd>
          </dl>
        </div>
        <div class="card">
          <h2>Deskripsi Singkat MK</h2>
          <p>${doc.deskripsi || "—"}</p>
        </div>
        <div class="card">
          <h2>CPL yang dibebankan pada Mata Kuliah</h2>
          ${(doc.cpl || [])
            .map((item) =>
              typeof item === "string"
                ? `<p>${item}</p>`
                : `<p><strong>${item.kode}</strong> ${item.teks}</p>`
            )
            .join("")}
        </div>
        <div class="card">
          <h2>Indikator Kinerja (IK)</h2>
          ${(doc.ik || [])
            .map((item) => `<p><strong>${item.kode}</strong> ${item.teks}</p>`)
            .join("") || "<p>—</p>"}
        </div>
        <div class="card">
          <h2>Capaian Pembelajaran Mata Kuliah (CPMK)</h2>
          ${(doc.cpmk || [])
            .map((item) =>
              typeof item === "string"
                ? `<p>${item}</p>`
                : `<p><strong>${item.kode}</strong> ${item.teks}</p>`
            )
            .join("")}
        </div>
        <div class="card">
          <h2>Kemampuan Akhir Tiap Tahapan Belajar (Sub-CPMK)</h2>
          <div class="table-wrap">
            <table>
              <thead><tr><th>Kode</th><th>Minggu</th><th>Sub-CPMK</th></tr></thead>
              <tbody>
                ${(doc.subCpmk || [])
                  .map(
                    (item) =>
                      `<tr><td>${item.kode}</td><td>${item.minggu}</td><td style="white-space:normal">${item.teks}</td></tr>`
                  )
                  .join("")}
              </tbody>
            </table>
          </div>
        </div>
        <div class="card">
          <h2>Rencana Pembelajaran per Minggu</h2>
          <div class="table-wrap">
            <table>
              <thead>
                <tr>
                  <th>Mg</th><th>Sub-CPMK</th><th>Bentuk pembelajaran</th>
                  <th>Metode</th><th>Bobot</th>
                </tr>
              </thead>
              <tbody>
                ${(doc.pertemuan || [])
                  .map(
                    (item) =>
                      `<tr>
                        <td>${item.minggu}</td>
                        <td>${item.sub}</td>
                        <td style="white-space:normal">${item.bentuk}</td>
                        <td style="white-space:normal">${item.metode}</td>
                        <td>${item.bobot}</td>
                      </tr>`
                  )
                  .join("")}
              </tbody>
            </table>
          </div>
        </div>
        <div class="card">
          <h2>Penilaian</h2>
          <ul class="plain-list">
            ${(doc.penilaian || []).map((item) => `<li>${item}</li>`).join("") || "<li>—</li>"}
          </ul>
        </div>
        <div class="card">
          <h2>Referensi</h2>
          <ol class="plain-list">
            ${(doc.referensi || []).map((item) => `<li>${item}</li>`).join("") || "<li>—</li>"}
          </ol>
        </div>
      </div>`;
  }

  function render() {
    parseHash();
    let main = listView();
    let title = "Direktori Dosen";
    let sub = "Panel Kaprodi · SIAKAD Universitas Esa Unggul";
    if (state.view === "profile") {
      main = profileView();
      title = "Data Pegawai";
      sub = "SIM HRM · Universitas Esa Unggul";
    }
    if (state.view === "rps") {
      main = rpsView();
      title = "Rencana Pembelajaran Semester";
      sub = "SIAKAD Universitas Esa Unggul";
    }
    root.innerHTML = shell(main, title, sub);
  }

  root.addEventListener("click", (event) => {
    const goBtn = event.target.closest("[data-go]");
    if (goBtn) {
      go(goBtn.getAttribute("data-go"));
      return;
    }
    const statusBtn = event.target.closest("[data-status]");
    if (statusBtn && !statusBtn.hasAttribute("data-go")) {
      state.status = statusBtn.getAttribute("data-status") || "";
      state.view = "list";
      go("/dosen");
      render();
      return;
    }
    const layout = event.target.closest("[data-layout]");
    if (layout) {
      state.layout = layout.getAttribute("data-layout");
      render();
    }
  });

  root.addEventListener("input", (event) => {
    if (event.target.id === "q") {
      state.q = event.target.value;
      render();
      const el = document.getElementById("q");
      if (el) {
        el.focus();
        el.setSelectionRange(state.q.length, state.q.length);
      }
    }
  });

  root.addEventListener("change", (event) => {
    if (event.target.id === "homebase") state.homebase = event.target.value;
    if (event.target.id === "rumpun") state.rumpun = event.target.value;
    if (event.target.id === "status") state.status = event.target.value;
    render();
  });

  window.addEventListener("hashchange", render);
  window.addEventListener("keydown", (event) => {
    if (event.target.matches("input, select, textarea")) return;
    if (event.key === "1") {
      state.layout = "scan";
      render();
    }
    if (event.key === "2") {
      state.layout = "dense";
      render();
    }
  });

  render();
})();
