function createImmutableObject(object) {
    function handleInnerObject(innerObject) {
        for (const property in innerObject) {
            if (innerObject.hasOwnProperty(property)) {
                if (innerObject[property] instanceof Object) {
                    handleInnerObject(innerObject[property])
                }
                Object.defineProperty(innerObject, property, {writable: false})
            }
        }
    }

    const clonedObject = Object.assign({}, object)
    handleInnerObject(clonedObject)
    return clonedObject
}

// TESTS

{
    let obj = {
        name: "Peter"
    }
    let immutableObj = createImmutableObject(obj)

    console.log(Object.getOwnPropertyDescriptors(immutableObj))
}
{
    let obj = {
        name: "Peter",
        parent: {
            name: "John"
        }
    }
    let immutableObj = createImmutableObject(obj)

    console.log(Object.getOwnPropertyDescriptors(immutableObj))
    console.log(Object.getOwnPropertyDescriptors(immutableObj.parent))
}
{
    let obj = {
        name: "Peter",
        parent: {
            name: "John",
            keys: [1, 2, 3]
        }
    }
    let immutableObj = createImmutableObject(obj)

    console.log(Object.getOwnPropertyDescriptors(immutableObj))
    console.log(Object.getOwnPropertyDescriptors(immutableObj.parent))
    console.log(Object.getOwnPropertyDescriptors(immutableObj.parent.keys))
}