const menu : Pizza[] = [
    { id: 1, name: "Margherita", price: 8 },
    { id: 2, name: "Pepperoni", price: 10 },
    { id: 3, name: "Hawaiian", price: 10 },
    { id: 4, name: "Veggie", price: 9 },
]

type Pizza = { 
    id: number;
    name: string; 
    price: number 
}

type Order = {
    id: number; 
    pizza: Pizza; 
    status: "ordered" | "completed"
}

let cashInRegister = 0
let nextOrderId = 1
const orderQueue: Order []= []

function addNewPizza(pizzaObj: Pizza){
    menu.push(pizzaObj)
}

function placeOrder(pizzaName: string) {
    const selectedPizza = menu.find(pizzaObj => pizzaObj.name === pizzaName)
    if (!selectedPizza) {
        console.error(`${pizzaName} does not exist in the menu`)
        return
    }
    cashInRegister += selectedPizza.price
    const newOrder: Order = { id: nextOrderId++, pizza: selectedPizza, status: "ordered" }
    orderQueue.push(newOrder)
    return newOrder
}


function completeOrder(orderId: number): Order | undefined {
    const order = orderQueue.find(order => order.id === orderId)
    // order.status = "completed" - it does not work 
    if (order) {
        order.status = "completed"
    }
    return order
}

function getPizzaDetail(identifier: string | number) {
if (typeof identifier === "string") {
    return menu.find(pizza=> pizza.name === identifier) 
} else {
    return menu.find(pizza=>pizza.id === identifier) 
}

}

addNewPizza({ id: 5, name: "Chicken Bacon Ranch", price: 12 })
// addNewPizza({ id: 6, name: "BBQ Chicken", price: 12 })
// addNewPizza({ id: 7, name: "Spicy Sausage", price: 11 })
// addNewPizza({ id: 8, name: "Buffalo Chicken", price: 13 })

placeOrder("Chicken Bacon Ranch")
completeOrder(1)

console.log("Menu:", menu)
console.log("Cash in register:", cashInRegister)
console.log("Order queue:", orderQueue)