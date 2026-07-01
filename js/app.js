// js/app.js

// 1. Importamos la autenticación y la base de datos desde tu archivo de configuración
import { auth, db } from "./firebase.js";
import { 
    createUserWithEmailAndPassword, 
    signInWithEmailAndPassword, 
    signOut, 
    onAuthStateChanged 
} from "https://www.gstatic.com/firebasejs/12.15.0/firebase-auth.js";

import { 
    doc, 
    setDoc, 
    getDoc 
} from "https://www.gstatic.com/firebasejs/12.15.0/firebase-firestore.js";

// --- ENRUTADOR DE PANTALLAS (VISUAL) ---
function mostrarPantalla(idPantalla) {
    document.querySelectorAll('.dynamic-view').forEach(view => {
        view.classList.add('hidden');
    });
    const pantalla = document.getElementById(`pantalla-${idPantalla}`);
    if (pantalla) pantalla.classList.remove('hidden');
}

// --- ESCUCHADORES DE FORMULARIOS ---

// FORMULARIO DE REGISTRO REAL
document.getElementById('form-registro')?.addEventListener('submit', async (e) => {
    e.preventDefault();
    
    const nombre = document.getElementById('reg-nombre').value;
    const email = document.getElementById('reg-email').value;
    const password = document.getElementById('reg-password').value;
    const rol = document.querySelector('input[name="reg-rol"]:checked').value;

    try {
        // A. Creamos el usuario en Firebase Authentication
        const credenciales = await createUserWithEmailAndPassword(auth, email, password);
        const usuarioFirebase = credenciales.user;

        // B. Guardamos sus datos y su ROL en Firebase Firestore usando su ID único (UID)
        await setDoc(doc(db, "usuarios", usuarioFirebase.uid), {
            nombre: nombre,
            correo: email,
            rol: rol,
            estado: "activo",
            fechaRegistro: new Date()
        });

        alert(`¡Cuenta creada con éxito como ${rol.toUpperCase()}!`);
        
    } catch (error) {
        console.error("Error al registrar:", error);
        alert("Error al registrar: " + error.message);
    }
});

// FORMULARIO DE INICIO DE SESIÓN REAL
document.getElementById('form-login')?.addEventListener('submit', async (e) => {
    e.preventDefault();

    const email = document.getElementById('login-email').value;
    const password = document.getElementById('login-password').value;

    try {
        // A. Validamos el correo y contraseña en Firebase Auth
        const credenciales = await signInWithEmailAndPassword(auth, email, password);
        const uid = credenciales.user.uid;

        // B. Buscamos qué ROL tiene asignado este usuario en Firestore
        const docUsuario = await getDoc(doc(db, "usuarios", uid));
        
        if (docUsuario.exists()) {
            const datosUsuario = docUsuario.data();
            
            // Verificamos si no está dado de baja
            if (datosUsuario.estado === "baneado") {
                alert("Tu cuenta ha sido suspendida por incumplir las normas.");
                await signOut(auth);
                return;
            }

            alert(`¡Bienvenido de nuevo, ${datosUsuario.nombre}!`);
            redirigirPorRol(datosUsuario.role || datosUsuario.rol);
        } else {
            alert("No se encontraron datos complementarios para este usuario.");
        }

    } catch (error) {
        console.error("Error al ingresar:", error);
        alert("Credenciales incorrectas o error de conexión.");
    }
});

// CERRAR SESIÓN
async function cerrarSesion() {
    await signOut(auth);
    alert("Sesión cerrada");
    window.location.reload();
}

// --- CONTROLADOR DE ESTADO DE SESIÓN EN TIEMPO REAL ---
// Firebase detecta automáticamente si el usuario ya estaba logueado al refrescar la página
onAuthStateChanged(auth, async (user) => {
    if (user) {
        // Si hay un usuario activo, ajustamos la barra de navegación
        document.getElementById('btn-login-view').classList.add('hidden');
        document.getElementById('btn-register-view').classList.add('hidden');
        document.getElementById('btn-logout').classList.remove('hidden');

        // Si tu correo personal es el del admin, puedes forzar que entre como admin
        if (user.email === "tu-correo-admin@gmail.com") { // <-- CAMBIA ESTO POR TU CORREO
            mostrarPantalla('dashboard-admin');
            return;
        }

        // Si no es el admin master, lee su rol de la base de datos
        const docUser = await getDoc(doc(db, "usuarios", user.uid));
        if (docUser.exists()) {
            redirigirPorRol(docUser.data().rol);
        }
    } else {
        // Si no está logueado, muestra la pantalla de inicio
        mostrarPantalla('inicio');
    }
});

function redirigirPorRol(rol) {
    if (rol === 'cliente') {
        mostrarPantalla('dashboard-cliente');
    } else if (rol === 'vendedor') {
        document.getElementById('notificaciones-vendedor').classList.remove('hidden');
        mostrarPantalla('dashboard-vendedor');
    }
}

// --- LOGICA DE CHATS MODALES ---
function abrirChatAdmin(nombreProducto, precioProducto) {
    document.getElementById('chat-producto-info').innerText = `${nombreProducto} (${precioProducto})`;
    document.getElementById('modal-chat-admin').classList.remove('hidden');
}

function cerrarChatAdmin() {
    document.getElementById('modal-chat-admin').classList.add('hidden');
}

// Hacemos que las funciones visuales estén disponibles para el HTML
window.mostrarPantalla = mostrarPantalla;
window.abrirChatAdmin = abrirChatAdmin;
window.cerrarChatAdmin = cerrarChatAdmin;
window.cerrarSesion = cerrarSesion;

// Iniciar íconos estéticos al cargar la página
document.addEventListener("DOMContentLoaded", () => { lucide.createIcons(); });