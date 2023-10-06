import _ from 'lodash';

function myJSONParse(jsonString) {
	const regex = /[:,\{\}\[\]]|(\".*?\")|('.*?')|[-\w.]+/g;
	let match;
	let matches = [];

	while ((match = regex.exec(jsonString)) !== null) {
		matches.push(match[0]);
	}
	matches = validateJsonObject(matches);
	return handleNestedObject(matches)[0];
}

function validateJsonObject(matches) {
	let index = matches.indexOf('}');
	if (matches.at(0) !== '{' || index === -1) {
		throw new Error("Invalid JSON structure, expected {...}");
	}
	return matches.slice(1);
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
		if (key === ']') {
			break;
		}
		if (key === '}') {
			matches = matches.slice(1);
			break;
		}
		if (key === ',') {
			matches = matches.slice(1);
			if (matches.at(0) === '{') {
				break;
			}
		} else if (value !== '{' && value !== '[') {
			object[key] = castedValue(value);
			if (matches.at(3) === ',') {
				matches = matches.slice(4);
			} else {
				matches = matches.slice(3);
			}
		} else if (value === '{') {
			let newValue;
			let newMatches;
			[newValue, newMatches] = handleNestedObject(validateJsonObject(matches.slice(2)))
			object[key] = newValue;
			matches = newMatches;
		} else if (value === '}' || value === ']') {
			break;
		} else if (value === '[') {
			object[key] = [];
			if(matches.at(0) !== ']') {
				matches = matches.slice(3);
			}
			while (matches.at(0) !== ']') {
				let newValue;
				let newMatches;
				[newValue, newMatches] = handleNestedObject(validateJsonObject(matches))
				object[key].push(newValue);
				matches = newMatches;
				if (matches.at(0) === ',') {
					matches = matches.slice(1);
				}
			}
			matches = matches.slice(1);
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
	try {
		const jsonString = '"name": "John", "age": 30, "cities": ["name": "Minsk", "country": "Belarus"]}';
		const jsonObject = myJSONParse(jsonString);
	} catch (e) {
		console.log(e.message)
	}
}