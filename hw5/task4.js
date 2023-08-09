function getArrayIntersection(array1, array2) {
    let result = []
    let array1sorted = array1.sort()
    let array2sorted = array2.sort()
    let pos = -1
    for (let i = 0; i < array1sorted.length; i++) {
        for (let j = pos + 1; j < array2sorted.length; j++) {
            if (array1sorted[i] === array2sorted[j]) {
                pos = j
                result.push(array1sorted[i])
                break
            } else if (array1sorted[i] < array2sorted[j]) {
                break
            }
        }
    }
    return result
}

function getArrayUnion(array1, array2) {
    return [...new Set([...new Set(array1), ...new Set(array2)])]
}

// TESTS GET ARRAY INTERSECTION

{
    let array1 = [1, 2, 3, 4, 5, 6]
    let array2 = [2, 3, 4, 5]
    let result = getArrayIntersection(array1, array2)

    console.log(result)
}
{
    let array1 = [1, 2, 3, 4, 5, 6]
    let array2 = [2, 3, 4, 5]
    let result = getArrayIntersection(array2, array1)

    console.log(result)
}
{
    let array1 = [7]
    let array2 = [2, 3, 4, 5]
    let result = getArrayIntersection(array2, array1)

    console.log(result)
}
{
    let array1 = [5]
    let array2 = [2, 3, 4, 5]
    let result = getArrayIntersection(array2, array1)

    console.log(result)
}
{
    let array1 = [6]
    let array2 = [6, 6, 6]
    let result = getArrayIntersection(array2, array1)

    console.log(result)
}

// TESTS GET ARRAY UNION

{
    let array1 = [1, 2, 3, 4, 5, 6]
    let array2 = [2, 3, 4, 5]
    let result = getArrayUnion(array1, array2)

    console.log(result)
}
{
    let array1 = [1, 2, 3, 4, 5, 6]
    let array2 = [2, 3, 4, 5]
    let result = getArrayUnion(array2, array1)

    console.log(result)
}
{
    let array1 = [7]
    let array2 = [2, 3, 4, 5]
    let result = getArrayUnion(array1, array2)

    console.log(result)
}
{
    let array1 = [5, 2, 3, 3, 5]
    let array2 = [2, 3, 4, 5]
    let result = getArrayUnion(array1, array2)

    console.log(result)
}