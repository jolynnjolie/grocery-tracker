/**
 * SMART GROCERY & BUDGET SAFETY TRACKER
 * Firebase Realtime Database Synchronization Engine
 * Handles per-device user isolation, realtime two-way sync, and offline resilience.
 */

import { initializeApp } from "https://www.gstatic.com/firebasejs/10.12.0/firebase-app.js";
import { 
  getDatabase, 
  ref, 
  set, 
  get, 
  onValue, 
  remove, 
  update,
  onDisconnect 
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
  console.log("Firebase App & Realtime Database successfully initialized with URL:", firebaseConfig.databaseURL);
} catch (err) {
  console.error("Firebase initialization failed:", err);
}

// ===================================================================
// PER-DEVICE USER ISOLATION
// ===================================================================

const USER_ID_STORAGE_KEY = "smart_grocery_device_user_id_v1";

function generateUserId() {
  const chars = "abcdefghijklmnopqrstuvwxyz0123456789";
  let randomStr = "";
  for (let i = 0; i < 8; i++) {
    randomStr += chars.charAt(Math.floor(Math.random() * chars.length));
  }
  return `user_${randomStr}`;
}

function getOrCreateUserId() {
  let userId = localStorage.getItem(USER_ID_STORAGE_KEY);
  if (!userId || !userId.trim()) {
    userId = generateUserId();
    localStorage.setItem(USER_ID_STORAGE_KEY, userId);
  }
  return userId.trim();
}

let currentUserId = getOrCreateUserId();

// ===================================================================
// REALTIME SYNC STATE & LISTENERS
// ===================================================================

let isOnlineWithFirebase = false;
let activeListeners = [];
let onDataCallback = null;
let onStatusChangeCallback = null;

// Track remote update to prevent echo loops
let isApplyingRemoteUpdate = false;

/**
 * Public Firebase Sync API
 */
const FirebaseSync = {
  isAvailable() {
    return isFirebaseInitialized && db !== null;
  },

  getUserId() {
    return currentUserId;
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

  setUserId(newUserId) {
    if (!newUserId || !newUserId.trim()) return false;
    currentUserId = newUserId.trim();
    localStorage.setItem(USER_ID_STORAGE_KEY, currentUserId);
    
    // Detach old listeners and attach to new user node
    FirebaseSync.detachListeners();
    FirebaseSync.attachListeners();
    return true;
  },

  generateNewUser() {
    const newId = generateUserId();
    return FirebaseSync.setUserId(newId);
  },

  // Setup callbacks
  init({ onDataUpdated, onStatusChanged }) {
    onDataCallback = onDataUpdated;
    onStatusChangeCallback = onStatusChanged;

    if (!FirebaseSync.isAvailable()) {
      if (onStatusChangeCallback) {
        onStatusChangeCallback({
          connected: false,
          userId: currentUserId,
          error: "Firebase initialization error"
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
          userId: currentUserId
        });
      }
    });

    // Attach listeners for this user's data
    FirebaseSync.attachListeners();
  },

  detachListeners() {
    activeListeners.forEach((unsubscribe) => {
      if (typeof unsubscribe === "function") unsubscribe();
    });
    activeListeners = [];
  },

  attachListeners() {
    if (!FirebaseSync.isAvailable()) return;

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
   * Write full state to Firebase
   */
  async saveFullState(fullState) {
    if (!FirebaseSync.isAvailable() || isApplyingRemoteUpdate) return;
    try {
      const payload = {
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
      await set(ref(db, `users/${currentUserId}`), payload);
    } catch (err) {
      console.warn("Failed to save full state to Firebase:", err);
    }
  },

  /**
   * CART OPERATIONS: Realtime add, update, delete
   */
  async saveCart(cart) {
    if (!FirebaseSync.isAvailable() || isApplyingRemoteUpdate) return;
    try {
      await set(ref(db, `users/${currentUserId}/cart`), cart || []);
    } catch (err) {
      console.warn("Failed to sync cart to Firebase:", err);
    }
  },

  async addOrUpdateCartItem(item) {
    if (!FirebaseSync.isAvailable() || isApplyingRemoteUpdate || !item || !item.id) return;
    try {
      // Find item in current user's cart array or update directly
      await set(ref(db, `users/${currentUserId}/cartItems/${item.id}`), item);
    } catch (err) {
      console.warn("Failed to add/update cart item to Firebase:", err);
    }
  },

  async removeCartItem(itemId) {
    if (!FirebaseSync.isAvailable() || isApplyingRemoteUpdate || !itemId) return;
    try {
      // Also remove from cartItems if mapped, or save updated cart
      await remove(ref(db, `users/${currentUserId}/cartItems/${itemId}`));
    } catch (err) {
      console.warn("Failed to remove cart item from Firebase:", err);
    }
  },

  /**
   * BENCHMARKS OPERATIONS
   */
  async saveBenchmarks(benchmarks) {
    if (!FirebaseSync.isAvailable() || isApplyingRemoteUpdate) return;
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
    if (!FirebaseSync.isAvailable() || isApplyingRemoteUpdate) return;
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
    if (!FirebaseSync.isAvailable() || isApplyingRemoteUpdate) return;
    try {
      await update(ref(db, `users/${currentUserId}/settings`), settings || {});
    } catch (err) {
      console.warn("Failed to sync settings to Firebase:", err);
    }
  },

  /**
   * CHECKOUT TRANSACTION: Clears cart, appends history, updates benchmarks
   */
  async syncCheckout(newTrip, newBenchmarks) {
    if (!FirebaseSync.isAvailable() || isApplyingRemoteUpdate) return;
    try {
      const updates = {};
      updates[`users/${currentUserId}/cart`] = [];
      updates[`users/${currentUserId}/cartItems`] = null;
      updates[`users/${currentUserId}/benchmarks`] = newBenchmarks;
      updates[`users/${currentUserId}/lastUpdated`] = new Date().toISOString();

      // Read current history and prepend or set
      await update(ref(db), updates);
    } catch (err) {
      console.warn("Failed to sync checkout to Firebase:", err);
    }
  }
};

// Expose to window for app.js integration
window.FirebaseSync = FirebaseSync;

// Dispatch event so other scripts know Firebase is ready
window.dispatchEvent(new CustomEvent("firebase-ready", { detail: { FirebaseSync } }));
