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
  SOUND: 'smart_grocery_sound_v1'
};

const CATEGORIES = {
  VEGETABLE_FRUIT: { id: 'VEGETABLE_FRUIT', label: 'Sayur & Buah', icon: '🥬', color: '#4ADE80' },
  PROTEIN: { id: 'PROTEIN', label: 'Daging & Telur', icon: '🥩', color: '#F87171' },
  SPICE_PANTRY: { id: 'SPICE_PANTRY', label: 'Bumbu & Pokok', icon: '🧂', color: '#FBBF24' },
  DAIRY: { id: 'DAIRY', label: 'Susu & Olahan', icon: '🥛', color: '#38BDF8' },
  SNACK_DRINK: { id: 'SNACK_DRINK', label: 'Snack & Minuman', icon: '🍪', color: '#C084FC' },
  HOUSEHOLD: { id: 'HOUSEHOLD', label: 'Rumah & Mandi', icon: '🧼', color: '#7DD3FC' },
  OTHER: { id: 'OTHER', label: 'Lainnya', icon: '📦', color: '#CBD5E1' }
};

// Seed Realistic Benchmark Prices (Harga Patokan Resmi Bulan Lalu)
const DEFAULT_BENCHMARKS = [
  { name: 'Beras Ramos Super 5kg', category: 'SPICE_PANTRY', unit: 'pcs', price: 74000, lastUpdated: '2026-09-07' },
  { name: 'Telur Ayam Negeri', category: 'PROTEIN', unit: 'kg', price: 28000, lastUpdated: '2026-09-07' },
  { name: 'Minyak Goreng Sawit 2L', category: 'SPICE_PANTRY', unit: 'pouch', price: 34500, lastUpdated: '2026-09-07' },
  { name: 'Dada Ayam Fillet', category: 'PROTEIN', unit: 'kg', price: 47500, lastUpdated: '2026-09-07' },
  { name: 'Indomie Goreng Spesial', category: 'SPICE_PANTRY', unit: 'bks', price: 3100, lastUpdated: '2026-09-07' },
  { name: 'Susu UHT Full Cream 1L', category: 'DAIRY', unit: 'liter', price: 18500, lastUpdated: '2026-09-07' },
  { name: 'Kecap Manis Refill 550ml', category: 'SPICE_PANTRY', unit: 'bks', price: 21500, lastUpdated: '2026-09-07' },
  { name: 'Bawang Merah', category: 'SPICE_PANTRY', unit: 'g', price: 12000, lastUpdated: '2026-09-07' }, // per 250g
  { name: 'Bawang Putih Kating', category: 'SPICE_PANTRY', unit: 'g', price: 11000, lastUpdated: '2026-09-07' },
  { name: 'Sabun Mandi Cair Refill 450ml', category: 'HOUSEHOLD', unit: 'bks', price: 22000, lastUpdated: '2026-09-07' },
  { name: 'Shampoo Anti Dandruff 160ml', category: 'HOUSEHOLD', unit: 'botol', price: 24000, lastUpdated: '2026-09-07' },
  { name: 'Pasta Gigi Fresh 150g', category: 'HOUSEHOLD', unit: 'pcs', price: 15500, lastUpdated: '2026-09-07' },
  { name: 'Deterjen Cair Konsentrat 750ml', category: 'HOUSEHOLD', unit: 'bks', price: 19500, lastUpdated: '2026-09-07' },
  { name: 'Sayur Bayam Segar', category: 'VEGETABLE_FRUIT', unit: 'ikat', price: 3500, lastUpdated: '2026-09-07' },
  { name: 'Wortel Segar', category: 'VEGETABLE_FRUIT', unit: 'kg', price: 16000, lastUpdated: '2026-09-07' },
  { name: 'Tempe Papan', category: 'PROTEIN', unit: 'pcs', price: 6000, lastUpdated: '2026-09-07' },
  { name: 'Tahu Sutra Box', category: 'PROTEIN', unit: 'box', price: 8000, lastUpdated: '2026-09-07' },
  { name: 'Kopi Instan 10 Sachet', category: 'SNACK_DRINK', unit: 'pack', price: 14000, lastUpdated: '2026-09-07' },
  { name: 'Biskuit Gandum', category: 'SNACK_DRINK', unit: 'pack', price: 10500, lastUpdated: '2026-09-07' },
  { name: 'Roti Tawar Gandum Kupas', category: 'SNACK_DRINK', unit: 'bks', price: 16500, lastUpdated: '2026-09-07' }
];

// Seed Previous Shopping Trips (History)
const DEFAULT_HISTORY = [
  {
    id: 'trip-hist-2026-09',
    date: '2026-09-07T14:30:00.000Z',
    dateFormatted: '07 September 2026, 14:30',
    store: 'Superindo',
    budgetLimit: 500000,
    totalSpent: 412200,
    totalSaved: 38500,
    itemsCount: 8,
    items: [
      { name: 'Beras Ramos Super 5kg', category: 'SPICE_PANTRY', unit: 'pcs', qty: 1, price: 74000, netUnitPrice: 74000, subtotal: 74000 },
      { name: 'Telur Ayam Negeri', category: 'PROTEIN', unit: 'kg', qty: 1.5, price: 28000, netUnitPrice: 28000, subtotal: 42000 },
      { name: 'Minyak Goreng Sawit 2L', category: 'SPICE_PANTRY', unit: 'pouch', qty: 1, price: 34500, netUnitPrice: 34500, subtotal: 34500 },
      { name: 'Dada Ayam Fillet', category: 'PROTEIN', unit: 'kg', qty: 1, price: 50000, netUnitPrice: 47500, subtotal: 47500, discountDesc: '5%' },
      { name: 'Susu UHT Full Cream 1L', category: 'DAIRY', unit: 'liter', qty: 3, price: 20000, netUnitPrice: 18500, subtotal: 55500, discountDesc: 'Rp 1.500/pcs' },
      { name: 'Indomie Goreng Spesial', category: 'SPICE_PANTRY', unit: 'bks', qty: 10, price: 3100, netUnitPrice: 3100, subtotal: 31000 },
      { name: 'Sabun Mandi Cair Refill 450ml', category: 'HOUSEHOLD', unit: 'bks', qty: 2, price: 26000, netUnitPrice: 22000, subtotal: 44000, discountDesc: 'Beli 2 Diskon' },
      { name: 'Kopi Instan 10 Sachet', category: 'SNACK_DRINK', unit: 'pack', qty: 2, price: 14000, netUnitPrice: 14000, subtotal: 28000 }
    ]
  }
];

// Initial starter cart items for immediate trolley experience
const STARTER_CART = [
  {
    id: 'item-1',
    name: 'Beras Ramos Super 5kg',
    category: 'SPICE_PANTRY',
    unit: 'pcs',
    qty: 1,
    price: 75000,
    discountMode: 'SINGLE',
    disc1: 5,
    disc2: 0,
    discNominal: 0,
    netUnitPrice: 71250,
    subtotal: 71250,
    savedAmount: 3750
  },
  {
    id: 'item-2',
    name: 'Telur Ayam Negeri',
    category: 'PROTEIN',
    unit: 'kg',
    qty: 1,
    price: 26500,
    discountMode: 'NONE',
    disc1: 0,
    disc2: 0,
    discNominal: 0,
    netUnitPrice: 26500,
    subtotal: 26500,
    savedAmount: 0
  },
  {
    id: 'item-3',
    name: 'Minyak Goreng Sawit 2L',
    category: 'SPICE_PANTRY',
    unit: 'pouch',
    qty: 1,
    price: 36000,
    discountMode: 'TIERED',
    disc1: 10,
    disc2: 5,
    discNominal: 0,
    netUnitPrice: 30780,
    subtotal: 30780,
    savedAmount: 5220
  }
];

// ===================================================================
// APPLICATION STATE
// ===================================================================

const state = {
  cart: [],
  benchmarks: [],
  history: [],
  budgetLimit: 500000,
  store: 'Superindo',
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
    educationNote = `Diskon langsung ${p1}% • Hemat Rp ${formatRupiahSimple(discountPerUnit)}/unit`;
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
  
  // Fuzzy or exact matching in benchmark catalogue
  const match = state.benchmarks.find(b => {
    const bName = b.name.toLowerCase();
    return bName === cleanName || bName.includes(cleanName) || cleanName.includes(bName);
  });

  if (!match) {
    return {
      hasBenchmark: false,
      status: 'NEW',
      label: '✨ Produk Baru',
      symbol: '✨',
      diffRp: 0,
      diffPercent: 0,
      message: 'Item ini baru! Akan otomatis dicatat sebagai patokan harga bulan depan.'
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
      label: `↑ +Rp ${formatRupiahSimple(diffRp)} (+${diffPercent.toFixed(1)}%)`,
      symbol: '↑',
      diffRp,
      diffPercent,
      message: `Lebih mahal Rp ${formatRupiahSimple(diffRp)} (+${diffPercent.toFixed(1)}%) dibanding bulan lalu (Rp ${formatRupiahSimple(lastPrice)})!`
    };
  } else if (diffRp < 0) {
    const absDiff = Math.abs(diffRp);
    const absPct = Math.abs(diffPercent);
    return {
      hasBenchmark: true,
      lastPrice,
      status: 'LOWER',
      label: `↓ -Rp ${formatRupiahSimple(absDiff)} (-${absPct.toFixed(1)}%)`,
      symbol: '↓',
      diffRp,
      diffPercent,
      message: `Lebih murah! Berhemat Rp ${formatRupiahSimple(absDiff)} (-${absPct.toFixed(1)}%) dibanding bulan lalu (Rp ${formatRupiahSimple(lastPrice)})! 🎉`
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
      message: `Harga stabil, sama persis seperti bulan lalu (Rp ${formatRupiahSimple(lastPrice)}).`
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
    state.cart = savedCart ? JSON.parse(savedCart) : [...STARTER_CART];

    const savedBenchmarks = localStorage.getItem(STORAGE_KEYS.BENCHMARKS);
    state.benchmarks = savedBenchmarks ? JSON.parse(savedBenchmarks) : [...DEFAULT_BENCHMARKS];

    const savedHistory = localStorage.getItem(STORAGE_KEYS.HISTORY);
    state.history = savedHistory ? JSON.parse(savedHistory) : [...DEFAULT_HISTORY];

    const savedBudget = localStorage.getItem(STORAGE_KEYS.BUDGET);
    state.budgetLimit = savedBudget ? parseInt(savedBudget, 10) : 500000;

    const savedStore = localStorage.getItem(STORAGE_KEYS.STORE);
    state.store = savedStore || 'Superindo';

    const savedSound = localStorage.getItem(STORAGE_KEYS.SOUND);
    state.soundEnabled = savedSound !== null ? savedSound === 'true' : true;
  } catch (err) {
    console.error('Failed to load localStorage data:', err);
    state.cart = [...STARTER_CART];
    state.benchmarks = [...DEFAULT_BENCHMARKS];
    state.history = [...DEFAULT_HISTORY];
  }
}

function saveStateToStorage() {
  try {
    localStorage.setItem(STORAGE_KEYS.CART, JSON.stringify(state.cart));
    localStorage.setItem(STORAGE_KEYS.BENCHMARKS, JSON.stringify(state.benchmarks));
    localStorage.setItem(STORAGE_KEYS.HISTORY, JSON.stringify(state.history));
    localStorage.setItem(STORAGE_KEYS.BUDGET, state.budgetLimit.toString());
    localStorage.setItem(STORAGE_KEYS.STORE, state.store);
    localStorage.setItem(STORAGE_KEYS.SOUND, state.soundEnabled.toString());
  } catch (err) {
    console.error('Failed to save to localStorage:', err);
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

  // Status classification
  if (percentage < 75) {
    // 🟢 AMAN
    safetyStatusBadge.className = 'safety-status-badge status-safe';
    safetyStatusText.textContent = 'AMAN';
    remainingCaptionEl.textContent = 'Sisa Dompet';
    remainingBudgetEl.className = 'number-val highlight-safe';
    remainingBudgetEl.textContent = formatRupiah(remainingBudget);
    meterFill.style.background = 'linear-gradient(90deg, #10B981 0%, #059669 100%)';
    safetyAlertBanner.style.display = 'none';
    hasAlertedCritcal = false;
  } else if (percentage < 95) {
    // 🟡 WASPADA
    safetyStatusBadge.className = 'safety-status-badge status-warning';
    safetyStatusText.textContent = 'WASPADA';
    remainingCaptionEl.textContent = 'Sisa Dompet';
    remainingBudgetEl.className = 'number-val highlight-warning';
    remainingBudgetEl.textContent = formatRupiah(remainingBudget);
    meterFill.style.background = 'linear-gradient(90deg, #F59E0B 0%, #D97706 100%)';
    safetyAlertBanner.style.display = 'flex';
    safetyAlertMessage.textContent = `Awas! Belanjaan telah mencapai ${percentage.toFixed(0)}% dari batas dompet.`;
    hasAlertedCritcal = false;
  } else {
    // 🔴 KRITIS / OVER BUDGET
    safetyStatusBadge.className = 'safety-status-badge status-danger';
    meterFill.style.background = 'linear-gradient(90deg, #F43F5E 0%, #BE123C 100%)';
    safetyAlertBanner.style.display = 'flex';

    if (remainingBudget >= 0) {
      safetyStatusText.textContent = 'KRITIS';
      remainingCaptionEl.textContent = 'Sisa Kritis';
      remainingBudgetEl.className = 'number-val highlight-danger';
      remainingBudgetEl.textContent = formatRupiah(remainingBudget);
      safetyAlertMessage.textContent = `⚠️ Sisa dompet kritis (${percentage.toFixed(0)}% terpakai)! Pertimbangkan barang non-esensial.`;
    } else {
      safetyStatusText.textContent = 'OVER LIMIT';
      remainingCaptionEl.textContent = 'Defisit / Kurang';
      remainingBudgetEl.className = 'number-val highlight-danger';
      remainingBudgetEl.textContent = `-${formatRupiah(Math.abs(remainingBudget))}`;
      safetyAlertMessage.textContent = `🚨 OVER BUDGET! Keranjang melebihi batas Rp ${formatRupiahSimple(Math.abs(remainingBudget))}. Segera keluarkan barang!`;
    }

    if (!hasAlertedCritcal && percentage >= 95) {
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
  if (!container || !emptyView) return;

  const filteredItems = state.cart.filter(item => {
    if (state.activeCategoryFilter === 'ALL') return true;
    return item.category === state.activeCategoryFilter;
  });

  if (state.cart.length === 0) {
    container.innerHTML = '';
    emptyView.style.display = 'flex';
    return;
  } else {
    emptyView.style.display = 'none';
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
            <button class="mini-action-btn btn-delete" onclick="deleteCartItem('${item.id}')" title="Hapus Item" aria-label="Hapus">
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

        <!-- Bottom Stepper & Realtime Subtotal -->
        <div class="item-bottom-row">
          <div class="stepper-control">
            <button type="button" class="stepper-btn" onclick="stepItemQty('${item.id}', -1)" aria-label="Kurang Qty">-</button>
            <input type="number" class="stepper-input" value="${item.qty}" min="0.1" step="any" onchange="updateItemQtyInput('${item.id}', this.value)" aria-label="Kuantitas">
            <button type="button" class="stepper-btn" onclick="stepItemQty('${item.id}', 1)" aria-label="Tambah Qty">+</button>
          </div>

          <div class="item-subtotal-group">
            <span class="unit-price-caption">${item.qty} × ${formatRupiah(item.netUnitPrice)}</span>
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
    // If dropping to 0, ask confirmation to remove
    deleteCartItem(id);
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
    renderCartItems();
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

function deleteCartItem(id) {
  const item = state.cart.find(it => it.id === id);
  if (!item) return;

  if (confirm(`Hapus "${item.name}" dari troli?`)) {
    state.cart = state.cart.filter(it => it.id !== id);
    playSound('click');
    triggerHaptic(30);
    saveStateToStorage();
    renderCartItems();
    updateSafetyCapUI();
    showToast(`"${item.name}" dihapus dari troli`, 'info');
  }
}

// ===================================================================
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
  document.getElementById('modalSubtotalFormula').textContent = `${qty} × ${formatRupiah(discCalc.netPrice)}`;
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

  if (!calculated.name) {
    alert('Silakan masukkan nama produk');
    return;
  }
  if (calculated.basePrice <= 0) {
    alert('Silakan masukkan harga satuan yang valid');
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

// ===================================================================
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
      <p>${escapeHtml(trip.store)} • SMART GROCERY</p>
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
      Catatan Belanja Anak Rantau • Anti Boros
    </p>
  `;

  showModal('receiptModal');
  playSound('click');
}

function copyReceiptText() {
  if (!activeViewingReceiptTrip) return;
  const trip = activeViewingReceiptTrip;

  let text = `🛒 STRUK BELANJA - ${trip.store}\n`;
  text += `📅 Tanggal: ${trip.dateFormatted}\n`;
  text += `--------------------------------\n`;
  trip.items.forEach(it => {
    text += `• ${it.name} (${it.qty} ${it.unit}): ${formatRupiah(it.subtotal)}\n`;
  });
  text += `--------------------------------\n`;
  text += `💰 Total Belanja: ${formatRupiah(trip.totalSpent)}\n`;
  text += `✨ Total Hemat: ${formatRupiah(trip.totalSaved)}\n`;
  text += `🎯 Limit Anggaran: ${formatRupiah(trip.budgetLimit)}\n`;

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
        <div class="bench-spec">${CATEGORIES[b.category]?.label || 'Lainnya'} • per ${formatUnitLabel(b.unit)}</div>
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
    modal.classList.add('open');
    modal.setAttribute('aria-hidden', 'false');
  }
}

function hideModal(modalId) {
  const modal = document.getElementById(modalId);
  if (modal) {
    modal.classList.remove('open');
    modal.setAttribute('aria-hidden', 'true');
  }
}

function setupModalClosers() {
  document.querySelectorAll('.modal-overlay').forEach(modal => {
    modal.addEventListener('click', (e) => {
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

  // Store select
  const storeSelect = document.getElementById('storeSelect');
  if (storeSelect) {
    storeSelect.value = state.store;
    storeSelect.addEventListener('change', (e) => {
      state.store = e.target.value;
      saveStateToStorage();
    });
  }

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
      state.cart = [...STARTER_CART];
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
