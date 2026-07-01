// --- LÓGICA DE CONTROL DE SESIÓN INTELIGENTE ---

firebase.auth().onAuthStateChanged((user) => {
  // Guardamos en qué página está el navegador actualmente
  const paginaActual = window.location.pathname;

  if (user) {
    console.log("Usuario con sesión activa:", user.email);
    
    // 🕵️‍♂️ Solo redirige automáticamente si el usuario está en la página de inicio/login
    if (paginaActual.endsWith("index.html") || paginaActual === "/" || paginaActual.endsWith("login.html")) {
      if (user.email === "tejondark@weboscura.com") {
        console.log("¡Redirigiendo Administrador al panel!");
        window.location.href = "admin.html"; 
      } else {
        window.location.href = "dashboard.html";
      }
    }
  } else {
    console.log("No hay ninguna sesión activa.");
    // Si no está logueado y trata de entrar a la fuerza al panel, lo mandamos al inicio
    if (paginaActual.endsWith("admin.html") || paginaActual.endsWith("dashboard.html")) {
      window.location.href = "index.html";
    }
  }
});