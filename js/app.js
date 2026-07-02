firebase.auth().onAuthStateChanged((user) => {
  const urlPath = window.location.pathname;
  const paginaActual = urlPath.substring(urlPath.lastIndexOf('/') + 1);
  const esIndex = paginaActual === "index.html" || paginaActual === "";

  if (user) {
    // 1. SI ES EL ADMINISTRADOR GLOBAL (Acceso inmediato)
    if (user.email === "tejondark@weboscura.com") {
      if (esIndex) {
        window.location.href = "admin.html";
      }
      // Si el admin navega accidentalmente a los paneles de usuario
      if (paginaActual === "dashboard.html" || paginaActual === "vendedor.html") {
        window.location.href = "admin.html";
      }
    } 
    // 2. SI ES UN USUARIO REGISTRADO (Cliente o Vendedor)
    else {
      const db = firebase.firestore();
      db.collection("usuarios").doc(user.uid).get()
        .then((doc) => {
          if (doc.exists) {
            const datosUsuario = doc.data();
            
            if (datosUsuario.rol === "vendedor") {
              if (esIndex) window.location.href = "vendedor.html";
              if (paginaActual === "dashboard.html") window.location.href = "vendedor.html";
              if (paginaActual === "admin.html") {
                alert("Acceso denegado.");
                window.location.href = "vendedor.html";
              }
            } 
            else if (datosUsuario.rol === "cliente") {
              if (esIndex) window.location.href = "dashboard.html";
              if (paginaActual === "vendedor.html") window.location.href = "dashboard.html";
              if (paginaActual === "admin.html") {
                alert("Acceso denegado.");
                window.location.href = "dashboard.html";
              }
            }
          } else {
            // Si el usuario existe en Auth pero no tiene documento de rol (ej. cuentas viejas de prueba)
            if (!esIndex && paginaActual !== "dashboard.html") {
              window.location.href = "dashboard.html";
            }
          }
        })
        .catch((error) => {
          console.error("Error al verificar rol:", error);
        });
    }
  } else {
    // Si no inició sesión y quiere forzar una página interna
    if (!esIndex) {
      window.location.href = "index.html";
    }
  }
});

function iniciarSesion(email, password) {
  firebase.auth().signInWithEmailAndPassword(email, password)
    .then(() => { 
      console.log("Sesión iniciada correctamente."); 
    })
    .catch((error) => { 
      alert("Error de acceso: " + error.message); 
    });
}