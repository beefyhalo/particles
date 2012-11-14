define('particles/physics/core/events/Event', function () {
	function Event(type) {
		jQuery.Event.call(this, type);
	};
	Event.prototype = jQuery.Event.prototype;
	Event.ADDED_TO_STAGE = 'addedToStage';
	Event.COMPLETE = 'complete';
	return Event;
});
