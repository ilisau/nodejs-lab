class LinkedList {
	#head;
	#size;

	/**
	 * Creates object and initialize head node and size.
	 */
	constructor() {
		this.#head = null;
		this.#size = 0;
	}

	/**
	 * Adds item to end of list.
	 * @param item
	 */
	push(item) {
		let node = new Node(item, null, this.#head);
		if (this.#head !== null) {
			this.#head.next = node;
		}
		this.#head = node;
		this.#size++;
	}

	/**
	 * Removes item from the end of list.
	 */
	pop() {
		if (this.#head !== null) {
			this.#head = this.#head.previous;
			this.#size--;
		}
	}

	/**
	 * Returns item by index or throw an exception if index is out of bounds.
	 * @param index
	 * @returns {*}
	 */
	get(index) {
		if (index < 0 || index > this.#size - 1) {
			throw new Error(`Index is out of bounds [0, ${this.#size - 1}]`);
		}
		let node = this.#head;
		while (index < this.#size - 1) {
			node = node.previous;
			index++;
		}
		return node.value;
	}

	/**
	 * Set item by index or throw an exception if index is out of bounds.
	 * @param index
	 * @param item
	 */
	set(index, item) {
		if (index < 0 || index > this.#size - 1) {
			throw new Error(`Index is out of bounds [0, ${this.#size - 1}]`);
		}
		let node = this.#head;
		while (index < this.#size - 1) {
			node = node.previous;
			index++;
		}
		node.value = item;
	}

	/**
	 * Returns index of item or -1 if item is not found.
	 * @param item
	 * @returns {number}
	 */
	indexOf(item) {
		let node = this.#head;
		let pos = this.#size - 1;
		while (node !== null) {
			if (node.value === item) {
				return pos;
			}
			node = node.previous;
			pos--;
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
	#previous;

	constructor(value, next, previous) {
		this.#value = value;
		this.#next = next;
		this.#previous = previous;
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

	get previous() {
		return this.#previous;
	}

	set previous(node) {
		this.#previous = node;
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