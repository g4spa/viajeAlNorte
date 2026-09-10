const store = {
  get(key, fallback) { try { return JSON.parse(localStorage.getItem(key)) ?? fallback; } catch { return fallback; } },
  set(key, value) { localStorage.setItem(key, JSON.stringify(value)); }
};

const state = {
  memories: store.get('noa-memories', []),
  checks: store.get('noa-checks', {}),
  media: [],
  favorites: store.get('noa-favorites', []),
  mediaFilter: 'all',
  privacy: store.get('noa-privacy', false),
  cloudUser: null
};

function escapeHtml(value = '') {
  return String(value).replace(/[&<>"']/g, char => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#039;' }[char]));
}

function renderTimeline() {
  document.querySelector('#timeline').innerHTML = days.map(day => `
    <article class="timeline-item"><span class="day-number">DÍA ${String(day.n).padStart(2, '0')}</span>
    <div><strong class="timeline-title">${day.title}</strong><span class="timeline-sub">${day.sub}</span></div>
    <time class="timeline-date">${day.date}</time></article>`).join('');
}

function renderMap() {
  document.querySelector('#map-points').innerHTML = mapPlaces.map((place, index) => `
    <button class="map-point" style="left:${place.x}%;top:${place.y}%" data-weather="${place.weather}" type="button"><i></i><span>${place.name}</span></button>`).join('');
  document.querySelectorAll('.map-point').forEach(point => point.addEventListener('click', () => loadWeather(point.dataset.weather)));
}

async function loadWeather(place = 'Purmamarca') {
  const coords = { Purmamarca: [-23.75, -65.5], Tilcara: [-23.58, -65.4], 'San Francisco': [-23.62, -64.59], Cachi: [-25.12, -66.16], Salta: [-24.78, -65.41] };
  const [latitude, longitude] = coords[place] || coords.Purmamarca;
  document.querySelector('#weather-place').textContent = place;
  try {
    const response = await fetch(`https://api.open-meteo.com/v1/forecast?latitude=${latitude}&longitude=${longitude}&current=temperature_2m,weather_code&timezone=America%2FArgentina%2FJujuy`);
    if (!response.ok) throw new Error('weather request failed');
    const data = await response.json();
    document.querySelector('#weather-value').textContent = `${Math.round(data.current.temperature_2m)}°C`;
    document.querySelector('#weather-detail').textContent = `Actualizado ahora · ${weatherLabel(data.current.weather_code)}`;
  } catch {
    document.querySelector('#weather-value').textContent = 'Consultar';
    document.querySelector('#weather-detail').textContent = 'Sin conexión: revisen el pronóstico antes de salir.';
  }
}

function weatherLabel(code) {
  if (code === 0) return 'cielo despejado';
  if (code < 4) return 'parcialmente nublado';
  if (code < 70) return 'nubosidad variable';
  return 'posibles precipitaciones';
}

function renderMemories() {
  const target = document.querySelector('#entries');
  if (!state.memories.length) {
    target.innerHTML = '<div class="empty-state"><span>✎</span><p>La primera página<br>todavía está en blanco.</p></div>';
  } else {
    target.innerHTML = state.memories.map((memory, index) => `
      <article class="entry"><div class="entry-head"><span>${memory.mood} ${escapeHtml(memory.place || 'Sin destino')}</span><span>${escapeHtml(memory.date || 'Sin fecha')} <button data-remove-memory="${index}" aria-label="Eliminar entrada">×</button></span></div>
      <p>${escapeHtml(memory.text)}</p><button class="favorite-memory" data-favorite-memory="${index}" type="button">${state.favorites.includes(`memory-${memory.id || index}`) ? '♥' : '♡'}</button></article>`).join('');
    target.querySelectorAll('[data-remove-memory]').forEach(button => button.addEventListener('click', () => {
      const index = Number(button.dataset.removeMemory);
      const memory = state.memories[index];
      if (state.cloudUser && memory.id) {
        noaCloud.client.from('memories').delete().eq('id', memory.id).eq('user_id', state.cloudUser.id)
          .then(({ error }) => {
            if (error) { showCloudError(error); return; }
            state.memories.splice(index, 1); renderMemories(); renderStats();
          }).catch(showCloudError);
      } else {
        state.memories.splice(index, 1); store.set('noa-memories', state.memories); renderMemories(); renderStats();
      }
    }));
    target.querySelectorAll('[data-favorite-memory]').forEach(button => button.addEventListener('click', () => {
      const memory = state.memories[Number(button.dataset.favoriteMemory)];
      toggleFavorite(`memory-${memory.id || button.dataset.favoriteMemory}`);
    }));
  }
  renderFavorites();
}

function renderChecklist() {
  const target = document.querySelector('#checklist');
  target.innerHTML = checks.map((item, index) => `
    <label class="check-item ${state.checks[index] ? 'done' : ''}"><input type="checkbox" data-check="${index}" ${state.checks[index] ? 'checked' : ''}>${item}</label>`).join('');
  target.querySelectorAll('[data-check]').forEach(input => input.addEventListener('change', () => {
    state.checks[input.dataset.check] = input.checked; store.set('noa-checks', state.checks); input.parentElement.classList.toggle('done', input.checked); updateProgress();
    if (state.cloudUser) noaCloud.updateChecklist(state.cloudUser.id, checks[input.dataset.check], input.checked, Number(input.dataset.check)).catch(showCloudError);
  }));
  updateProgress();
}

function updateProgress() {
  const complete = Object.values(state.checks).filter(Boolean).length;
  const percent = Math.round(complete / checks.length * 100);
  document.querySelector('#progress-label').textContent = `${percent}%`;
  document.querySelector('#progress-bar').style.width = `${percent}%`;
}

function renderBudget(scenario = 'eco') {
  const items = scenarios[scenario].items;
  const total = items.reduce((sum, item) => sum + item.val, 0);
  document.querySelector('#budget-total').textContent = '$' + Math.round(total).toLocaleString('es-AR');
  document.querySelector('#budget-breakdown').innerHTML = items.slice(0, 4).map(item => `<div class="breakdown-line"><span>${item.cat}</span><span>$${Math.round(item.val).toLocaleString('es-AR')}</span></div>`).join('');
  document.querySelectorAll('.budget-tabs button').forEach(button => button.classList.toggle('active', button.dataset.scenario === scenario));
}

function toggleFavorite(id) {
  state.favorites = state.favorites.includes(id) ? state.favorites.filter(item => item !== id) : [...state.favorites, id];
  store.set('noa-favorites', state.favorites); renderMemories(); renderMedia(); renderStats();
  if (state.cloudUser) {
    const separator = id.indexOf('-');
    const resourceType = id.slice(0, separator);
    const resourceId = id.slice(separator + 1);
    const operation = state.favorites.includes(id)
      ? noaCloud.client.from('favorites').insert({ user_id: state.cloudUser.id, resource_type: resourceType, resource_id: resourceId })
      : noaCloud.client.from('favorites').delete().eq('user_id', state.cloudUser.id).eq('resource_type', resourceType).eq('resource_id', resourceId);
    operation.then(({ error }) => { if (error) showCloudError(error); });
  }
}

function renderFavorites() {
  const target = document.querySelector('#favorites-list');
  const items = state.favorites.map(id => id.startsWith('memory-') ? state.memories[Number(id.split('-')[1])] : null).filter(Boolean);
  target.innerHTML = items.length ? items.map(item => `<div class="favorite-item">${item.mood} ${escapeHtml(item.place || 'Sin destino')} — ${escapeHtml(item.text)}</div>`).join('') : '<p class="muted">Marcá recuerdos con ♡ para verlos acá.</p>';
}

function renderStats() {
  const mediaCount = state.media.length;
  document.querySelector('#stats-grid').innerHTML = [
    ['11', 'días de aventura'], ['6', 'destinos para descubrir'], ['~1.400', 'kilómetros estimados'], [String(state.memories.length + mediaCount), 'recuerdos guardados']
  ].map(([value, label]) => `<div class="stat-card"><strong>${value}</strong><span>${label}</span></div>`).join('');
}

function openDatabase() {
  return new Promise((resolve, reject) => {
    const request = indexedDB.open('noa-bitacora', 1);
    request.onupgradeneeded = () => request.result.createObjectStore('media', { keyPath: 'id', autoIncrement: true });
    request.onsuccess = () => resolve(request.result);
    request.onerror = () => reject(request.error);
  });
}

async function loadMedia() {
  if (state.cloudUser) {
    try {
      const data = await noaCloud.loadData(state.cloudUser.id);
      state.media = data.media;
      renderMedia(); renderStats();
    } catch (error) { showCloudError(error); }
    return;
  }
  try {
    const db = await openDatabase();
    const request = db.transaction('media').objectStore('media').getAll();
    request.onsuccess = () => { state.media = request.result; renderMedia(); renderStats(); };
  } catch { document.querySelector('#media-grid').innerHTML = '<div class="media-empty"><p>No se pudo abrir el álbum local.</p></div>'; }
}

function renderMedia() {
  const target = document.querySelector('#media-grid');
  const media = state.media.filter(item => state.mediaFilter === 'all' || (state.mediaFilter === 'favorite' ? state.favorites.includes(`media-${item.id}`) : item.type.startsWith(state.mediaFilter)));
  if (!media.length) { target.innerHTML = '<div class="media-empty"><span>◌</span><p>No hay recuerdos en este filtro todavía.</p></div>'; return; }
  target.innerHTML = media.map(item => {
    const source = item.url || URL.createObjectURL(item.file);
    const favorite = state.favorites.includes(`media-${item.id}`);
    return `<figure class="media-card">${item.type.startsWith('video') ? `<video src="${source}" controls></video>` : `<img src="${source}" alt="${escapeHtml(item.name)}">`}<button class="media-remove" data-remove-media="${item.id}" aria-label="Eliminar ${escapeHtml(item.name)}">×</button><button class="media-favorite" data-favorite-media="${item.id}" type="button">${favorite ? '♥' : '♡'}</button><figcaption class="media-caption">${escapeHtml(item.name)}</figcaption></figure>`;
  }).join('');
  target.querySelectorAll('[data-remove-media]').forEach(button => button.addEventListener('click', async () => {
    const id = button.dataset.removeMedia;
    if (state.cloudUser) {
      const item = state.media.find(media => String(media.id) === String(id));
      const result = await noaCloud.client.from('media').delete().eq('id', id).eq('user_id', state.cloudUser.id);
      if (result.error) { showCloudError(result.error); return; }
      if (item) await noaCloud.client.storage.from('noa-media').remove([item.storage_path]);
    } else {
      const db = await openDatabase(); db.transaction('media', 'readwrite').objectStore('media').delete(Number(id));
    }
    state.media = state.media.filter(item => String(item.id) !== String(id)); renderMedia(); renderStats();
  }));
  target.querySelectorAll('[data-favorite-media]').forEach(button => button.addEventListener('click', () => toggleFavorite(`media-${button.dataset.favoriteMedia}`)));
}

function exportBackup() {
  const payload = { version: 1, exportedAt: new Date().toISOString(), memories: state.memories, checks: state.checks, favorites: state.favorites };
  const link = document.createElement('a'); link.href = URL.createObjectURL(new Blob([JSON.stringify(payload, null, 2)], { type: 'application/json' })); link.download = 'bitacora-noa-respaldo.json'; link.click();
}

function showCloudError(error) {
  document.querySelector('#cloud-message').textContent = error.message || 'No se pudo sincronizar.';
}

async function loadCloudData() {
  if (!state.cloudUser) return;
  const data = await noaCloud.loadData(state.cloudUser.id);
  state.memories = data.memories.map(item => ({ ...item, date: item.memory_date }));
  state.checks = Object.fromEntries(data.checklist.map(item => [checks.indexOf(item.label), item.completed]).filter(([index]) => index >= 0));
  state.favorites = data.favorites.map(item => `${item.resource_type}-${item.resource_id}`);
  state.media = data.media;
  renderMemories(); renderChecklist(); renderMedia(); renderStats();
}

async function initCloud() {
  const banner = document.querySelector('#cloud-banner');
  banner.hidden = false;
  if (!noaCloud.enabled) {
    document.querySelector('#cloud-title').textContent = 'Falta conectar Supabase';
    document.querySelector('#cloud-message').textContent = 'Copiá supabase-config.example.js como supabase-config.js y completá las credenciales.';
    document.querySelector('#auth-form').hidden = true;
    return;
  }
  try {
    state.cloudUser = await noaCloud.user();
    updateAuthUi();
    if (state.cloudUser) await loadCloudData();
  } catch (error) { showCloudError(error); }
}

function updateAuthUi() {
  const form = document.querySelector('#auth-form');
  const logout = document.querySelector('#auth-logout');
  form.hidden = Boolean(state.cloudUser);
  logout.hidden = !state.cloudUser;
  document.querySelector('#cloud-title').textContent = state.cloudUser ? `Bitácora sincronizada · ${state.cloudUser.email}` : 'Conectar bitácora';
  document.querySelector('#cloud-message').textContent = state.cloudUser ? 'Sus datos se guardan en Supabase.' : 'Ingresen para sincronizar diario, checklist, favoritos y multimedia.';
}

function importBackup(file) {
  const reader = new FileReader();
  reader.onload = () => {
    try {
      const payload = JSON.parse(reader.result);
      if (!Array.isArray(payload.memories) || typeof payload.checks !== 'object') throw new Error('invalid backup');
      state.memories = payload.memories; state.checks = payload.checks; state.favorites = payload.favorites || [];
      store.set('noa-memories', state.memories); store.set('noa-checks', state.checks); store.set('noa-favorites', state.favorites);
      renderMemories(); renderChecklist(); renderStats();
    } catch { alert('El archivo no parece un respaldo válido de la bitácora.'); }
  };
  reader.readAsText(file);
}

function applyPrivacyMode() {
  document.body.classList.toggle('privacy-mode', state.privacy);
  document.querySelector('#privacy-toggle').textContent = state.privacy ? 'Modo privado: activo' : 'Modo privado';
  document.querySelector('#privacy-copy').textContent = state.privacy ? 'Las secciones personales están ocultas. El contenido sigue guardado localmente.' : 'Los recuerdos y archivos permanecen en este dispositivo. Pueden exportar un respaldo JSON para llevarlo a otro equipo.';
}

function initCountdown() {
  const departure = new Date('2026-09-14T10:00:00-03:00');
  const daysLeft = Math.ceil((departure - Date.now()) / 86400000);
  document.querySelector('#countdown-label').textContent = daysLeft > 0 ? 'Faltan' : 'Viaje en curso';
  document.querySelector('#countdown-value').textContent = daysLeft > 0 ? daysLeft : '✦';
}

document.addEventListener('DOMContentLoaded', async () => {
  renderTimeline(); renderMap(); renderMemories(); renderChecklist(); renderBudget(); renderStats(); loadMedia(); loadWeather(); initCountdown(); applyPrivacyMode(); await initCloud();
  document.querySelector('#memory-form').addEventListener('submit', async event => {
    event.preventDefault();
    const memory = { text: document.querySelector('#memory-text').value.trim(), place: document.querySelector('#memory-place').value.trim(), date: document.querySelector('#memory-date').value, mood: document.querySelector('input[name="mood"]:checked').value };
    if (state.cloudUser) {
      try { const saved = await noaCloud.insertMemory(state.cloudUser.id, memory); state.memories.unshift({ ...saved, date: saved.memory_date }); }
      catch (error) { showCloudError(error); return; }
    } else { state.memories.unshift(memory); store.set('noa-memories', state.memories); }
    event.target.reset(); document.querySelector('#save-status').textContent = 'Guardado ✓'; renderMemories(); renderStats();
  });
  document.querySelector('#media-input').addEventListener('change', async event => {
    if (state.cloudUser) {
      try { for (const file of event.target.files) state.media.unshift(await noaCloud.uploadMedia(state.cloudUser.id, file)); renderMedia(); renderStats(); }
      catch (error) { showCloudError(error); }
    } else {
      const db = await openDatabase(); const transaction = db.transaction('media', 'readwrite'); const objectStore = transaction.objectStore('media');
      [...event.target.files].forEach(file => objectStore.add({ file, name: file.name, type: file.type }));
      transaction.oncomplete = loadMedia;
    }
    event.target.value = '';
  });
  document.querySelectorAll('.budget-tabs button').forEach(button => button.addEventListener('click', () => renderBudget(button.dataset.scenario)));
  document.querySelectorAll('#media-filters button').forEach(button => button.addEventListener('click', () => { state.mediaFilter = button.dataset.filter; document.querySelectorAll('#media-filters button').forEach(item => item.classList.toggle('active', item === button)); renderMedia(); }));
  document.querySelector('#privacy-toggle').addEventListener('click', () => { state.privacy = !state.privacy; store.set('noa-privacy', state.privacy); applyPrivacyMode(); });
  document.querySelector('#backup-button').addEventListener('click', exportBackup);
  document.querySelector('#restore-input').addEventListener('change', event => { if (event.target.files[0]) importBackup(event.target.files[0]); });
  document.querySelector('#export-button').addEventListener('click', () => window.print());
  document.querySelector('#budget-export').addEventListener('click', () => window.print());
  document.querySelector('#auth-form').addEventListener('submit', async event => {
    event.preventDefault();
    try {
      state.cloudUser = await noaCloud.signIn(document.querySelector('#auth-email').value, document.querySelector('#auth-password').value);
      updateAuthUi(); await loadCloudData();
    } catch (error) { showCloudError(error); }
  });
  document.querySelector('#auth-signup').addEventListener('click', async () => {
    try {
      state.cloudUser = await noaCloud.signUp(document.querySelector('#auth-email').value, document.querySelector('#auth-password').value);
      updateAuthUi();
      document.querySelector('#cloud-message').textContent = 'Revisá tu email para confirmar la cuenta.';
    } catch (error) { showCloudError(error); }
  });
  document.querySelector('#auth-logout').addEventListener('click', async () => {
    await noaCloud.signOut(); state.cloudUser = null; updateAuthUi();
  });
});
