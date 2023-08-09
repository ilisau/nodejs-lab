function customFilterUnique(array, callback) {
    return array.filter(callback)
}

// TESTS

{
    let array = [1, 2, 3, 4, 5, 6]
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