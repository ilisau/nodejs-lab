function onScroll(event) {
// Handle scroll event
	console.log("Scroll event:", event);
}

function throttle(func, interval) {
	let timeoutId;

	return function (...args) {
		clearTimeout(timeoutId);

		timeoutId = setTimeout(() => {
			func.apply(this, args);
		}, interval);
	}
}

const throttledScrollHandler = throttle(onScroll, 1000);

window.addEventListener("scroll", throttledScrollHandler);