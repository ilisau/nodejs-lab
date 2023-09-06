function multiply(a, b, c) {
	return a * b * c;
}

function curry(func, argsAmount) {
	return function curried(...args) {
		if (args.length >= argsAmount) {
			return func(...args);
		} else {
			return (...nextArgs) => curried(...args, ...nextArgs);
		}
	};
}

const curriedMultiply = curry(multiply, 3);

const step1 = curriedMultiply(2); // Returns a curried function
const step2 = step1(3); // Returns a curried function
const result = step2(4); // Returns the final result: 2 * 3 * 4 = 24

console.log("Result:", result); // Expected: 24