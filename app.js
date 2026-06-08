/* ═══════════════════════════════════════════
   VIAJE AL NORTE ARGENTINO · app.js
   Lógica de la app, eventos e inicialización.
   Depende de: data.js + render.js
   ═══════════════════════════════════════════ */

/* ─── ESTADO ─── */
let currentScenario = 'eco';
let igData = [];

/* ─── BUDGET: CAMBIO DE ESCENARIO ─── */
function setScenario(s, btn) {
  currentScenario = s;
  document.querySelectorAll('.sc-tab').forEach(b => b.classList.remove('active'));
  btn.classList.add('active');
  renderBudget(currentScenario);
}

/* ─── ITINERARIO: TOGGLE DÍA ─── */
function toggleDay(header) {
  header.closest('.day-card').classList.toggle('open');
}

/* ─── INSTAGRAM: ESTADO Y PERSISTENCIA ─── */
function loadIgData() {
  try {
    const stored = JSON.parse(localStorage.getItem('noa-ig') || '[]');
    igData = stored.length ? stored : igSlots.map(s => ({ ...s }));
  } catch (e) {
    igData = igSlots.map(s => ({ ...s }));
  }
}

function saveIgData() {
  try { localStorage.setItem('noa-ig', JSON.stringify(igData)); } catch (e) {}
}

function fillSlot(i) {
  const val = document.getElementById('ig-inp-' + i)?.value?.trim();
  if (!val) return;
  igData[i].url = val;
  saveIgData();
  renderIg(igData);
}

function removeIg(i) {
  igData[i].url = '';
  saveIgData();
  renderIg(igData);
}

function addIgSlot() {
  const url   = document.getElementById('ig-new-url').value.trim();
  const label = document.getElementById('ig-new-label').value.trim() || 'Video del viaje';
  if (!url) return;
  igData.push({ url, label });
  document.getElementById('ig-new-url').value   = '';
  document.getElementById('ig-new-label').value = '';
  saveIgData();
  renderIg(igData);
}

/* ─── NAV: ACTIVE LINK ON SCROLL ─── */
function initNavObserver() {
  const sections = document.querySelectorAll('section[id]');
  const navLinks = document.querySelectorAll('.nav-links a');

  const observer = new IntersectionObserver(entries => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        navLinks.forEach(a => {
          a.classList.toggle('active', a.getAttribute('href') === '#' + entry.target.id);
        });
      }
    });
  }, { rootMargin: '-40% 0px -55% 0px' });

  sections.forEach(s => observer.observe(s));
}

/* ─── INIT ─── */
document.addEventListener('DOMContentLoaded', () => {
  renderDays();
  renderAloj();
  renderRoutes();
  renderActs();
  renderChecklist();

  loadIgData();
  renderIg(igData);

  renderBudget(currentScenario);

  initNavObserver();
});
