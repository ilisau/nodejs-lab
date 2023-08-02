function addValues(item1, item2) {
    if (item1 instanceof Array && !item2 instanceof Array
        || item2 instanceof Array && !item1 instanceof Array) {
        throw new Error("You can not add to array any type except of Array")
    }
    if (item1 instanceof Array && item2 instanceof Array) {
        return item1.concat(item2)
    }
    switch (typeof item1) {
        case "boolean": {
            return !(item1 === false || item2 === false)

        }
        default: {
            return item1 + item2
        }
    }
}

function stringifyValue(item) {
    switch (typeof item) {
        case "boolean":
            return item.toString()
        default:
            return JSON.stringify(item)
    }
}

function invertBoolean(item) {
    if (typeof item != "boolean") {
        throw new Error("Argument is not of boolean type")
    }
    return item === false
}

function convertToNumber(item) {
    let type = typeof item
    switch (type) {
        case "boolean": {
            return item ? 1 : 0
        }
        case "string":
        case "symbol": {
            if (item.includes('.') || item.includes(',')) {
                item = item.replace(",", ".")
                return parseFloat(item)
            }
            return parseInt(item)
        }
        default:
            throw new Error("Argument is of an inappropriate type")
    }
}

function coerceToType(value, type) {
    let valueType = typeof value
    switch (type) {
        case "string": {
            if (valueType === "object") {
                return JSON.stringify(value)
            }
            return value.toString()
        }
        case "number": {
            if (valueType === "boolean") {
                return value ? 1 : 0
            } else if (valueType === "string") {
                return convertToNumber(value)
            } else {
                throw new Error("Inappropriate coercing type")
            }
        }
        case "boolean": {
            if (valueType === "string") {
                return value === "true" || value === "1"
            } else if (valueType === "number") {
                return value === 1
            } else {
                throw new Error("Inappropriate coercing type")
            }
        }
        default:
            throw new Error("Inappropriate coercing type")
    }
}

// ADD VALUES TESTS

{
    let a = true
    let b = false
    let result = addValues(a, b)

    console.log(result)
    console.log(result === false)
}
{
    let a = "firstString"
    let b = "lastString"
    let result = addValues(a, b)

    console.log(result)
    console.log(result === "firstStringlastString")
}
{
    let a = 12345
    let b = 54321
    let result = addValues(a, b)

    console.log(result)
    console.log(result === 66666)
}
{
    let a = 123
    let b = "lalal"
    let result = addValues(a, b)

    console.log(result)
    console.log(result === "123lalal")
}
{
    let a = [1, 2, 3]
    let b = ['a', 'b']
    let result = addValues(a, b)

    console.log(result)
    console.log(result.toString() === [1, 2, 3, 'a', 'b'].toString())
}

// STRINGIFY TESTS

{
    let a = 123
    let result = stringifyValue(a)

    console.log(result)
    console.log(result === "123")
}
{
    let a = true
    let result = stringifyValue(a)

    console.log(result)
    console.log(result === "true")
}
{
    let a = ['a', 'b', 'c']
    let result = stringifyValue(a)

    console.log(result)
    console.log(result === "[\"a\",\"b\",\"c\"]")
}
{
    let a = {
        "field": ['a', 'b', 'c']
    }
    let result = stringifyValue(a)

    console.log(result)
    console.log(result === "{\"field\":[\"a\",\"b\",\"c\"]}")
}

// INVERT BOOLEAN TESTS

{
    let a = true
    let result = invertBoolean(a)

    console.log(result)
    console.log(result === false)
}
{
    let a = false
    let result = invertBoolean(a)

    console.log(result)
    console.log(result === true)
}
{
    let a = 123
    try {
        invertBoolean(a)
    } catch (e) {
        console.log(e.message === "Argument is not of boolean type")
    }
}

// CONVERT TO NUMBER TESTS

{
    let a = true
    let result = convertToNumber(a)

    console.log(result)
    console.log(result === 1)
}
{
    let a = "1.234"
    let result = convertToNumber(a)

    console.log(result)
    console.log(result === 1.234)
}
{
    let a = "1,321"
    let result = convertToNumber(a)

    console.log(result)
    console.log(result === 1.321)
}
{
    let a = "1238563"
    let result = convertToNumber(a)

    console.log(result)
    console.log(result === 1238563)
}
{
    let a = ['a']
    try {
        convertToNumber(a)
    } catch (e) {
        console.log(e.message === "Argument is of an inappropriate type")
    }
}

// COERCE TO TYPE TESTS
{
    let a = 1
    let b = "string"
    let result = coerceToType(a, b)

    console.log(result)
    console.log(result === "1")
}
{
    let a = "1"
    let b = "number"
    let result = coerceToType(a, b)

    console.log(result)
    console.log(result === 1)
}
{
    let a = "1.3234"
    let b = "number"
    let result = coerceToType(a, b)

    console.log(result)
    console.log(result === 1.3234)
}
{
    let a = "1"
    let b = "boolean"
    let result = coerceToType(a, b)

    console.log(result)
    console.log(result === true)
}
{
    let a = 1
    let b = "boolean"
    let result = coerceToType(a, b)

    console.log(result)
    console.log(result === true)
}
{
    let a = ['a']
    let b = "boolean"
    try {
        coerceToType(a, b)
    } catch (e) {
        console.log(e.message === "Inappropriate coercing type")
    }
}