function getFullName(person) {
    if (person.firstName === undefined || person.lastName === undefined) {
        throw new Error("Person must have first name and last name")
    }
    return person.firstName.charAt(0).toUpperCase()
        + person.firstName.slice(1)
        + " "
        + person.lastName.charAt(0).toUpperCase()
        + person.lastName.slice(1)
}

function filterUniqueWords(text) {
    return [...new Set(text.toLowerCase().split(/\W+/).sort())]
}

function getAverageGrade(marks) {
    if (!marks instanceof Array) {
        throw new Error("You need to pass array of marks as argument")
    }
    if (marks.length === 0) {
        return 0
    }
    let result = new Map();
    for (let mark of marks) {
        let key = mark["name"];
        let value = mark["grade"];
        if (result.has(key)) {
            result.get(key).push(value);
        } else {
            result.set(key, [value]);
        }
    }
    return Array.from(result.keys())
        .map(name => (
            {name: name, grade: averageOfArray(result.get(name))}
        ))
}

function averageOfArray(array) {
    if (array.length === 0) {
        return 0
    }
    return array.reduce((item, sum) => {
        return sum + item
    }, 0) / array.length
}

// GET FULL NAME TESTS

{
    let person = {firstName: "Mark", lastName: "Twain"}
    let result = getFullName(person)

    console.log(result)
    console.log(result === "Mark Twain")
}
{
    let person = {firstName: "mark", lastName: "twain"}
    let result = getFullName(person)

    console.log(result)
    console.log(result === "Mark Twain")
}

// FILTER UNIQUE WORDS

{
    let words = "word1 word2 word3"
    let result = filterUniqueWords(words)

    console.log(result)
    console.log(result.toString() === "word1,word2,word3")
}
{
    let words = "Hello hello Mark"
    let result = filterUniqueWords(words)

    console.log(result)
    console.log(result.toString() === "hello,mark")
}
{
    let words = "word1 word2 word1"
    let result = filterUniqueWords(words)

    console.log(result)
    console.log(result.toString() === "word1,word2")
}
{
    let words = "word1, word2! word1"
    let result = filterUniqueWords(words)

    console.log(result)
    console.log(result.toString() === "word1,word2")
}

// GET AVERAGE GRADE LENGTH

{
    let students = [
        {name: "Bob", grade: 5},
        {name: "Alice", grade: 10}
    ]
    let result = getAverageGrade(students)

    console.log(result)
}
{
    let students = [
        {name: "Bob", grade: 5},
        {name: "Alice", grade: 10},
        {name: "Bob", grade: 3},
        {name: "Alice", grade: 7}
    ]
    let result = getAverageGrade(students)

    console.log(result)
}