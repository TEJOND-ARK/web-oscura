// --- LÓGICA DE CONTROL DE SESIÓN ---

// Esto revisa qué usuario está entrando a la página
firebase.auth().onAuthStateChanged((user) => {
  if (user) {
    console.log("Usuario detectado:", user.email);
    
    // 🕵️‍♂️ CONDICIÓN ESPECIAL PARA EL ADMINISTRADOR
    if (user.email === "tejondark@weboscura.com") {
      console.log("¡Acceso concedido como Administrador!");
      // Te redirige automáticamente a la pantalla de admin
      window.location.href = "admin.html"; 
    } else {
      // Si entra cualquier otro correo (Cliente o Vendedor), va al panel normal
      window.location.href = "dashboard.html";
    }
  } else {
    // Si no hay usuario activo, se queda en la pantalla de inicio
    console.log("No hay ninguna sesión activa.");
  }
});

// Función para cuando le das clic al botón de iniciar sesión
function iniciarSesion(email, password) {
  firebase.auth().signInWithEmailAndPassword(email, password)
    .then((userCredential) => {
      console.log("Inicio de sesión exitoso");
    })
    .catch((error) => {
      alert("Error al entrar: " + error.message);
    });
}