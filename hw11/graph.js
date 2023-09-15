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
	 * @param weight
	 */
	connect(firstIndex, secondIndex, weight = 1) {
		if (firstIndex < 0 || firstIndex > this.#size - 1) {
			throw new Error(`First index is out of bounds [0, ${this.#size - 1}]`);
		}
		if (secondIndex < 0 || secondIndex > this.#size - 1) {
			throw new Error(`Second index is out of bounds [0, ${this.#size - 1}]`);
		}
		this.#adjacency.set(firstIndex, [...this.#adjacency.get(firstIndex), {index: secondIndex, weight: weight}]);
		this.#adjacency.set(secondIndex, [...this.#adjacency.get(secondIndex), {index: firstIndex, weight: weight}]);
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
		let indices = this.#adjacency.get(currentIndex).map(item => item.index);
		for (const neighborIndex of indices) {
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
			let indices = this.#adjacency.get(currentIndex).map(item => item.index);
			for (const neighborIndex of indices) {
				if (!visited[neighborIndex]) {
					queue.push(neighborIndex);
					visited[neighborIndex] = true;
				}
			}
		}
	}

	/**
	 * Returns nodes of the shortest path between two nodes.
	 * @param startIndex
	 * @param endIndex
	 */
	bfsShortestPath(startIndex, endIndex) {
		if (startIndex < 0 || startIndex > this.#size - 1) {
			throw new Error(`Start index is out of bounds [0, ${this.#size - 1}]`);
		}
		if (endIndex < 0 || endIndex > this.#size - 1) {
			throw new Error(`End index is out of bounds [0, ${this.#size - 1}]`);
		}
		const visited = new Set();
		const queue = [[startIndex]];
		visited.add(startIndex);
		while (queue.length > 0) {
			const path = queue.shift();
			const node = path[path.length - 1];
			if (node === endIndex) {
				return path;
			}
			for (const neighbor of this.#adjacency.get(node)) {
				if (!visited.has(neighbor.index)) {
					visited.add(neighbor.index);
					const newPath = [...path, neighbor.index];
					queue.push(newPath);
				}
			}
		}
		return null;
	}

	/**
	 * Returns nodes of the shortest path between two nodes.
	 * @param startIndex
	 * @param endIndex
	 */
	dijkstra(startIndex, endIndex) {
		if (startIndex < 0 || startIndex > this.#size - 1) {
			throw new Error(`Start index is out of bounds [0, ${this.#size - 1}]`);
		}
		if (endIndex < 0 || endIndex > this.#size - 1) {
			throw new Error(`End index is out of bounds [0, ${this.#size - 1}]`);
		}
		const distances = {};
		const previous = {};
		const unvisited = new Set();
		for (const node of this.#adjacency.keys()) {
			distances[node] = Infinity;
			previous[node] = null;
			unvisited.add(node);
		}
		distances[startIndex] = 0;
		while (unvisited.size > 0) {
			const currentNode = this.#findNodeWithSmallestDistance(unvisited, distances);
			unvisited.delete(currentNode);
			for (const neighborEdge of this.#adjacency.get(currentNode)) {
				const neighbor = neighborEdge.index;
				const weight = neighborEdge.weight;
				const tentativeDistance = distances[currentNode] + weight;

				if (tentativeDistance < distances[neighbor]) {
					distances[neighbor] = tentativeDistance;
					previous[neighbor] = currentNode;
				}
			}
		}
		return this.#reconstructPath(previous, endIndex);
	}

	#findNodeWithSmallestDistance(nodes, distances) {
		let smallestDistance = Infinity;
		let smallestNode = null;

		for (const node of nodes) {
			if (distances[node] < smallestDistance) {
				smallestDistance = distances[node];
				smallestNode = node;
			}
		}

		return smallestNode;
	}

	#reconstructPath(previous, targetNode) {
		const path = [targetNode];
		let currentNode = targetNode;

		while (previous[currentNode] !== null) {
			path.unshift(previous[currentNode]);
			currentNode = previous[currentNode];
		}

		return path;
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
{
	let graph = new Graph();
	graph.add('0');
	graph.add('1');
	graph.add('2');
	graph.add('7');
	graph.add('8');
	graph.connect(0, 1, 4);
	graph.connect(1, 2, 8);
	graph.connect(0, 3, 8);
	graph.connect(1, 3, 11);
	graph.connect(2, 4, 2);
	graph.connect(3, 4, 7);

	let path = graph.dijkstra(0, 4);
	console.log(path)
	console.log(path.length === 4 && path.every(x => [0, 1, 2, 4].includes(x)));
}
{
	let graph = new Graph();
	graph.add('0');
	graph.add('1');
	graph.add('2');
	graph.add('7');
	graph.add('8');
	graph.connect(0, 1, 4);
	graph.connect(1, 2, 8);
	graph.connect(0, 3, 8);
	graph.connect(1, 3, 11);
	graph.connect(2, 4, 2);
	graph.connect(3, 4, 7);

	let path = graph.bfsShortestPath(0, 4);
	console.log(path)
	console.log(path.length === 3 && path.every(x => [0, 3, 4].includes(x)));
}