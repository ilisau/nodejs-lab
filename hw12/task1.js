class CustomHashTable {
	#values;

	/**
	 * Creates values array.
	 */
	constructor() {
		this.#values = [];
	}

	/**
	 * Returns hash of a key. O(n) complexity, where n is string size.
	 * @param key
	 * @returns {string} hash
	 */
	hash(key) {
		let hash = 0;
		for (let i = 0; i < key.length; i++) {
			const char = key.charCodeAt(i);
			hash = (hash << 5) - hash + char;
		}
		return hash.toString();
	}

	/**
	 * Inserts value by a key.
	 * @param key
	 * @param value
	 * @returns {*} inserted value
	 */
	insert(key, value) {
		let hash = this.hash(key);
		console.log(this.#values)
		return this.#values[hash] = value;
	}

	/**
	 * Returns value by a key.
	 * @param key
	 * @returns {*} value
	 */
	get(key) {
		return this.#values[this.hash(key)];
	}

	/**
	 * Deletes value by a key.
	 * @param key
	 * @returns {boolean}
	 */
	delete(key) {
		return delete this.#values[this.hash(key)];
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