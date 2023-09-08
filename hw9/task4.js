function callbackStyleFunction(value, callback) {
	setTimeout(() => {
		if (value > 0) {
			callback(null, value * 2);
		} else {
			callback("Invalid value", null);
		}
	}, 1000);
}

function promisify(callbackStyleFunction) {
	return function (value) {
		return new Promise((resolve, reject) => {
			callbackStyleFunction(value, (error, value) => {
				if (error) {
					reject(error)
				}
				if (value) {
					resolve(value)
				}
			})
		})
	}
}

const promisedFunction = promisify(callbackStyleFunction);

// TESTS

{
	promisedFunction(3)
		.then(result => {
			console.log("Promised function result:", result); // Expected: 6
		})
		.catch(error => {
			console.error("Promised function error:", error);
		});
}
{
	promisedFunction(-2)
		.then(result => {
			console.log("Promised function result:", result);
		})
		.catch(error => {
			console.error("Promised function error:", error); // Expected: Invalid value
		});
}