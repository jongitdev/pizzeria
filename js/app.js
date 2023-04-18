import {masas, ingredientes, pedido, cesta} from "./data-pizzeria.js";
import {initYear, elegirMasa, listarMasas, listarIngredientes, listenGuardarCesta, initCesta} from "./funciones.js";
import{modal} from "./modal.js";


let masa = document.getElementById("masa");

masa.onchange = function(){elegirMasa(masa.value, masas, pedido)};


initYear();
//let cestaInit = initCesta();
//console.log(cestaInit);
listarIngredientes(ingredientes, pedido);
listarMasas(masas);
modal(pedido);

listenGuardarCesta(pedido, cesta);






