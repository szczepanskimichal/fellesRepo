// let myName: string = "Michał";

// let numberOfWheels: number = 4;
// let isStudent: boolean = true;
type Address = {
    street: string
    city: string
    country: string
}

type Person = {
    name: string
    age: number
    isStudent: boolean
    address?: Address // optional property
}

let person1: Person = {
    name: "Joe",
    age: 42,
    isStudent: true,
   
}

let person2: Person = { 
    name: "Jill",
    age: 66,
    isStudent: false,
    address: {
        street: "456 Oak Ave",
        city: "Othertown",
        country: "USA"
    }
}