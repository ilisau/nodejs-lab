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
        item1 = item1.slice(0, -1)
        item2 = item2.slice(0, -1)
    }
    if (adding > 0) {
        result = adding + result
    }
    if (item1.length > 0) {
        if (adding > 0) {
            return plus(item1, result.at(0)) + result.slice(1)
        }
        return item1 + result
    }
    if (item2.length > 0) {
        if (adding > 0) {
            return plus(item2, result.at(0)) + result.slice(1)
        }
        return item2 + result
    }
    return result
}

function minus(item1, item2) {
    let result = ''
    while (item1.length > 0 && item2.length > 0) {
        if (item1.length < item2.length) {
            return '-1'
        }
        let sum = parseDigit(item1.at(-1)) - parseDigit(item2.at(-1))
        let additionalIndex = 1
        while (sum < 0) {
            if (item1.length <= additionalIndex) {
                return '-1'
            }
            sum += Math.pow(10, additionalIndex) * parseDigit(item1.at(-additionalIndex - 1))
            additionalIndex++
        }
        item1 = replaceChar(item1, Math.floor(sum / Math.pow(10, additionalIndex - 1)), item1.length - additionalIndex)
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
    if (result.length === 0) {
        return '0'
    }
    return result
}

function multiply(item1, item2) {
    let result = ''
    let adding = 0
    if (item2.length > item1.length) {
        [item1, item2] = [item2, item1]
    }
    let item1copy = item1
    let counter = 0
    while (item2.length > 0) {
        let innerResult = ''
        while (item1.length > 0) {
            let sum = parseDigit(item1.at(-1)) * parseDigit(item2.at(-1))
            sum += adding
            if (sum > 9) {
                adding = Math.floor(sum / 10)
                sum %= 10
            } else {
                adding = 0
            }
            innerResult = sum + innerResult
            item1 = item1.slice(0, -1)
        }
        if (adding > 0) {
            innerResult = adding + innerResult
            adding = 0
        }
        for (let i = 0; i < counter; i++) {
            innerResult += '0'
        }
        result = plus(result, innerResult)
        counter++
        item1 = item1copy
        item2 = item2.slice(0, -1)
    }
    return result
}

function divide(item1, item2) {
    let result = ''
    let number = item1.slice(0, item2.length)
    let length = number.length
    while (item1.length > 0) {
        let remainder = number
        let counter = 0
        while (number !== '0' && number !== '-1') {
            remainder = number
            number = minus(number, item2)
            if (number === '0') {
                remainder = ''
            }
            counter++
        }
        if (number !== '0') {
            counter--
        }
        if (counter === 0) {
            number = item1.slice(0, item2.length + 1)
            length = number.length
        } else {
            result += counter
            item1 = remainder + item1.slice(length)
            number = item1.slice(0, item2.length + 1)
        }
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

//MULTIPLY TESTS

{
    let a = '123'
    let b = '3'

    let result = multiply(a, b)
    console.log(result)
    console.log(result === '369')
}
{
    let a = '379'
    let b = '36'

    let result = multiply(a, b)
    console.log(result)
    console.log(result === '13644')
}
{
    let a = '12349'
    let b = '1239573'

    let result = multiply(a, b)
    console.log(result)
    console.log(result === '15307486977')
}
{
    let a = '582323597123061230479'
    let b = '26346871432914932579833'

    let result = multiply(a, b)
    console.log(result)
    console.log(result === '15342404945753846152707367724308574880330007')
}
{
    let a = '58'
    let b = '26346871432914932579833'

    let result = multiply(a, b)
    console.log(result)
    console.log(result === '1528118543109066089630314')
}

//DIVIDE TESTS

{
    let a = '465'
    let b = '15'

    let result = divide(a, b)
    console.log(result)
    console.log(result === '31')
}
{
    let a = '273'
    let b = '3'

    let result = divide(a, b)
    console.log(result)
    console.log(result === '91')
}
{
    let a = '21750'
    let b = '58'

    let result = divide(a, b)
    console.log(result)
    console.log(result === '375')
}
{
    let a = '1161364'
    let b = '199'

    let result = divide(a, b)
    console.log(result)
    console.log(result === '5836')
}
{
    let a = '1163325678986796404228728'
    let b = '199321223432'

    let result = divide(a, b)
    console.log(result)
    console.log(result === '5836436576879')
}