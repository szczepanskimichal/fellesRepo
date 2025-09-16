type Pizza = {
    id: number
    name: string
    price: number
}
type Order = {
    id: number
    pizza: Pizza
    status: "ordered" | "completed"
}

const menu: Pizza[] = [
    { id: 1, name: "Margherita", price: 8 },
    { id: 2, name: "Pepperoni", price: 10 },
    { id: 3, name: "Hawaiian", price: 10 },
    { id: 4, name: "Veggie", price: 9 },
]

let cashInRegister = 100
let nextOrderId = 1
const orderHistory: Order[] = []

function addNewPizza(pizzaObj: Pizza): void {
    menu.push(pizzaObj)
}

function placeOrder(pizzaName: string): Order | void {
    const selectedPizza = menu.find(pizzaObj => pizzaObj.name === pizzaName)
    if (!selectedPizza) {
        console.error(`${pizzaName} does not exist in the menu`)
        return
    }
    cashInRegister += selectedPizza.price
    const newOrder: Order = { id: nextOrderId++, pizza: selectedPizza, status: "ordered" }
    orderHistory.push(newOrder)
    return newOrder
}

function completeOrder(orderId: number): Order | void {
    const order = orderHistory.find(order => order.id === orderId)
    if (!order) {
        console.error(`Order with ID ${orderId} not found`)
        return
    }
    order.status = "completed"
    return order
}

function getOrderDetails(identifier: string | number): Order | Pizza | undefined {
    if (typeof identifier === "string") {
        return menu.find(pizza => pizza.name === identifier)
    } else if (typeof identifier === "number") {
        return menu.find(pizza => pizza.id === identifier)
    } else {
        throw new Error("Indentifier must be a string or number!!!")
    }
}

// function getPizzaDetails(pizzaId: number) {
//     return menu.find(pizzaObj => pizzaObj.id === pizzaId)
// }

addNewPizza({ id: 5, name: "Chicken Bacon Ranch", price: 12 })
addNewPizza({ id: 6, name: "BBQ Chicken", price: 12 })
addNewPizza({ id: 7, name: "Spicy Sausage", price: 11 })

placeOrder("Chicken Bacon Ranch")
completeOrder(1)

console.log("Menu:", menu)
console.log("Cash in register:", cashInRegister)
console.log("Order history:", orderHistory)
console.log("Get pizza by name:", getOrderDetails("Hawaiian"))
console.log("Get pizza by ID:", getOrderDetails(5))