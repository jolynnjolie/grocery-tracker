/**
 * SMART GROCERY & BUDGET SAFETY TRACKER
 * Firebase Cloud Firestore Synchronization Engine
 * Handles per-device user registration, account isolation, and realtime sync via onSnapshot.
 */

import { initializeApp } from "https://www.gstatic.com/firebasejs/10.12.0/firebase-app.js";
import { 
  getFirestore, 
  doc, 
  setDoc, 
  getDoc, 
  onSnapshot 
} from "https://www.gstatic.com/firebasejs/10.12.0/firebase-firestore.js";

// ===================================================================
// FIREBASE CONFIGURATION (Cloud Firestore)
// ===================================================================

const firebaseConfig = {
  apiKey: "AIzaSyCjY8oicimEjKRIV59ak9QKOhYVV6O1dLo",
  authDomain: "grocery-tracker-4ac7c.firebaseapp.com",
  projectId: "grocery-tracker-4ac7c",
  storageBucket: "grocery-tracker-4ac7c.firebasestorage.app",
  messagingSenderId: "656633759813",
  appId: "1:656633759813:web:578dc000b1fcd77d393b2c"
};

// Initialize Firebase App & Firestore
let app = null;
let db = null;
let isFirebaseInitialized = false;

try {
  app = initializeApp(firebaseConfig);
  db = getFirestore(app);
  isFirebaseInitialized = true;
  console.log("Firebase Cloud Firestore initialized successfully for:", firebaseConfig.projectId);
} catch (err) {
  console.error("Firebase Firestore initialization failed:", err);
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
// REALTIME SYNC STATE & LISTENERS (onSnapshot)
// ===================================================================

let isOnlineWithFirebase = false;
let activeListeners = [];
let onDataCallback = null;
let onStatusChangeCallback = null;
let isApplyingRemoteUpdate = false;

/**
 * Public Firebase Sync API (Cloud Firestore)
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

    // Attach listeners to new user document
    FirebaseSync.detachListeners();
    FirebaseSync.attachListeners();

    // Save profile to Cloud Firestore
    if (FirebaseSync.isAvailable()) {
      const userDocRef = doc(db, "users", cleanUserId);
      setDoc(userDocRef, {
        profile: {
          userId: cleanUserId,
          displayName: cleanDisplayName,
          lastActive: new Date().toISOString()
        }
      }, { merge: true }).catch(err => {
        console.warn("Background Firestore profile save warning:", err);
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
   * Logout / Switch Account
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
   * Initialize Firestore sync engine
   */
  init({ onDataUpdated, onStatusChanged }) {
    onDataCallback = onDataUpdated;
    onStatusChangeCallback = onStatusChanged;

    if (!FirebaseSync.isAvailable()) {
      if (onStatusChangeCallback) {
        onStatusChangeCallback({
          connected: false,
          userId: currentUserId,
          error: "Cloud Firestore gagal diinisialisasi"
        });
      }
      return;
    }

    // If user is already registered, attach listeners immediately
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
    const userDocRef = doc(db, "users", currentUserId);

    // Listen to user document in real-time
    const unsubscribe = onSnapshot(userDocRef, (docSnap) => {
      isOnlineWithFirebase = true;
      if (onStatusChangeCallback) {
        onStatusChangeCallback({
          connected: true,
          userId: currentUserId,
          displayName: currentAccount?.displayName || currentUserId
        });
      }

      if (docSnap.exists() && onDataCallback) {
        const data = docSnap.data();
        isApplyingRemoteUpdate = true;
        try {
          onDataCallback(data);
        } finally {
          isApplyingRemoteUpdate = false;
        }
      }
    }, (err) => {
      console.warn("Firestore Realtime listener error:", err);
      isOnlineWithFirebase = false;
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
   * Check if remote user node exists in Firestore
   */
  async checkUserExists(userId) {
    if (!FirebaseSync.isAvailable() || !userId) return false;
    try {
      const snap = await getDoc(doc(db, "users", userId));
      return snap.exists();
    } catch (e) {
      return false;
    }
  },

  /**
   * Write full state to Cloud Firestore
   */
  async saveFullState(fullState) {
    if (!FirebaseSync.isAvailable() || isApplyingRemoteUpdate || !currentUserId) return;
    try {
      const userDocRef = doc(db, "users", currentUserId);
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
      await setDoc(userDocRef, payload, { merge: true });
    } catch (err) {
      console.warn("Failed to save full state to Firestore:", err);
    }
  },

  /**
   * CART OPERATIONS: Realtime save
   */
  async saveCart(cart) {
    if (!FirebaseSync.isAvailable() || isApplyingRemoteUpdate || !currentUserId) return;
    try {
      const userDocRef = doc(db, "users", currentUserId);
      await setDoc(userDocRef, {
        cart: cart || [],
        lastUpdated: new Date().toISOString()
      }, { merge: true });
    } catch (err) {
      console.warn("Failed to sync cart to Firestore:", err);
    }
  },

  /**
   * BENCHMARKS OPERATIONS: Realtime save
   */
  async saveBenchmarks(benchmarks) {
    if (!FirebaseSync.isAvailable() || isApplyingRemoteUpdate || !currentUserId) return;
    try {
      const userDocRef = doc(db, "users", currentUserId);
      await setDoc(userDocRef, {
        benchmarks: benchmarks || [],
        lastUpdated: new Date().toISOString()
      }, { merge: true });
    } catch (err) {
      console.warn("Failed to sync benchmarks to Firestore:", err);
    }
  },

  /**
   * HISTORY OPERATIONS: Realtime save
   */
  async saveHistory(history) {
    if (!FirebaseSync.isAvailable() || isApplyingRemoteUpdate || !currentUserId) return;
    try {
      const userDocRef = doc(db, "users", currentUserId);
      await setDoc(userDocRef, {
        history: history || [],
        lastUpdated: new Date().toISOString()
      }, { merge: true });
    } catch (err) {
      console.warn("Failed to sync history to Firestore:", err);
    }
  },

  /**
   * SETTINGS OPERATIONS: Realtime save
   */
  async saveSettings(settings) {
    if (!FirebaseSync.isAvailable() || isApplyingRemoteUpdate || !currentUserId) return;
    try {
      const userDocRef = doc(db, "users", currentUserId);
      await setDoc(userDocRef, {
        settings: settings || {},
        lastUpdated: new Date().toISOString()
      }, { merge: true });
    } catch (err) {
      console.warn("Failed to sync settings to Firestore:", err);
    }
  }
};

// Expose to window for app.js integration
window.FirebaseSync = FirebaseSync;

// Dispatch event so other scripts know Firebase is ready
window.dispatchEvent(new CustomEvent("firebase-ready", { detail: { FirebaseSync } }));
