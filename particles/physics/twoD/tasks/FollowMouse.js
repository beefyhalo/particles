define('particles/physics/twoD/tasks/FollowMouse', ['particles/physics/core/tasks/Task'], function (Task) {
	function FollowMouse (camera) {
		this.camera = camera;
	};
	
	$.extend(FollowMouse.prototype, Task.prototype, {
		update: function (manager, time) {
			manager.x = this.camera.mouseX;
			manager.y = this.camera.mouseY;
		}
	});
	
	return FollowMouse;	
});