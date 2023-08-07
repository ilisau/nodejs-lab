function observeObject(object, callback) {
    return new Proxy(object, {
        get(target, property, receiver) {
            const value = Reflect.get(target, property, receiver)
            callback(property, 'get')
            return value
        },
        set(target, property, value, receiver) {
            const result = Reflect.set(target, property, value, receiver)
            callback(property, 'set')
            return result
        }
    })
}

let person = {
    firstName: "John",
    lastName: "Doe",
    age: 30,
    email: "john.doe@example.com",

    updateInfo(info) {
        Object.getOwnPropertyNames(info)
            .forEach(property => {
                if (Object.hasOwn(this, property)) {
                    this[property] = info[property]
                }
            })
    }
}

// TESTS

{
    const observedPerson = observeObject(person, (property, action) => {
        console.log(`Property '${property}' was ${action}`)
    })

    console.log(observedPerson.firstName)
}
{
    const observedPerson = observeObject(person, (property, action) => {
        console.log(`Property '${property}' was ${action}`)
    })

    observedPerson.updateInfo({age: 35})
}


