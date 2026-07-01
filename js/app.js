// --- CONTROL DE RUTAS E INICIO DE SESIÓN ---

firebase.auth().onAuthStateChanged((user) => {
  // Capturamos el nombre exacto de la página en la que está el usuario
  const urlPath = window.location.pathname;
  const paginaActual = urlPath.substring(urlPath.lastIndexOf('/') + 1);

  if (user) {
    console.log("Sesión activa de:", user.email);
    
    // ⚠️ Redirección inteligente: SÓLO si está en la página de inicio (index.html)
    if (paginaActual === "index.html" || paginaActual === "") {
      if (user.email === "tejondark@weboscura.com") {
        // Al jefe lo mandamos a su panel
        window.location.href = "admin.html"; 
      } else {
        // A los clientes/vendedores normales los mandamos a su tienda
        window.location.href = "dashboard.html";
      }
    }
  } else {
    console.log("No hay usuario conectado.");
    // Si NO está logueado y trata de meterse al panel a la fuerza, lo botamos al index
    if (paginaActual !== "index.html" && paginaActual !== "") {
      window.location.href = "index.html";
    }
  }
});

// Función para el botón de Cerrar Sesión
function cerrarSesionAdmin() {
  firebase.auth().signOut().then(() => {
    console.log("Sesión cerrada.");
    window.location.href = "index.html";
  }).catch((error) => {
    console.error("Error al salir:", error);
  });
}