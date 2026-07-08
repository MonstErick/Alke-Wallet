let saldo = localStorage.getItem("saldo");
  
  if (saldo === null) {
    saldo = 500000;
    localStorage.setItem("saldo", saldo);
  }

  document.getElementById("saldo").textContent = "$" + Number(saldo).toLocaleString("es-CL");

  function redirigir(mensaje, pagina) {
    document.getElementById("mensajeRedireccion").textContent = "Redirigiendo a " + mensaje + "...";
    
    setTimeout(function() {
      window.location.href = pagina;
    }, 1500);
  }

  document.getElementById("btnDepositar").addEventListener("click", function() {
    redirigir("deposito", "deposit.html");
  });

  document.getElementById("btnEnviar").addEventListener("click", function() {
    redirigir("enviar dinero", "sendmoney.html");
  });

  document.getElementById("btnMovimientos").addEventListener("click", function () {
    redirigir("últimos movimientos", "transactions.html");
  });
