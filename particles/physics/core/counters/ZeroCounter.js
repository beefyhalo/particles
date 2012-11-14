define('particles/physics/core/counters/ZeroCounter', ['particles/physics/core/counters/Counter'], function (Counter) {
	function ZeroCounter() {};
	$.extend(ZeroCounter.prototype, Counter, {
		startManager: function (manager) { return 0; },
		updateManager: function (manager) { return 0; },
		pause: function () {},
		resume: function () {},
		isComplete: function () { return true; }
	});
	return ZeroCounter;
});