function plus(item1, item2) {
    let result = ''
    let adding = 0
    while (item1.length > 0 && item2.length > 0) {
        let sum = parseDigit(item1.at(-1)) + parseDigit(item2.at(-1))
        sum += adding
        if (sum > 9) {
            adding = Math.floor(sum / 10)
            sum %= 10
        } else {
            adding = 0
        }
        result = sum + result
        item1 = item1.slice(0, - 1)
        item2 = item2.slice(0, - 1)
    }
    if (item1.length > 0) {
        result = item1 + result
    }
    if (item2.length > 0) {
        result = item2 + result
    }
    if (adding > 0) {
        result = adding + result
    }
    return result
}

function minus(item1, item2) {
    let result = ''
    while (item1.length > 0 && item2.length > 0) {
        let sum = parseDigit(item1.at(-1)) - parseDigit(item2.at(-1))
        let additionalIndex = 1
        while (sum < 0) {
            sum += Math.pow(10, additionalIndex) * parseDigit(item1.at(-additionalIndex - 1))
            additionalIndex++
        }
        while (sum > 9) {
            item1 = replaceChar(item1, Math.floor(sum / Math.pow(10, additionalIndex - 1)), item1.length - additionalIndex)
            sum %= Math.pow(10, additionalIndex - 1)
            additionalIndex--
        }
        result = sum + result
        item1 = item1.slice(0, -1)
        item2 = item2.slice(0, -1)
    }
    if (item1.length > 0) {
        result = item1 + result
    }
    while (result.at(0) === '0') {
        result = result.slice(1)
    }
    return result
}

function parseDigit(item) {
    switch (item) {
        case '0':
            return 0
        case '1':
            return 1
        case '2':
            return 2
        case '3':
            return 3
        case '4':
            return 4
        case '5':
            return 5
        case '6':
            return 6
        case '7':
            return 7
        case '8':
            return 8
        case '9':
            return 9
    }
}

function replaceChar(string, char, index) {
    string = string.split('')
    string.splice(index, 1, char)
    return string.join('')
}

// PLUS TESTS

{
    let a = '123'
    let b = '456'

    let result = plus(a, b)
    console.log(result)
    console.log(result === '579')
}
{
    let a = '173'
    let b = '456'

    let result = plus(a, b)
    console.log(result)
    console.log(result === '629')
}
{
    let a = '17'
    let b = '456'

    let result = plus(a, b)
    console.log(result)
    console.log(result === '473')
}
{
    let a = '123456789876543'
    let b = '1375'

    let result = plus(a, b)
    console.log(result)
    console.log(result === '123456789877918')
}
{
    let a = '85432546576879775762437546857698'
    let b = '76546325456678786354767988564364'

    let result = plus(a, b)
    console.log(result)
    console.log(result === '161978872033558562117205535422062')
}

//MINUS TESTS

{
    let a = '456'
    let b = '123'

    let result = minus(a, b)
    console.log(result)
    console.log(result === '333')
}
{
    let a = '456'
    let b = '173'

    let result = minus(a, b)
    console.log(result)
    console.log(result === '283')
}
{
    let a = '456'
    let b = '17'

    let result = minus(a, b)
    console.log(result)
    console.log(result === '439')
}
{
    let a = '406'
    let b = '129'

    let result = minus(a, b)
    console.log(result)
    console.log(result === '277')
}
{
    let a = '123456789876543'
    let b = '1375'

    let result = minus(a, b)
    console.log(result)
    console.log(result === '123456789875168')
}
{
    let a = '85432546576879775762437546857698'
    let b = '76546325456678786354767988564364'

    let result = minus(a, b)
    console.log(result)
    console.log(result === '8886221120200989407669558293334')
}