const promises = [
	Promise.resolve(1),
	Promise.reject("Error occurred"),
	Promise.resolve(3)
];

function promiseAllSettled(promises) {
	return new Promise((resolve) => {
		const results = [];
		let completedCount = 0;
		for (let i = 0; i < promises.length; i++) {
			promises[i]
				.then(value => {
					results[i] = {
						status: "fulfilled",
						value: value
					};
					resolveIfCompleted();
				})
				.catch(error => {
					results[i] = {
						status: "rejected",
						reason: error
					};
					resolveIfCompleted();
				});
		}
		if (promises.length === 0) {
			resolve(results);
		}

		function resolveIfCompleted() {
			completedCount++;
			if (completedCount === promises.length) {
				resolve(results);
			}
		}
	});
}

promiseAllSettled(promises)
	.then(results => {
		console.log("All promises settled:", results);
		// Expected: [{ status: 'fulfilled', value: 1 },
		//            { status: 'rejected', reason: 'Error occurred' },
		//            { status: 'fulfilled', value: 3 }]
	});