function getArrayIntersection(array1, array2) {
    const intersection = [];
    let [longerArray, shorterArray] = array1.length > array2.length ? [array1, array2] : [array2, array1]
    for (const element of shorterArray) {
        if (longerArray.includes(element)) {
            intersection.push(element)
        }
    }
    return intersection
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