export class LinkedList {
	#start;
	#size;

	/**
	 * Creates object and initializes head node and size.
	 */
	constructor() {
		this.#start = null;
		this.#size = 0;
	}

	/**
	 * Adds item to end of list.
	 * @param item
	 */
	push(item) {
		let node = new Node(item);
		if (this.#start !== null) {
			let end = this.#start;
			while (end.next) {
				end = end.next;
			}
			end.next = node;
		} else {
			this.#start = node;
		}
		this.#size++;
	}

	/**
	 * Removes item from the end of list.
	 */
	pop() {
		if (this.#start !== null) {
			let end = this.#start;
			while (end.next) {
				end = end.next;
			}
			end = null;
			this.#size--;
		}
	}

	/**
	 * Returns item by index or throws an exception if index is out of bounds.
	 * @param index
	 * @returns {*}
	 */
	get(index) {
		if (index < 0 || index > this.#size - 1) {
			throw new Error(`Index is out of bounds [0, ${this.#size - 1}]`);
		}
		let node = this.#start;
		for (let i = 0; i < index; i++) {
			node = node.next;
		}
		return node.value;
	}

	/**
	 * Set item by index or throws an exception if index is out of bounds.
	 * @param index
	 * @param item
	 */
	set(index, item) {
		if (index < 0 || index > this.#size - 1) {
			throw new Error(`Index is out of bounds [0, ${this.#size - 1}]`);
		}
		let node = this.#start;
		for (let i = 0; i < index; i++) {
			node = node.next;
		}
		node.value = item;
	}

	/**
	 * Removes item by index or throws an exception if index is out of bounds.
	 * @param index
	 */
	remove(index) {
		if (index < 0 || index > this.#size - 1) {
			throw new Error(`Index is out of bounds [0, ${this.#size - 1}]`);
		}
		this.#size--;
		if (index === 0) {
			this.#start = this.#start.next;
			return;
		}
		let node = this.#start;
		let previous = null;
		for (let i = 0; i < index; i++) {
			previous = node;
			node = node.next;
		}
		if (node.next) {
			previous.next = node.next;
		} else {
			previous.next = null;
		}
	}

	/**
	 * Returns index of item or -1 if item is not found.
	 * @param item
	 * @returns {number}
	 */
	indexOf(item) {
		let node = this.#start;
		let pos = 0;
		while (node !== null) {
			if (node.value === item) {
				return pos;
			}
			node = node.next;
			pos++;
		}
		return -1;
	}

	/**
	 * Returns size of list.
	 * @returns {number}
	 */
	get size() {
		return this.#size;
	}
}

class Node {
	#value;
	#next;

	constructor(value, next = null) {
		this.#value = value;
		this.#next = next;
	}

	get value() {
		return this.#value;
	}

	set value(value) {
		this.#value = value;
	}

	get next() {
		return this.#next;
	}

	set next(node) {
		this.#next = node;
	}
}

// LINKED LIST TESTS

{
	let list = new LinkedList();
	list.push(1);
	list.push(2);
	list.push(3);

	console.log(list.size === 3);
}
{
	let list = new LinkedList();
	list.push(1);
	list.push(2);
	list.pop();

	console.log(list.size === 1);
}
{
	let list = new LinkedList();
	list.push(1);
	list.push(2);
	list.push(3);
	list.push(4);
	list.push(5);

	console.log(list.get(0) === 1);
	console.log(list.get(1) === 2);
	console.log(list.get(4) === 5);
}
{
	let list = new LinkedList();
	list.push(1);
	list.push(2);
	list.push(3);
	list.push(4);
	list.set(3, 5)
	list.set(0, 10);

	console.log(list.get(0) === 10);
	console.log(list.get(3) === 5);
}
{
	let list = new LinkedList();
	list.push(1);
	list.push(2);
	list.push(3);
	list.push(4);
	list.set(3, 5)
	list.set(0, 10);

	console.log(list.indexOf(0) === -1);
	console.log(list.indexOf(10) === 0);
	console.log(list.indexOf(5) === 3);
}
{
	let list = new LinkedList();
	list.push(1);
	list.push(2);
	list.push(3);
	list.push(4);
	list.remove(1)
	list.remove(1);

	console.log(list.get(0) === 1);
	console.log(list.get(1) === 4);
}