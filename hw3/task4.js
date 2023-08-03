function factorial(n) {
    function fact(n, accumulator) {
        if (n < 2) {
            return accumulator
        } else {
            return fact(n - 1, n * accumulator)
        }
    }

    return fact(n, 1)
}

function power(base, exponent) {
    if (base === 1) {
        return 1
    }
    if (base === 0) {
        return 0
    }

    function exp(base, exponent, accumulator) {
        if (exponent === 0) {
            return accumulator
        } else {
            return exp(base, exponent - 1, base * accumulator)
        }
    }

    return exp(base, exponent, 1)
}

// FACTORIAL TESTS

{
    let n = 5
    let result = factorial(n)

    console.log(result)
    console.log(result === 120)
}
{
    let n = 15
    let result = factorial(n)

    console.log(result)
    console.log(result === 1307674368000)
}

// POWER TESTS

{
    let base = 2
    let exponent = 5
    let result = power(base, exponent)

    console.log(result)
    console.log(result === 32)
}
{
    let base = 12
    let exponent = 12
    let result = power(base, exponent)

    console.log(result)
    console.log(result === 8916100448256)
}