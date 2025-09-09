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
    menu.push(pizzaObj);
}

function placeOrder(pizzaName) {
    const selectedPizza = menu.finf((pizzaObj) => pizzaObj.name === pizzaName);
    cashInRegister += selectedPizza.price;
    const newOrder = {name: pizzaName, status: "in queque"};
    orderQueque.push(newOrder);
}