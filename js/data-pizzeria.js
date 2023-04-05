export const masas = {
    nombre: "Masa",
    img: "./img/base.png",
    precio: {
        individual: 5,
        mediana: 7,
        familiar: 9
    }
}
export const ingredientes = [
{
    nombre: "Tomate fresco",
    img: "./img/tomate.png",
    precio: 0.5
},
{
    nombre: "Cebolla",
    img: "./img/cebolla.png",
    precio: 0.5
},
{
    nombre: "Cebolla caramelizada",
    img: "./img/cebolla-caramelizada.png",
    precio: 1
},
{
    nombre: "Jamón de York",
    img: "./img/jamonyork.png",
    precio: 2
}
];

export let pedido = {
masa: 0,
ingredientes: []
};

export let cesta = {
    envio: {
        nombre:"",
        direccion:"",
        tlf:0
    },
    pizzas: []
}
