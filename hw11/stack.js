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