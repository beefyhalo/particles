define('particles/physics/core/starters/Starter', function () {
	function Starter() {};
	Starter.prototype = {
		initialize: function (manager, actor) {},
		addedToManager: function (manager) {},
		removedFromManager: function (manager) {}
	};
	return Starter;
});