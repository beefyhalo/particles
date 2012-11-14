define('particles/physics/core/tasks/Task', function () {
	function Task() {};
	Task.prototype = {
		addedToManager: function (manager) {},
		removedFromManager: function (manager) {},
		initialize: function (manager) {},
		update: function (manager, actor, time) {}
	};
	return Task;
});