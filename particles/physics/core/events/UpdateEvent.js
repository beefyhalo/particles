define('particles/physics/core/events/UpdateEvent', function () {
	function UpdateEvent(type, time) {
		jQuery.Event.call(this, type);
		this._time = time;
	};
	UpdateEvent.UPDATE = 'updateEvent';
	$.extend(UpdateEvent.prototype, jQuery.Event.prototype, {
		getTime: function () { return this._time; },
		setTime: function (value) { this._time = value; }
	});
	return UpdateEvent;
});
