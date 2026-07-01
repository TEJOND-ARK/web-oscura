// --- LÓGICA DE CONTROL DE SESIÓN DEFINITIVA ---

firebase.auth().onAuthStateChanged((user) => {
  // Obtenemos el nombre exacto del archivo actual (ej: index.html, admin.html)
  const urlPath = window.location.pathname;
  const paginaActual = urlPath.substring(urlPath.lastIndexOf('/') + 1);

  if (user) {
    console.log("Usuario con sesión activa:", user.email);
    
    // Si tiene sesión iniciada y está en el inicio, lo mandamos a su panel correspondiente
    if (paginaActual === "index.html" || paginaActual === "") {
      if (user.email === "tejondark@weboscura.com") {
        window.location.href = "admin.html"; 
      } else {
        window.location.href = "dashboard.html";
      }
    }
  } else {
    console.log("No hay ninguna sesión activa.");
    // Si NO está logueado y la página actual NO es el index, lo regresamos al inicio obligatoriamente
    if (paginaActual !== "index.html" && paginaActual !== "") {
      window.location.href = "index.html";
    }
  }
});

// Función global para que el botón de Cerrar Sesión funcione siempre en internet
function cerrarSesionAdmin() {
  firebase.auth().signOut().then(() => {
    console.log("Sesión cerrada correctamente");
    window.location.href = "index.html";
  }).catch((error) => {
    console.error("Error al cerrar sesión:", error);
  });
}