/* SYNTH_OS // PEC 6
 * Interactive fictional typing trainer.
 * All services, currencies, records and operations are fictional.
 */
document.addEventListener('DOMContentLoaded', () => {
  const qs = (selector, root = document) => root.querySelector(selector);
  const qsa = (selector, root = document) => [...root.querySelectorAll(selector)];
  const storage = {
    get(key, fallback) {
      try { const value = localStorage.getItem(key); return value === null ? fallback : JSON.parse(value); }
      catch { return fallback; }
    },
    set(key, value) { try { localStorage.setItem(key, JSON.stringify(value)); } catch {} }
  };

  // ---------- Local training records ----------
  const readTrainingStats = () => storage.get('synthOsTrainingStats', { runs: 0, totalWpm: 0, bestWpm: 0, bestAccuracy: 0, totalScore: 0 });
  const writeTrainingResult = (metrics, runScore = 0) => {
    const stats = readTrainingStats();
    stats.runs += 1;
    stats.totalWpm += Number(metrics.wpm) || 0;
    stats.bestWpm = Math.max(stats.bestWpm, Number(metrics.wpm) || 0);
    stats.bestAccuracy = Math.max(stats.bestAccuracy, Number(metrics.accuracy) || 0);
    stats.totalScore += Number(runScore) || 0;
    storage.set('synthOsTrainingStats', stats);
    return stats;
  };
  const renderDashboardStats = () => {
    const stats = readTrainingStats();
    const avg = stats.runs ? Math.round(stats.totalWpm / stats.runs) : 0;
    const set = (id, value) => { const el = qs(id); if (el) el.textContent = value; };
    set('#dash-best-wpm', String(stats.bestWpm).padStart(3, '0'));
    set('#dash-avg-wpm', String(avg).padStart(3, '0'));
    set('#dash-best-accuracy', `${stats.bestAccuracy || 100}%`);
    set('#dash-runs', String(stats.runs).padStart(2, '0'));
  };
  const renderDashboardEffects = () => {
    const container = qs('#dashboard-effects');
    if (!container) return;
    const boosts = storage.get('synthOsBoosts', {});
    const labels = {
      NEURAL_SPEED_BOOST: ['SPEED BOOST', '+20% DISPLAYED WPM'],
      STREAK_SHIELD: ['STREAK SHIELD', '1 COMBO SAVE'],
      SCORE_OVERCLOCK: ['SCORE OVERCLOCK', '×1.50 SCORE'],
      PRECISION_CALIBRATION: ['PRECISION MAP', 'ERROR DETAILS ON']
    };
    const active = Object.keys(boosts).filter(key => labels[key]);
    container.innerHTML = active.length
      ? active.map(key => `<div class="dashboard-effect"><b>${labels[key][0]}</b><span>${labels[key][1]}</span></div>`).join('')
      : '<span class="effect-empty">NO ACTIVE MODULES // STANDARD TRAINING</span>';
  };
  renderDashboardStats();
  renderDashboardEffects();

  // ---------- Navigation ----------
  const toggle = qs('.mobile-nav-toggle');
  const menu = qs('#mobile-menu');
  if (toggle && menu) {
    const closeMenu = () => {
      menu.classList.remove('is-open');
      toggle.setAttribute('aria-expanded', 'false');
      toggle.textContent = 'MENU';
    };
    toggle.addEventListener('click', () => {
      const open = !menu.classList.contains('is-open');
      menu.classList.toggle('is-open', open);
      toggle.setAttribute('aria-expanded', String(open));
      toggle.textContent = open ? 'CLOSE' : 'MENU';
    });
    menu.addEventListener('click', event => { if (event.target.closest('a')) closeMenu(); });
    document.addEventListener('click', event => {
      if (menu.classList.contains('is-open') && !menu.contains(event.target) && event.target !== toggle) closeMenu();
    });
  }

  // ---------- Entrance animation ----------
  const revealItems = qsa('.reveal');
  if ('IntersectionObserver' in window) {
    const observer = new IntersectionObserver(entries => {
      entries.forEach(entry => {
        if (entry.isIntersecting) { entry.target.classList.add('is-visible'); observer.unobserve(entry.target); }
      });
    }, { threshold: 0.08 });
    revealItems.forEach(item => observer.observe(item));
  } else revealItems.forEach(item => item.classList.add('is-visible'));

  // ---------- Fictional Operations ----------
  const operationConfigs = {
    VOID_WALKER: {
      code: 'OP-01 // SPEED', goal: 'CLEAR WAVES', duration: 60, mechanic: 'WAVE_RUN',
      texts: [
        'Speed is a rhythm you can train one clean keystroke at a time.',
        'Fast hands stay useful when every movement remains precise and deliberate.',
        'Push the signal forward and keep the rhythm alive.'
      ]
    },
    NEON_SILENCE: {
      code: 'OP-02 // PRECISION', goal: '3 STRIKES', duration: 90, mechanic: 'THREE_STRIKES',
      texts: [
        'Precision keeps the signal stable when every character has to land exactly where it belongs.',
        'A quiet rhythm creates a clean signal. Accuracy comes before acceleration.',
        'One wrong key is a warning. Three warnings terminate the protocol.'
      ]
    },
    GHOST_SHELL: {
      code: 'OP-03 // ENDURANCE', goal: '3 LIVES', duration: 180, mechanic: 'LIVES',
      texts: [
        'Consistency is built through repetition, patience and a steady typing rhythm.',
        'Long sessions test focus. Keep your hands relaxed and protect your rhythm.',
        'The shell absorbs pressure. Maintain accuracy while the sequence moves forward.'
      ]
    }
  };

  // ---------- Typing trainer ----------
  const input = qs('#typing-input');
  const challengeEl = qs('#challenge-text');
  if (input && challengeEl) {
    const feedback = qs('#typing-feedback');
    const precisionAlert = qs('#precision-alert');
    const timerEl = qs('#timer');
    const stateEl = qs('#run-state');
    const wpmEl = qs('#wpm');
    const accuracyEl = qs('#accuracy');
    const errorsEl = qs('#errors');
    const streakEl = qs('#streak');
    const scoreEl = qs('#score');
    const bestEl = qs('#best-wpm');
    const progressBar = qs('#challenge-progress-bar');
    const newChallenge = qs('#new-challenge');
    const modal = qs('#result-modal');
    const closeModal = qs('#close-result');
    const nextRun = qs('#next-run');
    const resultTitle = qs('#result-title');
    const resultWpm = qs('#result-wpm');
    const resultAccuracy = qs('#result-accuracy');
    const resultErrors = qs('#result-errors');
    const resultScore = qs('#result-score');
    const resultTime = qs('#result-time');
    const resultMessage = qs('#result-message');
    const keyEls = qsa('#keyboard .key-row span');
    const operationLabel = qs('#selected-operation');
    const livesEl = qs('#lives');
    const strikesEl = qs('#strikes');

    const defaultTexts = [
      'Precision turns repetition into control.',
      'Fast hands need a calm and deliberate rhythm.',
      'Every keystroke becomes part of the signal.',
      'Accuracy keeps the neural link stable under pressure.',
      'A quiet keyboard can carry a very loud ambition.',
      'Speed is useful only when your accuracy can follow.',
      'Train the rhythm first and the numbers will follow.',
      'The next run is always one clean keystroke away.'
    ];

    const requestedOperation = new URLSearchParams(window.location.search).get('operation');
    const operation = operationConfigs[requestedOperation] || null;
    const texts = operation ? operation.texts : defaultTexts;
    const duration = operation ? operation.duration : 60;
    const boosts = storage.get('synthOsBoosts', {});
    const speedBoost = Boolean(boosts.NEURAL_SPEED_BOOST);
    const streakShield = Boolean(boosts.STREAK_SHIELD);
    let streakShieldUsed = false;
    const scoreOverclock = Boolean(boosts.SCORE_OVERCLOCK);
    const precisionCalibration = Boolean(boosts.PRECISION_CALIBRATION);

    const boostEffects = {
      speed: speedBoost ? 'WPM OUTPUT +20%' : 'STANDARD WPM',
      shield: streakShield ? 'NEXT COMBO BREAK PROTECTED' : 'ERRORS BREAK COMBO',
      score: scoreOverclock ? 'SCORE OUTPUT ×1.50' : 'STANDARD SCORE',
      precision: precisionCalibration ? 'LIVE ERROR MAP ONLINE' : 'STANDARD FEEDBACK'
    };
    const updateBoostPanel = () => {
      const panel = qs('#boost-effect-panel');
      if (!panel) return;
      const items = [boostEffects.speed, boostEffects.shield, boostEffects.score, boostEffects.precision];
      panel.innerHTML = items.map((item, index) => `<span class=\"boost-effect ${index === 0 && speedBoost || index === 1 && streakShield || index === 2 && scoreOverclock || index === 3 && precisionCalibration ? 'is-on' : ''}\">${item}</span>`).join('');
    };
    updateBoostPanel();

    let target = '';
    let startedAt = 0;
    let timerId = null;
    let finished = false;
    let challengeIndex = -1;
    let streak = 0;
    let totalMistakes = 0;
    let score = 0;
    let strikes = 0;
    let lives = 3;
    let nextLifeAt = 5;
    let waves = 0;
    let lastErrorIndex = -1;
    let best = Number(localStorage.getItem('synthOsBestWpm') || 0);

    if (bestEl) bestEl.textContent = String(best).padStart(3, '0');

    const setFeedback = text => { if (feedback) feedback.textContent = text; };
    const setState = text => { if (stateEl) stateEl.textContent = text; };

    const chooseText = () => {
      let next = Math.floor(Math.random() * texts.length);
      if (texts.length > 1 && next === challengeIndex) next = (next + 1) % texts.length;
      challengeIndex = next;
      target = texts[next];
      input.value = '';
      challengeEl.innerHTML = [...target].map((char, index) => `<span data-index="${index}">${char === ' ' ? '&nbsp;' : char}</span>`).join('');
      challengeEl.style.setProperty('--challenge-length', target.length);
      lastErrorIndex = -1;
      renderChallenge();
      renderMetrics();
    };

    const resetStats = () => {
      if (timerId) clearInterval(timerId);
      timerId = null; startedAt = 0; finished = false; streak = 0; totalMistakes = 0; score = 0;
      strikes = 0; lives = 3; nextLifeAt = 5; waves = 0; lastErrorIndex = -1; streakShieldUsed = false;
      input.disabled = false;
      input.placeholder = 'TYPE THE SIGNAL...';
      if (timerEl) timerEl.textContent = duration.toFixed(1);
      setState('READY');
      if (wpmEl) wpmEl.textContent = '000';
      if (accuracyEl) accuracyEl.textContent = '100%';
      if (errorsEl) errorsEl.textContent = '0';
      if (scoreEl) scoreEl.textContent = '000';
      if (streakEl) streakEl.textContent = '00';
      if (livesEl) livesEl.textContent = '3';
      if (strikesEl) strikesEl.textContent = '0 / 3';
      if (progressBar) progressBar.style.width = '0%';
      if (precisionAlert) precisionAlert.textContent = precisionCalibration ? 'PRECISION MAP ONLINE // ERROR POSITIONS WILL APPEAR HERE' : '';
      setFeedback(operation ? `${operation.code} // ${operation.goal} // PRESS ENTER TO SUBMIT A COMPLETED SEQUENCE` : 'TYPE THE TEXT ABOVE. TIMER STARTS WITH YOUR FIRST KEY. PRESS ENTER WHEN COMPLETE.');
      chooseText();
    };

    const metrics = () => {
      const typed = input.value;
      let correct = 0;
      [...typed].forEach((char, index) => { if (char === target[index]) correct += 1; });
      const elapsed = startedAt ? Math.max((performance.now() - startedAt) / 1000, 0.001) : 0;
      const rawWpm = elapsed ? Math.round((correct / 5) / (elapsed / 60)) : 0;
      const wpm = speedBoost ? Math.round(rawWpm * 1.2) : rawWpm;
      const accuracy = typed.length ? Math.max(0, Math.round((correct / typed.length) * 100)) : 100;
      return { typed, correct, elapsed, rawWpm, wpm, accuracy };
    };

    function renderChallenge() {
      const typed = input.value;
      qsa('span', challengeEl).forEach((span, index) => {
        span.className = '';
        if (index < typed.length) span.classList.add(typed[index] === target[index] ? 'done' : 'error');
        else if (index === typed.length && !finished) span.classList.add('current');
        if (precisionCalibration && index === lastErrorIndex) span.classList.add('error-pulse');
      });
    }

    const renderMetrics = () => {
      const m = metrics();
      if (wpmEl) wpmEl.textContent = String(Math.min(m.wpm, 999)).padStart(3, '0');
      if (accuracyEl) accuracyEl.textContent = `${m.accuracy}%`;
      if (errorsEl) errorsEl.textContent = String(totalMistakes);
      if (scoreEl) scoreEl.textContent = String(Math.min(Math.round(score), 999999)).padStart(3, '0');
      if (streakEl) streakEl.textContent = String(streak).padStart(2, '0');
      if (livesEl) livesEl.textContent = String(lives);
      if (strikesEl) strikesEl.textContent = `${strikes} / 3`;
      if (progressBar) progressBar.style.width = `${Math.min((m.typed.length / target.length) * 100, 100)}%`;
      return m;
    };

    const startTimer = () => {
      if (startedAt || finished) return;
      startedAt = performance.now();
      setState('RUNNING');
      qs('.state-dot')?.classList.add('running');
      timerId = setInterval(() => {
        const remaining = Math.max(duration - ((performance.now() - startedAt) / 1000), 0);
        if (timerEl) timerEl.textContent = remaining.toFixed(1);
        renderMetrics();
        if (remaining <= 0) finishRun('TIME_LIMIT');
      }, 100);
    };

    const openResult = m => {
      if (!modal) return;
      if (resultTitle) resultTitle.textContent = m.success ? 'SEQUENCE CLEARED.' : (m.reason === 'TIME_LIMIT' ? 'TIME LIMIT.' : 'SIGNAL LOST.');
      if (resultWpm) resultWpm.textContent = String(Math.min(m.wpm, 999)).padStart(3, '0');
      if (resultAccuracy) resultAccuracy.textContent = `${m.accuracy}%`;
      if (resultErrors) resultErrors.textContent = String(totalMistakes);
      if (resultScore) resultScore.textContent = String(Math.min(Math.round(score), 999999)).padStart(3, '0');
      if (resultTime) resultTime.textContent = `${m.elapsed.toFixed(1)}S`;
      if (resultMessage) {
        const detail = operation?.mechanic === 'WAVE_RUN' ? `${waves} WAVE${waves === 1 ? '' : 'S'} CLEARED` :
          operation?.mechanic === 'THREE_STRIKES' ? `${strikes}/3 STRIKES USED` :
          operation?.mechanic === 'LIVES' ? `${lives}/3 LIVES REMAINING` : 'STANDARD TRAINING RUN';
        resultMessage.textContent = `${detail} // ${m.reason === 'TIME_LIMIT' ? 'TIME LIMIT REACHED' : scoreOverclock ? 'SCORE OVERCLOCK ACTIVE' : 'STANDARD SCORING'}`;
      }
      modal.classList.add('is-open');
      modal.setAttribute('aria-hidden', 'false');
    };

    const finishRun = reason => {
      if (finished) return;
      finished = true;
      if (timerId) clearInterval(timerId);
      timerId = null;
      const m = metrics();
      m.success = reason === 'COMPLETE';
      m.reason = reason;
      input.disabled = true;
      setState(reason === 'TIME_LIMIT' ? 'TIMEOUT' : reason === 'FAILED' ? 'FAILED' : 'CLEARED');
      if (timerEl && reason === 'TIME_LIMIT') timerEl.textContent = '0.0';
      if (m.wpm > best) { best = m.wpm; localStorage.setItem('synthOsBestWpm', String(best)); if (bestEl) bestEl.textContent = String(best).padStart(3, '0'); }
      writeTrainingResult(m, score);
      renderDashboardStats();
      openResult(m);
    };

    const closeResult = () => {
      modal?.classList.remove('is-open');
      modal?.setAttribute('aria-hidden', 'true');
    };

    const submitSequence = () => {
      if (finished) return;
      const m = metrics();
      if (input.value !== target) {
        setFeedback(`SEQUENCE INCOMPLETE // ${Math.max(target.length - input.value.length, 0)} CHARACTERS REMAIN`);
        return;
      }

      if (operation?.mechanic === 'WAVE_RUN' || operation?.mechanic === 'LIVES') {
        waves += 1;
        score += scoreOverclock ? 150 : 100;
        setFeedback(operation.mechanic === 'WAVE_RUN' ? `WAVE ${waves} CLEARED // NEXT SIGNAL LOADING...` : `SEQUENCE ${waves} CLEARED // KEEP THE SHELL STABLE...`);
        chooseText();
        return;
      }
      finishRun('COMPLETE');
    };

    input.addEventListener('keydown', event => {
      const key = event.key;
      if (key === 'Enter') { event.preventDefault(); submitSequence(); return; }
      if (key === 'Backspace') return;
      if (key.length !== 1) return;
      if (input.value.length >= target.length) {
        event.preventDefault();
        setFeedback('SEQUENCE READY // PRESS ENTER TO SUBMIT');
        return;
      }

      startTimer();
      const expected = target[input.value.length];
      let visualKey = key.toUpperCase();
      if (visualKey === ' ') visualKey = 'SPACE';
      const keyEl = keyEls.find(el => el.textContent === visualKey);
      if (keyEl) { keyEl.classList.add('hit'); setTimeout(() => keyEl.classList.remove('hit'), 100); }

      if (operation?.mechanic === 'THREE_STRIKES' && key !== expected) {
        event.preventDefault();
        strikes += 1;
        totalMistakes += 1;
        lastErrorIndex = input.value.length;
        if (precisionAlert) precisionAlert.textContent = `PRECISION STRIKE ${strikes}/3 // EXPECTED “${expected || 'END'}”`;
        setFeedback(`ERROR REJECTED // STRIKE ${strikes}/3`);
        renderChallenge();
        renderMetrics();
        if (strikes >= 3) finishRun('FAILED');
      }
    });

    input.addEventListener('input', () => {
      if (finished) return;
      const typed = input.value;
      const newestIndex = typed.length - 1;
      if (newestIndex >= 0 && typed[newestIndex] !== target[newestIndex]) {
        totalMistakes += 1;
        lastErrorIndex = newestIndex;
        if (streakShield && !streakShieldUsed) {
          streakShieldUsed = true;
          setFeedback('STREAK SHIELD CONSUMED // COMBO PRESERVED');
        } else if (!streakShield) {
          streak = 0;
        } else {
          streak = 0;
        }
        if (precisionCalibration && precisionAlert) precisionAlert.textContent = `ERROR MAP // CHARACTER ${newestIndex + 1} // EXPECTED “${target[newestIndex] || 'END'}”`;
        if (operation?.mechanic === 'LIVES' && totalMistakes >= nextLifeAt) {
          lives -= 1;
          nextLifeAt += 5;
          setFeedback(lives > 0 ? `SHELL HIT // ${lives} LIVES REMAIN` : 'SHELL BREACHED // RUN TERMINATED');
          if (lives <= 0) { renderMetrics(); finishRun('FAILED'); return; }
        }
      } else if (newestIndex >= 0) {
        streak += 1;
        const basePoints = 10 + Math.min(streak, 20);
        score += scoreOverclock ? Math.round(basePoints * 1.5) : basePoints;
      }
      renderMetrics();
      renderChallenge();
    });

    newChallenge?.addEventListener('click', resetStats);
    nextRun?.addEventListener('click', () => { closeResult(); resetStats(); });
    closeModal?.addEventListener('click', () => { closeResult(); input.focus(); });
    modal?.addEventListener('click', event => { if (event.target === modal) { closeResult(); input.focus(); } });
    document.addEventListener('keydown', event => { if (event.key === 'Escape' && modal?.classList.contains('is-open')) { closeResult(); input.focus(); } });

    const modeEl = qs('#typing-mode');
    const goalEl = qs('#typing-goal');
    const durationEl = qs('#typing-duration');
    if (operation) {
      if (modeEl) modeEl.textContent = operation.code;
      if (goalEl) goalEl.textContent = operation.goal;
      if (durationEl) durationEl.textContent = `${operation.duration} SEC`;
      if (operationLabel) operationLabel.textContent = `${operation.code} // ${operation.goal}`;
      document.body.classList.add('operation-selected');
      requestAnimationFrame(() => qs('#typing-zone')?.scrollIntoView({ behavior: 'smooth', block: 'start' }));
    } else if (operationLabel) operationLabel.textContent = 'FREE TRAINING // STANDARD RUN';

    resetStats();
    qs('.typing-shell')?.addEventListener('click', event => {
      if (!finished && event.target !== newChallenge) input.focus();
    });

    const activeNames = Object.keys(boosts);
    const boostBanner = qs('#active-boost');
    if (boostBanner && activeNames.length) {
      const names = activeNames.map(key => ({
        NEURAL_SPEED_BOOST: 'SPEED +20% WPM',
        STREAK_SHIELD: 'SHIELD: 1 SAVE',
        SCORE_OVERCLOCK: 'SCORE ×1.50',
        PRECISION_CALIBRATION: 'ERROR MAP ON'
      }[key] || key));
      boostBanner.innerHTML = `<span>ACTIVE EFFECTS</span>${names.map(name => `<b>${name}</b>`).join('')}`;
      boostBanner.classList.add('is-active');
    }
  }

  qs('#reset-stats')?.addEventListener('click', () => {
    storage.set('synthOsTrainingStats', { runs: 0, totalWpm: 0, bestWpm: 0, bestAccuracy: 0, totalScore: 0 });
    localStorage.removeItem('synthOsBestWpm');
    renderDashboardStats();
    const feedback = qs('#typing-feedback');
    if (feedback) feedback.textContent = 'LOCAL RECORD RESET // READY FOR A NEW RUN.';
  });

  // ---------- Fictional Services ----------
  const serviceCatalog = {
    NEURAL_SPEED_BOOST: { price: 1200, name: 'NEURAL SPEED BOOST', effect: 'DISPLAYED WPM ×1.20' },
    STREAK_SHIELD: { price: 800, name: 'STREAK SHIELD', effect: 'ERRORS PRESERVE COMBO' },
    SCORE_OVERCLOCK: { price: 1500, name: 'SCORE OVERCLOCK', effect: 'SCORE ×1.50' },
    PRECISION_CALIBRATION: { price: 950, name: 'PRECISION CALIBRATION', effect: 'LIVE ERROR MAP' }
  };
  let pxBalance = Number(localStorage.getItem('synthOsPx') || 5000);
  let ownedBoosts = storage.get('synthOsBoosts', {});
  const balanceEl = qs('#px-balance');
  const consoleStatus = qs('#service-console-status');
  const resetLoadout = qs('#reset-loadout');

  const renderServices = () => {
    if (balanceEl) balanceEl.textContent = pxBalance.toLocaleString('en-US');
    qsa('.service-btn').forEach(button => {
      const key = button.dataset.service;
      const service = serviceCatalog[key];
      if (!service) return;
      const owned = Boolean(ownedBoosts[key]);
      button.disabled = owned;
      button.textContent = owned ? 'BOOST ACTIVE ✓' : `BUY BOOST // ${service.price.toLocaleString('en-US')} PX`;
      button.closest('.service-card')?.classList.toggle('service-active', owned);
      const status = button.closest('.service-card')?.querySelector('.boost-status');
      if (status) status.textContent = owned ? `ACTIVE MODULE // ${service.effect}` : `OFFLINE // ${service.effect}`;
    });
  };

  qsa('.service-btn').forEach(button => button.addEventListener('click', () => {
    const key = button.dataset.service;
    const service = serviceCatalog[key];
    if (!service || ownedBoosts[key]) return;
    if (pxBalance < service.price) {
      if (consoleStatus) consoleStatus.textContent = `TRANSACTION BLOCKED // NEED ${service.price.toLocaleString('en-US')} PX`;
      consoleStatus?.classList.add('service-error');
      return;
    }
    pxBalance -= service.price;
    ownedBoosts[key] = { purchasedAt: Date.now(), effect: service.effect };
    localStorage.setItem('synthOsPx', String(pxBalance));
    storage.set('synthOsBoosts', ownedBoosts);
    consoleStatus?.classList.remove('service-error');
    if (consoleStatus) consoleStatus.textContent = `${service.name} UNLOCKED ✓ // ${service.effect} // ${pxBalance.toLocaleString('en-US')} PX REMAINING`;
    renderServices();
  }));

  resetLoadout?.addEventListener('click', () => {
    pxBalance = 5000;
    ownedBoosts = {};
    localStorage.removeItem('synthOsBoosts');
    localStorage.setItem('synthOsPx', '5000');
    if (consoleStatus) consoleStatus.textContent = 'LOADOUT RESET // 5,000 PX RESTORED';
    renderServices();
  });
  renderServices();

  // ---------- Fictional contact form ----------
  const form = qs('#contact-form');
  if (form) {
    const pilot = qs('#pilot');
    const message = qs('#message');
    const submit = qs('button[type="submit"]', form);
    const feedbackBox = qs('#form-feedback');
    form.addEventListener('submit', event => {
      event.preventDefault();
      feedbackBox.innerHTML = '';
      [pilot, message].forEach(field => field?.removeAttribute('aria-invalid'));
      let valid = true;
      const error = text => { const p = document.createElement('p'); p.className = 'form-error'; p.textContent = `[ERROR]: ${text}`; feedbackBox.appendChild(p); };
      if (!pilot.value.trim()) { pilot.setAttribute('aria-invalid', 'true'); error('PILOT_ID_REQUIRED'); valid = false; }
      if (!message.value.trim()) { message.setAttribute('aria-invalid', 'true'); error('MESSAGE_REQUIRED'); valid = false; }
      if (!valid) return;
      submit.disabled = true;
      submit.textContent = 'TRANSMITTING...';
      setTimeout(() => {
        submit.textContent = 'SIGNAL_SENT!';
        feedbackBox.innerHTML = '<p class="form-success">[SYSTEM]: SIGNAL RECEIVED // SIMULATION COMPLETE</p>';
        setTimeout(() => { form.reset(); submit.disabled = false; submit.textContent = 'SEND_SIGNAL ↗'; }, 1700);
      }, 900);
    });
  }
});
