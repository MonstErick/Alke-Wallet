
$("#loginForm").submit(function(event) {
  event.preventDefault();

  let email = $("#email").val();
  let password = $("#password").val();

  if (email === "usuario@alkewallet.cl" && password === "1234") {
    $("#alert-container").html(`
      <div class="alert alert-success text-center mb-3">
      Inicio de sesión Exitoso. Redirigiendo al Menú Principal...
      </div>
    `);

  setTimeout(function() {
  window.location.href = "menu.html";
  }, 1500);

  } else {
    $("#alert-container").html(`
      <div class="alert alert-danger text-center mb-3">
      Credenciales incorrectas. Intente Nuevamente.
      </div>
    `)}
});