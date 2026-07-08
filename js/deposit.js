$(document).ready(function() {
  let saldo = localStorage.getItem("saldo");
  if (saldo === null) {
    saldo = 500000;
    localStorage.setItem("saldo", saldo);
  }

$("#saldoActual").text("$" + Number(saldo).toLocaleString("es-CL"));

$("#btnDepositar").click(function () {
  let monto = parseInt($("#monto").val());
  if (isNaN(monto) || monto <= 0) {
    $("#alert-container").html(`
      <div class="alert alert-danger text-center">
      Ingrese un Monto Válido
      </div>
      `);
    return;
  }

  saldo = parseInt(localStorage.getItem("saldo"));
  saldo = saldo + monto;

  localStorage.setItem("saldo", saldo);

let movimientos = JSON.parse(localStorage.getItem("movimientos")) || [];

movimientos.push({
  tipo: "Depósito",
  detalle: "Depósito realizado",
  monto: monto,
  signo: "+",
  fecha: new Date().toLocaleString("es-CL")
});

localStorage.setItem("movimientos", JSON.stringify(movimientos));

$("#montoDepositado").text(
  "Monto depositado: $" + monto.toLocaleString("es-CL")
);

$("#alert-container").html(`
  <div class="alert alert-success text-center">
  Depósito realizado con Éxito. Nuevo Saldo: $${saldo.toLocaleString("es-CL")}
  </div>
  `);

$("#monto").val("");
  
setTimeout(function() {
  window.location.href = "menu.html";
  }, 2000);
  
  });
});
