/* ═══════════════════════════════════════════
   VIAJE AL NORTE ARGENTINO · render.js
   Funciones de renderizado del DOM.
   Depende de: data.js
   ═══════════════════════════════════════════ */

/* ─── DAYS (ITINERARIO) ─── */
function renderDays() {
  const dayList = document.getElementById('day-list');
  days.forEach(d => {
    const card = document.createElement('div');
    card.className = 'day-card';
    card.innerHTML = `
      <div class="day-header" onclick="toggleDay(this)">
        <div class="day-num">${d.n}</div>
        <div class="day-info">
          <strong>${d.title}</strong>
          <span>${d.sub}</span>
        </div>
        <div class="day-date">${d.date}</div>
        <div class="day-chevron">▾</div>
      </div>
      <div class="day-body">
        <div class="day-section-title">Actividades</div>
        <div class="pill-row">${d.acts.map(a => `<span class="pill pill-act">${a}</span>`).join('')}</div>
        <div class="day-section-title">Dónde dormir</div>
        <div class="pill-row"><span class="pill pill-sleep">${d.sleep}</span></div>
        ${d.planb ? `<div class="plan-b"><strong>Plan B:</strong> ${d.planb}</div>` : ''}
      </div>`;
    dayList.appendChild(card);
  });
}

/* ─── ALOJAMIENTO ─── */
function renderAloj() {
  const alojList = document.getElementById('aloj-list');
  aloj.forEach(a => {
    const card = document.createElement('div');
    card.className = 'day-card';
    card.style.cssText = 'display:flex;align-items:center;gap:14px;padding:14px 18px;';
    card.innerHTML = `
      <div class="day-num" style="font-size:1.2rem;min-width:40px;text-align:center">${a.nights}N</div>
      <div class="day-info" style="flex:1">
        <strong>${a.dest}</strong>
        <span>${a.dates} &nbsp;·&nbsp; ${a.note}</span>
      </div>`;
    alojList.appendChild(card);
  });
}

/* ─── ROUTES ─── */
function renderRoutes() {
  const routeList = document.getElementById('route-list');
  routes.forEach(r => {
    const item = document.createElement('div');
    item.className = 'route-item';
    item.innerHTML = `
      <div class="route-dot ${r.dot}"></div>
      <div class="route-info">
        <strong>${r.from} → ${r.to}</strong>
        <span>${r.route}</span>
        <div class="route-dist">${r.km} &nbsp;·&nbsp; ${r.hrs}</div>
      </div>`;
    routeList.appendChild(item);
  });
}

/* ─── ACTIVITIES ─── */
function renderActs() {
  const actGrid = document.getElementById('act-grid');
  acts.forEach(a => {
    const card = document.createElement('div');
    card.className = 'act-card';
    card.innerHTML = `
      <div class="dest">${a.dest}</div>
      <ul>${a.items.map(i => `<li>${i}</li>`).join('')}</ul>`;
    actGrid.appendChild(card);
  });
}

/* ─── CHECKLIST ─── */
function renderChecklist() {
  const checkEl = document.getElementById('checklist');
  const saved = {};
  try { Object.assign(saved, JSON.parse(localStorage.getItem('noa-checks') || '{}')); } catch (e) {}

  checks.forEach((c, i) => {
    const label = document.createElement('label');
    label.className = 'check-item' + (saved[i] ? ' done' : '');
    label.innerHTML = `<input type="checkbox" ${saved[i] ? 'checked' : ''}> ${c}`;
    label.querySelector('input').addEventListener('change', function () {
      label.classList.toggle('done', this.checked);
      saved[i] = this.checked;
      try { localStorage.setItem('noa-checks', JSON.stringify(saved)); } catch (e) {}
    });
    checkEl.appendChild(label);
  });
}

/* ─── BUDGET ─── */
function fmt(n) {
  return '$' + Math.round(n).toLocaleString('es-AR');
}

function renderBudget(currentScenario) {
  const sc = scenarios[currentScenario];
  const tbody = document.getElementById('budget-tbody');
  tbody.innerHTML = '';
  let total = 0;

  sc.items.forEach(item => {
    total += item.val;
    const tr = document.createElement('tr');
    tr.innerHTML = `
      <td><span class="cat-tag ${item.cls}">${item.cat}</span></td>
      <td class="td-muted">${item.det}</td>
      <td class="td-right">${fmt(item.val)}</td>`;
    tbody.appendChild(tr);
  });

  const trTotal = document.createElement('tr');
  trTotal.className = 'total-row';
  trTotal.innerHTML = `
    <td colspan="2">Total estimado · 2 personas · 10 días en destino</td>
    <td class="td-right">${fmt(total)}</td>`;
  tbody.appendChild(trTotal);

  document.getElementById('m-total').textContent = fmt(total);
  document.getElementById('m-usd').textContent   = '≈ USD ' + Math.round(total / USD).toLocaleString('es-AR');
  document.getElementById('m-pp').textContent    = fmt(total / 2);
  document.getElementById('m-pd').textContent    = fmt(total / 10);
}

/* ─── INSTAGRAM ─── */
function extractIgId(url) {
  const m = url.match(/\/(p|reel|tv)\/([A-Za-z0-9_-]+)/);
  return m ? m[2] : '';
}

function renderIg(igData) {
  const grid = document.getElementById('ig-grid');
  grid.innerHTML = '';

  igData.forEach((slot, i) => {
    const div = document.createElement('div');
    if (slot.url) {
      div.className = 'ig-slot filled';
      const postId = extractIgId(slot.url);
      div.innerHTML = `
        <div class="ig-embed-container">
          <iframe src="https://www.instagram.com/p/${postId}/embed/" scrolling="no" allowtransparency="true"></iframe>
          <button class="remove-btn" onclick="removeIg(${i})">✕ quitar</button>
        </div>`;
    } else {
      div.className = 'ig-slot';
      div.innerHTML = `
        <div class="ig-placeholder">
          <span class="ig-icon">📸</span>
          <h4>${slot.label}</h4>
          <p>Pegá el link de tu Reel o post de Instagram cuando lo subas</p>
          <div class="ig-input-row">
            <input class="ig-input" id="ig-inp-${i}" placeholder="https://www.instagram.com/reel/..."/>
            <button class="ig-btn" onclick="fillSlot(${i})">Agregar</button>
          </div>
        </div>`;
    }
    grid.appendChild(div);
  });
}
