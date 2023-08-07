let person = {
    firstName: "John",
    lastName: "Doe",
    age: 30,
    email: "john.doe@example.com",

    updateInfo(info) {
        Object.getOwnPropertyNames(info)
            .forEach(property => {
                if (Object.hasOwn(this, property)) {
                    Object.defineProperty(this, property, {value: info[property]})
                }
            })
    }
}

Object.getOwnPropertyNames(person)
    .forEach(property =>
        Object.defineProperty(person, property, {writable: false}))

Object.defineProperty(person, "address", {value: {}, enumerable: false, configurable: false})

// TESTS

{
    person.updateInfo({age: 35})

    console.log(person)
    console.log(person.age === 35)
}
{
    person.age = 40

    console.log(person)
    console.log(person.age === 35)
}