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

let cashInRegister = 100
let nextOrderId = 1
let nextPizzaId = 1

const menu: Pizza[] = [
    { id: nextPizzaId++, name: "Margherita", price: 8 },
    { id: nextPizzaId++, name: "Pepperoni", price: 10 },
    { id: nextPizzaId++, name: "Hawaiian", price: 10 },
    { id: nextPizzaId++, name: "Veggie", price: 9 },
]

const orderHistory: Order[] = []

function addNewPizza(pizzaObj: Pizza): Pizza {
    pizzaObj.id = nextPizzaId++
    menu.push(pizzaObj)
}



function placeOrder(pizza: Pizza): Order | undefined {
    const newOrder: Order = { id: nextOrderId++, pizza: pizza, status: "ordered" }
    orderHistory.push(newOrder)
    cashInRegister += pizza.price
    return newOrder
}

function addToArray<T>(array: T[], item: T): T[] {
    array.push(element)
    return array
}

addNewPizza({id: nextPizzaId++, name: "Chicken Bacon Ranch", price: 12 })
addNewPizza({id: nextPizzaId++, name: "BBQ Chicken", price: 12 })
addNewPizza({id: nextPizzaId++, name: "Spicy Sausage", price: 11 })

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


placeOrder("Chicken Bacon Ranch")
completeOrder(1)

console.log("Menu:", menu)
console.log("Cash in register:", cashInRegister)
console.log("Order history:", orderHistory)
console.log("Get pizza by name:", getOrderDetails("Hawaiian"))
console.log("Get pizza by ID:", getOrderDetails(5))