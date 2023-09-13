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