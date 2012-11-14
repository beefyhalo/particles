define('particles/physics/core/actions/Action', function () {
	function Action () {};
	Action.prototype = {
		addedToManager: function (manager) {},
		removedFromManager: function (manager) {},
		update: function (manager, actor, time) {}
	};
	return Action;
});