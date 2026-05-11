/* ═══════════════════════════════════════════
   RUNFUERZA — app.js
   Lógica de la aplicación.
   Depende de: data/ejercicios.js (cargado antes)
   ═══════════════════════════════════════════ */

/* ──────────────────────────────────────────
   STATE
   ────────────────────────────────────────── */
let wakeLock = null;
const state = {
  enfoque: null,
  tiempo: null,
  ejerciciosActivos: [],
  timers: {},
};

/* ──────────────────────────────────────────
   INIT
   ────────────────────────────────────────── */
function init() {
  renderEnfoques();
  resetWeeklyStatsIfNeeded();
  registerServiceWorker();
}

function registerServiceWorker() {
  if ('serviceWorker' in navigator) {
    navigator.serviceWorker.register('sw.js').catch(() => {
      // SW opcional — la app funciona sin él
    });
  }
}

/* ──────────────────────────────────────────
   HOME — Render & selección
   ────────────────────────────────────────── */
function renderEnfoques() {
  const grid = document.getElementById('enfoqueGrid');
  grid.innerHTML = '';

  ENFOQUES.forEach(e => {
    const div = document.createElement('div');
    div.className = 'enfoque-card';
    div.style.setProperty('--card-color', e.color);
    div.innerHTML = `
      <span class="enfoque-icon">${e.icon}</span>
      <div class="enfoque-name">${e.name}</div>
      <div class="enfoque-desc">${e.desc}</div>
    `;
    div.onclick = () => selectEnfoque(e.id, div);
    grid.appendChild(div);
  });
}

function selectEnfoque(id, el) {
  document.querySelectorAll('.enfoque-card').forEach(c => c.classList.remove('selected'));
  el.classList.add('selected');
  state.enfoque = id;
  checkReady();
}

function selectTiempo(el) {
  document.querySelectorAll('.tiempo-pill').forEach(p => p.classList.remove('selected'));
  el.classList.add('selected');
  state.tiempo = parseInt(el.dataset.min);
  checkReady();
}

function checkReady() {
  document.getElementById('btnGenerar').disabled = !(state.enfoque && state.tiempo);
}

/* ──────────────────────────────────────────
   SESSION GENERATION
   ────────────────────────────────────────── */
function generarSesion() {
  const { enfoque, tiempo } = state;

  // Número de ejercicios según tiempo disponible
  const mainCounts = { 15: 4, 30: 8, 45: 12 };
  const mainCount = mainCounts[tiempo];

  // Calentamiento: 3 ejercicios para 15min, 4 para el resto
  const warmPool = CALENTAMIENTOS[enfoque] || CALENTAMIENTOS.mix;
  const warmEjs  = shuffle([...warmPool]).slice(0, tiempo === 15 ? 3 : 4);

  // Ejercicios principales
  let mainEjs;
  if (enfoque === 'mix') {
    const cats = ['fuerza', 'movilidad', 'propio', 'core'];
    const perCat = Math.ceil(mainCount / 4);
    mainEjs = [];
    cats.forEach(cat => {
      mainEjs.push(...shuffle([...EJERCICIOS[cat]]).slice(0, perCat));
    });
    mainEjs = shuffle(mainEjs).slice(0, mainCount);
  } else {
    mainEjs = shuffle([...EJERCICIOS[enfoque]]).slice(0, mainCount);
  }

  // Anti-repetición: guarda los últimos usados
  const lastUsed = getLastUsed();
  mainEjs = avoidRepeat(mainEjs, lastUsed, EJERCICIOS[enfoque] || []);
  saveLastUsed(mainEjs.map(e => e.name));

  // Construir estructura de sesión
  state.ejerciciosActivos = [
    {
      phase: 'calentamiento',
      items: warmEjs.map((e, i) => ({ ...e, id: `w${i}`, done: false })),
    },
    {
      phase: 'principal',
      items: mainEjs.map((e, i) => ({ ...e, id: `m${i}`, done: false })),
    },
  ];

  state.timers = {};
  renderSession();
  showScreen('session');
  updateProgress();
}

/* Anti-repetición: si hay suficiente pool, evita repetir ejercicios de la sesión anterior */
function avoidRepeat(selected, lastUsed, fullPool) {
  if (!lastUsed.length || fullPool.length <= selected.length) return selected;

  const notLast = fullPool.filter(e => !lastUsed.includes(e.name));
  if (notLast.length < selected.length) return selected; // pool insuficiente, acepta repetición

  return shuffle(notLast).slice(0, selected.length);
}

function getLastUsed() {
  try { return JSON.parse(localStorage.getItem('runfuerza_last') || '[]'); }
  catch { return []; }
}

function saveLastUsed(names) {
  try { localStorage.setItem('runfuerza_last', JSON.stringify(names)); }
  catch { /* storage no disponible */ }
}

function shuffle(arr) {
  const a = [...arr];
  for (let i = a.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [a[i], a[j]] = [a[j], a[i]];
  }
  return a;
}

/* ──────────────────────────────────────────
   SESSION RENDER
   ────────────────────────────────────────── */
function renderSession() {
  const enfoque = ENFOQUES.find(e => e.id === state.enfoque);
  document.getElementById('sessionTitle').textContent = `${enfoque.icon} ${enfoque.name}`;
  document.getElementById('sessionInfo').textContent  = `${state.tiempo} min · Hoy`;

  const body = document.getElementById('sessionBody');
  body.innerHTML = '';

  state.ejerciciosActivos.forEach(phase => {
    const phaseDiv    = document.createElement('div');
    const phaseHeader = document.createElement('div');
    phaseHeader.className = 'phase-header';
    phaseHeader.innerHTML = `
      <div class="phase-tag ${phase.phase}">
        ${phase.phase === 'calentamiento' ? '🔥 CALENTAMIENTO — 5 min' : '💥 SESIÓN PRINCIPAL'}
      </div>
      <div class="phase-line"></div>
    `;
    phaseDiv.appendChild(phaseHeader);

    phase.items.forEach((ej, idx) => {
      phaseDiv.appendChild(buildExCard(ej, idx + 1));
    });

    body.appendChild(phaseDiv);
  });
}

function buildExCard(ej, num) {
  const card = document.createElement('div');
  card.className = 'ex-card';
  card.id = `card-${ej.id}`;
  card.style.animationDelay = `${num * 0.05}s`;

  const tagColor = getTagColor(ej.tag);

  card.innerHTML = `
    <div class="ex-card-header" onclick="toggleCard('${ej.id}')">
      <div class="ex-num">${String(num).padStart(2, '0')}</div>
      <div class="ex-info">
        <div class="ex-name">${ej.name}</div>
        <div class="ex-tag" style="color:${tagColor}">${ej.tag}</div>
      </div>
      <div class="ex-badge">${ej.badge}</div>
      <div class="ex-check" id="check-${ej.id}" onclick="event.stopPropagation(); toggleDone('${ej.id}')">
        ${ej.done ? '✓' : ''}
      </div>
    </div>
    <div class="ex-body">
      <div class="ex-desc">${ej.desc}</div>
      <div class="timer-section">
        <div>
          <div class="timer-display" id="timer-${ej.id}">00:00</div>
          <div class="timer-presets">
            <button class="btn-preset" onclick="setTimer('${ej.id}', 30)">30s</button>
            <button class="btn-preset" onclick="setTimer('${ej.id}', 45)">45s</button>
            <button class="btn-preset" onclick="setTimer('${ej.id}', 60)">1min</button>
            <button class="btn-preset" onclick="setTimer('${ej.id}', 90)">1.5min</button>
            <button class="btn-preset" onclick="setTimer('${ej.id}', 120)">2min</button>
          </div>
        </div>
        <div class="timer-controls">
          <button class="btn-timer primary" onclick="startStopTimer('${ej.id}')">▶</button>
          <button class="btn-timer" onclick="resetTimer('${ej.id}')">↺</button>
        </div>
      </div>
    </div>
  `;
  return card;
}

function getTagColor(tag) {
  if (!tag) return '#666';
  const t = tag.toLowerCase();
  if (t.includes('glúte') || t.includes('cuádr') || t.includes('fuerza'))            return '#f5a623';
  if (t.includes('movil') || t.includes('estira') || t.includes('cadera') || t.includes('tobillo')) return '#42c8f5';
  if (t.includes('equil') || t.includes('propio') || t.includes('estabil'))           return '#c842f5';
  if (t.includes('core')  || t.includes('oblicu') || t.includes('lumbar'))            return '#f54272';
  return '#c8f542';
}

/* ──────────────────────────────────────────
   INTERACTIONS — cards & checks
   ────────────────────────────────────────── */
function toggleCard(id) {
  const card = document.getElementById(`card-${id}`);
  const isExpanding = !card.classList.contains('expanded');

  card.classList.toggle('expanded');
  card.classList.toggle('active', isExpanding);

  if (isExpanding && !state.timers[id]) {
    state.timers[id] = { seconds: 0, running: false, interval: null, custom: 0 };
  }
}

function toggleDone(id) {
  let ej;
  state.ejerciciosActivos.forEach(p => {
    const found = p.items.find(e => e.id === id);
    if (found) ej = found;
  });
  if (!ej) return;

  ej.done = !ej.done;

  const card  = document.getElementById(`card-${id}`);
  const check = document.getElementById(`check-${id}`);
  card.classList.toggle('done', ej.done);
  check.classList.toggle('checked', ej.done);
  check.textContent = ej.done ? '✓' : '';

  updateProgress();
}

function updateProgress() {
  const all   = state.ejerciciosActivos.flatMap(p => p.items);
  const done  = all.filter(e => e.done).length;
  const total = all.length;
  const pct   = total ? (done / total) * 100 : 0;

  document.getElementById('progressFill').style.width  = pct + '%';
  document.getElementById('progressLabel').textContent = `${done} / ${total} completados`;

  const btnDone = document.getElementById('btnDone');
  btnDone.classList.toggle('visible', done === total && total > 0);
}

/* ──────────────────────────────────────────
   TIMER
   ────────────────────────────────────────── */
function setTimer(id, secs) {
  if (!state.timers[id]) state.timers[id] = { seconds: 0, running: false, interval: null, custom: 0 };
  const t = state.timers[id];
  if (t.running) stopTimer(id);
  t.seconds = secs;
  t.custom  = secs;
  renderTimerDisplay(id);
}

function startStopTimer(id) {
  if (!state.timers[id]) state.timers[id] = { seconds: 0, running: false, interval: null, custom: 60 };
  const t = state.timers[id];

  if (t.running) {
    stopTimer(id);
    return;
  }

  if (t.seconds === 0) t.seconds = t.custom || 60;
  t.running = true;

  const btn = document.querySelector(`#card-${id} .btn-timer.primary`);
  if (btn) btn.textContent = '⏸';

  t.interval = setInterval(() => {
    t.seconds--;
    renderTimerDisplay(id);
    if (t.seconds <= 0) {
      stopTimer(id);
      flashTimer(id);
    }
  }, 1000);
}

function stopTimer(id) {
  const t = state.timers[id];
  if (!t) return;
  clearInterval(t.interval);
  t.running = false;
  const btn = document.querySelector(`#card-${id} .btn-timer.primary`);
  if (btn) btn.textContent = '▶';
}

function resetTimer(id) {
  stopTimer(id);
  const t = state.timers[id];
  if (!t) return;
  t.seconds = t.custom || 60;
  renderTimerDisplay(id);
  const disp = document.getElementById(`timer-${id}`);
  if (disp) disp.style.color = '';
}

function renderTimerDisplay(id) {
  const t    = state.timers[id];
  const disp = document.getElementById(`timer-${id}`);
  if (!t || !disp) return;
  const m = Math.floor(Math.abs(t.seconds) / 60);
  const s = Math.abs(t.seconds) % 60;
  disp.textContent = `${String(m).padStart(2, '0')}:${String(s).padStart(2, '0')}`;
}

function flashTimer(id) {
  const disp = document.getElementById(`timer-${id}`);
  if (!disp) return;
  disp.style.color = '#f54242';
  setTimeout(() => { if (disp) disp.style.color = ''; }, 1500);
}

/* ──────────────────────────────────────────
   SCREEN NAVIGATION
   ────────────────────────────────────────── */
function showScreen(id) {
  document.querySelectorAll('.screen').forEach(s => s.classList.remove('active'));
  document.getElementById(id).classList.add('active');

  // Detener todos los timers al salir de sesión
  if (id !== 'session') {
    liberarWakeLock();
    Object.keys(state.timers).forEach(tid => stopTimer(tid));
    // Si salimos de sesión, detener flujo de mente
    if (stateMente.corriendo) {
      clearInterval(stateMente.interval);
      clearInterval(stateMente.respiracionInterval);
      detenerVoz();
      stateMente.corriendo = false;
      stateMente.pausado   = false;
    }
  }
}

/* ──────────────────────────────────────────
   COMPLETE SCREEN
   ────────────────────────────────────────── */
function showComplete() {
  const all  = state.ejerciciosActivos.flatMap(p => p.items);
  const done = all.filter(e => e.done).length;

  const sem = incrementWeeklyCount();

  document.getElementById('statEj').textContent  = done;
  document.getElementById('statMin').textContent = state.tiempo;
  document.getElementById('statSem').textContent = sem;

  showScreen('complete');
}

/* ──────────────────────────────────────────
   STATS (localStorage)
   ────────────────────────────────────────── */
function getWeekKey() {
  const d    = new Date();
  const jan1 = new Date(d.getFullYear(), 0, 1);
  const week = Math.ceil(((d - jan1) / 86400000 + jan1.getDay() + 1) / 7);
  return `${d.getFullYear()}-W${week}`;
}

function resetWeeklyStatsIfNeeded() {
  try {
    const stored = localStorage.getItem('runfuerza_sem_date') || '';
    if (stored !== getWeekKey()) {
      localStorage.setItem('runfuerza_sem_count', '0');
      localStorage.setItem('runfuerza_sem_date', getWeekKey());
    }
  } catch { /* storage no disponible */ }
}

function incrementWeeklyCount() {
  try {
    const thisWeek = getWeekKey();
    const stored   = localStorage.getItem('runfuerza_sem_date') || '';
    let   count    = parseInt(localStorage.getItem('runfuerza_sem_count') || '0');
    if (stored !== thisWeek) count = 0;
    count++;
    localStorage.setItem('runfuerza_sem_count', String(count));
    localStorage.setItem('runfuerza_sem_date', thisWeek);
    return count;
  } catch { return 1; }
}

/* ──────────────────────────────────────────
   NUEVA SESIÓN — reset
   ────────────────────────────────────────── */
function volverDesdeSession() {
  clearInterval(stateMente.interval);
  clearInterval(stateMente.respiracionInterval);
  detenerVoz();
  stateMente.corriendo = false;
  stateMente.pausado   = false;
  const titulo = document.getElementById('sessionTitle').textContent;
  const esMente = ['🌬️', '🧘', '🌿', '🌙'].some(icon => titulo.includes(icon));
  showScreen(esMente ? 'mente' : 'home');
}

function nuevaSesion() {
  state.enfoque = null;
  state.tiempo  = null;
  state.ejerciciosActivos = [];
  state.timers  = {};

  stateMente.enfoque   = null;
  stateMente.tiempo    = null;
  stateMente.corriendo = false;
  stateMente.pausado   = false;
  clearInterval(stateMente.interval);
  clearInterval(stateMente.respiracionInterval);
  detenerVoz();

  document.querySelectorAll('.enfoque-card').forEach(c => c.classList.remove('selected'));
  document.querySelectorAll('.tiempo-pill').forEach(p => p.classList.remove('selected'));
  document.getElementById('btnGenerar').disabled = true;

  // Volver a la pantalla correcta según el módulo activo
  const titulo = document.getElementById('sessionTitle').textContent;
  const esMente = ['🌬️', '🧘', '🌿', '🌙'].some(icon => titulo.includes(icon));
  showScreen(esMente ? 'mente' : 'landing');
}

/* ──────────────────────────────────────────
   START
   ────────────────────────────────────────── */
async function activarWakeLock() {
  try {
    wakeLock = await navigator.wakeLock.request('screen');
  } catch (err) {
    // El dispositivo no soporta Wake Lock o está en modo ahorro
  }
}

function liberarWakeLock() {
  if (wakeLock) {
    wakeLock.release();
    wakeLock = null;
  }
}

/* ──────────────────────────────────────────
   AUDIO — Bips sintéticos
   ────────────────────────────────────────── */
const audioCtx = new (window.AudioContext || window.webkitAudioContext)();

function beep(frecuencia = 440, duracionMs = 120, volumen = 0.3) {
  try {
    const osc     = audioCtx.createOscillator();
    const gainNode = audioCtx.createGain();
    osc.connect(gainNode);
    gainNode.connect(audioCtx.destination);
    osc.frequency.value = frecuencia;
    osc.type = 'sine';
    gainNode.gain.setValueAtTime(volumen, audioCtx.currentTime);
    gainNode.gain.exponentialRampToValueAtTime(0.001, audioCtx.currentTime + duracionMs / 1000);
    osc.start(audioCtx.currentTime);
    osc.stop(audioCtx.currentTime + duracionMs / 1000);
  } catch(e) {}
}

function beepTransicion() { beep(660, 200, 0.4); }
function beepRitmo()      { beep(440, 80,  0.2); }
function beepFin()        {
  beep(523, 200, 0.4);
  setTimeout(() => beep(659, 200, 0.4), 220);
  setTimeout(() => beep(784, 300, 0.4), 440);
}

/* ──────────────────────────────────────────
   VOZ — Web Speech API
   ────────────────────────────────────────── */
let vozActiva = true;

function hablar(texto) {
  if (!vozActiva || !window.speechSynthesis) return;
  window.speechSynthesis.cancel();
  const u = new SpeechSynthesisUtterance(texto);
  u.lang  = 'es-ES';
  u.rate  = 0.88;
  u.pitch = 1.0;
  window.speechSynthesis.speak(u);
}

function detenerVoz() {
  if (window.speechSynthesis) window.speechSynthesis.cancel();
}

/* ──────────────────────────────────────────
   MENTE — State
   ────────────────────────────────────────── */
const stateMente = {
  enfoque:   null,
  tiempo:    null,
  practica:  null,
  pasoActual: 0,
  corriendo:  false,
  pausado:    false,
  interval:   null,
  segundosRestantes: 0,
  respiracionFase: 0,
  respiracionInterval: null,
};

function renderEnfoquesMente() {
  const grid = document.getElementById('enfoqueGridMente');
  if (!grid) return;
  grid.innerHTML = '';
  ENFOQUES_MENTE.forEach(e => {
    const div = document.createElement('div');
    div.className = 'enfoque-card';
    div.style.setProperty('--card-color', e.color);
    div.innerHTML = `
      <span class="enfoque-icon">${e.icon}</span>
      <div class="enfoque-name">${e.name}</div>
      <div class="enfoque-desc">${e.desc}</div>
    `;
    div.onclick = () => selectEnfoqueMente(e.id, div);
    grid.appendChild(div);
  });
}

function selectEnfoqueMente(id, el) {
  document.querySelectorAll('#enfoqueGridMente .enfoque-card').forEach(c => c.classList.remove('selected'));
  el.classList.add('selected');
  stateMente.enfoque = id;
  checkReadyMente();
}

function selectTiempoMente(el) {
  document.querySelectorAll('#mente .tiempo-pill').forEach(p => p.classList.remove('selected'));
  el.classList.add('selected');
  stateMente.tiempo = parseInt(el.dataset.min);
  checkReadyMente();
}

function checkReadyMente() {
  document.getElementById('btnGenerarMente').disabled = !(stateMente.enfoque && stateMente.tiempo);
}

function generarSesionMente() {
  const { enfoque, tiempo } = stateMente;
  const categoria = PRACTICAS_MENTE[enfoque];
  if (!categoria) return;
  const practica = categoria[tiempo];
  if (!practica)  return;

  stateMente.practica   = practica;
  stateMente.pasoActual = 0;
  stateMente.corriendo  = false;
  stateMente.pausado    = false;

  renderSesionMente(practica, enfoque);
  showScreen('session');
}

/* ──────────────────────────────────────────
   MENTE — Render sesión
   ────────────────────────────────────────── */
function renderSesionMente(practica, enfoque) {
  const enfoqueData = ENFOQUES_MENTE.find(e => e.id === enfoque);
  document.getElementById('sessionTitle').textContent = `${enfoqueData.icon} ${enfoqueData.name}`;
  document.getElementById('sessionInfo').textContent  = `${stateMente.tiempo} min · ${practica.ciclos}`;

  const body = document.getElementById('sessionBody');
  body.innerHTML = '';

  // Intro
  const intro = document.createElement('div');
  intro.className = 'practica-intro';
  intro.innerHTML = `<div class="practica-titulo">${practica.name}</div>${practica.intro}`;
  body.appendChild(intro);

  // Controles centrales
  const controles = document.createElement('div');
  controles.className = 'mente-controles';
  controles.innerHTML = `
    <div class="mente-paso-num" id="mentePasoNum">PASO 1 DE ${practica.pasos.length}</div>
    <div class="mente-texto" id="menteTexto">${practica.pasos[0].texto}</div>
    <div class="mente-timer-display" id="menteTimer">${formatTime(practica.pasos[0].duracion)}</div>
    <div class="mente-btns">
      <button class="btn-mente-voz" id="btnVoz" onclick="toggleVoz()">🔊 Voz</button>
      <button class="btn-mente-play" id="btnPlayMente" onclick="toggleSesionMente()">▶ COMENZAR</button>
      <button class="btn-mente-reset" onclick="resetSesionMente()">↺</button>
    </div>
  `;
  body.appendChild(controles);

  // Lista de pasos (referencia visual)
  const phaseHeader = document.createElement('div');
  phaseHeader.className = 'phase-header';
  phaseHeader.innerHTML = `<div class="phase-tag principal">📋 PASOS</div><div class="phase-line"></div>`;
  body.appendChild(phaseHeader);

  practica.pasos.forEach((paso, idx) => {
    const card = document.createElement('div');
    card.className = 'paso-card-mini';
    card.id = `paso-mini-${idx}`;
    card.style.animationDelay = `${idx * 0.04}s`;
    card.innerHTML = `
      <span class="paso-mini-num">${String(idx + 1).padStart(2, '0')}</span>
      <span class="paso-mini-texto">${paso.texto}</span>
      <span class="paso-mini-tiempo">${formatTime(paso.duracion)}</span>
    `;
    body.appendChild(card);
  });

  document.getElementById('btnDone').classList.remove('visible');
  actualizarPasoMini(0);
}

function actualizarPasoMini(idx) {
  document.querySelectorAll('.paso-card-mini').forEach((c, i) => {
    c.classList.remove('activo', 'completado');
    if (i < idx)  c.classList.add('completado');
    if (i === idx) c.classList.add('activo');
  });
}

/* ──────────────────────────────────────────
   MENTE — Flujo automático
   ────────────────────────────────────────── */
function toggleSesionMente() {
  if (!stateMente.corriendo) {
    iniciarSesionMente();
  } else if (stateMente.pausado) {
    reanudarSesionMente();
  } else {
    pausarSesionMente();
  }
}

function iniciarSesionMente() {
  // Desbloquear AudioContext (requiere gesto del usuario)
  if (audioCtx.state === 'suspended') audioCtx.resume();
  stateMente.corriendo = true;
  stateMente.pausado   = false;
  document.getElementById('btnPlayMente').textContent = '⏸ PAUSAR';
  ejecutarPasoMente(stateMente.pasoActual);
}

function pausarSesionMente() {
  stateMente.pausado = true;
  clearInterval(stateMente.interval);
  clearInterval(stateMente.respiracionInterval);
  detenerVoz();
  document.getElementById('btnPlayMente').textContent = '▶ CONTINUAR';
}

function reanudarSesionMente() {
  stateMente.pausado = false;
  document.getElementById('btnPlayMente').textContent = '⏸ PAUSAR';
  contarPasoMente();
}

function resetSesionMente() {
  clearInterval(stateMente.interval);
  clearInterval(stateMente.respiracionInterval);
  detenerVoz();
  stateMente.corriendo  = false;
  stateMente.pausado    = false;
  stateMente.pasoActual = 0;
  const practica = stateMente.practica;
  document.getElementById('mentePasoNum').textContent  = `PASO 1 DE ${practica.pasos.length}`;
  document.getElementById('menteTexto').textContent    = practica.pasos[0].texto;
  document.getElementById('menteTimer').textContent    = formatTime(practica.pasos[0].duracion);
  document.getElementById('btnPlayMente').textContent  = '▶ COMENZAR';
  actualizarPasoMini(0);
}

function ejecutarPasoMente(idx) {
  const practica = stateMente.practica;
  if (idx >= practica.pasos.length) {
    finSesionMente();
    return;
  }

  const paso = practica.pasos[idx];
  stateMente.pasoActual        = idx;
  stateMente.segundosRestantes = paso.duracion;

  // Actualizar UI
  document.getElementById('mentePasoNum').textContent = `PASO ${idx + 1} DE ${practica.pasos.length}`;
  document.getElementById('menteTexto').textContent   = paso.texto;
  document.getElementById('menteTimer').textContent   = formatTime(paso.duracion);
  actualizarPasoMini(idx);

  // Scroll al bloque de controles
  document.getElementById('menteTimer').scrollIntoView({ behavior: 'smooth', block: 'center' });

  clearInterval(stateMente.respiracionInterval);

  const esRespiracion = stateMente.enfoque === 'respiracion';
  const esFaseCorta   = paso.duracion <= 10; // fase individual de respiración

  if (esRespiracion && esFaseCorta) {
    // Modo respiración: voz corta + bips de ritmo
    const accion = extraerAccion(paso.texto);
    hablar(accion);
    // Bip inmediato al inicio de la fase
    setTimeout(() => beepRitmo(), 600);
    // Bips cada segundo para mantener el ritmo visual, bip especial al cambiar
    let tick = 0;
    stateMente.respiracionInterval = setInterval(() => {
      tick++;
      // Bip suave cada segundo
      if (tick % paso.duracion === 0) {
        beepTransicion(); // bip de cambio de fase
      }
    }, 1000);
    contarPasoMente();
  } else {
    // Modo normal: leer texto completo con delay para que speechSynthesis esté listo
    setTimeout(() => hablar(paso.texto), idx === 0 ? 600 : 200);
    contarPasoMente();
  }
}

function extraerAccion(texto) {
  // Extrae solo la palabra clave de acción para la voz en respiración
  const t = texto.toLowerCase();
  if (t.includes('inhala'))  return 'Inhala';
  if (t.includes('sostén') || t.includes('sosten')) return 'Sostén';
  if (t.includes('exhala'))  return 'Exhala';
  if (t.includes('suelta'))  return 'Suelta';
  if (t.includes('repite'))  return 'Repite';
  return texto.split('.')[0]; // fallback: primera frase
}

function contarPasoMente() {
  clearInterval(stateMente.interval);
  stateMente.interval = setInterval(() => {
    stateMente.segundosRestantes--;
    document.getElementById('menteTimer').textContent = formatTime(stateMente.segundosRestantes);

    if (stateMente.segundosRestantes <= 0) {
      clearInterval(stateMente.interval);
      clearInterval(stateMente.respiracionInterval);
      beepTransicion();
      setTimeout(() => {
        ejecutarPasoMente(stateMente.pasoActual + 1);
      }, 800);
    }
  }, 1000);
}

function finSesionMente() {
  stateMente.corriendo = false;
  beepFin();
  hablar('Práctica completada. Bien hecho.');
  document.getElementById('btnPlayMente').textContent = '✓ COMPLETADO';
  document.getElementById('menteTexto').textContent   = '🎉 Práctica completada. Tómate un momento antes de seguir.';
  document.getElementById('menteTimer').textContent   = '00:00';
  document.querySelectorAll('.paso-card-mini').forEach(c => {
    c.classList.remove('activo');
    c.classList.add('completado');
  });
}

/* ──────────────────────────────────────────
   RESPIRACIÓN — Bips por fase
   ────────────────────────────────────────── */
function iniciarBipsRespiracion(paso) {
  // Ya manejado dentro de ejecutarPasoMente para respiración
  // Esta función queda como placeholder
}

function toggleVoz() {
  vozActiva = !vozActiva;
  const btn = document.getElementById('btnVoz');
  btn.textContent = vozActiva ? '🔊 Voz' : '🔇 Voz';
  if (!vozActiva) detenerVoz();
}

function formatTime(secs) {
  const m = Math.floor(Math.abs(secs) / 60);
  const s = Math.abs(secs) % 60;
  return `${String(m).padStart(2, '0')}:${String(s).padStart(2, '0')}`;
}

init();
renderEnfoquesMente();
