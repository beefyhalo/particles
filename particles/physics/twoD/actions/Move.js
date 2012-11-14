define('particles/physics/twoD/actions/Move', ['particles/physics/core/actions/Action'], function (Action) {
	function Move () {};
	
	$.extend(Move.prototype, Action.prototype, {
		update: function (manager, actor, time) {
			actor.previousX = actor.x;
			actor.previousY = actor.y;
			actor.x += actor.velocityX * time;
			actor.y += actor.velocityY * time;
		}
	});
	
	return Move;
});