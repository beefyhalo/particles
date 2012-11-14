define('particles/physics/core/counters/Constant', ['particles/physics/core/counters/Counter'], function (Counter) {
	function Constant (rate) {
		this._isComplete = false;
		this._rate;
		this.setRate(rate);
		this._running = false;
	};
	$.extend(Constant.prototype, Counter, {
		startManager: function (manager) {
			this._running = true;
			this._timeToNext = this._rateInv;
			return 0;
		},
		updateManager: function (manager, time) {
			if (!this._running) {
				return 0;
			}
			var count = 0;
			this._timeToNext -= time;
			while (this._timeToNext <= 0) {
				count++;
				this._timeToNext += this._rateInv;
			}
			return count;
		},
		pause: function () { this._running = false; },
		resume: function () { this._running = true; },
		isComplete: function () { return false; },
		setRate: function (value) {
			if (!value || value < 0) {
				value = 0;
			}
			if (this._rate != value) {
				if (this._rate && value) {
					var timePassed = this._rateInv - this._timeToNext;
					this._rate = value;
					this._rateInv = value ? 1 / value : Number.MAX_VALUE;
					this._timeToNext = Math.max( _rateInv - timePassed, 0 );
				}
				else
				{
					this._rate = value;
					this._rateInv = value ? 1 / value : Number.MAX_VALUE;
					this._timeToNext = this._rateInv;
				}
			}
		}
	});
	return Constant;
});