import _ from 'lodash';

function myJSONParse(jsonString) {
	const regex = /[:,\{\}\[\]]|(\".*?\")|('.*?')|[-\w.]+/g;
	let match;
	let matches = [];

	while ((match = regex.exec(jsonString)) !== null) {
		matches.push(match[0]);
	}
	matches = validateJson(matches);
	return handleNestedObject(matches)[0];
}

function validateJson(matches) {
	if (matches.at(0) !== '{' || matches.at(-1) !== '}') {
		throw new Error("Invalid JSON structure, expected {...}");
	}
	return matches.slice(1, -1);
}

function castedValue(value) {
	if (!isNaN(value) && !isNaN(parseFloat(value))) {
		return parseFloat(value);
	}
	if (value === 'null') {
		return null;
	}
	return value.replaceAll('"', '');
}

function handleNestedObject(matches) {
	let object = {};
	while (matches.length !== 0) {
		let key = matches[0].replaceAll('"', '');
		let value = matches[2];
		if (value !== '{' && value !== '[') {
			object[key] = castedValue(value);
			matches = matches.slice(4);
		} else if (value === '{') {
			let newValue;
			let newMatches;
			[newValue, newMatches] = handleNestedObject(validateJson(matches.slice(2)))
			object[key] = newValue;
			matches = newMatches;
		} else if (value === '}') {
			break;
		} else if (value === '[') {
			object[key] = [];
		}
	}
	return [object, matches];
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
	const jsonString = '{"name": "John", "age": 30, "cities": [{"name": "New York", "country": "USA"}, {"name": "Mexico City", "country": "Mexico"]}';
	const jsonObject = myJSONParse(jsonString);
	console.log(jsonObject);
	console.assert(_.isEqual({
		name: 'John',
		age: 30,
		cities: [{name: "New York", country: "USA"}, {name: "Mexico City", country: "Mexico"}]
	}, jsonObject));
}
// {
// 	try {
// 		const jsonString = '"name": "John", "age": 30, "cities": ["name": "Minsk", "country": "Belarus"]}';
// 		const jsonObject = myJSONParse(jsonString);
// 	} catch (e) {
// 		console.log(e.message)
// 	}
// }