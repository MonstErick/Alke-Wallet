$(document).ready(function() {

  let listaTransacciones = [
    {
      tipo: "Depósito",
      detalle: "Depósito recibido",
      monto: 150000,
      signo: "+"
    },
    {
      tipo: "Envío",
      detalle: "Envío a Marlon Guerra",
      monto: 25000,
      signo: "-"
    },
    {
      tipo: "Compra",
      detalle: "Compra en línea",
      monto: 15990,
      signo: "-"
    }
  ];

  let movimientosReales =
    JSON.parse(localStorage.getItem("movimientos")) || [];

  let todosLosMovimientos =
    movimientosReales.concat(listaTransacciones);

  function mostrarUltimosMovimientos(filtro) {
    $("#listaMovimientos").html("");

    let movimientosFiltrados = todosLosMovimientos;

    if (filtro !== "todos") {
      movimientosFiltrados = todosLosMovimientos.filter(function(movimiento) {
        return movimiento.tipo === filtro;
      });
    }

    movimientosFiltrados.forEach(function(movimiento) {
      let color = movimiento.signo === "+" ? "text-success" : "text-danger";
      
      let fechaMovimiento = movimiento.fecha
        ? `<small class="text-muted">${movimiento.fecha}</small>` 
        : "";
        
      let item = `
        <li class="list-group-item d-flex justify-content-between align-items-center">
          <div>
            <span>${movimiento.detalle}</span>
            <br>
            ${fechaMovimiento}
          </div>
          
          <span class="${color} fw-bold">
            ${movimiento.signo}$${Number(movimiento.monto).toLocaleString("es-CL")}
          </span>
        </li>
      `;

      $("#listaMovimientos").append(item);
    });
  }

  mostrarUltimosMovimientos("todos");

  $("#filtroMovimientos").change(function() {
    let filtro = $("#filtroMovimientos").val();
    mostrarUltimosMovimientos(filtro);
  });

});