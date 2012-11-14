define('particles/physics/core/managers/ManagerUpdater', ['particles/physics/core/events/UpdateEvent'], function (UpdateEvent) {
	function ManagerUpdater () {
		this._running = false;
		this.time = null;
	};
	ManagerUpdater.prototype = {
		start: function () {
			var self = this;
			this._intervalId = setInterval(function () { self.update(); }, 0); // TODO: set refresh rate
			this.time = (new Date()).getTime();
			this._running = true;
		},
		stop: function () {
			clearInteval(this._intervalId);
			this._running = false;
		},
		update: function (e) {
			var oldTime = this.time;
			this.time = (new Date()).getTime();
			var frameTime = (this.time - oldTime) * 0.001;
			$(this).trigger(new UpdateEvent(UpdateEvent.UPDATE, frameTime));
		},
		bind: function (type, callback) {
			$(this).bind(type, callback);
			if (!this._running && this.hasEventListener(UpdateEvent.UPDATE)) {
				this.start();
			}
		},
		unbind: function (type) {
			$(this).unbind(type);
			if (!this._running && this.hasEventListener(UpdateEvent.UPDATE)) {
				this.stop();
			}
		},
		hasEventListener: function (type) {
			return type in $(this).data('__events__').events
		}
	};	
	return ManagerUpdater;
});