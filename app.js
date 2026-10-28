/**
 * SMART GROCERY & BUDGET SAFETY TRACKER
 * Progressive Web App Engine for Mobile Shopping Companion
 */

// ===================================================================
// CONSTANTS & SEED DATA (Katalog Acuan Belanja Bulanan Anak Rantau)
// ===================================================================

const STORAGE_KEYS = {
  CART: 'smart_grocery_cart_v1',
  BENCHMARKS: 'smart_grocery_benchmarks_v1',
  HISTORY: 'smart_grocery_history_v1',
  BUDGET: 'smart_grocery_budget_v1',
  STORE: 'smart_grocery_store_v1',
  CUSTOM_STORE: 'smart_grocery_custom_store_v1',
  DATE: 'smart_grocery_date_v1',
  SOUND: 'smart_grocery_sound_v1'
};

const CATEGORIES = {
  VEGETABLE_FRUIT: { id: 'VEGETABLE_FRUIT', label: 'Sayur & Buah', icon: 'Ã°Å¸Â¥Â¬', color: '#4ADE80' },
  PROTEIN: { id: 'PROTEIN', label: 'Daging & Telur', icon: 'Ã°Å¸Â¥Â©', color: '#F87171' },
  SPICE_PANTRY: { id: 'SPICE_PANTRY', label: 'Bumbu & Pokok', icon: 'Ã°Å¸Â§â€š', color: '#FBBF24' },
  DAIRY: { id: 'DAIRY', label: 'Susu & Olahan', icon: 'Ã°Å¸Â¥â€º', color: '#38BDF8' },
  SNACK_DRINK: { id: 'SNACK_DRINK', label: 'Snack & Minuman', icon: 'Ã°Å¸ÂÂª', color: '#C084FC' },
  HOUSEHOLD: { id: 'HOUSEHOLD', label: 'Rumah & Mandi', icon: 'Ã°Å¸Â§Â¼', color: '#7DD3FC' },
  OTHER: { id: 'OTHER', label: 'Lainnya', icon: 'Ã°Å¸â€œÂ¦', color: '#CBD5E1' }
};

// Seed Realistic Benchmark Prices (Harga Patokan Resmi Bulan Lalu - 26 September 2026 di Lotte Mart Puri Indah)
const DEFAULT_BENCHMARKS = [
  { name: 'Beras 5kg', aliases: ['beras', 'beras rojolele', 'beras 5kg', 'beras ramos', 'beras ramos super 5kg', 'beras rojolele 5kg'], category: 'SPICE_PANTRY', unit: 'karung/5kg', price: 68000, lastUpdated: '2026-09-26', store: 'Lotte Mart Grocery - Puri Indah' },
  { name: 'Telur Ayam 1kg', aliases: ['telur', 'telur ayam', 'telur 1kg', 'telur ayam negeri'], category: 'PROTEIN', unit: 'kg', price: 32000, lastUpdated: '2026-09-26', store: 'Lotte Mart Grocery - Puri Indah' },
  { name: 'Garam 500g', aliases: ['garam', 'garam dapur', 'garam 500g'], category: 'SPICE_PANTRY', unit: 'bks', price: 5000, lastUpdated: '2026-09-26', store: 'Lotte Mart Grocery - Puri Indah' },
  { name: 'Minyak Goreng Sawit 2L', aliases: ['minyak', 'minyak goreng', 'minyak goreng sawit 2l', 'minyak 2l', 'minyak goreng 2l'], category: 'SPICE_PANTRY', unit: 'pouch', price: 43000, lastUpdated: '2026-09-26', store: 'Lotte Mart Grocery - Puri Indah' },
  { name: 'Sabun Cuci / Mandi', aliases: ['sabun', 'sabun cuci', 'sabun mandi', 'sabun cuci piring'], category: 'HOUSEHOLD', unit: 'pcs', price: 20000, lastUpdated: '2026-09-26', store: 'Lotte Mart Grocery - Puri Indah' },
  { name: 'Wajan Penggorengan', aliases: ['wajan', 'wajan teflon', 'wajan penggorengan', 'wajan anti lengket'], category: 'HOUSEHOLD', unit: 'pcs', price: 100000, lastUpdated: '2026-09-26', store: 'Lotte Mart Grocery - Puri Indah' },
  { name: 'Dada Ayam Fillet', aliases: ['dada ayam', 'ayam fillet'], category: 'PROTEIN', unit: 'kg', price: 47500, lastUpdated: '2026-09-26', store: 'Lotte Mart Grocery - Puri Indah' },
  { name: 'Indomie Goreng Spesial', aliases: ['indomie', 'mie instan'], category: 'SPICE_PANTRY', unit: 'bks', price: 3100, lastUpdated: '2026-09-26', store: 'Lotte Mart Grocery - Puri Indah' },
  { name: 'Susu UHT Full Cream 1L', aliases: ['susu', 'susu uht', 'susu full cream'], category: 'DAIRY', unit: 'liter', price: 18500, lastUpdated: '2026-09-26', store: 'Lotte Mart Grocery - Puri Indah' },
  { name: 'Bawang Merah', aliases: ['bawang merah'], category: 'SPICE_PANTRY', unit: 'g', price: 12000, lastUpdated: '2026-09-26', store: 'Lotte Mart Grocery - Puri Indah' },
  { name: 'Bawang Putih Kating', aliases: ['bawang putih'], category: 'SPICE_PANTRY', unit: 'g', price: 11000, lastUpdated: '2026-09-26', store: 'Lotte Mart Grocery - Puri Indah' },
  { name: 'Shampoo Anti Dandruff 160ml', aliases: ['shampoo', 'sampo'], category: 'HOUSEHOLD', unit: 'botol', price: 24000, lastUpdated: '2026-09-26', store: 'Lotte Mart Grocery - Puri Indah' },
  { name: 'Pasta Gigi Fresh 150g', aliases: ['pasta gigi', 'odol'], category: 'HOUSEHOLD', unit: 'pcs', price: 15500, lastUpdated: '2026-09-26', store: 'Lotte Mart Grocery - Puri Indah' }
];

// Seed Previous Shopping Trips (History)
const DEFAULT_HISTORY = [
  {
    id: 'trip-hist-2026-09',
    date: '2026-09-26T14:30:00.000Z',
    dateFormatted: '26 September 2026, 14:30',
    store: 'Lotte Mart Grocery - Puri Indah',
    budgetLimit: 350000,
    totalSpent: 148000,
    totalSaved: 28500,
    itemsCount: 4,
    items: [
      { name: 'Beras 5kg', category: 'SPICE_PANTRY', unit: 'karung/5kg', qty: 1, price: 68000, netUnitPrice: 68000, subtotal: 68000 },
      { name: 'Telur Ayam Negeri', category: 'PROTEIN', unit: 'kg', qty: 1, price: 32000, netUnitPrice: 32000, subtotal: 32000 },
      { name: 'Minyak Goreng Sawit 2L', category: 'SPICE_PANTRY', unit: 'pouch', qty: 1, price: 43000, netUnitPrice: 43000, subtotal: 43000 },
      { name: 'Garam 500g', category: 'SPICE_PANTRY', unit: 'bks', qty: 1, price: 5000, netUnitPrice: 5000, subtotal: 5000 }
    ]
  }
];

// Initial starter cart items (default empty so user starts fresh)
const STARTER_CART = [];

// ===================================================================
// APPLICATION STATE
// ===================================================================

const state = {
  cart: [],
  benchmarks: [],
  history: [],
  budgetLimit: 100000,
  store: 'Lotte Mart Grocery - Puri Indah',
  customStore: '',
  shoppingDate: new Date().toISOString().split('T')[0],
  activeCategoryFilter: 'ALL',
  soundEnabled: true,
  audioCtx: null,
  activeTab: 'tabBelanja',
  editingItemId: null
};

// ===================================================================
// AUDIO FEEDBACK SYNTHESIZER (Zero-asset Native Web Audio API)
// ===================================================================

function initAudioContext() {
  if (!state.audioCtx && (window.AudioContext || window.webkitAudioContext)) {
    const AudioContextClass = window.AudioContext || window.webkitAudioContext;
    state.audioCtx = new AudioContextClass();
  }
  if (state.audioCtx && state.audioCtx.state === 'suspended') {
    state.audioCtx.resume();
  }
}

function playSound(type) {
  if (!state.soundEnabled) return;
  try {
    initAudioContext();
    if (!state.audioCtx) return;

    const ctx = state.audioCtx;
    const now = ctx.currentTime;

    if (type === 'click') {
      const osc = ctx.createOscillator();
      const gain = ctx.createGain();
      osc.type = 'sine';
      osc.frequency.setValueAtTime(800, now);
      osc.frequency.exponentialRampToValueAtTime(400, now + 0.05);
      gain.gain.setValueAtTime(0.12, now);
      gain.gain.exponentialRampToValueAtTime(0.001, now + 0.05);
      osc.connect(gain);
      gain.connect(ctx.destination);
      osc.start(now);
      osc.stop(now + 0.05);
    } else if (type === 'tick') {
      const osc = ctx.createOscillator();
      const gain = ctx.createGain();
      osc.type = 'triangle';
      osc.frequency.setValueAtTime(1100, now);
      gain.gain.setValueAtTime(0.08, now);
      gain.gain.exponentialRampToValueAtTime(0.001, now + 0.04);
      osc.connect(gain);
      gain.connect(ctx.destination);
      osc.start(now);
      osc.stop(now + 0.04);
    } else if (type === 'warning') {
      // Danger double beep
      [0, 0.15].forEach((offset) => {
        const osc = ctx.createOscillator();
        const gain = ctx.createGain();
        osc.type = 'sawtooth';
        osc.frequency.setValueAtTime(520, now + offset);
        gain.gain.setValueAtTime(0.15, now + offset);
        gain.gain.exponentialRampToValueAtTime(0.001, now + offset + 0.1);
        osc.connect(gain);
        gain.connect(ctx.destination);
        osc.start(now + offset);
        osc.stop(now + offset + 0.1);
      });
    } else if (type === 'success') {
      // Cheerful chime (C5 -> E5 -> G5)
      const freqs = [523.25, 659.25, 783.99];
      freqs.forEach((freq, idx) => {
        const osc = ctx.createOscillator();
        const gain = ctx.createGain();
        const start = now + idx * 0.08;
        osc.type = 'sine';
        osc.frequency.setValueAtTime(freq, start);
        gain.gain.setValueAtTime(0.15, start);
        gain.gain.exponentialRampToValueAtTime(0.001, start + 0.25);
        osc.connect(gain);
        gain.connect(ctx.destination);
        osc.start(start);
        osc.stop(start + 0.25);
      });
    }
  } catch (err) {
    console.warn('Audio playback error:', err);
  }
}

// Trigger haptic vibration on mobile if supported
function triggerHaptic(duration = 25) {
  if ('vibrate' in navigator) {
    try {
      navigator.vibrate(duration);
    } catch (e) {}
  }
}

// ===================================================================
// MATHEMATICAL DISCOUNT & COMPARISON ENGINES
// ===================================================================

/**
 * Kalkulator Diskon Bertingkat & Multi-tier Promo
 * Rumus matematis diskon bertumpuk (50% + 20%):
 * Step 1: Base * (1 - d1/100)
 * Step 2: Step 1 * (1 - d2/100)
 * Total Potongan: Base - Step 2
 * Efektif %: (Total Potongan / Base) * 100
 */
function calculateDiscount(basePrice, mode, d1, d2, dNominal) {
  const price = Math.max(0, parseFloat(basePrice) || 0);
  let netPrice = price;
  let effectivePercent = 0;
  let discountPerUnit = 0;
  let summaryText = 'Tanpa Diskon';
  let educationNote = '';

  if (mode === 'SINGLE') {
    const p1 = Math.min(100, Math.max(0, parseFloat(d1) || 0));
    discountPerUnit = price * (p1 / 100);
    netPrice = Math.max(0, price - discountPerUnit);
    effectivePercent = p1;
    summaryText = `Diskon ${p1}%`;
    educationNote = `Diskon langsung ${p1}% Ã¢â‚¬Â¢ Hemat Rp ${formatRupiahSimple(discountPerUnit)}/unit`;
  } else if (mode === 'TIERED') {
    const p1 = Math.min(100, Math.max(0, parseFloat(d1) || 0));
    const p2 = Math.min(100, Math.max(0, parseFloat(d2) || 0));
    const after1 = price * (1 - p1 / 100);
    const after2 = after1 * (1 - p2 / 100);
    netPrice = Math.max(0, after2);
    discountPerUnit = price - netPrice;
    effectivePercent = price > 0 ? (discountPerUnit / price) * 100 : 0;
    summaryText = `${p1}% + ${p2}% (${effectivePercent.toFixed(1)}%)`;
    educationNote = `Promo ${p1}% + ${p2}% menghasilkan diskon riil ${effectivePercent.toFixed(1)}% (Bukan ${(p1 + p2)}%!). Hemat Rp ${formatRupiahSimple(discountPerUnit)}/unit`;
  } else if (mode === 'NOMINAL') {
    const nom = Math.max(0, parseFloat(dNominal) || 0);
    discountPerUnit = Math.min(price, nom);
    netPrice = Math.max(0, price - discountPerUnit);
    effectivePercent = price > 0 ? (discountPerUnit / price) * 100 : 0;
    summaryText = `-Rp ${formatRupiahSimple(discountPerUnit)}`;
    educationNote = `Potongan tunai langsung Rp ${formatRupiahSimple(discountPerUnit)}/unit (${effectivePercent.toFixed(1)}%)`;
  }

  return {
    netPrice: Math.round(netPrice),
    effectivePercent,
    discountPerUnit: Math.round(discountPerUnit),
    summaryText,
    educationNote
  };
}

/**
 * Komparator Harga Realtime vs Bulan Lalu
 * Membandingkan netUnitPrice dengan database benchmark
 */
function comparePriceWithBenchmark(productName, unit, currentNetPrice) {
  if (!productName || !productName.trim()) {
    return {
      hasBenchmark: false,
      status: 'NEUTRAL',
      label: 'Menunggu Input',
      symbol: '=',
      diffRp: 0,
      diffPercent: 0,
      message: 'Ketik nama barang untuk membandingkan harga bulan lalu.'
    };
  }

  const cleanName = productName.trim().toLowerCase();
  const currentStore = (state.store || '').toLowerCase();
  
  // Perbandingan wajib mempertimbangkan toko yang sama dan identitas barang
  const match = state.benchmarks.find(b => {
    const bName = b.name.toLowerCase();
    const nameMatch = (bName === cleanName || bName.includes(cleanName) || cleanName.includes(bName)) ||
      (Array.isArray(b.aliases) && b.aliases.some(alias => cleanName.includes(alias) || alias.includes(cleanName))) ||
      cleanName.split(/[\s,/-]+/).filter(t => t.length >= 3).some(t => bName.includes(t));

    if (!nameMatch) return false;

    // Cek kesesuaian toko (hanya membandingkan pada toko yang sama)
    const bStore = (b.store || '').toLowerCase();
    if (!bStore || bStore === currentStore || currentStore.includes(bStore) || bStore.includes(currentStore)) {
      return true;
    }
    return false;
  });

  if (!match) {
        label: 'Produk Baru',
        symbol: '\u2728',
      const bName = b.name.toLowerCase();
      return (bName === cleanName || bName.includes(cleanName) || cleanName.includes(bName));
    });

    if (knownInOtherStore) {
      return {
        hasBenchmark: false,
        status: 'NEW',
        label: 'Histori Toko Belum Ada',
        symbol: '\u2139',
        diffRp: 0,
        diffPercent: 0,
        message: `Belum ada histori harga untuk "${productName}" di ${state.store}. Akan dicatat otomatis sebagai patokan bulan depan.`
      };
    }

    return {
      hasBenchmark: false,
      status: 'NEW',
        label: 'Produk Baru',
        symbol: '\u2728',
      diffRp: 0,
      diffPercent: 0,
      message: `Item ini baru! Akan otomatis dicatat sebagai patokan harga bulan depan di ${state.store}.`
    };
  }

  const lastPrice = match.price;
  const current = parseFloat(currentNetPrice) || 0;
  const diffRp = current - lastPrice;
  const diffPercent = lastPrice > 0 ? (diffRp / lastPrice) * 100 : 0;

  if (diffRp > 0) {
    return {
      hasBenchmark: true,
      lastPrice,
      status: 'HIGHER',
      label: `\u2191 +Rp ${formatRupiahSimple(diffRp)} (+${diffPercent.toFixed(1)}%)`,
      symbol: '\u2191',
      diffRp,
      diffPercent,
      message: `Lebih mahal Rp ${formatRupiahSimple(diffRp)} (+${diffPercent.toFixed(1)}%) dibanding harga bulan lalu (Rp ${formatRupiahSimple(lastPrice)}) di ${match.store || state.store}!`
    };
  } else if (diffRp < 0) {
    const absDiff = Math.abs(diffRp);
    const absPct = Math.abs(diffPercent);
    return {
      hasBenchmark: true,
      lastPrice,
      status: 'LOWER',
      label: `\u2193 -Rp ${formatRupiahSimple(absDiff)} (-${absPct.toFixed(1)}%)`,
      symbol: '\u2193',
      diffRp,
      diffPercent,
      message: `Lebih murah! Berhemat Rp ${formatRupiahSimple(absDiff)} (-${absPct.toFixed(1)}%) dibanding harga bulan lalu (Rp ${formatRupiahSimple(lastPrice)}) di ${match.store || state.store}!`
    };
  } else {
    return {
      hasBenchmark: true,
      lastPrice,
      status: 'EQUAL',
      label: '= Harga Stabil',
      symbol: '=',
      diffRp: 0,
      diffPercent: 0,
      message: `Harga stabil, sama persis seperti bulan lalu di ${match.store || state.store} (Rp ${formatRupiahSimple(lastPrice)}).`
    };
  }
}

// ===================================================================
// FORMATTING HELPERS
// ===================================================================
function formatRupiah(num) {
  const n = Math.round(Number(num) || 0);
  return 'Rp ' + n.toString().replace(/\B(?=(\d{3})+(?!\d))/g, '.');
}

function formatRupiahSimple(num) {
  const n = Math.round(Number(num) || 0);
  return n.toString().replace(/\B(?=(\d{3})+(?!\d))/g, '.');
}

function formatUnitLabel(unit) {
  switch (unit) {
    case 'kg': return 'kg';
    case 'g': return 'gram';
    case 'liter': return 'L';
    case 'ml': return 'ml';
    case 'pcs': return 'pcs';
    case 'pack': return 'pack';
    case 'ikat': return 'ikat';
    case 'kaleng': return 'kaleng';
    case 'botol': return 'botol';
    case 'box': return 'box';
    case 'bks': return 'bks';
    case 'pouch': return 'pouch';
    default: return unit || 'pcs';
  }
}

// ===================================================================
// STORAGE & PERSISTENCE
// ===================================================================

function loadStateFromStorage() {
  try {
    const savedCart = localStorage.getItem(STORAGE_KEYS.CART);
    if (savedCart) {
      const parsed = JSON.parse(savedCart);
      const isLegacyStarter = Array.isArray(parsed) &&
        parsed.length === 3 &&
        parsed.some(i => i.id === 'item-1') &&
        parsed.some(i => i.id === 'item-2') &&
        parsed.some(i => i.id === 'item-3');

      state.cart = isLegacyStarter ? [] : (Array.isArray(parsed) ? parsed : []);
      if (isLegacyStarter) {
        localStorage.setItem(STORAGE_KEYS.CART, JSON.stringify([]));
      }
    } else {
      state.cart = [];
    }

    const savedBenchmarks = localStorage.getItem(STORAGE_KEYS.BENCHMARKS);
    state.benchmarks = savedBenchmarks ? JSON.parse(savedBenchmarks) : [...DEFAULT_BENCHMARKS];

    const savedHistory = localStorage.getItem(STORAGE_KEYS.HISTORY);
    state.history = savedHistory ? JSON.parse(savedHistory) : [...DEFAULT_HISTORY];

    const savedBudget = localStorage.getItem(STORAGE_KEYS.BUDGET);
    state.budgetLimit = savedBudget ? parseInt(savedBudget, 10) : 100000;

    const savedStore = localStorage.getItem(STORAGE_KEYS.STORE);
    state.store = savedStore || 'Lotte Mart Grocery - Puri Indah';

    const savedCustomStore = localStorage.getItem(STORAGE_KEYS.CUSTOM_STORE);
    state.customStore = savedCustomStore || '';

    const savedDate = localStorage.getItem(STORAGE_KEYS.DATE);
    state.shoppingDate = savedDate || new Date().toISOString().split('T')[0];

    const savedSound = localStorage.getItem(STORAGE_KEYS.SOUND);
    state.soundEnabled = savedSound !== null ? savedSound === 'true' : true;
  } catch (err) {
    console.error('Failed to load localStorage data:', err);
    state.cart = [];
    state.benchmarks = [...DEFAULT_BENCHMARKS];
    state.history = [...DEFAULT_HISTORY];
  }
}

function saveStateToStorage(syncFirebase = true) {
  try {
    localStorage.setItem(STORAGE_KEYS.CART, JSON.stringify(state.cart));
    localStorage.setItem(STORAGE_KEYS.BENCHMARKS, JSON.stringify(state.benchmarks));
    localStorage.setItem(STORAGE_KEYS.HISTORY, JSON.stringify(state.history));
    localStorage.setItem(STORAGE_KEYS.BUDGET, state.budgetLimit.toString());
    localStorage.setItem(STORAGE_KEYS.STORE, state.store);
    localStorage.setItem(STORAGE_KEYS.CUSTOM_STORE, state.customStore);
    localStorage.setItem(STORAGE_KEYS.DATE, state.shoppingDate);
    localStorage.setItem(STORAGE_KEYS.SOUND, state.soundEnabled.toString());

    if (syncFirebase && window.FirebaseSync && window.FirebaseSync.isAvailable()) {
      window.FirebaseSync.saveCart(state.cart);
      window.FirebaseSync.saveBenchmarks(state.benchmarks);
      window.FirebaseSync.saveHistory(state.history);
      window.FirebaseSync.saveSettings({
        budgetLimit: state.budgetLimit,
        store: state.store,
        customStore: state.customStore,
        shoppingDate: state.shoppingDate,
        soundEnabled: state.soundEnabled
      });
    }
  } catch (err) {
    console.error('Failed to save to localStorage / Firebase:', err);
  }
}
// FIREBASE REALTIME DATABASE SYNC INTEGRATION
// ===================================================================

let isApplyingRemoteSync = false;

function applyRemoteFirebaseData(remoteData) {
  if (!remoteData || isApplyingRemoteSync) return;
  isApplyingRemoteSync = true;

  try {
    let hasChanged = false;

    // 1. Sync Cart (Firebase RTDB omits empty array keys, so undefined implies empty cart)
    const remoteCart = remoteData.cart 
      ? (Array.isArray(remoteData.cart) ? remoteData.cart : Object.values(remoteData.cart))
      : [];
    
    if (JSON.stringify(remoteCart) !== JSON.stringify(state.cart)) {
      state.cart = remoteCart;
      hasChanged = true;
    }

    // 2. Sync Benchmarks
    if (remoteData.benchmarks) {
      const remoteBenchmarks = Array.isArray(remoteData.benchmarks) 
        ? remoteData.benchmarks 
        : Object.values(remoteData.benchmarks);
      
      if (remoteBenchmarks.length > 0 && JSON.stringify(remoteBenchmarks) !== JSON.stringify(state.benchmarks)) {
        state.benchmarks = remoteBenchmarks;
        hasChanged = true;
      }
    }

    // 3. Sync History
    const remoteHistory = remoteData.history 
      ? (Array.isArray(remoteData.history) ? remoteData.history : Object.values(remoteData.history))
      : [];
    
    if (JSON.stringify(remoteHistory) !== JSON.stringify(state.history)) {
      state.history = remoteHistory;
      hasChanged = true;
    }

    // 4. Sync Settings
    if (remoteData.settings) {
      if (typeof remoteData.settings.budgetLimit === 'number' && remoteData.settings.budgetLimit !== state.budgetLimit) {
        state.budgetLimit = remoteData.settings.budgetLimit;
        hasChanged = true;
      }
      if (remoteData.settings.store && remoteData.settings.store !== state.store) {
        state.store = remoteData.settings.store;
        const storeSelect = document.getElementById('storeSelect');
        if (storeSelect) storeSelect.value = state.store;
        hasChanged = true;
      }
      if (typeof remoteData.settings.soundEnabled === 'boolean') {
        state.soundEnabled = remoteData.settings.soundEnabled;
      }
    }

    if (hasChanged) {
      // Save locally without re-triggering cloud sync loop
      saveStateToStorage(false);

      // Re-render views
      if (state.activeTab === 'tabBelanja') {
        renderCartItems();
        updateSafetyCapUI();
      } else if (state.activeTab === 'tabRiwayat') {
        renderHistoryTab();
      } else if (state.activeTab === 'tabAnggaran') {
        renderAnggaranTab();
      }
    }
  } finally {
    isApplyingRemoteSync = false;
  }
}

function updateFirebaseSyncStatusUI(status) {
  const syncPill = document.getElementById('cloudSyncIndicator');
  const syncLabel = document.getElementById('cloudSyncUserLabel');
  const displayUserName = document.getElementById('displayUserName');
  const displayUserId = document.getElementById('displayUserId');
  const statusIndicator = document.getElementById('firebaseStatusIndicator');
  const statusText = document.getElementById('firebaseStatusText');

  const account = window.FirebaseSync ? window.FirebaseSync.getAccount() : null;
  const userId = status.userId || (account ? account.userId : '');
  const displayName = status.displayName || (account ? account.displayName : 'Belum Terdaftar');

  if (displayUserName) {
    displayUserName.textContent = `Pengguna: ${displayName}`;
  }
  if (displayUserId) {
    displayUserId.textContent = userId ? userId : 'Belum Terdaftar';
  }

  const labelText = displayName.length > 10 ? `${displayName.substring(0, 10)}...` : displayName;

  if (status.connected && userId) {
    if (syncPill) {
      syncPill.className = 'status-pill sync-pill';
      syncPill.title = `Firebase Realtime Terhubung â€¢ ${displayName} (${userId})`;
    }
    if (syncLabel) syncLabel.textContent = labelText;
    if (statusIndicator) {
      statusIndicator.className = 'sync-status-indicator';
    }
    if (statusText) statusText.textContent = 'ðŸŸ¢ Terhubung (Realtime)';
  } else if (!userId) {
    if (syncPill) {
      syncPill.className = 'status-pill sync-pill connecting';
      syncPill.title = 'Perangkat Belum Terdaftar: Klik untuk mendaftar';
    }
    if (syncLabel) syncLabel.textContent = 'Daftar Akun';
    if (statusIndicator) {
      statusIndicator.className = 'sync-status-indicator connecting';
    }
    if (statusText) statusText.textContent = 'ðŸŸ¡ Belum Terdaftar';
  } else if (status.error) {
    if (syncPill) {
      syncPill.className = 'status-pill sync-pill error';
      syncPill.title = `Koneksi Firebase: ${status.error}`;
    }
    if (syncLabel) syncLabel.textContent = `${labelText} (Offline)`;
    if (statusIndicator) {
      statusIndicator.className = 'sync-status-indicator offline';
    }
    if (statusText) statusText.textContent = 'ðŸ”´ Mode Lokal (Offline)';
  } else {
    if (syncPill) {
      syncPill.className = 'status-pill sync-pill connecting';
      syncPill.title = `Menghubungkan ke Firebase... (${userId})`;
    }
    if (syncLabel) syncLabel.textContent = labelText;
    if (statusIndicator) {
      statusIndicator.className = 'sync-status-indicator connecting';
    }
    if (statusText) statusText.textContent = 'ðŸŸ¡ Menghubungkan...';
  }
}

let onboardingMode = 'new'; // 'new' | 'existing'

function setupOnboardingModal() {
  const form = document.getElementById('onboardingForm');
  const inputName = document.getElementById('inputOnboardingName');
  const inputUserId = document.getElementById('inputOnboardingUserId');
  const randomBtn = document.getElementById('generateRandomIdBtn');
  const modeTabNew = document.getElementById('modeTabNew');
  const modeTabExisting = document.getElementById('modeTabExisting');
  const groupDisplayName = document.getElementById('groupDisplayName');
  const submitBtnText = document.getElementById('submitBtnText');
  const hintEl = document.getElementById('onboardingIdHint');

  modeTabNew?.addEventListener('click', () => {
    onboardingMode = 'new';
    modeTabNew.classList.add('active');
    modeTabExisting?.classList.remove('active');
    if (groupDisplayName) groupDisplayName.style.display = 'block';
    if (inputName) inputName.required = true;
    if (submitBtnText) submitBtnText.textContent = 'Daftarkan & Mulai Belanja';
    if (hintEl) hintEl.textContent = 'ID unik untuk memisahkan database belanja perangkat ini di cloud.';
    playSound('tick');
  });

  modeTabExisting?.addEventListener('click', () => {
    onboardingMode = 'existing';
    modeTabExisting?.classList.add('active');
    modeTabNew?.classList.remove('active');
    if (groupDisplayName) groupDisplayName.style.display = 'none';
    if (inputName) inputName.required = false;
    if (submitBtnText) submitBtnText.textContent = 'Masuk dengan ID Ini';
    if (hintEl) hintEl.textContent = 'Masukkan ID akun dari perangkat lain untuk sinkronisasi daftar belanja bersama.';
    playSound('tick');
  });

  randomBtn?.addEventListener('click', () => {
    const name = inputName?.value || 'user';
    if (window.FirebaseSync && inputUserId) {
      inputUserId.value = window.FirebaseSync.generateSuggestedUserId(name);
      inputUserId.dataset.auto = 'true';
      playSound('tick');
    }
  });

  inputName?.addEventListener('input', () => {
    if (onboardingMode === 'new' && inputUserId && (!inputUserId.value || inputUserId.dataset.auto === 'true')) {
      const suggested = window.FirebaseSync ? window.FirebaseSync.generateSuggestedUserId(inputName.value) : `user_${inputName.value.toLowerCase().replace(/[^a-z0-9]/g, '')}`;
      inputUserId.value = suggested;
      inputUserId.dataset.auto = 'true';
    }
  });

  inputUserId?.addEventListener('input', () => {
    inputUserId.dataset.auto = 'false';
  });

  form?.addEventListener('submit', (e) => {
    e.preventDefault();

    let name = inputName?.value.trim() || '';
    let rawUserId = inputUserId?.value.trim() || '';

    if (!rawUserId) {
      rawUserId = window.FirebaseSync ? window.FirebaseSync.generateSuggestedUserId(name || 'user') : 'user_' + Math.random().toString(36).substring(2, 7);
    }

    // Normalize userId (lowercase, only a-z 0-9 _ -)
    let cleanUserId = rawUserId.toLowerCase().replace(/[^a-z0-9_-]/g, '');
    if (cleanUserId.length < 2) {
      cleanUserId = 'user_' + Math.random().toString(36).substring(2, 6);
    }

    const displayName = (onboardingMode === 'existing' && !name) ? cleanUserId : (name || cleanUserId);

    // If creating a brand new account, ensure cart starts completely empty
    if (onboardingMode === 'new') {
      state.cart = [];
      saveStateToStorage(false);
    }

    // 1. Immediately register in local storage & attach listener
    if (window.FirebaseSync) {
      window.FirebaseSync.registerUser({ userId: cleanUserId, displayName });
      // Save state to Firebase in background
      window.FirebaseSync.saveFullState(state);
    }

    // 2. IMMEDIATELY CLOSE ONBOARDING MODAL & SWITCH TO BELANJA PAGE
    hideModal('onboardingModal');
    switchTab('tabBelanja');

    playSound('success');
    triggerHaptic(60);
    showToast(`Selamat datang, ${displayName}! Akun siap digunakan.`, 'success');

    // 3. Update UI readouts
    updateFirebaseSyncStatusUI({ connected: true, userId: cleanUserId, displayName });
    renderCartItems();
    updateSafetyCapUI();
  });
}

function setupFirebaseIntegration() {
  if (!window.FirebaseSync) return;

  // Initialize callback listeners
  window.FirebaseSync.init({
    onStatusChanged: (status) => {
      updateFirebaseSyncStatusUI(status);
    },
    onDataUpdated: (remoteData) => {
      applyRemoteFirebaseData(remoteData);
    }
  });

  // Setup modal handlers
  setupOnboardingModal();

  // MANDATORY FIRST-TIME REGISTRATION CHECK:
  // If user has not yet registered an account on this device, display onboarding modal immediately
  if (!window.FirebaseSync.isRegistered()) {
    const inputUserId = document.getElementById('inputOnboardingUserId');
    if (inputUserId && !inputUserId.value) {
      inputUserId.value = window.FirebaseSync.generateSuggestedUserId('user');
      inputUserId.dataset.auto = 'true';
    }
    showModal('onboardingModal');
  } else {
    const acc = window.FirebaseSync.getAccount();
    updateFirebaseSyncStatusUI({ connected: true, userId: acc.userId, displayName: acc.displayName });
    // Ensure initial sync of state to Firestore so the user collection is created
    if (window.FirebaseSync.saveFullState) {
      window.FirebaseSync.saveFullState(state);
    }
  }

  // Setup Account Card buttons
  const copyBtn = document.getElementById('copyUserIdBtn');
  if (copyBtn) {
    copyBtn.addEventListener('click', () => {
      const uid = window.FirebaseSync.getUserId();
      if (!uid) {
        showToast('Belum ada ID Akun terdaftar.', 'error');
        return;
      }
      navigator.clipboard.writeText(uid).then(() => {
        showToast(`ID Akun "${uid}" disalin ke clipboard!`, 'success');
        playSound('tick');
      }).catch(() => {
        showToast('Gagal menyalin ID.', 'error');
      });
    });
  }

  const switchBtn = document.getElementById('switchUserIdBtn');
  if (switchBtn) {
    switchBtn.addEventListener('click', () => {
      const modeTabExisting = document.getElementById('modeTabExisting');
      if (modeTabExisting) modeTabExisting.click();
      showModal('onboardingModal');
    });
  }

  const logoutBtn = document.getElementById('logoutUserBtn');
  if (logoutBtn) {
    logoutBtn.addEventListener('click', () => {
      if (confirm('Keluar dari akun perangkat ini dan mendaftarkan akun baru?')) {
        window.FirebaseSync.logoutOrSwitch();
        const modeTabNew = document.getElementById('modeTabNew');
        if (modeTabNew) modeTabNew.click();
        const inputName = document.getElementById('inputOnboardingName');
        const inputUserId = document.getElementById('inputOnboardingUserId');
        if (inputName) inputName.value = '';
        if (inputUserId) {
          inputUserId.value = window.FirebaseSync.generateSuggestedUserId('user');
          inputUserId.dataset.auto = 'true';
        }
        showModal('onboardingModal');
        showToast('Silakan daftarkan akun baru untuk perangkat ini.', 'info');
        playSound('click');
      }
    });
  }

  // Clicking sync pill in header takes user to Tab Anggaran
  const syncPill = document.getElementById('cloudSyncIndicator');
  if (syncPill) {
    syncPill.addEventListener('click', () => {
      if (!window.FirebaseSync.isRegistered()) {
        showModal('onboardingModal');
      } else {
        switchTab('tabAnggaran');
        document.querySelector('.firebase-account-card')?.scrollIntoView({ behavior: 'smooth' });
      }
    });
  }
}

// ===================================================================
// REALTIME BUDGET SAFETY CAP CONTROLLER
// ===================================================================

let hasAlertedCritcal = false;

function updateSafetyCapUI() {
  const totalSpent = state.cart.reduce((sum, item) => sum + (item.subtotal || 0), 0);
  const remainingBudget = state.budgetLimit - totalSpent;
  const percentage = state.budgetLimit > 0 ? (totalSpent / state.budgetLimit) * 100 : 0;
  const clampedPercent = Math.min(100, Math.max(0, percentage));

  // Top header text readouts
  const totalSpentEl = document.getElementById('totalSpentText');
  const remainingBudgetEl = document.getElementById('remainingBudgetText');
  const remainingCaptionEl = document.getElementById('remainingCaption');
  const budgetTargetText = document.getElementById('budgetTargetText');
  const meterFill = document.getElementById('meterFill');
  const safetyStatusBadge = document.getElementById('safetyStatusBadge');
  const safetyStatusText = document.getElementById('safetyStatusText');
  const safetyAlertBanner = document.getElementById('safetyAlertBanner');
  const safetyAlertMessage = document.getElementById('safetyAlertMessage');

  budgetTargetText.textContent = `Limit: ${formatRupiah(state.budgetLimit)}`;
  totalSpentEl.textContent = formatRupiah(totalSpent);

  // Meter width
  meterFill.style.width = `${clampedPercent}%`;

  // Status classification (DT2 Rubrik F-05: >= 90% Waspada Kuning, > 100% Merah Tegas)
  if (percentage < 90) {
    // AMAN (< 90%)
    safetyStatusBadge.className = 'safety-status-badge status-safe';
    safetyStatusText.textContent = 'AMAN';
    remainingCaptionEl.textContent = 'Sisa Dompet';
    remainingBudgetEl.className = 'number-val highlight-safe';
    remainingBudgetEl.textContent = formatRupiah(remainingBudget);
    meterFill.style.background = 'linear-gradient(90deg, #10B981 0%, #059669 100%)';
    safetyAlertBanner.style.display = 'none';
    safetyAlertBanner.className = 'safety-alert-banner';
    hasAlertedCritcal = false;
  } else if (percentage <= 100) {
    // WASPADA (>= 90% sampai <= 100%)
    safetyStatusBadge.className = 'safety-status-badge status-warning';
    safetyStatusText.textContent = 'WASPADA';
    remainingCaptionEl.textContent = 'Sisa Dompet';
    remainingBudgetEl.className = 'number-val highlight-warning';
    remainingBudgetEl.textContent = formatRupiah(remainingBudget);
    meterFill.style.background = 'linear-gradient(90deg, #F59E0B 0%, #D97706 100%)';
    safetyAlertBanner.style.display = 'flex';
    safetyAlertBanner.className = 'safety-alert-banner alert-warning';
    safetyAlertMessage.textContent = `Awas! Belanjaan telah mencapai ${percentage.toFixed(0)}% dari batas dompet.`;
    hasAlertedCritcal = false;
  } else {
    // OVER LIMIT (> 100%)
    safetyStatusBadge.className = 'safety-status-badge status-danger';
    meterFill.style.background = 'linear-gradient(90deg, #F43F5E 0%, #BE123C 100%)';
    safetyAlertBanner.style.display = 'flex';
    safetyAlertBanner.className = 'safety-alert-banner alert-danger';

    safetyStatusText.textContent = 'OVER LIMIT';
    remainingCaptionEl.textContent = 'Defisit / Kurang';
    remainingBudgetEl.className = 'number-val highlight-danger';
    remainingBudgetEl.textContent = `-${formatRupiah(Math.abs(remainingBudget))}`;
    safetyAlertMessage.textContent = 'Total belanja melebihi batas saldo dompet! Kurangi kuantitas atau batalkan barang sekunder.';

    if (!hasAlertedCritcal) {
      playSound('warning');
      triggerHaptic(60);
      hasAlertedCritcal = true;
    }
  }
  // Update Shopping Bottom Dock readout
  const dockTotalSpend = document.getElementById('dockTotalSpend');
  const dockItemCount = document.getElementById('dockItemCount');
  const totalItemsCount = state.cart.reduce((sum, it) => sum + (parseFloat(it.qty) || 0), 0);
  dockTotalSpend.textContent = formatRupiah(totalSpent);
  dockItemCount.textContent = `${state.cart.length} Jenis (${totalItemsCount} Qty)`;

  // Update Total Savings readout
  const totalSavings = state.cart.reduce((sum, it) => {
    let s = it.savedAmount || 0;
    const comp = comparePriceWithBenchmark(it.name, it.unit, it.netUnitPrice);
    if (comp.status === 'LOWER') {
      s += Math.abs(comp.diffRp) * (it.qty || 1);
    }
    return sum + s;
  }, 0);
  const totalSavingsText = document.getElementById('totalSavingsText');
  if (totalSavingsText) {
    totalSavingsText.textContent = formatRupiah(totalSavings);
  }

  // Badges on bottom navigation
  const navCartBadge = document.getElementById('navCartBadge');
  if (navCartBadge) {
    if (state.cart.length > 0) {
      navCartBadge.style.display = 'inline-block';
      navCartBadge.textContent = state.cart.length;
    } else {
      navCartBadge.style.display = 'none';
    }
  }

  // Category counts
  updateCategoryPillCounts();
}

function updateCategoryPillCounts() {
  const catCountAll = document.getElementById('catCountAll');
  if (catCountAll) catCountAll.textContent = state.cart.length;
}

// ===================================================================
// RENDER CART ITEMS (TAB BELANJA)
// ===================================================================

function renderCartItems() {
  const container = document.getElementById('cartItemsList');
  const emptyView = document.getElementById('emptyCartView');
  const headerActionsRow = document.getElementById('cartHeaderActionsRow');
  const sectionCountBadge = document.getElementById('cartSectionCountBadge');
  if (!container || !emptyView) return;

  const filteredItems = state.cart.filter(item => {
    if (state.activeCategoryFilter === 'ALL') return true;
    return item.category === state.activeCategoryFilter;
  });

  if (state.cart.length === 0) {
    if (headerActionsRow) headerActionsRow.style.display = 'none';
    container.innerHTML = '';
    emptyView.style.display = 'flex';
    if (window.lucide) window.lucide.createIcons();
    return;
  } else {
    emptyView.style.display = 'none';
    if (headerActionsRow) headerActionsRow.style.display = 'flex';
    if (sectionCountBadge) {
      const totalUnits = state.cart.reduce((s, i) => s + (parseFloat(i.qty) || 0), 0);
      sectionCountBadge.textContent = `${state.cart.length} Jenis Barang (${totalUnits} Qty)`;
    }
  }

  if (filteredItems.length === 0) {
    container.innerHTML = `
      <div style="text-align: center; padding: 30px 10px; color: var(--text-dim);">
        <p>Tidak ada item di kategori ini.</p>
      </div>
    `;
    return;
  }

  container.innerHTML = filteredItems.map(item => {
    const comp = comparePriceWithBenchmark(item.name, item.unit, item.netUnitPrice);
    const cat = CATEGORIES[item.category] || CATEGORIES.OTHER;
    const isDiscounted = item.discountMode && item.discountMode !== 'NONE';

    // Comparator Badge Class
    let compClass = 'comp-equal';
    if (comp.status === 'HIGHER') compClass = 'comp-higher';
    else if (comp.status === 'LOWER') compClass = 'comp-lower';
    else if (comp.status === 'NEW') compClass = 'comp-new';

    return `
      <article class="cart-item-card" data-id="${item.id}">
        <!-- Top Info Row -->
        <div class="item-top-row">
          <div class="item-title-group">
            <span class="item-category-tag cat-tag-${item.category}">
              ${cat.icon} ${cat.label}
            </span>
            <h4 class="item-product-name">${escapeHtml(item.name)}</h4>
            <span class="item-unit-spec">Satuan: ${formatUnitLabel(item.unit)}</span>
          </div>

          <div class="item-card-actions">
            <button class="mini-action-btn" onclick="openEditItemModal('${item.id}')" title="Edit Item" aria-label="Edit">
              <i data-lucide="edit-3" class="icon-xs"></i>
            </button>
            <button class="mini-action-btn btn-delete" onclick="confirmDeleteCartItem('${item.id}')" title="Hapus Item" aria-label="Hapus">
              <i data-lucide="trash-2" class="icon-xs"></i>
            </button>
          </div>
        </div>

        <!-- Realtime Price Comparator Indicator -->
        <div class="item-comparator-banner ${compClass}">
          <span>${comp.symbol}</span>
          <span>${comp.label}</span>
          ${comp.hasBenchmark ? `<span style="font-weight: 400; opacity: 0.85;">(Lalu: ${formatRupiah(comp.lastPrice)})</span>` : ''}
        </div>

        <!-- Discount Breakdown if any -->
        ${isDiscounted ? `
          <div class="item-discount-row">
            <span class="discount-badge-pill">Promo: ${item.discountDesc || 'Diskon'}</span>
            <span class="original-price-strike">${formatRupiah(item.price)}</span>
            <span style="color: var(--primary-light); font-weight: 700; font-family: var(--font-mono);">
              ${formatRupiah(item.netUnitPrice)}/unit
            </span>
          </div>
        ` : ''}

        <!-- Bottom Stepper & Realtime Subtotal (Instant oninput without delay) -->
        <div class="item-bottom-row">
          <div class="stepper-control">
            <button type="button" class="stepper-btn" onclick="stepItemQty('${item.id}', -1)" aria-label="Kurang Qty">-</button>
            <input type="number" class="stepper-input" value="${item.qty}" min="0.1" step="any" inputmode="decimal" oninput="updateItemQtyInput('${item.id}', this.value)" aria-label="Kuantitas">
            <button type="button" class="stepper-btn" onclick="stepItemQty('${item.id}', 1)" aria-label="Tambah Qty">+</button>
          </div>

          <div class="item-subtotal-group">
            <span class="unit-price-caption">${item.qty} &times; ${formatRupiah(item.netUnitPrice)}</span>
            <div class="subtotal-amount">${formatRupiah(item.subtotal)}</div>
          </div>
        </div>
      </article>
    `;
  }).join('');

  if (window.lucide) {
    window.lucide.createIcons();
  }
}

// ===================================================================
// ITEM INTERACTION HANDLERS (STEPPER, DELETE, ADD, EDIT)
// ===================================================================

function stepItemQty(id, delta) {
  const item = state.cart.find(it => it.id === id);
  if (!item) return;

  const current = parseFloat(item.qty) || 1;
  let next = current + delta;
  if (next <= 0) {
    confirmDeleteCartItem(id);
    return;
  }

  item.qty = Math.round(next * 10) / 10;
  item.subtotal = Math.round(item.qty * item.netUnitPrice);
  item.savedAmount = Math.round((item.price - item.netUnitPrice) * item.qty);

  playSound('tick');
  triggerHaptic(20);
  saveStateToStorage();
  renderCartItems();
  updateSafetyCapUI();
}

function updateItemQtyInput(id, val) {
  const item = state.cart.find(it => it.id === id);
  if (!item) return;

  const parsed = parseFloat(val);
  if (isNaN(parsed) || parsed <= 0) {
    return;
  }

  item.qty = parsed;
  item.subtotal = Math.round(item.qty * item.netUnitPrice);
  item.savedAmount = Math.round((item.price - item.netUnitPrice) * item.qty);

  playSound('tick');
  saveStateToStorage();
  renderCartItems();
  updateSafetyCapUI();
}

// Custom Non-Blocking Confirmation Modal Helpers
let currentConfirmAction = null;

function showConfirmDialog({ title, message, confirmText = 'Lanjutkan', onConfirm }) {
  const titleEl = document.getElementById('confirmDialogTitle');
  const msgEl = document.getElementById('confirmDialogMessage');
  const execBtn = document.getElementById('confirmExecuteBtn');

  if (titleEl) titleEl.textContent = title;
  if (msgEl) msgEl.textContent = message;
  if (execBtn) execBtn.textContent = confirmText;

  currentConfirmAction = onConfirm;
  showModal('confirmActionModal');
  playSound('warning');
}

function initConfirmDialog() {
  const cancelBtn = document.getElementById('confirmCancelBtn');
  const execBtn = document.getElementById('confirmExecuteBtn');

  cancelBtn?.addEventListener('click', () => {
    hideModal('confirmActionModal');
    currentConfirmAction = null;
    playSound('tick');
  });

  execBtn?.addEventListener('click', () => {
    hideModal('confirmActionModal');
    if (typeof currentConfirmAction === 'function') {
      const action = currentConfirmAction;
      currentConfirmAction = null;
      action();
    }
  });
}

function confirmDeleteCartItem(id) {
  const item = state.cart.find(it => it.id === id);
  if (!item) return;

  showConfirmDialog({
    title: 'Hapus Barang?',
    message: `Hapus "${item.name}" dari keranjang troli?`,
    confirmText: 'Ya, Hapus',
    onConfirm: () => {
      state.cart = state.cart.filter(it => it.id !== id);
      playSound('click');
      triggerHaptic(30);
      saveStateToStorage();
      if (window.FirebaseSync && window.FirebaseSync.isAvailable()) {
        window.FirebaseSync.removeCartItem(id);
        window.FirebaseSync.saveCart(state.cart);
      }
      renderCartItems();
      updateSafetyCapUI();
      showToast(`"${item.name}" dihapus dari troli`, 'info');
    }
  });
}

function confirmClearAllCart() {
  if (state.cart.length === 0) return;

  showConfirmDialog({
    title: 'Kosongkan Keranjang?',
    message: `Seluruh ${state.cart.length} barang belanjaan akan dihapus dari troli. Lanjutkan?`,
    confirmText: 'Ya, Kosongkan',
    onConfirm: () => {
      state.cart = [];
      playSound('click');
      triggerHaptic(40);
      saveStateToStorage();
      if (window.FirebaseSync && window.FirebaseSync.isAvailable()) {
        window.FirebaseSync.saveCart([]);
      }
      renderCartItems();
      updateSafetyCapUI();
      showToast('Seluruh isi keranjang berhasil dikosongkan!', 'info');
    }
  });
}
// MODAL ADD / EDIT ITEM CONTROLLER
// ===================================================================

function openAddItemModal() {
  state.editingItemId = null;
  document.getElementById('modalItemTitle').textContent = 'Tambah Barang ke Troli';
  document.getElementById('itemForm').reset();
  document.getElementById('editItemId').value = '';
  document.getElementById('inputQty').value = '1';
  document.getElementById('inputCategory').value = 'VEGETABLE_FRUIT';
  document.getElementById('inputUnit').value = 'pcs';

  // Reset category buttons
  selectModalCategory('VEGETABLE_FRUIT');
  
  // Reset discount radios
  setModalDiscountMode('NONE');

  // Trigger modal display
  recalcModalItemPreview();
  showModal('itemModal');
  playSound('click');

  setTimeout(() => {
    document.getElementById('inputItemName').focus();
  }, 150);
}

function openEditItemModal(id) {
  const item = state.cart.find(it => it.id === id);
  if (!item) return;

  state.editingItemId = id;
  document.getElementById('modalItemTitle').textContent = 'Edit Barang Troli';
  document.getElementById('editItemId').value = id;
  document.getElementById('inputItemName').value = item.name;
  document.getElementById('inputUnit').value = item.unit || 'pcs';
  document.getElementById('inputQty').value = item.qty;
  document.getElementById('inputUnitPrice').value = item.price;

  selectModalCategory(item.category || 'OTHER');

  const mode = item.discountMode || 'NONE';
  setModalDiscountMode(mode);
  if (mode === 'SINGLE') {
    document.getElementById('inputDiscSingle').value = item.disc1 || 0;
  } else if (mode === 'TIERED') {
    document.getElementById('inputDisc1').value = item.disc1 || 0;
    document.getElementById('inputDisc2').value = item.disc2 || 0;
  } else if (mode === 'NOMINAL') {
    document.getElementById('inputDiscNominal').value = item.discNominal || 0;
  }

  recalcModalItemPreview();
  showModal('itemModal');
  playSound('click');
}

function selectModalCategory(catKey) {
  document.getElementById('inputCategory').value = catKey;
  const buttons = document.querySelectorAll('#modalCategoryGrid .cat-choice-btn');
  buttons.forEach(btn => {
    if (btn.dataset.cat === catKey) {
      btn.classList.add('active');
    } else {
      btn.classList.remove('active');
    }
  });
}

function setModalDiscountMode(mode) {
  const radios = document.querySelectorAll('input[name="discountMode"]');
  radios.forEach(r => {
    r.checked = (r.value === mode);
  });

  const tieredRow = document.getElementById('tieredDiscountRow');
  const singleRow = document.getElementById('singleDiscountRow');
  const nominalRow = document.getElementById('nominalDiscountRow');
  const presetsRow = document.getElementById('tieredPresets');

  tieredRow.style.display = mode === 'TIERED' ? 'flex' : 'none';
  singleRow.style.display = mode === 'SINGLE' ? 'block' : 'none';
  nominalRow.style.display = mode === 'NOMINAL' ? 'block' : 'none';
  presetsRow.style.display = mode === 'TIERED' ? 'flex' : 'none';

  recalcModalItemPreview();
}

/**
 * Realtime recalculation inside Add/Edit Modal
 */
function recalcModalItemPreview() {
  const name = document.getElementById('inputItemName').value;
  const unit = document.getElementById('inputUnit').value;
  const qty = Math.max(0.01, parseFloat(document.getElementById('inputQty').value) || 1);
  const basePrice = Math.max(0, parseFloat(document.getElementById('inputUnitPrice').value) || 0);

  const selectedRadio = document.querySelector('input[name="discountMode"]:checked');
  const mode = selectedRadio ? selectedRadio.value : 'NONE';

  let d1 = 0, d2 = 0, dNominal = 0;
  if (mode === 'SINGLE') {
    d1 = parseFloat(document.getElementById('inputDiscSingle').value) || 0;
  } else if (mode === 'TIERED') {
    d1 = parseFloat(document.getElementById('inputDisc1').value) || 0;
    d2 = parseFloat(document.getElementById('inputDisc2').value) || 0;
  } else if (mode === 'NOMINAL') {
    dNominal = parseFloat(document.getElementById('inputDiscNominal').value) || 0;
  }

  // Calculate discount details
  const discCalc = calculateDiscount(basePrice, mode, d1, d2, dNominal);

  // Update discount accordion UI
  const discountBadge = document.getElementById('discountSummaryBadge');
  const discountCalcPreview = document.getElementById('discountCalcPreview');
  const prevOriginalPrice = document.getElementById('prevOriginalPrice');
  const prevEffectiveDiscount = document.getElementById('prevEffectiveDiscount');
  const prevNetPrice = document.getElementById('prevNetPrice');
  const prevEducationNote = document.getElementById('prevEducationNote');

  discountBadge.textContent = discCalc.summaryText;

  if (mode !== 'NONE' && basePrice > 0) {
    discountCalcPreview.style.display = 'block';
    prevOriginalPrice.textContent = formatRupiah(basePrice);
    prevEffectiveDiscount.textContent = `${discCalc.effectivePercent.toFixed(1)}% (-${formatRupiah(discCalc.discountPerUnit)})`;
    prevNetPrice.textContent = formatRupiah(discCalc.netPrice);
    prevEducationNote.textContent = discCalc.educationNote;
  } else {
    discountCalcPreview.style.display = 'none';
  }

  // Realtime Price Comparator with Benchmark
  const comp = comparePriceWithBenchmark(name, unit, discCalc.netPrice);
  const compIndicatorPill = document.getElementById('compIndicatorPill');
  const compIconSymbol = document.getElementById('compIconSymbol');
  const compIndicatorText = document.getElementById('compIndicatorText');
  const compDetailsText = document.getElementById('compDetailsText');

  compIndicatorPill.className = 'comp-indicator-pill';
  if (comp.status === 'HIGHER') compIndicatorPill.classList.add('comp-higher');
  else if (comp.status === 'LOWER') compIndicatorPill.classList.add('comp-lower');
  else if (comp.status === 'NEW') compIndicatorPill.classList.add('comp-new');
  else compIndicatorPill.classList.add('indicator-neutral');

  compIconSymbol.textContent = comp.symbol;
  compIndicatorText.textContent = comp.label;
  compDetailsText.textContent = comp.message;

  // Realtime Subtotal readout
  const subtotal = Math.round(qty * discCalc.netPrice);
  document.getElementById('modalSubtotalFormula').textContent = `${qty} Ãƒâ€” ${formatRupiah(discCalc.netPrice)}`;
  document.getElementById('modalSubtotalVal').textContent = formatRupiah(subtotal);

  return {
    name: name.trim(),
    unit,
    qty,
    basePrice,
    mode,
    d1,
    d2,
    dNominal,
    netUnitPrice: discCalc.netPrice,
    subtotal,
    savedAmount: Math.round((basePrice - discCalc.netPrice) * qty),
    discountDesc: discCalc.summaryText
  };
}

function handleSaveItemForm(e) {
  e.preventDefault();
  const calculated = recalcModalItemPreview();
  const rawPriceInput = document.getElementById('inputUnitPrice').value;
  const rawPrice = parseFloat(rawPriceInput);

  if (!calculated.name || !calculated.name.trim()) {
    showToast('Nama produk wajib diisi!', 'error');
    document.getElementById('inputItemName').focus();
    return;
  }
  if (isNaN(rawPrice) || rawPrice <= 0) {
    showToast('Harga satuan harus lebih besar dari Rp 0 (tidak boleh minus atau kosong)!', 'error');
    document.getElementById('inputUnitPrice').focus();
    return;
  }
  if (calculated.qty <= 0) {
    showToast('Kuantitas barang harus lebih besar dari 0!', 'error');
    document.getElementById('inputQty').focus();
    return;
  }

  const category = document.getElementById('inputCategory').value || 'OTHER';

  if (state.editingItemId) {
    // Update existing item
    const idx = state.cart.findIndex(it => it.id === state.editingItemId);
    if (idx !== -1) {
      state.cart[idx] = {
        ...state.cart[idx],
        name: calculated.name,
        category,
        unit: calculated.unit,
        qty: calculated.qty,
        price: calculated.basePrice,
        discountMode: calculated.mode,
        disc1: calculated.d1,
        disc2: calculated.d2,
        discNominal: calculated.dNominal,
        netUnitPrice: calculated.netUnitPrice,
        subtotal: calculated.subtotal,
        savedAmount: calculated.savedAmount,
        discountDesc: calculated.discountDesc
      };
      showToast('Item berhasil diperbarui!', 'success');
    }
  } else {
    // Add new item
    const newItem = {
      id: 'item-' + Date.now(),
      name: calculated.name,
      category,
      unit: calculated.unit,
      qty: calculated.qty,
      price: calculated.basePrice,
      discountMode: calculated.mode,
      disc1: calculated.d1,
      disc2: calculated.d2,
      discNominal: calculated.dNominal,
      netUnitPrice: calculated.netUnitPrice,
      subtotal: calculated.subtotal,
      savedAmount: calculated.savedAmount,
      discountDesc: calculated.discountDesc
    };
    state.cart.unshift(newItem);
    showToast(`"${newItem.name}" dimasukkan ke troli!`, 'success');
  }

  playSound('click');
  triggerHaptic(30);
  saveStateToStorage();
  hideModal('itemModal');
  renderCartItems();
  updateSafetyCapUI();
}
// AUTOCOMPLETE SUGGESTIONS FROM BENCHMARK DATABASE
// ===================================================================

function setupAutocomplete() {
  const input = document.getElementById('inputItemName');
  const dropdown = document.getElementById('autocompleteDropdown');
  if (!input || !dropdown) return;

  input.addEventListener('input', () => {
    const query = input.value.trim().toLowerCase();
    if (!query) {
      dropdown.style.display = 'none';
      recalcModalItemPreview();
      return;
    }

    const matches = state.benchmarks.filter(b => b.name.toLowerCase().includes(query)).slice(0, 5);

    if (matches.length === 0) {
      dropdown.style.display = 'none';
    } else {
      dropdown.innerHTML = matches.map(m => `
        <div class="autocomplete-item" onclick="selectAutocompleteItem('${escapeHtml(m.name)}', '${m.category}', '${m.unit}', ${m.price})">
          <span>${m.name}</span>
          <span style="font-size: 11px; color: var(--primary-light); font-family: var(--font-mono);">${formatRupiah(m.price)}</span>
        </div>
      `).join('');
      dropdown.style.display = 'block';
    }
    recalcModalItemPreview();
  });

  // Hide on click outside
  document.addEventListener('click', (e) => {
    if (!input.contains(e.target) && !dropdown.contains(e.target)) {
      dropdown.style.display = 'none';
    }
  });
}

function selectAutocompleteItem(name, category, unit, benchmarkPrice) {
  const input = document.getElementById('inputItemName');
  const dropdown = document.getElementById('autocompleteDropdown');
  input.value = name;
  dropdown.style.display = 'none';

  if (category) selectModalCategory(category);
  if (unit) document.getElementById('inputUnit').value = unit;
  if (benchmarkPrice) document.getElementById('inputUnitPrice').value = benchmarkPrice;

  playSound('tick');
  recalcModalItemPreview();
}

// ===================================================================
// QUICK FREE DISCOUNT CALCULATOR (TROLLEY COMPANION MODAL)
// ===================================================================

function setQuickCalcPreset(d1, d2) {
  document.getElementById('freeD1Input').value = d1;
  document.getElementById('freeD2Input').value = d2;
  recalcQuickFreeCalc();
  playSound('tick');
}

function recalcQuickFreeCalc() {
  const price = Math.max(0, parseFloat(document.getElementById('freePriceInput').value) || 0);
  const d1 = Math.min(100, Math.max(0, parseFloat(document.getElementById('freeD1Input').value) || 0));
  const d2 = Math.min(100, Math.max(0, parseFloat(document.getElementById('freeD2Input').value) || 0));

  const after1 = price * (1 - d1 / 100);
  const after2 = after1 * (1 - d2 / 100);
  const totalCut = price - after2;
  const effectivePct = price > 0 ? (totalCut / price) * 100 : 0;

  document.getElementById('qrInitialPrice').textContent = formatRupiah(price);
  document.getElementById('qrAfterStep1').textContent = formatRupiah(Math.round(after1));
  document.getElementById('qrAfterStep2').textContent = formatRupiah(Math.round(after2));
  document.getElementById('qrFinalPrice').textContent = formatRupiah(Math.round(after2));
  document.getElementById('qrEffectivePercent').textContent = `${effectivePct.toFixed(1)}%`;
  document.getElementById('qrSavedAmount').textContent = formatRupiah(Math.round(totalCut));
}

// ===================================================================
// CHECKOUT & AUTO-UPDATE BENCHMARK DATABASE FLOW
// ===================================================================

function openCheckoutModal() {
  if (state.cart.length === 0) {
    showToast('Keranjang belanja masih kosong!', 'error');
    return;
  }

  const totalSpent = state.cart.reduce((sum, item) => sum + item.subtotal, 0);
  const totalSaved = state.cart.reduce((sum, item) => sum + (item.savedAmount || 0), 0);
  const remaining = state.budgetLimit - totalSpent;

  document.getElementById('chkStoreName').textContent = `Belanja di ${state.store}`;
  document.getElementById('chkDateString').textContent = new Date().toLocaleDateString('id-ID', {
    weekday: 'long',
    day: 'numeric',
    month: 'long',
    year: 'numeric'
  });
  document.getElementById('chkTotalSpent').textContent = formatRupiah(totalSpent);
  document.getElementById('chkBudgetLimit').textContent = formatRupiah(state.budgetLimit);
  document.getElementById('chkRemainingBudget').textContent = formatRupiah(remaining);
  document.getElementById('chkTotalSaved').textContent = formatRupiah(totalSaved);

  showModal('checkoutModal');
  playSound('click');
}

function confirmCheckout() {
  const totalSpent = state.cart.reduce((sum, item) => sum + item.subtotal, 0);
  const totalSaved = state.cart.reduce((sum, item) => sum + (item.savedAmount || 0), 0);

  const newTrip = {
    id: 'trip-' + Date.now(),
    date: new Date().toISOString(),
    dateFormatted: new Date().toLocaleDateString('id-ID', {
      day: 'numeric',
      month: 'long',
      year: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    }),
    store: state.store,
    budgetLimit: state.budgetLimit,
    totalSpent,
    totalSaved,
    itemsCount: state.cart.length,
    items: JSON.parse(JSON.stringify(state.cart))
  };

  // 1. Save to History
  state.history.unshift(newTrip);

  // 2. AUTO-UPDATE BENCHMARK DATABASE FOR NEXT MONTH!
  // Sesuai SRS: harga yang baru dibeli otomatis menjadi data pembanding resmi bulan depan
  state.cart.forEach(cartItem => {
    const existingIndex = state.benchmarks.findIndex(b => b.name.toLowerCase() === cartItem.name.toLowerCase());
    if (existingIndex !== -1) {
      state.benchmarks[existingIndex].price = cartItem.netUnitPrice;
      state.benchmarks[existingIndex].unit = cartItem.unit;
      state.benchmarks[existingIndex].category = cartItem.category;
      state.benchmarks[existingIndex].lastUpdated = new Date().toISOString().split('T')[0];
    } else {
      state.benchmarks.push({
        name: cartItem.name,
        category: cartItem.category,
        unit: cartItem.unit,
        price: cartItem.netUnitPrice,
        lastUpdated: new Date().toISOString().split('T')[0]
      });
    }
  });

  // 3. Clear active cart
  state.cart = [];

  // 4. Save and play victory sound!
  saveStateToStorage();
  hideModal('checkoutModal');
  playSound('success');
  triggerHaptic(80);

  showToast('Belanja selesai & database acuan bulan depan telah diperbarui!', 'success');

  // Switch to Riwayat Tab
  switchTab('tabRiwayat');
}

// ===================================================================
// RENDER TAB 2: RIWAYAT BELANJA (SHOPPING HISTORY)
// ===================================================================

function renderHistoryTab() {
  const container = document.getElementById('historyListContainer');
  const emptyView = document.getElementById('emptyHistoryView');
  const metricTotalTrips = document.getElementById('metricTotalTrips');
  const metricAvgSpend = document.getElementById('metricAvgSpend');
  const metricTotalSaved = document.getElementById('metricTotalSaved');

  metricTotalTrips.textContent = state.history.length;

  if (state.history.length === 0) {
    metricAvgSpend.textContent = 'Rp 0';
    metricTotalSaved.textContent = 'Rp 0';
    container.innerHTML = '';
    emptyView.style.display = 'flex';
    return;
  }

  emptyView.style.display = 'none';

  const sumSpend = state.history.reduce((acc, h) => acc + (h.totalSpent || 0), 0);
  const avgSpend = Math.round(sumSpend / state.history.length);
  const sumSaved = state.history.reduce((acc, h) => acc + (h.totalSaved || 0), 0);

  metricAvgSpend.textContent = formatRupiah(avgSpend);
  metricTotalSaved.textContent = formatRupiah(sumSaved);

  container.innerHTML = state.history.map(trip => `
    <article class="history-card" onclick="openReceiptModal('${trip.id}')">
      <div class="hist-top">
        <div>
          <h4 class="hist-store">${escapeHtml(trip.store || 'Supermarket')}</h4>
          <span class="hist-date">${trip.dateFormatted}</span>
        </div>
        <div class="hist-total">${formatRupiah(trip.totalSpent)}</div>
      </div>
      <div class="hist-bottom">
        <span>${trip.itemsCount || (trip.items ? trip.items.length : 0)} Macam Barang</span>
        <span style="color: var(--primary-light);">Hemat: ${formatRupiah(trip.totalSaved || 0)}</span>
      </div>
    </article>
  `).join('');
}

let activeViewingReceiptTrip = null;

function openReceiptModal(tripId) {
  const trip = state.history.find(t => t.id === tripId);
  if (!trip) return;

  activeViewingReceiptTrip = trip;
  const receiptPaper = document.getElementById('receiptPaperView');

  const itemsHtml = (trip.items || []).map(item => `
    <div class="receipt-item-line">
      <span>${escapeHtml(item.name)} (${item.qty} ${formatUnitLabel(item.unit)})</span>
      <span>${formatRupiah(item.subtotal)}</span>
    </div>
  `).join('');

  receiptPaper.innerHTML = `
    <div class="receipt-title-center">
      <h4>STRUK RESMI BELANJA BULANAN</h4>
      <p>${escapeHtml(trip.store)} Ã¢â‚¬Â¢ SMART GROCERY</p>
      <p style="font-size: 10px; color: #64748B;">${trip.dateFormatted}</p>
    </div>
    <div class="receipt-items-table">
      ${itemsHtml}
    </div>
    <div class="receipt-dashed-line"></div>
    <div class="receipt-item-line">
      <span>Batas Anggaran (Budget Limit):</span>
      <span>${formatRupiah(trip.budgetLimit)}</span>
    </div>
    <div class="receipt-grand-total">
      <span>TOTAL BAYAR:</span>
      <span>${formatRupiah(trip.totalSpent)}</span>
    </div>
    <div class="receipt-item-line" style="color: #059669; font-weight: 700;">
      <span>TOTAL PENGHEMATAN:</span>
      <span>${formatRupiah(trip.totalSaved || 0)}</span>
    </div>
    <div class="receipt-dashed-line"></div>
    <p style="text-align: center; font-size: 10px; color: #64748B;">
      Catatan Belanja Anak Rantau Ã¢â‚¬Â¢ Anti Boros
    </p>
  `;

  showModal('receiptModal');
  playSound('click');
}

function copyReceiptText() {
  if (!activeViewingReceiptTrip) return;
  const trip = activeViewingReceiptTrip;

  let text = `Ã°Å¸â€ºâ€™ STRUK BELANJA - ${trip.store}\n`;
  text += `Ã°Å¸â€œâ€¦ Tanggal: ${trip.dateFormatted}\n`;
  text += `--------------------------------\n`;
  trip.items.forEach(it => {
    text += `Ã¢â‚¬Â¢ ${it.name} (${it.qty} ${it.unit}): ${formatRupiah(it.subtotal)}\n`;
  });
  text += `--------------------------------\n`;
  text += `Ã°Å¸â€™Â° Total Belanja: ${formatRupiah(trip.totalSpent)}\n`;
  text += `Ã¢Å“Â¨ Total Hemat: ${formatRupiah(trip.totalSaved)}\n`;
  text += `Ã°Å¸Å½Â¯ Limit Anggaran: ${formatRupiah(trip.budgetLimit)}\n`;

  navigator.clipboard.writeText(text).then(() => {
    showToast('Struk berhasil disalin ke clipboard!', 'success');
    playSound('tick');
  }).catch(() => {
    showToast('Gagal menyalin teks struk.', 'error');
  });
}

function loadReceiptToCart() {
  if (!activeViewingReceiptTrip) return;
  if (state.cart.length > 0 && !confirm('Keranjang aktif saat ini akan ditimpa dengan daftar dari struk ini. Lanjutkan?')) {
    return;
  }

  state.cart = JSON.parse(JSON.stringify(activeViewingReceiptTrip.items));
  saveStateToStorage();
  hideModal('receiptModal');
  switchTab('tabBelanja');
  playSound('success');
  showToast('Item berhasil dimuat kembali ke troli!', 'success');
}

// ===================================================================
// RENDER TAB 3: ANGGARAN & DATABASE ACUAN (BUDGET & MASTER)
// ===================================================================

function renderAnggaranTab() {
  // Budget Limit Input
  const inputBudget = document.getElementById('inputBudgetLimit');
  if (inputBudget) inputBudget.value = state.budgetLimit;

  // Category Breakdown
  renderCategoryBreakdown();

  // Benchmark Catalog List
  renderBenchmarkList();

  // Device Account & Cloud Sync Info
  const displayUserName = document.getElementById('displayUserName');
  const displayUserId = document.getElementById('displayUserId');
  if (window.FirebaseSync) {
    if (displayUserName) displayUserName.textContent = `Pengguna: ${window.FirebaseSync.getDisplayName()}`;
    if (displayUserId) displayUserId.textContent = window.FirebaseSync.getUserId() || 'Belum Terdaftar';
  }
}

function renderCategoryBreakdown() {
  const container = document.getElementById('categoryBreakdownList');
  if (!container) return;

  const totalSpent = state.cart.reduce((sum, item) => sum + item.subtotal, 0);

  if (totalSpent === 0) {
    container.innerHTML = `<p style="font-size: 12px; color: var(--text-dim);">Belum ada barang di troli untuk dianalisis.</p>`;
    return;
  }

  // Aggregate by category
  const catTotals = {};
  state.cart.forEach(item => {
    catTotals[item.category] = (catTotals[item.category] || 0) + item.subtotal;
  });

  const rowsHtml = Object.keys(catTotals).map(catKey => {
    const cat = CATEGORIES[catKey] || CATEGORIES.OTHER;
    const amount = catTotals[catKey];
    const pct = ((amount / totalSpent) * 100).toFixed(1);

    return `
      <div class="breakdown-row">
        <div class="breakdown-meta">
          <span>${cat.icon} ${cat.label}</span>
          <span>${formatRupiah(amount)} (${pct}%)</span>
        </div>
        <div class="breakdown-bar-bg">
          <div class="breakdown-bar-fill" style="width: ${pct}%; background: ${cat.color};"></div>
        </div>
      </div>
    `;
  }).join('');

  container.innerHTML = rowsHtml;
}

function renderBenchmarkList(query = '') {
  const container = document.getElementById('benchmarkListContainer');
  if (!container) return;

  let items = state.benchmarks;
  if (query && query.trim()) {
    const q = query.trim().toLowerCase();
    items = items.filter(it => it.name.toLowerCase().includes(q));
  }

  if (items.length === 0) {
    container.innerHTML = `<p style="font-size: 12px; color: var(--text-dim); padding: 10px 0;">Tidak ada patokan barang yang cocok.</p>`;
    return;
  }

  container.innerHTML = items.map((b, idx) => `
    <div class="benchmark-item-row">
      <div>
        <div class="bench-name">${escapeHtml(b.name)}</div>
        <div class="bench-spec">${CATEGORIES[b.category]?.label || 'Lainnya'} Ã¢â‚¬Â¢ per ${formatUnitLabel(b.unit)}</div>
      </div>
      <div style="display: flex; align-items: center; gap: 8px;">
        <span class="bench-price">${formatRupiah(b.price)}</span>
        <button class="bench-edit-btn" onclick="editBenchmarkPrice('${escapeHtml(b.name)}')" title="Ubah Patokan Harga" aria-label="Ubah Patokan">
          <i data-lucide="edit-2" class="icon-xs"></i>
        </button>
      </div>
    </div>
  `).join('');

  if (window.lucide) {
    window.lucide.createIcons();
  }
}

function editBenchmarkPrice(name) {
  const item = state.benchmarks.find(b => b.name === name);
  if (!item) return;

  const newPriceStr = prompt(`Ubah harga patokan bulan lalu untuk "${item.name}" (Rp):`, item.price);
  if (newPriceStr !== null) {
    const newPrice = parseFloat(newPriceStr);
    if (!isNaN(newPrice) && newPrice >= 0) {
      item.price = Math.round(newPrice);
      item.lastUpdated = new Date().toISOString().split('T')[0];
      saveStateToStorage();
      renderBenchmarkList();
      renderCartItems();
      updateSafetyCapUI();
      showToast(`Harga patokan "${item.name}" diperbarui!`, 'success');
      playSound('click');
    }
  }
}

function addNewBenchmarkItem() {
  const name = prompt('Nama barang acuan baru:');
  if (!name || !name.trim()) return;

  const priceStr = prompt(`Harga patokan acuan (Rp) untuk "${name.trim()}":`, '20000');
  const price = parseFloat(priceStr);
  if (isNaN(price) || price < 0) return;

  state.benchmarks.push({
    name: name.trim(),
    category: 'OTHER',
    unit: 'pcs',
    price: Math.round(price),
    lastUpdated: new Date().toISOString().split('T')[0]
  });

  saveStateToStorage();
  renderBenchmarkList();
  showToast('Barang baru ditambahkan ke database acuan!', 'success');
  playSound('success');
}

// ===================================================================
// TAB NAVIGATION CONTROLLER
// ===================================================================

function switchTab(tabId) {
  state.activeTab = tabId;

  // Toggle tab pages
  document.querySelectorAll('.tab-page').forEach(page => {
    if (page.id === tabId) {
      page.classList.add('active');
    } else {
      page.classList.remove('active');
    }
  });

  // Toggle bottom nav bar active state
  document.querySelectorAll('.bottom-nav-bar .nav-item').forEach(item => {
    if (item.dataset.tab === tabId) {
      item.classList.add('active');
    } else {
      item.classList.remove('active');
    }
  });

  // Toggle shopping dock visibility (only show on Tab Belanja)
  const shoppingDock = document.getElementById('shoppingActionDock');
  if (shoppingDock) {
    shoppingDock.style.display = (tabId === 'tabBelanja') ? 'flex' : 'none';
  }

  // Render tab specific data
  if (tabId === 'tabBelanja') {
    renderCartItems();
    updateSafetyCapUI();
  } else if (tabId === 'tabRiwayat') {
    renderHistoryTab();
  } else if (tabId === 'tabAnggaran') {
    renderAnggaranTab();
  }

  playSound('click');
  triggerHaptic(15);
}

// ===================================================================
// MODAL CONTROLLERS & DIALOGS
// ===================================================================

function showModal(modalId) {
  const modal = document.getElementById(modalId);
  if (modal) {
    modal.style.display = 'flex';
    modal.style.pointerEvents = 'auto';
    void modal.offsetHeight;
    modal.classList.add('open');
    modal.setAttribute('aria-hidden', 'false');
  }
}

function hideModal(modalId) {
  const modal = document.getElementById(modalId);
  if (modal) {
    modal.classList.remove('open');
    modal.setAttribute('aria-hidden', 'true');
    modal.style.pointerEvents = 'none';
    setTimeout(() => {
      if (!modal.classList.contains('open')) {
        modal.style.display = 'none';
      }
    }, 280);
  }
}

function setupModalClosers() {
  document.querySelectorAll('.modal-overlay').forEach(modal => {
    modal.addEventListener('click', (e) => {
      // Do not allow clicking outside to close onboarding modal if user is not registered
      if (modal.id === 'onboardingModal' && window.FirebaseSync && !window.FirebaseSync.isRegistered()) {
        return;
      }
      if (e.target === modal) {
        hideModal(modal.id);
      }
    });
  });
}

// ===================================================================
// TOAST NOTIFICATIONS
// ===================================================================

function showToast(message, type = 'info') {
  const container = document.getElementById('toastContainer');
  if (!container) return;

  const toast = document.createElement('div');
  toast.className = `toast toast-${type}`;
  toast.innerHTML = `
    <span>${escapeHtml(message)}</span>
  `;

  container.appendChild(toast);

  setTimeout(() => {
    toast.style.opacity = '0';
    toast.style.transform = 'translateY(-10px)';
    toast.style.transition = 'all 0.3s ease';
    setTimeout(() => toast.remove(), 300);
  }, 2600);
}

function escapeHtml(str) {
  if (!str) return '';
  return String(str)
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&#39;');
}

// ===================================================================
// EVENT LISTENERS & INITIALIZATION
// ===================================================================

function updateStoreAndDateUI() {
  const storeSelect = document.getElementById('storeSelect');
  const customStoreRow = document.getElementById('customStoreRow');
  const customStoreInput = document.getElementById('customStoreInput');
  const shoppingDateInput = document.getElementById('shoppingDateInput');

  if (shoppingDateInput) {
    shoppingDateInput.value = state.shoppingDate || new Date().toISOString().split('T')[0];
  }

  if (storeSelect) {
    let matchedOption = false;
    for (let opt of storeSelect.options) {
      if (opt.value === state.store) {
        storeSelect.value = state.store;
        matchedOption = true;
        break;
      }
    }

    if (!matchedOption || state.store === 'Lainnya' || state.customStore) {
      storeSelect.value = 'Lainnya';
      if (customStoreRow) customStoreRow.style.display = 'block';
      if (customStoreInput) {
        customStoreInput.value = state.customStore || (state.store !== 'Lainnya' ? state.store : '');
      }
    } else {
      if (customStoreRow) customStoreRow.style.display = 'none';
    }
  }
}

document.addEventListener('DOMContentLoaded', () => {
  // Load local state
  loadStateFromStorage();

  // Live Digital Clock in Status Bar
  function updateClock() {
    const now = new Date();
    const hh = String(now.getHours()).padStart(2, '0');
    const mm = String(now.getMinutes()).padStart(2, '0');
    const clockDisplay = document.getElementById('clockDisplay');
    if (clockDisplay) clockDisplay.textContent = `${hh}:${mm}`;
  }
  updateClock();
  setInterval(updateClock, 30000);

  // Store select, custom store & date picker
  updateStoreAndDateUI();
  initConfirmDialog();

  const storeSelect = document.getElementById('storeSelect');
  const customStoreRow = document.getElementById('customStoreRow');
  const customStoreInput = document.getElementById('customStoreInput');
  const saveCustomStoreBtn = document.getElementById('saveCustomStoreBtn');
  const shoppingDateInput = document.getElementById('shoppingDateInput');
  const clearAllCartBtn = document.getElementById('clearAllCartBtn');

  storeSelect?.addEventListener('change', (e) => {
    const val = e.target.value;
    if (val === 'Lainnya') {
      if (customStoreRow) customStoreRow.style.display = 'block';
      customStoreInput?.focus();
      state.store = state.customStore || 'Toko Lainnya';
    } else {
      if (customStoreRow) customStoreRow.style.display = 'none';
      state.store = val;
      state.customStore = '';
      showToast('Lokasi belanja: ' + val, 'info');
    }
    saveStateToStorage();
  });

  function applyCustomStore() {
    const customName = customStoreInput?.value.trim();
    if (!customName) {
      showToast('Silakan ketik nama toko terlebih dahulu!', 'error');
      customStoreInput?.focus();
      return;
    }
    state.customStore = customName;
    state.store = customName;
    saveStateToStorage();
    showToast('Lokasi toko disetel ke: ' + customName, 'success');
    playSound('success');
  }

  saveCustomStoreBtn?.addEventListener('click', applyCustomStore);
  customStoreInput?.addEventListener('keydown', (e) => {
    if (e.key === 'Enter') {
      e.preventDefault();
      applyCustomStore();
    }
  });

  shoppingDateInput?.addEventListener('change', (e) => {
    state.shoppingDate = e.target.value;
    saveStateToStorage();
    showToast('Tanggal belanja aktif: ' + state.shoppingDate, 'info');
  });

  clearAllCartBtn?.addEventListener('click', confirmClearAllCart);
  // Sound toggle button
  const soundToggleBtn = document.getElementById('soundToggleBtn');
  const soundIcon = document.getElementById('soundIcon');
  if (soundToggleBtn) {
    soundToggleBtn.addEventListener('click', () => {
      state.soundEnabled = !state.soundEnabled;
      saveStateToStorage();
      if (soundIcon) {
        soundIcon.setAttribute('data-lucide', state.soundEnabled ? 'volume-2' : 'volume-x');
        if (window.lucide) window.lucide.createIcons();
      }
      showToast(state.soundEnabled ? 'Suara diaktifkan' : 'Suara dimatikan', 'info');
      if (state.soundEnabled) playSound('click');
    });
  }

  // Navigation tab buttons
  document.querySelectorAll('.bottom-nav-bar .nav-item').forEach(btn => {
    btn.addEventListener('click', () => {
      switchTab(btn.dataset.tab);
    });
  });

  // Category filter pills in Tab Belanja
  document.querySelectorAll('#categoryFilterContainer .cat-pill').forEach(pill => {
    pill.addEventListener('click', () => {
      document.querySelectorAll('#categoryFilterContainer .cat-pill').forEach(p => p.classList.remove('active'));
      pill.classList.add('active');
      state.activeCategoryFilter = pill.dataset.category;
      renderCartItems();
      playSound('tick');
    });
  });

  // Buttons to open modals
  document.getElementById('openAddItemModalBtn')?.addEventListener('click', openAddItemModal);
  document.getElementById('emptyAddBtn')?.addEventListener('click', openAddItemModal);
  document.getElementById('openCheckoutModalBtn')?.addEventListener('click', openCheckoutModal);
  document.getElementById('confirmCheckoutBtn')?.addEventListener('click', confirmCheckout);
  document.getElementById('cancelCheckoutBtn')?.addEventListener('click', () => hideModal('checkoutModal'));

  // Edit budget limit quick button in safety card header
  document.getElementById('editBudgetQuickBtn')?.addEventListener('click', () => {
    switchTab('tabAnggaran');
    document.getElementById('inputBudgetLimit')?.focus();
  });

  // Save budget limit button in settings
  document.getElementById('saveBudgetLimitBtn')?.addEventListener('click', () => {
    const val = parseFloat(document.getElementById('inputBudgetLimit').value);
    if (!isNaN(val) && val > 0) {
      state.budgetLimit = Math.round(val);
      saveStateToStorage();
      updateSafetyCapUI();
      playSound('success');
      showToast('Batas dompet berhasil diperbarui!', 'success');
    }
  });

  // Quick chips for budget settings
  document.querySelectorAll('.quick-chip').forEach(chip => {
    chip.addEventListener('click', () => {
      const val = parseInt(chip.dataset.val, 10);
      document.getElementById('inputBudgetLimit').value = val;
      state.budgetLimit = val;
      saveStateToStorage();
      updateSafetyCapUI();
      playSound('tick');
      showToast(`Batas dompet diset ke ${formatRupiah(val)}`, 'info');
    });
  });

  // Item form modal events
  document.getElementById('closeItemModalBtn')?.addEventListener('click', () => hideModal('itemModal'));
  document.getElementById('cancelItemModalBtn')?.addEventListener('click', () => hideModal('itemModal'));
  document.getElementById('itemForm')?.addEventListener('submit', handleSaveItemForm);

  // Category grid in modal
  document.querySelectorAll('#modalCategoryGrid .cat-choice-btn').forEach(btn => {
    btn.addEventListener('click', () => {
      selectModalCategory(btn.dataset.cat);
      playSound('tick');
    });
  });

  // Qty steppers in modal
  document.getElementById('qtyMinusBtn')?.addEventListener('click', () => {
    const input = document.getElementById('inputQty');
    const cur = parseFloat(input.value) || 1;
    if (cur > 1) {
      input.value = Math.round((cur - 1) * 10) / 10;
      recalcModalItemPreview();
      playSound('tick');
    }
  });
  document.getElementById('qtyPlusBtn')?.addEventListener('click', () => {
    const input = document.getElementById('inputQty');
    const cur = parseFloat(input.value) || 1;
    input.value = Math.round((cur + 1) * 10) / 10;
    recalcModalItemPreview();
    playSound('tick');
  });

  // Micro qty chips in modal
  document.querySelectorAll('.micro-chip').forEach(chip => {
    chip.addEventListener('click', () => {
      document.getElementById('inputQty').value = chip.dataset.qty;
      recalcModalItemPreview();
      playSound('tick');
    });
  });

  // Quick price bumpers in modal (+5rb, +10rb, +25rb, +50rb)
  document.querySelectorAll('.bump-chip').forEach(chip => {
    chip.addEventListener('click', () => {
      const input = document.getElementById('inputUnitPrice');
      const cur = parseFloat(input.value) || 0;
      const bump = parseFloat(chip.dataset.bump) || 0;
      input.value = cur + bump;
      recalcModalItemPreview();
      playSound('tick');
    });
  });

  // Discount mode radios in modal
  document.querySelectorAll('input[name="discountMode"]').forEach(radio => {
    radio.addEventListener('change', (e) => {
      setModalDiscountMode(e.target.value);
      playSound('tick');
    });
  });

  // Preset discount pills in modal
  document.querySelectorAll('#tieredPresets .preset-pill').forEach(pill => {
    pill.addEventListener('click', () => {
      document.getElementById('inputDisc1').value = pill.dataset.d1;
      document.getElementById('inputDisc2').value = pill.dataset.d2;
      recalcModalItemPreview();
      playSound('tick');
    });
  });

  // Inputs triggering recalculation in modal
  ['inputQty', 'inputUnitPrice', 'inputDisc1', 'inputDisc2', 'inputDiscSingle', 'inputDiscNominal', 'inputUnit'].forEach(id => {
    const el = document.getElementById(id);
    if (el) {
      el.addEventListener('input', recalcModalItemPreview);
    }
  });

  // Free Quick Discount Calculator Modal
  document.getElementById('openQuickCalcBtn')?.addEventListener('click', () => {
    recalcQuickFreeCalc();
    showModal('quickCalcModal');
    playSound('click');
  });
  document.getElementById('closeQuickCalcBtn')?.addEventListener('click', () => hideModal('quickCalcModal'));
  document.getElementById('closeQuickCalcActionBtn')?.addEventListener('click', () => hideModal('quickCalcModal'));
  ['freePriceInput', 'freeD1Input', 'freeD2Input'].forEach(id => {
    const el = document.getElementById(id);
    if (el) el.addEventListener('input', recalcQuickFreeCalc);
  });

  // Receipt Modal actions
  document.getElementById('closeReceiptModalBtn')?.addEventListener('click', () => hideModal('receiptModal'));
  document.getElementById('copyReceiptTextBtn')?.addEventListener('click', copyReceiptText);
  document.getElementById('loadReceiptToCartBtn')?.addEventListener('click', loadReceiptToCart);

  // Benchmark search input
  document.getElementById('searchBenchmarkInput')?.addEventListener('input', (e) => {
    renderBenchmarkList(e.target.value);
  });
  document.getElementById('addBenchmarkItemBtn')?.addEventListener('click', addNewBenchmarkItem);

  // Danger reset data button
  document.getElementById('resetDataBtn')?.addEventListener('click', () => {
    if (confirm('Yakin ingin mereset data ke standar awal? Semua keranjang dan riwayat akan direset.')) {
      localStorage.clear();
      state.cart = [];
      state.benchmarks = [...DEFAULT_BENCHMARKS];
      state.history = [...DEFAULT_HISTORY];
      state.budgetLimit = 500000;
      saveStateToStorage();
      renderCartItems();
      updateSafetyCapUI();
      renderBenchmarkList();
      renderHistoryTab();
      showToast('Data berhasil direset ke standar pabrik!', 'success');
      playSound('success');
    }
  });

  // Export History button
  document.getElementById('exportHistoryBtn')?.addEventListener('click', () => {
    const dataStr = 'data:text/json;charset=utf-8,' + encodeURIComponent(JSON.stringify({
      history: state.history,
      benchmarks: state.benchmarks,
      budgetLimit: state.budgetLimit,
      exportedAt: new Date().toISOString()
    }, null, 2));
    const dlAnchor = document.createElement('a');
    dlAnchor.setAttribute('href', dataStr);
    dlAnchor.setAttribute('download', `smart-grocery-backup-${new Date().toISOString().split('T')[0]}.json`);
    dlAnchor.click();
    showToast('Data riwayat berhasil diekspor!', 'success');
  });

  // Setup click-outside modal closers
  setupModalClosers();

  // Setup Autocomplete
  setupAutocomplete();

  // Initial renders
  renderCartItems();
  updateSafetyCapUI();

  // Initialize Firebase Realtime Sync Engine
  if (window.FirebaseSync) {
    setupFirebaseIntegration();
  } else {
    window.addEventListener('firebase-ready', () => {
      setupFirebaseIntegration();
    });
  }

  // PWA Offline status detection
  const offlineIndicator = document.getElementById('offlineIndicator');
  function updateOnlineStatus() {
    if (offlineIndicator) {
      offlineIndicator.style.display = navigator.onLine ? 'none' : 'inline-flex';
    }
  }
  window.addEventListener('online', updateOnlineStatus);
  window.addEventListener('offline', updateOnlineStatus);
  updateOnlineStatus();

  // Register Service Worker for PWA
  if ('serviceWorker' in navigator) {
    window.addEventListener('load', () => {
      navigator.serviceWorker.register('./sw.js')
        .then(reg => console.log('PWA ServiceWorker registered:', reg.scope))
        .catch(err => console.warn('PWA ServiceWorker registration failed:', err));
    });
  }

  // Lucide Icons initialization
  if (window.lucide) {
    window.lucide.createIcons();
  }
});
