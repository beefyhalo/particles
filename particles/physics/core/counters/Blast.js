define('particles/physics/core/counters/Blast', ['particles/physics/core/counters/Counter'], function (Counter) {
	function Blast (numActors) {
		this._isComplete = false;
		this._numActors = numActors;
	};
	$.extend(Blast.prototype, Counter, {
		startManager: function (manager) {		
			this._isComplete = true;
			return this._numActors;
		},
		updateManager: function (manager) { return 0; },
		pause: function () {},
		resume: function () {},
		isComplete: function () { return this._isComplete; },
		getNumActors: function () { return this._numActors; },
		setNumActors: function (value) { this._numActors = value; }
	});
	return Blast;
});