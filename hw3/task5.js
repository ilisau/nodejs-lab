function lazyMap(array, func) {
    let index = 0
    return function nextValue() {
        if (index < array.length) {
            return func(array[index++])
        }
        return undefined
    }
}

function fibonacciGenerator() {
    let index = 0
    let numbers = [1, 1]
    return function nextValue() {
        if (index === 0 || index === 1) {
            index++
            return 1
        }
        let result = numbers[0] + numbers[1]
        numbers[0] = numbers[1]
        numbers[1] = result
        index++
        return result
    }
}

// LAZY MAP TESTS

{
    let array = [1, 2, 3, 4, 5]
    let func = x => x * x
    let result = lazyMap(array, func)

    const squaredValues = []
    let mappedValue
    while ((mappedValue = result()) !== undefined) {
        squaredValues.push(mappedValue)
    }
    console.log(squaredValues)
    console.log(squaredValues.toString() === "1,4,9,16,25")
}

// FIBONACCI GENERATOR TESTS

{
    let generator = fibonacciGenerator()

    const sequence = []
    for (let i = 0; i < 10; i++) {
        sequence.push(generator())
    }
    console.log(sequence)
    console.log(sequence.toString() === "1,1,2,3,5,8,13,21,34,55")
}