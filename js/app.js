firebase.auth().onAuthStateChanged((user) => {
  const urlPath = window.location.pathname;
  const paginaActual = urlPath.substring(urlPath.lastIndexOf('/') + 1);
  const esIndex = paginaActual === "index.html" || paginaActual === "";

  if (user) {
    // 1. Si es el Administrador Global
    if (user.email === "tejondark@weboscura.com") {
      if (esIndex) {
        window.location.href = "admin.html";
      }
    } else {
      // 2. Si es un usuario común, consultamos su rol asignado en Firestore
      const db = firebase.firestore();
      db.collection("usuarios").doc(user.uid).get()
        .then((doc) => {
          if (doc.exists) {
            const datosUsuario = doc.data();
            
            if (datosUsuario.rol === "vendedor") {
              if (esIndex) window.location.href = "vendedor.html";
              if (paginaActual === "dashboard.html") window.location.href = "vendedor.html";
            } 
            else if (datosUsuario.rol === "cliente") {
              if (esIndex) window.location.href = "dashboard.html";
              if (paginaActual === "vendedor.html") window.location.href = "dashboard.html";
            }
          } else {
            console.log("No se encontró el perfil del usuario en Firestore.");
          }
        })
        .catch((error) => {
          console.error("Error al obtener el rol:", error);
        });
    }
  } else {
    // Si no hay sesión iniciada e intenta forzar la entrada a zonas privadas
    if (!esIndex) {
      window.location.href = "index.html";
    }
  }
});

function iniciarSesion(email, password) {
  firebase.auth().signInWithEmailAndPassword(email, password)
    .then(() => { 
      console.log("Conectado exitosamente."); 
    })
    .catch((error) => { 
      alert("Error de ingreso: " + error.message); 
    });
}