function customFilterUnique(array, callback) {
    let result = []
    for (let item of array) {
        if (callback(item)) {
            result.push(item)
        }
    }
    return [...new Set(result)]
}

// TESTS

{
    let array = [1, 2, 3, 4, 5, 6, 4, 2, 6]
    let callback = i => i % 2 === 0
    let result = customFilterUnique(array, callback)

    console.log(result)
}
{
    let array = [1, 2, 3, 4, 5, 6]
    let callback = (i, index) => i === index * 2
    let result = customFilterUnique(array, callback)

    console.log(result)
}
{
    let array = [{name: "Mark"}, {name: "John"}, {name: "Max"}, {name: "Michael"}]
    let callback = i => i.name.startsWith("M")
    let result = customFilterUnique(array, callback)

    console.log(result)
}