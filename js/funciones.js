export function initYear() {
    const d = new Date();
    let year = d.getFullYear();
    document.getElementById("year").innerText = year;
}

export function elegirMasa(valor, masas, pedido) {
    //let valor = masa.value;
    let total =0;
    let objMasa = {
        nombre: `Masa ${valor}` ,
        img: "./img/base.png",
        precio: masas.precio[valor]
    }

    
    document.getElementById("masas").style.display="none";
    document.getElementById("ingredientes").style.display="flex";

    let txtMasa = `<li><img src='${objMasa.img}'>${objMasa.nombre} <input type="button" id="del-masa" class="del" value="-">`;
    document.getElementById("masaElegida").innerHTML = txtMasa;
    
    pedido.masa = objMasa;
    
    if (pedido.ingredientes.length > 0){
        for (let ingrediente of pedido.ingredientes){
            total += parseFloat(ingrediente.precio);
        }
    }

    total += parseFloat(objMasa.precio);

    document.getElementById("total").innerText = total;
    
    let btnDelMasa = document.getElementById("del-masa");
    
    btnDelMasa.addEventListener('click', function(e){
    quitarMasa(pedido); 
 });
}

export function listarMasas(masas){
    let opt = '<option value="0">Elige el tamaño de la masa</option>';

    var keys = Object.keys(masas.precio);
    //let i = 0;

    for (let i=0; i < keys.length; i++){
       
        opt += `<option value="${keys[i]}">Masa ${keys[i]} - ${masas.precio[keys[i]]}€</option>`;
    }

    document.getElementById("masa").innerHTML = opt;
}

export function listarIngredientes(ingredientes, pedido){
    
    let li = "";

    //let i = 0;

    for (let i=0; i < ingredientes.length; i++){
        li += `<li><img src='${ingredientes[i].img}'> ${ingredientes[i].nombre} <input type="button" data-ing="${i}" class="add add-ing" value="+"> ${ingredientes[i].precio}€</li>`
    }

    document.getElementById("ulIngredientes").innerHTML = li;

    let btnIngredientes = document.getElementsByClassName("add-ing");

 for (const btnIngrediente of btnIngredientes){
    let ing = btnIngrediente.dataset.ing;

    btnIngrediente.addEventListener('click', function(e){
        
        addIngrediente(ing, pedido, ingredientes);
     });
 }


}

function addIngrediente(id, pedido, ingredientes){
    let repetido = false;
    let total = parseFloat(pedido.masa.precio);
    if(pedido.ingredientes.length <= 0){
        pedido.ingredientes.push(ingredientes[id]);
        
        
    } else {
        for (let i=0; i < pedido.ingredientes.length; i++){
            if (ingredientes[id] == pedido.ingredientes[i]){
                
                repetido = true;
            }
        }

        if (!repetido){
            pedido.ingredientes.push(ingredientes[id]);
            
        }
    }

    
   
    

    let li = "";

    for ( let i=0; i < pedido.ingredientes.length; i++){
        li += `<li><img src='${pedido.ingredientes[i].img}'> ${pedido.ingredientes[i].nombre} <input type="button" data-deling="${i}" class="del del-ing" value="-"></li>`;
    
        total += parseFloat(pedido.ingredientes[i].precio);
    
    }
    

    document.getElementById("listaIngredientes").innerHTML = li;

    document.getElementById("total").innerText = total;

    let btnDelIngredientes = document.getElementsByClassName("del-ing");
    
    for (let btnDelIngrediente of btnDelIngredientes){
        let ingToDel = btnDelIngrediente.dataset.deling;
        btnDelIngrediente.addEventListener('click', function(e){
        
        quitarIngrediente(ingToDel, ingredientes, pedido);
     });
    }

    let btnPedido = document.getElementById("btnPedido");

    btnPedido.addEventListener('click', function(e){
        
        if (pedido.masa != undefined){
            ticket(pedido);
            document.getElementById("error-masa").classList.add("oculto");
        } else {
            document.getElementById("error-masa").classList.remove("oculto");
        }
     });
}

export function quitarMasa(pedido){
    
    let total = 0;

    for (let ingrediente of pedido.ingredientes){
        total += ingrediente.precio; 
    }
       
    delete pedido["masa"];

    masa.selectedIndex = 0;

    document.getElementById("masaElegida").innerText = "";
    document.getElementById("ingredientes").style.display="none";
    document.getElementById("masas").style.display="flex";
    document.getElementById("total").innerText = total;

    let btnPedido = document.getElementById("btnPedido");

    btnPedido.addEventListener('click', function(e){
        
        if (pedido.masa != undefined){
            ticket(pedido);document.getElementById("error-masa").classList.add("oculto");
        } else {
            document.getElementById("error-masa").classList.remove("oculto");
        }
     });
}

export function quitarIngrediente(id, ingredientes, pedido){
      let total = 0;

    for (let ingrediente of pedido.ingredientes){
        
        total += parseFloat(ingrediente.precio);
    }

    if (pedido.masa != undefined){
        total += parseFloat(pedido.masa.precio);
    } 

    total -= pedido.ingredientes[id].precio;
    pedido.ingredientes.splice(id, 1);


    let li = "";

    for (let i=0; i < pedido.ingredientes.length; i++){
        li += `<li><img src='${pedido.ingredientes[i].img}'> ${pedido.ingredientes[i].nombre} <input type="button" data-deling="${i}" class="del del-ing" value="-"></li>`;
    }
    

    document.getElementById("listaIngredientes").innerHTML = li;
    
    document.getElementById("total").innerText = total;

    let btnDelIngredientes = document.getElementsByClassName("del-ing");
    
    for (let btnDelIngrediente of btnDelIngredientes){
        let ingToDel = btnDelIngrediente.dataset.deling;
        btnDelIngrediente.addEventListener('click', function(e){
        
        quitarIngrediente(ingToDel, ingredientes, pedido);
     });
    }


}

function ticket (pedido){
    console.log(pedido);
    let total = 0;

    
    let li = `<li>${pedido.masa.nombre} ${pedido.masa.precio}€</li>`;
    total += parseFloat(pedido.masa.precio);
    for (let ingrediente of pedido.ingredientes){
        li += `<li>${ingrediente.nombre} ${ingrediente.precio}€</li>`;
        total += parseFloat(ingrediente.precio);
    }

    total += total * 0.21;
    total = total.toFixed(2);
    li += `<li>-------------------------</li>`;
    li += `<li>Total + IVA: ${total}€</li>`;

    document.getElementById("ticket-ul").innerHTML = li;
    
}

export function listenGuardarCesta(pedido, cesta){
    let btnGuardarCesta = document.getElementById("guardar-cesta");
    btnGuardarCesta.addEventListener('click', function(e){
        
        guardarCesta(pedido, cesta);
     });
}

function guardarCesta (pedido, cesta){
    let nombre = document.getElementById("nombre").value;
    let direccion = document.getElementById("direccion").value;
    let tlf = document.getElementById("tlf").value;

    //console.log(pedido);
    cesta.envio.nombre = nombre;
    cesta.envio.direccion = direccion;
    cesta.envio.tlf = tlf;

    cesta.pizzas.push(pedido);
    //console.log(cesta);
    let strCesta = JSON.stringify(cesta)
    localStorage.setItem("cesta", strCesta);


}

export function initCesta (){
    const cestals = localStorage.getItem("cesta");
    
    if (cestals != null){
        let cesta = JSON.parse(cestals);
        return cesta;
    }

    
}