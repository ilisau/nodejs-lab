import Stack from "../hw11/stack.js";
import _ from "lodash";

const regex = /(\[)|(\])|(\{)|(\})|(\:)|(,)|(null)\b|(true)\b|(false)\b|(-?\d+(?:\.\d+)?)|(\"(?:\\\"|[^\"])*\")|([^\[\]{}:,\"\s]+)/g;

/**
 * Parse input string into object.
 * @param json json string
 * @returns {object} parsed object
 */
function myJSONParse(json) {
	let stack = new Stack();
	let elements = [];
	let currentObject = null;
	let key = null;
	let object = null;
	Array.from(json.matchAll(regex)).forEach(match => {
		let lastElement = elements[elements.length - 1];
		let isBracketsOpen;
		switch (match[0]) {
			case '{':
				if (lastElement !== undefined && lastElement[0] !== '[') {
					elements.pop();
				}
				if (currentObject === null) {
					currentObject = {};
					break;
				}
				const newObj = {};
				addField(currentObject, key, newObj);
				key = null;
				stack.push(currentObject);
				currentObject = newObj;
				break;
			case '}':
				isBracketsOpen = lastElement[0] === '{' || (elements.length !== 0 && elements.pop()[0] === '{');
				currentObject = stack.peek() !== undefined ? stack.pop() : currentObject;
				object = currentObject;
				break;
			case ':':
				break;
			case ',':
				lastElement = elements.pop();
				break;
			case '[':
				if (lastElement[0] !== '[') {
					elements.pop();
				}
				const newArray = [];
				addField(currentObject, key, newArray);
				key = null;
				stack.push(currentObject);
				currentObject = newArray;
				break;
			case ']':
				isBracketsOpen = lastElement[0] === '[' || elements.pop()[0] === '[';
				currentObject = stack.peek() ? stack.pop() : currentObject;
				break;
			default:
				if (Array.isArray(currentObject)) {
					let value = castValue(match[0]);
					currentObject.push(value);
				} else if (key === null) {
					key = match[0].slice(1, -1);
				} else {
					currentObject[key] = castValue(match[0]);
					key = null;
				}
		}
		elements.push(match);
	});
	return object;
}

/**
 * Casts value to primitive.
 * @param element
 * @returns {null|boolean|number|*}
 */
function castValue(element) {
	if (element === 'true' || element === 'false') {
		return element === 'true';
	} else if (element === 'null') {
		return null;
	} else if (!Number.isNaN(parseInt(element))) {
		return parseFloat(element);
	} else {
		return element.slice(1, -1);
	}
}

/**
 * Create a field for object or add element into the array.
 * @param object
 * @param key
 * @param value
 */
function addField(object, key, value) {
	if (Array.isArray(object)) {
		object.push(value);
	} else {
		object[key] = value;
	}
}

// TESTS

{
	const jsonString = '{"name": "John", "age": 30, "city": "New York"}';
	const jsonObject = myJSONParse(jsonString);
	console.log(jsonObject);
	console.assert(_.isEqual({name: 'John', age: 30, city: 'New York'}, jsonObject));
}
{
	const jsonString = '{"name": "John", "age": 30, "city": null}';
	const jsonObject = myJSONParse(jsonString);
	console.log(jsonObject);
	console.assert(_.isEqual({name: 'John', age: 30, city: null}, jsonObject));
}
{
	const jsonString = '{"name": "John", "age": 30, "city": {"name": "New York", "country": "USA"}}';
	const jsonObject = myJSONParse(jsonString);
	console.log(jsonObject);
	console.assert(_.isEqual({name: 'John', age: 30, city: {name: "New York", country: "USA"}}, jsonObject));
}
{
	const jsonString = '{"name": "John", "age": 30, "city": {"name": "New York", "country": "USA"}, "parent": {"name": "Mom"}}';
	const jsonObject = myJSONParse(jsonString);
	console.log(jsonObject);
	console.assert(_.isEqual({
		name: 'John',
		age: 30,
		city: {name: "New York", country: "USA"},
		parent: {name: "Mom"}
	}, jsonObject));
}
{
	const jsonString = '{"name": "John", "age": 30, "city": {"name": "New York", "country": "USA"}, "gender": "male"}';
	const jsonObject = myJSONParse(jsonString);
	console.log(jsonObject);
	console.assert(_.isEqual({
		name: 'John',
		age: 30,
		city: {name: "New York", country: "USA"},
		gender: "male"
	}, jsonObject));
}
{
	const jsonString = '{"name": "John", "age": 30, "cities": [{"name": "New York", "country": "USA"}, {"name": "Mexico City", "country": "Mexico"}], "gender": "male"}';
	const jsonObject = myJSONParse(jsonString);
	console.log(jsonObject);
	console.assert(_.isEqual({
		name: 'John',
		age: 30,
		cities: [{name: "New York", country: "USA"}, {name: "Mexico City", country: "Mexico"}],
		gender: "male"
	}, jsonObject));
}
{
	const jsonString = '{"name": "John", "cities": [{"names": [{"name": "New York", "country": "USA"}]}], "gender": "male"}';
	const jsonObject = myJSONParse(jsonString);
	console.log(jsonObject);
	console.assert(_.isEqual({
		name: 'John',
		cities: [{names: [{name: "New York", country: "USA"}]}],
		gender: "male"
	}, jsonObject));
}
{
	const jsonString = `{
        "id": "647ceaf3657eade56f8224eb",
        "index": 10,
        "negativeIndex": -10,
        "anEmptyArray": [],
        "notEmptyArray": [1, 2, 3,"string", true, null],
        "boolean": true,
        "nullValue": null,
        "nestedObject": {
            "nestedString": "Hello World",
            "nestedNumber": 42,
            "nestedArray": [true, false]
        },
        "complexArray": [
            {
                "name": "Alice Alice",
                "age": 28,
                "hobbies": ["Reading", "Painting"]
            },
            {
                "name": "Bob Bob",
                "age": 32,
                "hobbies": ["Gaming", "Cooking"]
            }
        ]
    }`;
	const jsonObject = myJSONParse(jsonString);
	console.log(jsonObject);
}