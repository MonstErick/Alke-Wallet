$(document).ready(function() {

//Buscar Contactos//
$("#btnBuscar").click(function() {
  let busqueda = $("#buscarContacto").val().toLowerCase();
  $("#contactList li").each(function() {
    let contacto = $(this).text().toLowerCase();
    if (contacto.includes(busqueda)) {
      $(this).show();
    } else {
      $(this).hide();
    }
  });
});

//Mostrar Botón Enviar Dinero al Seleccionar Contacto//
$("#contactList").on("change", 'input[name=contacto]', function() {
  $("#contactList li").removeClass("active");
  $(this).closest("li").addClass("active");
  $("#btnEnviarDinero").removeClass("d-none");
});

//Enviar Dinero//
$("#btnEnviarDinero").click(function() {
  let contactoSeleccionado =
    $('input[name="contacto"]:checked');
  let monto = parseInt($("#montoEnviar").val());
  if (contactoSeleccionado.length === 0) {
    $("#alert-container").html(`
      <div class="alert alert-danger text-center">
      Debes Selecionar un Contacto.
      </div>
      `)
  return;
  }
  
  if (isNaN(monto) || monto <= 0) {
    $("#alert-container").html(`
      <div class="alert alert-danger text-center">
      Ingresa un monto Válido.
      </div>
      ;`)
  return;
  }

  let saldo = parseInt(localStorage.getItem("saldo"));

  if (monto > saldo) {
    $("#alert-container").html(`
      <div class="alert alert-danger text-center">
      Saldo Insuficiente.
      </div>
      `)
  return;
  }

  saldo = saldo - monto;
  localStorage.setItem("saldo", saldo);

//Guardar Movimientos//
let movimientos = JSON.parse(localStorage.getItem("movimientos")) || [];

  movimientos.push ( {
    tipo: "Envío", 
    detalle: "Envío a " + contactoSeleccionado.val(),
    monto: monto,
    signo: "-",
    fecha: new Date().toLocaleString("es-CL")
  });

  localStorage.setItem("movimientos", JSON.stringify(movimientos));

//Mensaje de Confirmación//
$("#alert-container").html(`
  <div class="alert alert-success text-center">
  Dinero enviado Correctamente a
  ${contactoSeleccionado.val()}.
  Nuevo Saldo:
  $${saldo.toLocaleString("es-Cl")}
  </div>
`)
$("#montoEnviar").val("");

setTimeout(function() {
  window.location.href = "menu.html";
}, 2500);
});

//Guardar un Nuevo Contacto//
$("#btnGuardarContacto").click(function() {
  let nombre = $("#nombreContacto").val();
  let numeroCuenta = $("#numeroCuenta").val();
  let alias = $("#aliasContacto").val();
  let banco = $("#bancoContacto").val();

  if (
    nombre === "" ||
    numeroCuenta === "" ||
    alias === "" ||
    banco === ""
  ) {
    $("#alert-contacto").html(`
      <div class="alert alert-danger text-center">
      Debes Completar Todos los Campos.
      </div>
      `);
    return;
  }

//Validar Número de Cuenta//
if (isNaN(numeroCuenta) || numeroCuenta.length < 8) {
  $("#alert-contacto").html(`
    <div class="alert alert-danger text-center">
    El Número de Cuenta debe tener al menos 8 Números.
    </div>
    `);
  return;
}

//Crear un Contacto//
let nuevoContacto = `
  <li class="list-group-item">
    <input
      type="radio"
      name="contacto"
      value="${nombre}">
    
    <span class="contact-name">${nombre}</span>
    <br>
    <span class="contact-details">
      Número de Cuenta: ${numeroCuenta},
      Alias: ${alias},
      Banco: ${banco}
    </span>
  </li>
`;

$("#contactList").append(nuevoContacto);

$("#alert-contacto").html("");

//Borrar Campos//

$("#nombreContacto").val("");
$("#numeroCuenta").val("");
$("#aliasContacto").val("");
$("#bancoContacto").val("");

//Cerrar Modal//

bootstrap.Modal.getInstance(
  document.getElementById("nuevoContacto")
  ).hide();

$("#alert-container").html(`
  <div class="alert alert-success text-center">
  Contacto Agregado Correctamente.
  </div>
  `);
      
});
});