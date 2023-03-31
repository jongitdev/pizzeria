import {masas, ingredientes, pedido} from "./data-pizzeria.js";
import {initYear, elegirMasa, listarMasas, listarIngredientes } from "./funciones.js";
import{modal} from "./modal.js";


let masa = document.getElementById("masa");

masa.onchange = function(){elegirMasa(masa.value, masas, pedido)};


initYear();
listarIngredientes(ingredientes, pedido);
listarMasas(masas);
modal(pedido);


