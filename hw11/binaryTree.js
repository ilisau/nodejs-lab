class BinaryTree {
	#items;

	/**
	 * Creates object and initialize array.
	 */
	constructor() {
		this.#items = [];
	}

	/**
	 * Inserts item to tree.
	 * @param item
	 */
	insert(item) {
		if (this.#items[0] === undefined) {
			this.#items[0] = item;
		} else {
			let index = 0;
			while (true) {
				let right = index * 2 + 1;
				let left = right + 1;
				if (this.#items[right] === undefined) {
					this.#items[right] = item;
					break;
				}
				if (this.#items[left] === undefined) {
					this.#items[left] = item;
					break;
				}
				index++;
			}
		}
	}

	/**
	 * Returns generator of in order traversal.
	 * @param index beginning index or 0 if not present.
	 * @returns {Generator<*|Generator<any|*|any, void, any&any>, void, *>}
	 */
	* inOrderTraversal(index = 0) {
		if (index < 0) {
			throw new Error("Index must be positive number");
		}
		if (this.#items[index * 2 + 1] !== undefined) {
			yield* this.inOrderTraversal(index * 2 + 1);
		}
		yield this.#items[index];
		if (this.#items[index * 2 + 2] !== undefined) {
			yield* this.inOrderTraversal(index * 2 + 2);
		}
	}

	/**
	 * Returns generator of post order traversal.
	 * @param index beginning index or 0 if not present.
	 * @returns {Generator<*|Generator<any|*|any, void, any&any>, void, *>}
	 */
	* postOrderTraversal(index = 0) {
		if (index < 0) {
			throw new Error("Index must be positive number");
		}
		if (this.#items[index * 2 + 1] !== undefined) {
			yield* this.postOrderTraversal(index * 2 + 1);
		}
		if (this.#items[index * 2 + 2] !== undefined) {
			yield* this.postOrderTraversal(index * 2 + 2);
		}
		yield this.#items[index];
	}

	/**
	 * Returns generator of pre order traversal.
	 * @param index beginning index or 0 if not present.
	 * @returns {Generator<*|Generator<any|*|any, void, any&any>, void, *>}
	 */
	* preOrderTraversal(index = 0) {
		if (index < 0) {
			throw new Error("Index must be positive number");
		}
		yield this.#items[index];
		if (this.#items[index * 2 + 1] !== undefined) {
			yield* this.preOrderTraversal(index * 2 + 1);
		}
		if (this.#items[index * 2 + 2] !== undefined) {
			yield* this.preOrderTraversal(index * 2 + 2);
		}
	}

	/**
	 * Returns item by index.
	 * @param index
	 * @returns {*}
	 */
	get(index) {
		return this.#items[index];
	}

	/**
	 * Returns index of item.
	 * @param item
	 * @returns {number}
	 */
	indexOf(item) {
		let index = 0;
		if (this.#items[index] === item) {
			return index;
		}
		while (true) {
			let right = index * 2 + 1;
			let left = right + 1;
			if (this.#items[right] === undefined && this.#items[left] === undefined) {
				return -1;
			}
			if (this.#items[right] === item) {
				return right;
			}
			if (this.#items[left] === item) {
				return left;
			}
			index++;
		}
	}

	/**
	 * Returns true if tree is binary search tree.
	 * @param scoreFunction function that returns item`s comparable score, default if (item) => item
	 * @returns {boolean}
	 */
	isBinary(scoreFunction = (item) => item) {
		let index = 0;
		while (true) {
			let parentValue = scoreFunction(this.#items[index]);
			let rightItem = this.#items[index * 2 + 1];
			let leftItem = this.#items[index * 2 + 2];
			if (rightItem === undefined && leftItem === undefined) {
				break;
			}
			if (rightItem !== undefined && rightItem !== null && scoreFunction(rightItem) > parentValue) {
				return false;
			}
			if (leftItem !== undefined && leftItem !== null && scoreFunction(leftItem) < parentValue) {
				return false;
			}
			index++;
		}
		return true;
	}
}

// BINARY TREE TESTS

{
	let tree = new BinaryTree();
	tree.insert("me");
	tree.insert("mom");
	tree.insert("dad");
	tree.insert("grandmother 1");
	tree.insert("grandfather 1");
	tree.insert("grandmother 2");
	tree.insert("grandfather 2");

	console.log(tree.get(2) === "dad");
}
{
	let tree = new BinaryTree();
	tree.insert("me");
	tree.insert("mom");
	tree.insert("dad");
	tree.insert("grandmother 1");
	tree.insert("grandfather 1");
	tree.insert("grandmother 2");
	tree.insert("grandfather 2");

	console.log(tree.indexOf("grandfather 1") === 4);
}
{
	let tree = new BinaryTree();
	tree.insert("me");
	tree.insert("mom");
	tree.insert("dad");
	tree.insert("grandmother 1");
	tree.insert("grandfather 1");
	tree.insert("grandmother 2");
	tree.insert("grandfather 2");

	console.log(tree.indexOf("grandgrandfather 1") === -1);
}
{
	let tree = new BinaryTree();
	tree.insert(1);
	tree.insert(2);
	tree.insert(3);
	tree.insert(4);
	tree.insert(5);
	tree.insert(6);
	tree.insert(7);

	console.log([...tree.inOrderTraversal()].reduce((array, item) => [...array, item], []));
	console.log([...tree.preOrderTraversal()].reduce((array, item) => [...array, item], []));
	console.log([...tree.postOrderTraversal()].reduce((array, item) => [...array, item], []));
}
{
	let tree = new BinaryTree();
	tree.insert(1);
	tree.insert(2);
	tree.insert(3);
	tree.insert(4);
	tree.insert(5);
	tree.insert(6);
	tree.insert(7);

	console.log(tree.isBinary() === false)
}
{
	let tree = new BinaryTree();
	tree.insert(12);
	tree.insert(10);
	tree.insert(20);
	tree.insert(9);
	tree.insert(11);
	tree.insert(12);
	tree.insert(null);
	tree.insert(null);
	tree.insert(null);
	tree.insert(10);
	tree.insert(null);
	tree.insert(null);
	tree.insert(12);

	console.log(tree.isBinary() === true)
}
{
	let tree = new BinaryTree();
	tree.insert({value: 12});
	tree.insert({value: 10});
	tree.insert({value: 20});
	tree.insert({value: 9});

	console.log(tree.isBinary(item => item.value) === true)
}
