export const masas = {
    nombre: "Masa",
    img: "../pizzeria/img/base.png",
    precio: {
        individual: 5,
        mediana: 7,
        familiar: 9
    }
}
export const ingredientes = [
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

export let pedido = {
masa: 0,
ingredientes: []
};
