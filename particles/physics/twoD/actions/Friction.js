define('particles/physics/twoD/actions/Friction', ['particles/physics/core/actions/Action'], function (Action) {
	function Friction (friction) {
		this._friction = friction;
	};
	
	$.extend(Friction.prototype, Action.prototype, {
		update: function (manager, actor, time) {
			var dSq = actor.velocityX * actor.velocityX + actor.velocityY * actor.velocityY;
			if (dSq == 0) {
				return;
			}
			
			var scale = 1 - (this._friction * time) / (Math.sqrt(dSq) * actor.mass);
			if (scale < 0) {
				actor.velocityX = 0;
				actor.velocityY = 0;
			} else {
				actor.velocityX *= scale;
				actor.velocityY *= scale;
			}
		}
	});
	
	return Friction;
});