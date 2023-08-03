function createCounter() {
    let count = 0

    function counter() {
        count++
        return count
    }

    return counter
}

function repeatFunction(func, repeat) {
    function repeatable() {
        if (repeat >= 0) {
            for (let i = 0; i < repeat; i++) {
                func()
            }
        } else {
            while (true) {
                func()
            }
        }
    }

    return repeatable
}

// CREATE COUNTER TESTS

{
    let counter = createCounter()

    console.log(counter() === 1)
    console.log(counter() === 2)
    console.log(counter() === 3)
}

// REPEAT FUNCTION TESTS

{
    let repeat = 5
    let func = function test() {
        console.log("Test function")
    }
    let counter = repeatFunction(func, repeat)

    counter()
}
{
    let repeat = -5
    let func = function test() {
        console.log("Test function")
    }
    let counter = repeatFunction(func, repeat)

    counter()
}