import { initializeApp } from "https://www.gstatic.com/firebasejs/10.12.0/firebase-app.js";
import { getAuth }       from "https://www.gstatic.com/firebasejs/10.12.0/firebase-auth.js";
import { getFirestore }  from "https://www.gstatic.com/firebasejs/10.12.0/firebase-firestore.js";
import { getStorage }    from "https://www.gstatic.com/firebasejs/10.12.0/firebase-storage.js";

const firebaseConfig = {
  apiKey:            "AIzaSyCGJs7vIpb_ijG3AJ9GWpakue3A_wUzYHw",
  authDomain:        "surguuli-2e1ed.firebaseapp.com",
  projectId:         "surguuli-2e1ed",
  storageBucket:     "surguuli-2e1ed.firebasestorage.app",
  messagingSenderId: "387698360943",
  appId:             "1:387698360943:web:eff77922a80fa336f0839a",
  measurementId:     "G-XR8GYQ8GSD"
};

const app     = initializeApp(firebaseConfig);
export const auth    = getAuth(app);
export const db      = getFirestore(app);
export const storage = getStorage(app);
