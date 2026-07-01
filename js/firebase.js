// js/firebase.js

// 1. Importamos las funciones necesarias de Firebase
import { initializeApp } from "https://www.gstatic.com/firebasejs/12.15.0/firebase-app.js";
import { getAuth } from "https://www.gstatic.com/firebasejs/12.15.0/firebase-auth.js";
import { getFirestore } from "https://www.gstatic.com/firebasejs/12.15.0/firebase-firestore.js";

// 2. Tu configuración (El "DNI" que me pasaste)
const firebaseConfig = {
  apiKey: "AIzaSyBJKdcy6awuDMuBDOlhGiNLRYqjTzPdx_E",
  authDomain: "web-anonima-d7b3c.firebaseapp.com",
  projectId: "web-anonima-d7b3c",
  storageBucket: "web-anonima-d7b3c.firebasestorage.app",
  messagingSenderId: "212970847778",
  appId: "1:212970847778:web:4d9783171719912dc9147b",
  measurementId: "G-SGL2WSXBN2"
};

// 3. Inicializamos Firebase
const app = initializeApp(firebaseConfig);

// 4. Activamos la Autenticación y la Base de datos y las "exportamos" para usarlas en otros archivos
export const auth = getAuth(app);
export const db = getFirestore(app);

console.log("🔥 Firebase se ha conectado correctamente");