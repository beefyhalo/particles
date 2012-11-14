define('particles/physics/twoD/tasks/FollowDisplayObject', ['particles/physics/core/tasks/Task'], function (Task) {
	function FollowDisplayObject (displayObject, offsetX, offsetY) {
		Task.apply(this, arguments);
		this.displayObject = displayObject;
		this.offsetX = offsetX || 0;
		this.offsetY = offsetY || 0;
	};
	$.extend(FollowDisplayObject.prototype, Task.prototype, {
		update: function (manager, time) {
			manager.x = this.displayObject.x + this.offsetX;
			manager.y = this.displayObject.y + this.offsetY;
		}
	});
	return FollowDisplayObject;
});