class Graph {
	#nodes;
	#size;
	#adjacency;

	/**
	 * Creates object and initialize nodes array and adjacency map.
	 */
	constructor() {
		this.#nodes = [];
		this.#size = 0;
		this.#adjacency = new Map();
	}

	/**
	 * Adds node to graph.
	 * @param node
	 * @returns {number} node index.
	 */
	add(node) {
		this.#nodes.push(node);
		this.#adjacency.set(this.#size, []);
		return this.#size++;
	}

	/**
	 * Connects nodes by indices or throw an error if ids are not in bounds.
	 * @param firstIndex
	 * @param secondIndex
	 */
	connect(firstIndex, secondIndex) {
		if (firstIndex < 0 || firstIndex > this.#size - 1) {
			throw new Error(`First index is out of bounds [0, ${this.#size - 1}]`);
		}
		if (secondIndex < 0 || secondIndex > this.#size - 1) {
			throw new Error(`Second index is out of bounds [0, ${this.#size - 1}]`);
		}
		this.#adjacency.set(firstIndex, [...this.#adjacency.get(firstIndex), secondIndex]);
	}

	/**
	 * Loop function for DFS.
	 * @param currentIndex node index
	 * @param visited array of visited indices
	 * @param func
	 */
	#innerDfs(currentIndex, visited, func) {
		func(this.#nodes[currentIndex]);
		visited[currentIndex] = true;
		for (const neighborIndex of this.#adjacency.get(currentIndex)) {
			if (!visited[neighborIndex]) {
				this.#innerDfs(neighborIndex, visited, func);
			}
		}
	}

	/**
	 * Depth first search function.
	 * @param func function for node processing
	 */
	dfs(func) {
		const visited = {};
		for (let i = 0; i < this.#size; i++) {
			if (!visited[i]) {
				this.#innerDfs(i, visited, func);
			}
		}
	}

	/**
	 * Breadth first search function.
	 * @param func function for node processing
	 */
	bfs(func) {
		const visited = {};
		const queue = [];
		queue.push(0);
		visited[0] = true;

		while (queue.length) {
			const currentIndex = queue.shift();
			func(this.#nodes[currentIndex]);

			for (const neighborIndex of this.#adjacency.get(currentIndex)) {
				if (!visited[neighborIndex]) {
					queue.push(neighborIndex);
					visited[neighborIndex] = true;
				}
			}
		}
	}
}

// GRAPH TESTS

{
	let graph = new Graph();
	graph.add('A');
	graph.add('B');
	graph.add('C');
	graph.add('D');
	graph.add('E');
	graph.add('F');
	graph.connect(0, 1);
	graph.connect(0, 2);
	graph.connect(1, 3);
	graph.connect(2, 4);
	graph.connect(2, 5);

	graph.bfs((node) => {
		console.log(node)
	});
}
{
	let graph = new Graph();
	graph.add('A');
	graph.add('B');
	graph.add('C');
	graph.add('D');
	graph.add('E');
	graph.add('F');
	graph.connect(0, 1);
	graph.connect(0, 2);
	graph.connect(1, 3);
	graph.connect(2, 4);
	graph.connect(2, 5);

	graph.dfs((node) => {
		console.log(node)
	});
}