/**
 * SMART GROCERY & BUDGET SAFETY TRACKER
 * Firebase Realtime Database Synchronization Engine
 * Handles per-device user registration, account isolation, and realtime sync.
 */

import { initializeApp } from "https://www.gstatic.com/firebasejs/10.12.0/firebase-app.js";
import { 
  getDatabase, 
  ref, 
  set, 
  get, 
  onValue, 
  remove, 
  update 
} from "https://www.gstatic.com/firebasejs/10.12.0/firebase-database.js";

// ===================================================================
// FIREBASE CONFIGURATION
// ===================================================================

const DEFAULT_DB_URL = "https://grocery-tracker-4ac7c-default-rtdb.firebaseio.com";
const SAVED_DB_URL_KEY = "smart_grocery_rtdb_url_v1";

const firebaseConfig = {
  apiKey: "AIzaSyCjY8oicimEjKRIV59ak9QKOhYVV6O1dLo",
  authDomain: "grocery-tracker-4ac7c.firebaseapp.com",
  projectId: "grocery-tracker-4ac7c",
  storageBucket: "grocery-tracker-4ac7c.firebasestorage.app",
  messagingSenderId: "656633759813",
  appId: "1:656633759813:web:578dc000b1fcd77d393b2c",
  databaseURL: localStorage.getItem(SAVED_DB_URL_KEY) || DEFAULT_DB_URL
};

// Initialize Firebase App
let app = null;
let db = null;
let isFirebaseInitialized = false;

try {
  app = initializeApp(firebaseConfig);
  db = getDatabase(app);
  isFirebaseInitialized = true;
  console.log("Firebase Realtime Database initialized with URL:", firebaseConfig.databaseURL);
} catch (err) {
  console.error("Firebase initialization failed:", err);
}

// ===================================================================
// PER-DEVICE USER REGISTRATION & ISOLATION
// ===================================================================

const USER_ACCOUNT_STORAGE_KEY = "smart_grocery_user_account_v2";

function getStoredAccount() {
  try {
    const raw = localStorage.getItem(USER_ACCOUNT_STORAGE_KEY);
    if (!raw) return null;
    const parsed = JSON.parse(raw);
    if (parsed && parsed.userId && parsed.userId.trim()) {
      return {
        userId: parsed.userId.trim(),
        displayName: (parsed.displayName || parsed.userId).trim(),
        registeredAt: parsed.registeredAt || new Date().toISOString()
      };
    }
  } catch (e) {
    console.warn("Failed to parse stored user account:", e);
  }
  return null;
}

function generateRandomSuffix(name = "user") {
  const clean = name.trim().toLowerCase().replace(/[^a-z0-9]/g, "").substring(0, 8);
  const chars = "abcdefghijklmnopqrstuvwxyz0123456789";
  let rand = "";
  for (let i = 0; i < 4; i++) {
    rand += chars.charAt(Math.floor(Math.random() * chars.length));
  }
  return `${clean || "user"}_${rand}`;
}

let currentAccount = getStoredAccount();
let currentUserId = currentAccount ? currentAccount.userId : null;

// ===================================================================
// REALTIME SYNC STATE & LISTENERS
// ===================================================================

let isOnlineWithFirebase = false;
let activeListeners = [];
let onDataCallback = null;
let onStatusChangeCallback = null;
let isApplyingRemoteUpdate = false;

/**
 * Public Firebase Sync API
 */
const FirebaseSync = {
  isAvailable() {
    return isFirebaseInitialized && db !== null;
  },

  isRegistered() {
    return !!currentAccount && !!currentUserId;
  },

  getAccount() {
    return currentAccount;
  },

  getUserId() {
    return currentUserId || "";
  },

  getDisplayName() {
    return currentAccount ? (currentAccount.displayName || currentAccount.userId) : "Tamu";
  },

  getDatabaseUrl() {
    return firebaseConfig.databaseURL;
  },

  setDatabaseUrl(newUrl) {
    if (!newUrl || !newUrl.trim()) return false;
    localStorage.setItem(SAVED_DB_URL_KEY, newUrl.trim());
    window.location.reload();
    return true;
  },

  generateSuggestedUserId(name) {
    return generateRandomSuffix(name);
  },

  /**
   * Register or Switch user on this device
   */
  registerUser({ userId, displayName }) {
    if (!userId || !userId.trim()) return false;

    const cleanUserId = userId.trim().toLowerCase().replace(/[^a-z0-9_-]/g, "") || generateRandomSuffix("user");
    const cleanDisplayName = (displayName || cleanUserId).trim();

    currentAccount = {
      userId: cleanUserId,
      displayName: cleanDisplayName,
      registeredAt: new Date().toISOString()
    };
    currentUserId = cleanUserId;

    try {
      localStorage.setItem(USER_ACCOUNT_STORAGE_KEY, JSON.stringify(currentAccount));
    } catch (e) {
      console.warn("Local storage write error:", e);
    }

    // Attach listeners to new user node
    FirebaseSync.detachListeners();
    FirebaseSync.attachListeners();

    // Save profile to Firebase Realtime Database asynchronously in background
    if (FirebaseSync.isAvailable()) {
      update(ref(db, `users/${currentUserId}/profile`), {
        userId: cleanUserId,
        displayName: cleanDisplayName,
        lastActive: new Date().toISOString()
      }).catch(err => {
        console.warn("Background Firebase profile save warning:", err);
      });
    }

    if (onStatusChangeCallback) {
      onStatusChangeCallback({
        connected: isOnlineWithFirebase,
        userId: currentUserId,
        displayName: cleanDisplayName
      });
    }

    return currentAccount;
  },

  /**
   * Logout / Switch Account: resets local registered account
   */
  logoutOrSwitch() {
    localStorage.removeItem(USER_ACCOUNT_STORAGE_KEY);
    currentAccount = null;
    currentUserId = null;
    FirebaseSync.detachListeners();

    if (onStatusChangeCallback) {
      onStatusChangeCallback({
        connected: isOnlineWithFirebase,
        userId: null,
        displayName: null
      });
    }
  },

  /**
   * Initialize sync engine
   */
  init({ onDataUpdated, onStatusChanged }) {
    onDataCallback = onDataUpdated;
    onStatusChangeCallback = onStatusChanged;

    if (!FirebaseSync.isAvailable()) {
      if (onStatusChangeCallback) {
        onStatusChangeCallback({
          connected: false,
          userId: currentUserId,
          error: "Firebase gagal terhubung"
        });
      }
      return;
    }

    // Monitor Firebase connection status
    const connectedRef = ref(db, ".info/connected");
    onValue(connectedRef, (snap) => {
      isOnlineWithFirebase = snap.val() === true;
      if (onStatusChangeCallback) {
        onStatusChangeCallback({
          connected: isOnlineWithFirebase,
          userId: currentUserId,
          displayName: currentAccount?.displayName || null
        });
      }
    });

    // If user is already registered, attach listeners
    if (FirebaseSync.isRegistered()) {
      FirebaseSync.attachListeners();
    }
  },

  detachListeners() {
    activeListeners.forEach((unsubscribe) => {
      if (typeof unsubscribe === "function") unsubscribe();
    });
    activeListeners = [];
  },

  attachListeners() {
    if (!FirebaseSync.isAvailable() || !currentUserId) return;

    FirebaseSync.detachListeners();
    const userRef = ref(db, `users/${currentUserId}`);

    // Listen to entire user branch
    const unsubscribe = onValue(userRef, (snapshot) => {
      const data = snapshot.val();
      if (data && onDataCallback) {
        isApplyingRemoteUpdate = true;
        try {
          onDataCallback(data);
        } finally {
          isApplyingRemoteUpdate = false;
        }
      }
    }, (err) => {
      console.warn("Realtime listener error:", err);
      if (onStatusChangeCallback) {
        onStatusChangeCallback({
          connected: false,
          userId: currentUserId,
          error: err.message
        });
      }
    });

    activeListeners.push(unsubscribe);
  },

  /**
   * Check if remote user node exists in Firebase
   */
  async checkUserExists(userId) {
    if (!FirebaseSync.isAvailable() || !userId) return false;
    try {
      const snap = await get(ref(db, `users/${userId}`));
      return snap.exists();
    } catch (e) {
      return false;
    }
  },

  /**
   * Write full state to Firebase
   */
  async saveFullState(fullState) {
    if (!FirebaseSync.isAvailable() || isApplyingRemoteUpdate || !currentUserId) return;
    try {
      const payload = {
        profile: {
          userId: currentUserId,
          displayName: currentAccount?.displayName || currentUserId,
          lastUpdated: new Date().toISOString()
        },
        cart: fullState.cart || [],
        benchmarks: fullState.benchmarks || [],
        history: fullState.history || [],
        settings: {
          budgetLimit: fullState.budgetLimit || 500000,
          store: fullState.store || 'Superindo',
          soundEnabled: fullState.soundEnabled !== false
        },
        lastUpdated: new Date().toISOString()
      };
      await update(ref(db, `users/${currentUserId}`), payload);
    } catch (err) {
      console.warn("Failed to save full state to Firebase:", err);
    }
  },

  /**
   * CART OPERATIONS: Realtime save, add, remove
   */
  async saveCart(cart) {
    if (!FirebaseSync.isAvailable() || isApplyingRemoteUpdate || !currentUserId) return;
    try {
      await set(ref(db, `users/${currentUserId}/cart`), cart || []);
    } catch (err) {
      console.warn("Failed to sync cart to Firebase:", err);
    }
  },

  async removeCartItem(itemId) {
    if (!FirebaseSync.isAvailable() || isApplyingRemoteUpdate || !currentUserId || !itemId) return;
    try {
      await remove(ref(db, `users/${currentUserId}/cartItems/${itemId}`));
    } catch (err) {
      console.warn("Failed to remove cart item from Firebase:", err);
    }
  },

  /**
   * BENCHMARKS OPERATIONS
   */
  async saveBenchmarks(benchmarks) {
    if (!FirebaseSync.isAvailable() || isApplyingRemoteUpdate || !currentUserId) return;
    try {
      await set(ref(db, `users/${currentUserId}/benchmarks`), benchmarks || []);
    } catch (err) {
      console.warn("Failed to sync benchmarks to Firebase:", err);
    }
  },

  /**
   * HISTORY OPERATIONS
   */
  async saveHistory(history) {
    if (!FirebaseSync.isAvailable() || isApplyingRemoteUpdate || !currentUserId) return;
    try {
      await set(ref(db, `users/${currentUserId}/history`), history || []);
    } catch (err) {
      console.warn("Failed to sync history to Firebase:", err);
    }
  },

  /**
   * SETTINGS OPERATIONS
   */
  async saveSettings(settings) {
    if (!FirebaseSync.isAvailable() || isApplyingRemoteUpdate || !currentUserId) return;
    try {
      await update(ref(db, `users/${currentUserId}/settings`), settings || {});
    } catch (err) {
      console.warn("Failed to sync settings to Firebase:", err);
    }
  }
};

// Expose to window for app.js integration
window.FirebaseSync = FirebaseSync;

// Dispatch event so other scripts know Firebase is ready
window.dispatchEvent(new CustomEvent("firebase-ready", { detail: { FirebaseSync } }));
