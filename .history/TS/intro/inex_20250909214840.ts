
const menu = [
    {name: "Margarita", price: 79},
    {name: "Pepperoni", price: 89},
    {name: "Hawaii", price: 99},
    {name: "Vesuvio", price: 79},
    {name: "Calzone", price: 89}
]

let cashInRegister = 1000;
const orderQueue = [];
let nextOrderId = 1;

function addNewPizza(pizzaObj) {
    menu.push(pizzaObj);
}

function placeOrder(pizzaName) {
    const selectedPizza = menu.find((pizzaObj) => pizzaObj.name === pizzaName);
    cashInRegister += selectedPizza.price;
    const newOrder = {id:nextOrderId++,name: pizzaName, status: "in queque"};
    orderQueue.push(newOrder);
    return newOrder;
}
function completeOrder(orderId) {
    const order = orderQueue.find(order => order.id === orderId)
    order.status = "completed"
    return order
}
addNewPizza({name: "Kebab", price: 109});
addNewPizza({name: "Vegan", price: 119});

placeOrder("Margarita");s
placeOrder("Kebab");
placeOrder("Vegan");
completeOrder("1");
console.log("menu:",menu);
console.log("Order Queue:",orderQueue);
console.log("Cash in Register:",cashInRegister);

