function promiseAll(promises) {
	return new Promise((resolve, reject) => {
		const results = [];
		let completedCount = 0;
		for (let i = 0; i < promises.length; i++) {
			promises[i]
				.then(value => {
					results[i] = value;
					completedCount++;
					if (completedCount === promises.length) {
						resolve(results);
					}
				})
				.catch(error => {
					reject(error);
				});
		}
		if (promises.length === 0) {
			resolve(results);
		}
	});
}

// TESTS

{
	const promises = [
		Promise.resolve(1),
		Promise.resolve(2),
		Promise.resolve(3)
	];
	promiseAll(promises)
		.then(results => {
			console.log("All promises resolved:", results); // Expected: [1, 2, 3]
		})
		.catch(error => {
			console.error("At least one promise rejected:", error);
		});
}
{
	const promises = [
		Promise.resolve(1),
		Promise.reject(new Error("Something happened")),
		Promise.resolve(2),
		Promise.resolve(3)
	];
	promiseAll(promises)
		.then(results => {
			console.log("All promises resolved:", results);
		})
		.catch(error => {
			console.error("At least one promise rejected:", error); // Expected: Error("Something happened")
		});
}