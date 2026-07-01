firebase.auth().onAuthStateChanged((user) => {
  const urlPath = window.location.pathname;
  const paginaActual = urlPath.substring(urlPath.lastIndexOf('/') + 1);

  if (user) {
    if (paginaActual === "index.html" || paginaActual === "") {
      if (user.email === "tejondark@weboscura.com") {
        window.location.href = "admin.html"; 
      } else {
        window.location.href = "dashboard.html";
      }
    }
  } else {
    if (paginaActual !== "index.html" && paginaActual !== "") {
      window.location.href = "index.html";
    }
  }
});

function iniciarSesion(email, password) {
  firebase.auth().signInWithEmailAndPassword(email, password)
    .then(() => { console.log("Conectado"); })
    .catch((error) => { alert("Error: " + error.message); });
}