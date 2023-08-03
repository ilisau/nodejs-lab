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
    return [...new Set(text.split(/\W+/).sort())]
}

function getAverageGrade(students) {
    if (!students instanceof Array) {
        throw new Error("You need to pass array of students as argument")
    }
    if (students.length === 0) {
        return 0
    }
    return students.reduce((sum, student) => {
        if (student.name === undefined || student.grade === undefined) {
            throw new Error("Student must have name and grade")
        }
        return ({
            grade: sum.grade + student.grade
        })
    }, {grade: 0}).grade / students.length
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
    let students = [{name: "Bob", grade: 5}, {name: "Alice", grade: 10}]
    let result = getAverageGrade(students)

    console.log(result)
    console.log(result === 7.5)
}
{
    let students = []
    let result = getAverageGrade(students)

    console.log(result)
    console.log(result === 0)
}
{
    let students = [{name: "Bob", grade: 5}, {name: "Alice", grade: 10}, {name: "Mark", grade: 3}]
    let result = getAverageGrade(students)

    console.log(result)
    console.log(result === 6)
}