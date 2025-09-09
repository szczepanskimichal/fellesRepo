// let myName: string = "Michał";
var person1 = {
    name: "Joe",
    age: 42,
    isStudent: true,
};
var person2 = {
    name: "Jill",
    age: 66,
    isStudent: false,
    address: {
        street: "456 Oak Ave",
        city: "Othertown",
        country: "USA"
    }
};
function displayInfo(person) {
    var _a;
    console.log("".concat(person.name, " is ").concat((_a = person.address) === null || _a === void 0 ? void 0 : _a.city)); // optional chaining and nullish coalescing;
}
displayInfo(person1);
