const menu = [
    { id: 1,name: "Margherita", price: 8 },
    { id: 2,name: "Pepperoni", price: 10 },
    { id: 3,name: "Hawaiian", price: 10 },
    { id: 4,name: "Veggie", price: 9 },
]

let cashInRegister: number = 100
let nextOrderId: number = 1
const orderQueue:[]

function addNewPizza(pizzaObj) {
    menu.push(pizzaObj)
}

function placeOrder(pizzaName: string) {
    const selectedPizza = menu.find(pizzaObj => pizzaObj.name === pizzaName
    if (!selectedPizza) {
        console.error(`${pizzaName} not found`)
        return
    }
    cashInRegister += selectedPizza.price
    const newOrder = { id: nextOrderId++, pizza: selectedPizza, status: "ordered" }
    orderQueue.push(newOrder)
    return newOrder
}

function completeOrder(orderId: number) {
    const order = orderQueue.find(order => order.id === orderId)
    if (!order) {
        throw new Error("Order not found")
    }
    order.status = "completed"
    return order
}

addNewPizza({ name: "Chicken Bacon Ranch", price: 12 })
addNewPizza({ name: "BBQ Chicken", price: 12 })
addNewPizza({ name: "Spicy Sausage", price: 11 })

completeOrder(1)

console.log("Menu:", menu)
console.log("Cash in register:", cashInRegister)
console.log("Order queue:", orderQueue)

