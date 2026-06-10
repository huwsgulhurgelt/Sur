import { initializeApp }                                  from "https://www.gstatic.com/firebasejs/10.12.0/firebase-app.js";
import { getAuth, setPersistence, browserLocalPersistence } from "https://www.gstatic.com/firebasejs/10.12.0/firebase-auth.js";
import { getFirestore }                                   from "https://www.gstatic.com/firebasejs/10.12.0/firebase-firestore.js";
import { getStorage }                                     from "https://www.gstatic.com/firebasejs/10.12.0/firebase-storage.js";

const firebaseConfig = {
  apiKey:            "AIzaSyCGJs7vIpb_ijG3AJ9GWpakue3A_wUzYHw",
  authDomain:        "surguuli-2e1ed.firebaseapp.com",
  projectId:         "surguuli-2e1ed",
  storageBucket:     "surguuli-2e1ed.firebasestorage.app",
  messagingSenderId: "387698360943",
  appId:             "1:387698360943:web:eff77922a80fa336f0839a",
  measurementId:     "G-XR8GYQ8GSD"
};

const app  = initializeApp(firebaseConfig);
const auth = getAuth(app);

/* Keep the user signed in across page refreshes and tab closes.
   browserLocalPersistence stores the token in localStorage so it
   survives until the user explicitly signs out. */
setPersistence(auth, browserLocalPersistence).catch(() => {});

/* ══════════════════════════════════════════════════════════════
   ADMIN UIDs — Add your Firebase UIDs here to grant admin access.
   On first load, if the approved_uids document doesn't exist in Firestore,
   these UIDs will be automatically added.
   
   To find your UID:
   1. Sign in to xn--admin-pqa.html (the admin dashboard)
   2. Open browser console (F12)
   3. Your UID will be logged: "[Admin] Your UID: xxx"
   4. Copy it and paste below
   ══════════════════════════════════════════════════════════════ */
export const ADMIN_UIDS = [
  'REPLACE_WITH_YOUR_FIREBASE_UID_1',  // Your UID here
  'REPLACE_WITH_YOUR_FIREBASE_UID_2',  // Additional admins here
];

export const db      = getFirestore(app);
export const storage = getStorage(app);
export { auth };
