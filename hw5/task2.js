function chunkArray(array, chunkSize) {
    let result = []
    for (let i = 0; i < array.length / chunkSize; i++) {
        result.push(array.slice(i * chunkSize, (i + 1) * chunkSize))
    }
    return result
}

// TESTS

{
    let array = [1, 2, 3, 4, 5, 6]
    let chunkSize = 2
    let result = chunkArray(array, chunkSize)

    console.log(result)
}
{
    let array = [1, 2, 3, 4, 5]
    let chunkSize = 2
    let result = chunkArray(array, chunkSize)

    console.log(result)
}
{
    let array = [1, 2, 3, 4, 5, 6]
    let chunkSize = 7
    let result = chunkArray(array, chunkSize)

    console.log(result)
}
{
    let array = []
    let chunkSize = 2
    let result = chunkArray(array, chunkSize)

    console.log(result)
}