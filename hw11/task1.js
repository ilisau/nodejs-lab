class Stack {
	#items;
	#index;

	/**
	 * Creates object and initialize empty array and insertion index.
	 */
	constructor() {
		this.#items = [];
		this.#index = 0;
	}

	/**
	 * Pushes item to stack.
	 * @param item
	 */
	push(item) {
		this.#items[this.#index++] = item;
	}

	/**
	 * Removes top item from stack and returns it or null if stack is empty.
	 * @returns {*|null}
	 */
	pop() {
		if (this.#index <= 0) {
			return null;
		}
		const item = this.#items[this.#index - 1];
		this.#items[this.#index - 1] = null;
		this.#index--;
		return item;
	}

	/**
	 * Returns top item from stack or null if stack is empty.
	 * @returns {*|null}
	 */
	peek() {
		if (this.#index <= 0) {
			return null;
		}
		return this.#items[this.#index - 1];
	}
}

class MinMaxStack {
	#stack;
	#minStack;
	#maxStack;

	/**
	 * Creates object and initialize stacks.
	 */
	constructor() {
		this.#stack = new Stack();
		this.#minStack = new Stack();
		this.#maxStack = new Stack();
	}

	/**
	 * Pushes item to stack and updates min and max stacks.
	 * @param item
	 */
	push(item) {
		this.#stack.push(item);
		if (this.#minStack.peek() == null) {
			this.#minStack.push(item);
		}
		if (this.#maxStack.peek() == null) {
			this.#maxStack.push(item);
		}
		if (this.#minStack.peek() > item) {
			this.#minStack.push(item);
		}
		if (this.#maxStack.peek() < item) {
			this.#maxStack.push(item);
		}
	}

	/**
	 * Removes top item from stack and updates min and max stacks.
	 */
	pop() {
		let item = this.#stack.pop();
		if(this.#minStack.peek() === item) {
			this.#minStack.pop();
		}
		if(this.#maxStack.peek() === item) {
			this.#maxStack.pop();
		}
	}

	/**
	 * Returns min item in stack or null is stack is empty.
	 * @returns {*|null}
	 */
	min() {
		return this.#minStack.peek();
	}

	/**
	 * Returns max item in stack or null is stack is empty.
	 * @returns {*|null}
	 */
	max() {
		return this.#maxStack.peek();
	}
}

class Queue {
	#items;
	#frontIndex;
	#backIndex;

	/**
	 * Creates object and initialize array, read and insert indices.
	 */
	constructor() {
		this.#items = [];
		this.#frontIndex = 0;
		this.#backIndex = 0;
	}

	/**
	 * Pushes item to the end of queue.
	 * @param item
	 */
	enqueue(item) {
		this.#items[this.#backIndex++] = item;
	}

	/**
	 * Removes item from the start of queue.
	 */
	dequeue() {
		if (this.#frontIndex !== this.#backIndex) {
			this.#items[this.#frontIndex] = null;
			this.#frontIndex++;
		}
	}

	/**
	 * Returns first item in queue or null if queue is empty.
	 * @returns {*|null}
	 */
	peek() {
		if (this.#frontIndex === this.#backIndex) {
			return null;
		}
		return this.#items[this.#frontIndex];
	}
}

class BinaryTree {
	// Implement methods for inserting nodes, searching, traversing...
}

class Graph {
	// Implement methods for adding vertices, edges, DFS, BFS...
}

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

// Implement Min/Max Stack, Binary Search Tree, Graph Algorithms...
// Demonstrate usage and provide documentation...

// STACK TESTS

{
	let stack = new Stack();
	stack.push(1);
	stack.push(2);
	stack.push(3);

	console.log(stack.peek() === 3);
}
{
	let stack = new Stack();
	stack.push(1);
	stack.push(2);
	stack.push(3);
	stack.pop();

	console.log(stack.peek() === 2);
}
{
	let stack = new Stack();
	stack.push(1);
	stack.push(2);
	stack.pop();
	stack.push(3);
	stack.push(4);

	console.log(stack.peek() === 4);
}
{
	let stack = new MinMaxStack();
	stack.push(10);
	stack.push(2);
	stack.push(8);
	stack.push(7);
	stack.push(11);

	console.log(stack.min() === 2);
	console.log(stack.max() === 11);
}
{
	let stack = new MinMaxStack();
	stack.push(10);
	stack.push(2);
	stack.pop();
	stack.push(8);
	stack.push(7);
	stack.push(11);
	stack.pop();

	console.log(stack.min() === 7);
	console.log(stack.max() === 10);
}

// QUEUE TESTS

{
	let queue = new Queue();
	queue.enqueue(1);
	queue.enqueue(2);
	queue.enqueue(3);
	queue.enqueue(4);

	console.log(queue.peek() === 1);
}
{
	let queue = new Queue();
	queue.enqueue(1);
	queue.enqueue(2);
	queue.dequeue();
	queue.dequeue();
	queue.enqueue(3);
	queue.enqueue(4);

	console.log(queue.peek() === 3);
}
{
	let queue = new Queue();
	queue.enqueue(1);
	queue.dequeue();
	queue.dequeue();
	queue.dequeue();
	queue.enqueue(3);

	console.log(queue.peek() === 3);
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
