document.getElementById("btnLogin").addEventListener("click", function (){
  let email = document.getElementById("email").value;
  let password = document.getElementById("password").value;

  if (email === "usuario@alkewallet.cl" && password === "1234") {
    alert("Inicio de Sesión Exitoso");
    window.location.href = "menu.html";
    } else {
      alert("Usuario o Contraseña Incorrectos");
          }
});