import {LinkedList} from "../hw11/linkedList.js";

class CustomHashTable {
	#values;
	#bucketsAmount;

	/**
	 * Creates object and initialize values array.
	 */
	constructor(bucketsAmount = 10) {
		this.#bucketsAmount = bucketsAmount;
		this.#values = new Array(this.#bucketsAmount).fill(new LinkedList());
	}

	/**
	 * Returns hash of a key. O(n) complexity, where n is string size.
	 * @param key
	 * @returns {string} hash
	 */
	hash(key) {
		let hash = 0;
		for (let i = 0; i < key.toString().length; i++) {
			const char = key.toString().charCodeAt(i);
			hash = (hash << 5) - hash + char;
		}
		return hash.toString();
	}

	/**
	 * Inserts value by a key. O(n * m) complexity, where n is string size, m is amount of values in bucket.
	 * @param key
	 * @param value
	 * @returns {*} inserted value
	 */
	insert(key, value) {
		let hash = this.hash(key);
		let index = hash % this.#bucketsAmount;
		if (this.#values[index].size === 0) {
			this.#values[index].push({key: key, value: value});
		} else {
			this.#replaceOrInsert(this.#values[index], value, key);
		}
	}

	/**
	 * Returns value by a key. O(n * m) complexity, where n is string size, m is amount of values in bucket.
	 * @param key
	 * @returns {*} value
	 */
	get(key) {
		let index = this.hash(key) % this.#bucketsAmount;
		let list = this.#values[index];
		for (let i = 0; i < list.size; i++) {
			if (this.hash(list.get(i).key === this.hash(key))) {
				return list.get(i).value;
			}
		}
		return null;
	}

	/**
	 * Deletes value by a key. O(n * m) complexity, where n is string size, m is amount of values in bucket.
	 * @param key
	 * @returns {boolean}
	 */
	delete(key) {
		let index = this.hash(key) % this.#bucketsAmount;
		let list = this.#values[index];
		for (let i = 0; i < list.size; i++) {
			if (this.hash(list.get(i).key === this.hash(key))) {
				list.remove(i);
				return;
			}
		}
	}

	#replaceOrInsert(list, value, key) {
		for (let i = 0; i < list.size; i++) {
			if (this.hash(list.get(i).key === this.hash(key))) {
				list.set(i, {key: key, value: value});
				return;
			}
		}
		list.push({key: key, value: value});
	}
}

// TESTS

{
	const hasher = new CustomHashTable();
	let str = "hello world";
	let result = hasher.hash(str);
	console.log(result);
}
{
	const hasher = new CustomHashTable();
	let str = "abba";
	let result = hasher.hash(str);
	console.log(result);
}
{
	const hasher = new CustomHashTable();
	let str = "really long string with too much words to be hashed in single integer value";
	let result = hasher.hash(str);
	console.log(result);
}
{
	const hasher = new CustomHashTable();
	for (let i = 0; i < 5; i++) {
		hasher.insert(i, `some value for key ${i}`);
		console.log(hasher.get(i));
	}
}
{
	const hasher = new CustomHashTable();
	hasher.insert('key', 'first value');
	hasher.delete('key');
	hasher.insert('key', 'second value');
	console.log(hasher.get('key'));
}