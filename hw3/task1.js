function calculateDiscountedPrice(products, discount) {
    if (!products instanceof Array) {
        throw new Error("You need to pass array of products as first argument")
    }
    if (discount < 0 || discount > 100) {
        throw new Error("Discount value must be between 0..100")
    }
    return products.map(product => {
        if (product.price === undefined) {
            throw new Error("Product must have price before being discounted")
        }
        return {
            ...product,
            price: product.price * ((100 - discount) / 100)
        }
    })
}

function calculateTotalPrice(products) {
    if (!products instanceof Array) {
        throw new Error("You need to pass array of products as first argument")
    }
    return products.reduce(
        (a, b) => {
            if (a.price === undefined) {
                throw new Error("Product must have price before being discounted")
            }
            return ({
                price: a.price + b.price
            })
        }, {price: 0}).price
}

// CALCULATE DISCOUNTED PRICE TESTS

{
    let products = [{id: 1, price: 10}, {id: 2, price: 20}, {id: 3, price: 30}, {id: 4, price: 40}]
    let discount = 10
    let result = calculateDiscountedPrice(products, discount)

    console.log(products)
    console.log(result)
}
{
    let products = [{id: 1, price: 0}, {id: 2, price: 30}]
    let discount = 50
    let result = calculateDiscountedPrice(products, discount)

    console.log(products)
    console.log(result)
}
{
    let products = []
    let discount = 10
    let result = calculateDiscountedPrice(products, discount)

    console.log(products)
    console.log(result)
}

// CALCULATE TOTAL PRICE TESTS

{
    let products = [{id: 1, price: 10}, {id: 2, price: 20}, {id: 3, price: 30}, {id: 4, price: 40}]
    let result = calculateTotalPrice(products)

    console.log(products)
    console.log(result === 100)
}
{
    let products = [{id: 1, price: 0}, {id: 2, price: 30}]
    let result = calculateTotalPrice(products)

    console.log(products)
    console.log(result === 30)
}
{
    let products = []
    let result = calculateTotalPrice(products)

    console.log(products)
    console.log(result === 0)
}