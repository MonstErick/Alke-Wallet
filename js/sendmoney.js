//Botón para Enviar Dinero//

document.getElementById("btnEnviarDinero").addEventListener("click", function () {
  let contactoSeleccionado = document.querySelector('input[name="contacto"]:checked');
  let monto = parseInt(document.getElementById("montoEnviar").value);

  if (contactoSeleccionado === null) {
    document.getElementById("mensajeEnvio").textContent = "Debes seleccionar un Contacto";
    return;
  }

  if (isNaN(monto) || monto <= 0) {
    document.getElementById("mensajeEnvio").textContent = "Ingresa un Monto Válido";
    return;
  }

  let saldo = parseInt(localStorage.getItem("saldo"));

  if (monto > saldo) {
    document.getElementById("mensajeEnvio").textContent = "Saldo Insuficiente";
    return;
  }

  saldo = saldo - monto;

  localStorage.setItem("saldo", saldo);

  let movimientos = JSON.parse(localStorage.getItem("movimientos")) || [];

movimientos.push({
  tipo: "Envío",
  detalle: "Envío a " + contactoSeleccionado.value,
  monto: monto,
  signo: "-"
});

localStorage.setItem("movimientos", JSON.stringify(movimientos));

  document.getElementById("mensajeEnvio").textContent = "Dinero enviado a " + contactoSeleccionado.value + ". Nuevo Saldo: $" + saldo.toLocaleString("es-CL");

  setTimeout(function() {
    window.location.href = "menu.html";
  }, 2500);
})

//Botón para guardar un Nuevo Contacto//

document.getElementById("btnGuardarContacto").addEventListener("click", function () {
  let nombre = document.getElementById("nombreContacto").value;
  let numeroCuenta = document.getElementById("numeroCuenta").value;
  let alias = document.getElementById("aliasContacto").value;
  let banco = document.getElementById("bancoContacto").value;

  if (nombre === "" || numeroCuenta === "" || alias === "" || banco === "") {
    alert("Debes Completar todos los Campos");
    return;
  }

  let listaContactos = document.getElementById("contactList");

  let nuevoContacto = document.createElement("li");
  nuevoContacto.className = "list-group-item";

  nuevoContacto.innerHTML = `
  <input type="radio" name="contacto" value="${nombre}">
  <span class="contact-name">${nombre}</span>
  <br>
  <span class="contact-details">Número de Cuenta: ${numeroCuenta}, Alias: ${alias}, Banco: ${banco}</span>
  `;

  listaContactos.appendChild(nuevoContacto);

  document.getElementById("nombreContacto").value = "";
  document.getElementById("numeroCuenta").value = "";
  document.getElementById("aliasContacto").value = "";
  document.getElementById("bancoContacto").value = "";

  alert("Contacto agregado Correctamente");
});