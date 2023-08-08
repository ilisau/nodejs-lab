function deepCloneObject(obj, visited = new WeakMap()) {
    if (obj === null || typeof obj !== 'object') {
        return obj
    }
    if (visited.has(obj)) {
        return visited.get(obj)
    }
    let clone
    if (obj instanceof Date) {
        clone = new Date(obj.getTime())
    } else if (Array.isArray(obj)) {
        clone = []
    } else {
        clone = Object.create(Object.getPrototypeOf(obj))
    }
    visited.set(obj, clone)
    for (let key in obj) {
        if (obj.hasOwnProperty(key)) {
            clone[key] = deepCloneObject(obj[key], visited)
        }
    }
    return clone
}

// TESTS

{
    let obj = {
        name: "Mark",
        age: 35,
        parents: [
            {
                name: "Parent1",
                age: 65
            },
            {
                name: "Parent2",
                age: 68
            }
        ]
    }
    let clonedObj = deepCloneObject(obj)

    console.log(clonedObj)
}
{
    let obj = {
        name: "Mark",
        age: 35,
        parents: [
            {
                name: "Parent1",
                age: 65
            },
            {
                name: "Parent2",
                age: 68
            }
        ]
    }
    obj.parents[0] = obj
    let clonedObj = deepCloneObject(obj)

    console.log(clonedObj)
}