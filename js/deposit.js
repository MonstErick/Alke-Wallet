document.getElementById("btnDepositar").addEventListener("click", function() {
  
  let monto = parseInt(document.getElementById("monto").value);
  
    if (isNaN(monto) || monto <= 0) {
      document.getElementById("mensajeDeposito").textContent = "Ingrese un Monto Válido";
        return;
    }

    let saldo = localStorage.getItem("saldo");
      saldo = parseInt(saldo);
      saldo = saldo + monto;
      localStorage.setItem("saldo", saldo);

      let movimientos = JSON.parse(localStorage.getItem("movimientos")) || [];

movimientos.push({
  tipo: "Depósito",
  detalle: "Depósito realizado",
  monto: monto,
  signo: "+"
});

localStorage.setItem("movimientos", JSON.stringify(movimientos));

      document.getElementById("mensajeDeposito").textContent = "Depósito realizado con Éxito. Nuevo Saldo: $" + saldo.toLocaleString("es-CL");
    
    document.getElementById("monto").value = "";
      setTimeout(function() {
        window.location.href = "menu.html";
      }, 2000);

  });
