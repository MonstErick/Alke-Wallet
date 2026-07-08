let movimientos = JSON.parse(localStorage.getItem("movimientos")) || [];

let lista = document.getElementById("listaMovimientos");

  movimientos.forEach(function(movimiento) {
    let item = document.createElement("li");
      item.className = "list-group-item d-flex justify-content-between";
        
      item.innerHTML = `
        <span>${movimiento.detalle}</span>
        <span class="${movimiento.signo === '+' ? 'text-success' : 'text-danger'} fw-bold">
          ${movimiento.signo}$${Number(movimiento.monto).toLocaleString("es-CL")}
        </span>
        `;
          
    lista.prepend(item);
    });