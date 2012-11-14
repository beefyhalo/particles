define('particles/physics/core/events/ManagerEvent', function () {
	function ManagerEvent(type, frameTime) {
		jQuery.Event.call(this, type);
		this.frameTime = frameTime;
	};
	ManagerEvent.prototype = new jQuery.Event();
	ManagerEvent.MANAGER_EMPTY = 'managerEmpty';
	ManagerEvent.MANAGER_UPDATED = 'managerUpdated';
	return ManagerEvent;
});