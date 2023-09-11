function asyncFunction1() {
	return Promise.resolve("Result from asyncFunction1");
	// return Promise.reject(new Error("Some error on step 1"));
}

function asyncFunction2(data) {
	return Promise.resolve(data + " - Result from asyncFunction2");
	// return Promise.reject(new Error("Some error on step 2"));
}

function asyncFunction3(data) {
	return Promise.resolve(data + " - Result from asyncFunction3");
}

const functionsArray = [asyncFunction1, asyncFunction2, asyncFunction3];

function chainPromises(functionsArray) {
	let promise = new Promise(resolve => {
		resolve(functionsArray[0]());

		if (functionsArray.length === 0) {
			resolve("")
		}
	})

	for (let i = 1; i < functionsArray.length; i++) {
		promise = promise.then(functionsArray[i])
	}
	return promise;
}

chainPromises(functionsArray)
	.then(result => {
		console.log("Chained promise result:", result);
		// Expected: "Result from asyncFunction1 - Result from asyncFunction2 - Result from asyncFunction3"
	})
	.catch(error => {
		console.error("Chained promise error:", error);
	});