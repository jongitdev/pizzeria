
const masas = {
        nombre: "Masa",
        img: "../pizzeria/img/base.png",
        precio: {
            individual: 5,
            mediana: 7,
            familiar: 9
        }
}
const ingredientes = [
    {
        nombre: "Tomate fresco",
        img: "../pizzeria/img/tomate.png",
        precio: 0.5
    },
    {
        nombre: "Cebolla",
        img: "../pizzeria/img/cebolla.png",
        precio: 0.5
    },
    {
        nombre: "Cebolla caramelizada",
        img: "../pizzeria/img/cebolla-caramelizada.png",
        precio: 1
    },
    {
        nombre: "Jamón de York",
        img: "../pizzeria/img/jamonyork.png",
        precio: 2
    }
];

let pedido = {
    masa: 0,
    ingredientes: []
};

const d = new Date();
let year = d.getFullYear();
document.getElementById("year").innerText = year;

let total = 0;

let masa = document.getElementById("masa");

masa.onchange = function(){elegirMasa(masa.value)};



listarIngredientes();
listarMasas();

let btnIngredientes = document.getElementsByClassName("add-ing");

 for (const btnIngrediente of btnIngredientes){
    let ing = btnIngrediente.dataset.ing;

    btnIngrediente.addEventListener('click', function(e){
        
        addIngrediente(ing);
     });
 }



function elegirMasa(valor) {
    //let valor = masa.value;
    
    let objMasa = {
        nombre: `Masa ${valor}` ,
        img: "../pizzeria/img/base.png",
        precio: masas.precio[valor]
    }

    
    document.getElementById("masas").style.display="none";
    document.getElementById("ingredientes").style.display="flex";

    let txtMasa = `<li><img src='${objMasa.img}'>${objMasa.nombre} <input type="button" id="del-masa" class="del" value="-">`;
    document.getElementById("masaElegida").innerHTML = txtMasa;
    
    pedido.masa = objMasa;

    total += parseFloat(objMasa.precio);

    document.getElementById("total").innerText = total;
    
    let btnDelMasa = document.getElementById("del-masa");
    
    btnDelMasa.addEventListener('click', function(e){
    quitarMasa(); 
 });
}

function listarMasas(){
    let opt = '<option value="0">Elige el tamaño de la masa</option>';

    var keys = Object.keys(masas.precio);

    for (i=0; i < keys.length; i++){
       
        opt += `<option value="${keys[i]}">Masa ${keys[i]} - ${masas.precio[keys[i]]}€</option>`;
    }

    document.getElementById("masa").innerHTML = opt;
}

function listarIngredientes(){
    
    let li = "";

    for (i=0; i < ingredientes.length; i++){
        li += `<li><img src='${ingredientes[i].img}'> ${ingredientes[i].nombre} <input type="button" data-ing="${i}" class="add add-ing" value="+"> ${ingredientes[i].precio}€</li>`
    }

    document.getElementById("ulIngredientes").innerHTML = li;


}

function addIngrediente(id){
    let repetido = false;

    if(pedido.ingredientes.length <= 0){
        pedido.ingredientes.push(ingredientes[id]);
        total += parseFloat(ingredientes[id].precio);
    } else {
        for (i=0; i < pedido.ingredientes.length; i++){
            if (ingredientes[id] == pedido.ingredientes[i]){
                
                repetido = true;
            }
        }

        if (!repetido){
            pedido.ingredientes.push(ingredientes[id]);
            total += parseFloat(ingredientes[id].precio);
        }
    }

    
   
    

    let li = "";

    for (i=0; i < pedido.ingredientes.length; i++){
        li += `<li><img src='${pedido.ingredientes[i].img}'> ${pedido.ingredientes[i].nombre} <input type="button" data-deling="${i}" class="del del-ing" value="-"></li>`;
    
        
    
    }
    

    document.getElementById("listaIngredientes").innerHTML = li;

    document.getElementById("total").innerText = total;

    let btnDelIngredientes = document.getElementsByClassName("del-ing");
    
    for (let btnDelIngrediente of btnDelIngredientes){
        let ingToDel = btnDelIngrediente.dataset.deling;
        btnDelIngrediente.addEventListener('click', function(e){
        
        quitarIngrediente(ingToDel);
     });
    }
}

function quitarMasa(){
    
    total -= pedido.masa.precio;
   
    delete pedido["masa"];

    masa.selectedIndex = 0;

    document.getElementById("masaElegida").innerText = "";
    document.getElementById("ingredientes").style.display="none";
    document.getElementById("masas").style.display="flex";
    document.getElementById("total").innerText = total;
}

function quitarIngrediente(id){
 
    total -= pedido.ingredientes[id].precio;
    pedido.ingredientes.splice(id, 1);


    let li = "";

    for (i=0; i < pedido.ingredientes.length; i++){
        li += `<li><img src='${pedido.ingredientes[i].img}'> ${pedido.ingredientes[i].nombre} <input type="button" onclick="quitarIngrediente(${i})" class="del" value="-"></li>`;
    }
    

    document.getElementById("listaIngredientes").innerHTML = li;
    
    document.getElementById("total").innerText = total;
}



function myFunction() {

    
    var x = document.getElementById("myTopnav");
    if (x.className === "topnav") {
      x.className += " responsive";
    } else {
      x.className = "topnav";
    }
  }