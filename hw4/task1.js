let person = {
    firstName: "John",
    lastName: "Doe",
    age: 30,
    email: "john.doe@example.com",

    updateInfo(info) {
        Object.getOwnPropertyNames(info)
            .forEach(property => {
                if (Object.hasOwn(this, property) && Object.getOwnPropertyDescriptor(this, property).writable) {
                    Object.defineProperty(this, property, {value: info[property]})
                }
            })
    }
}

Object.getOwnPropertyNames(person)
    .forEach(property =>
        Object.defineProperty(person, property, {writable: false}))

Object.defineProperty(person, "address", {value: {}, writable: true, enumerable: false, configurable: false})

// TESTS

{
    person.updateInfo({address: {city: "Minsk"}})

    console.log(person)
    console.log(person.address.city === "Minsk")
}