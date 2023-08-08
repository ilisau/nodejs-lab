function validateObject(object, schema) {
    let objectFields = Object.getOwnPropertyNames(object)
    let schemaFields = Object.getOwnPropertyNames(schema)
    if (objectFields.length !== schemaFields.length) {
        return false
    }
    objectFields.forEach(field => {
        if (!schemaFields.includes(field)) {
            return false
        }
    })
    for (let field of objectFields) {
        let rule = schema[field]
        if (typeof object[field] !== rule.type) {
            return false
        }
        if (object[field] !== rule.value) {
            return false
        }
    }
    return true
}

// TESTS

//Schema strongly defines fields, their types and their values
//Schema is an object with fields named as in object and values - field properties
//If some property is not present in schema, but present in object, false will be returned

{
    let object = {
        name: "Mark",
        age: 55
    }
    let schema = {
        name: {
            value: "Mark",
            type: "string"
        },
        age: {
            value: 55,
            type: "number"
        }
    }

    console.log(validateObject(object, schema))
}
{
    let object = {
        name: "Mark",
        age: 55
    }
    let schema = {
        name: {
            value: "Mark",
            type: "string"
        },
        age: {
            value: 40,
            type: "number"
        }
    }

    console.log(validateObject(object, schema))
}
{
    let object = {
        name: "Mark",
        age: 55
    }
    let schema = {
        name: {
            value: "Mark",
            type: "string"
        }
    }

    console.log(validateObject(object, schema))
}