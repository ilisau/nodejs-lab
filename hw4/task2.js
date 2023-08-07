let product = {
    name: "Laptop",
    price: 1000,
    quantity: 5
}

Object.defineProperties(product, {
    price: {
        enumerable: false,
        writable: false
    },
    quantity: {
        enumerable: false,
        writable: false
    }
})

function getTotalPrice(product) {
    return Object.getOwnPropertyDescriptor(product, "price").value * Object.getOwnPropertyDescriptor(product, "quantity").value
}

function deleteNonConfigurable(product, property) {
    if (Object.hasOwn(product, property)) {
        if (!Object.getOwnPropertyDescriptor(product, property).configurable) {
            throw new Error("Property is not configurable")
        }
        delete product[property]
    }
}

// TESTS

{
    let cost = getTotalPrice(product)

    console.log(cost)
    console.log(cost === 5000)
}
{
    deleteNonConfigurable(product, "name")

    console.log(product)
    console.log(!Object.hasOwn(product, "name"))
}
{
    try {
        Object.defineProperty(product, "price", {configurable: false})
        deleteNonConfigurable(product, "price")
    } catch (e) {
        console.log(e.message === "Property is not configurable")
    }
}