class AsyncOperationManager {
	simulateAsyncOperation(delay) {
		setTimeout(() => {
			console.log(`Async operation completed after ${delay} ms`);
			process.nextTick(() => {
				console.log(`Microtask executed immediately after the async operation`);
			});
		}, delay);
	}

	scheduleImmediate() {
		setImmediate(() => {
			console.log("Immediate task executed");
		});
	}
}

const manager = new AsyncOperationManager();
manager.simulateAsyncOperation(200);
manager.simulateAsyncOperation(500);
manager.simulateAsyncOperation(1000);
process.nextTick(() => {
	console.log("Microtask executed immediately");
});
manager.scheduleImmediate();
process.nextTick(() => {
	console.log("Microtask 2 executed immediately");
});

/*
Expected Execution Flow:
1. The script starts, and an instance of AsyncOperationManager is created.
2. Three simulateAsyncOperation calls are made with different delays: 200ms, 500ms, and 1000ms.
3. Microtasks are processed and log "Microtask executed immediately" and "Microtask 2 executed immediately"
4. The scheduleImmediate method is called to schedule an immediate task.
5. The event loop begins processing scheduled timers (setTimeout).
6. As the timers complete, their respective callbacks are executed.
   - Each callback logs a completion message for the asynchronous operation.
   - For each operation, a microtask is scheduled using process.nextTick and is processed at that moment.
*/