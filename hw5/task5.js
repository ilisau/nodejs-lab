function measureArrayPerformance(array, func) {
    let start = performance.now()
    func(array)
    let end = performance.now()
    return end - start
}

function customMap(array, func) {
    let result = []
    for (let i = 0; i < array.length; i++) {
        result.push(func(array[i]))
    }
    return result
}

function customFilter(array, func) {
    let result = []
    for (let i = 0; i < array.length; i++) {
        if (func(array[i])) {
            result.push(func(array[i]))
        }
    }
    return result
}

// TESTS

{
    let array = [1, 2, 3, 4, 5, 6, 7, 8]
    let func = a => console.log(a)
    let result = measureArrayPerformance(array, func)

    console.log(`${result} ms`)
}
{
    let array = new Array(10000).fill(1)
    let func = a => {
        console.log(a.reduce((a, i) => a + i, 0) * a.reduce((a, i) => a - i, 0))
    }
    let result = measureArrayPerformance(array, func)

    console.log(`${result} ms`)
}
{
    let array = [1, 2, 3, 4, 5, 6, 7, 8]
    let func = a => a.map(i => i * i)
    let result = measureArrayPerformance(array, func)

    console.log(`${result} ms`)
}
{
    let array = [1, 2, 3, 4, 5, 6, 7, 8]
    let func = a => a.filter(i => i % 2 === 0)
    let result = measureArrayPerformance(array, func)

    console.log(`${result} ms`)
}
{
    let array = [1, 2, 3, 4, 5, 6, 7, 8]
    let func = a => customMap(a, i => i * i)
    let result = measureArrayPerformance(array, func)

    console.log(`${result} ms`)
}
{
    let array = [1, 2, 3, 4, 5, 6, 7, 8]
    let func = a => customFilter(a, i => i % 2 === 0)
    let result = measureArrayPerformance(array, func)

    console.log(`${result} ms`)
}