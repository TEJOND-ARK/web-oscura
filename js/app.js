firebase.auth().onAuthStateChanged((user) => {
  const urlPath = window.location.pathname;

  // Detecta la página actual de manera compatible con GitHub Pages
  const esAdmin = urlPath.includes("admin.html");
  const esIndex = urlPath.includes("index.html") || urlPath.endsWith("/");

  if (user) {
    // Si hay sesión iniciada y está en el login/index
    if (esIndex) {
      if (user.email === "tejondark@weboscura.com") {
        window.location.href = "admin.html"; 
      } else {
        // Redirige a los usuarios normales. Asegúrate de crear "dashboard.html" si lo requieres.
        window.location.href = "dashboard.html"; 
      }
    }
    // Si un usuario común intenta forzar la entrada a admin.html
    if (esAdmin && user.email !== "tejondark@weboscura.com") {
      alert("Acceso denegado.");
      window.location.href = "index.html";
    }
  } else {
    // Si no hay sesión e intenta entrar a páginas privadas, lo devuelve al index
    if (!esIndex) {
      window.location.href = "index.html";
    }
  }
});

// Función global de inicio de sesión
function iniciarSesion(email, password) {
  firebase.auth().signInWithEmailAndPassword(email, password)
    .then(() => { 
      console.log("Conectado exitosamente."); 
    })
    .catch((error) => { 
      alert("Error de ingreso: " + error.message); 
    });
}