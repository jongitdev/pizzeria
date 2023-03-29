import {masas, ingredientes, pedido} from "./data-pizzeria.js";
import {elegirMasa, listarMasas, listarIngredientes } from "./funciones.js";

const d = new Date();
let year = d.getFullYear();
document.getElementById("year").innerText = year;

let masa = document.getElementById("masa");

masa.onchange = function(){elegirMasa(masa.value, masas, pedido)};



listarIngredientes(ingredientes, pedido);
listarMasas(masas);



