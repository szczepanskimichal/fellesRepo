const menu = [
    {name: "Margarita", price: 79},
    {name: "Pepperoni", price: 89},
    {name: "Hawaii", price: 99},
    {name: "Vesuvio", price: 79},
    {name: "Calzone", price: 89}
]

const cashInRegister = 1000;
const orderQueue = [];

function addNewPizza(pizzaObj) {
    orderQueue.push(pizzaObj);
    console.log(`New pizza added: ${pizzaObj.name}, price: ${pizzaObj.price}`);
}