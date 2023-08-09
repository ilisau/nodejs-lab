function customShuffle(array) {
    let result = [...array]
    for (let i = array.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1))
        const temp = result[i]
        result[i] = result[j]
        result[j] = temp
    }
    return result
}

// TESTS

{
    let array = [1, 2, 3, 4, 5, 6]
    let result = customShuffle(array)

    console.log(result)
}
{
    let array = [1, 2]
    let result = customShuffle(array)

    console.log(result)
}
{
    let array = []
    let result = customShuffle(array)

    console.log(result)
}
{
    let array = [{name: "Mark"}, {name: "John"}, {name: "Max"}, {name: "Michael"}]
    let result = customShuffle(array)

    console.log(result)
}