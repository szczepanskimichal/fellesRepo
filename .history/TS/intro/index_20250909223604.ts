const menu = [
    { name: "Margherita", price: 8 },
    { name: "Pepperoni", price: 10 },
    { name: "Hawaiian", price: 10 },
    { name: "Veggie", price: 9 },
]

type Pizza = { name: string; price: number }

let cashInRegister = 100
let nextOrderId = 1
type Order = { id: number; pizza: { name: string; price: number }; status: string }
const orderQueue: Order[] = []

function addNewPizza(pizzaObj: Pizza){
    menu.push(pizzaObj)
}

function placeOrder(pizzaName): Order | undefined {
    const selectedPizza = menu.find(pizzaObj => pizzaObj.name === pizzaName)
    if (!selectedPizza) {
        console.error(`${pizzaName} does not exist in the menu`)
        return
    }
    cashInRegister += selectedPizza.price
    const newOrder = { id: nextOrderId++, pizza: selectedPizza, status: "ordered" }
    orderQueue.push(newOrder)
    return newOrder
}


function completeOrder(orderId: number) {
    const order = orderQueue.findById(orderId)
    if (order) {
        order.status = "completed"
    }
    return order
}

addNewPizza({ name: "Chicken Bacon Ranch", price: 12 })
addNewPizza({ name: "BBQ Chicken", price: 12 })
addNewPizza({ name: "Spicy Sausage", price: 11 })

placeOrder("Chicken Bacon Ranch")
completeOrder(1)

console.log("Menu:", menu)
console.log("Cash in register:", cashInRegister)
console.log("Order queue:", orderQueue)