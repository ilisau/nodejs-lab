function plus(item1, item2) {
    let result = '';
    let adding = 0;
    while (item1.length > 0 && item2.length > 0) {
        let sum = parseDigit(item1.at(- 1)) + parseDigit(item2.at(- 1))
        sum += adding
        if (sum > 9) {
            adding = Math.floor(sum / 10);
            sum = sum % 10;
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

function parseDigit(item) {
    switch (item) {
        case '0':
            return 0;
        case '1':
            return 1;
        case '2':
            return 2;
        case '3':
            return 3;
        case '4':
            return 4;
        case '5':
            return 5;
        case '6':
            return 6;
        case '7':
            return 7;
        case '8':
            return 8;
        case '9':
            return 9;
    }
}

//PLUS TESTS

{
    let a = '123';
    let b = '456';

    let result1 = plus(a, b);
    console.log(result1)
    console.log(result1 === '579')
}
{
    let a = '173';
    let b = '456';

    let result1 = plus(a, b);
    console.log(result1)
    console.log(result1 === '629')
}
{
    let a = '17';
    let b = '456';

    let result1 = plus(a, b);
    console.log(result1)
    console.log(result1 === '473')
}
{
    let a = '123456789876543';
    let b = '1375';

    let result1 = plus(a, b);
    console.log(result1)
    console.log(result1 === '123456789877918')
}
{
    let a = '85432546576879775762437546857698';
    let b = '76546325456678786354767988564364';

    let result1 = plus(a, b);
    console.log(result1)
    console.log(result1 === '161978872033558562117205535422062')
}