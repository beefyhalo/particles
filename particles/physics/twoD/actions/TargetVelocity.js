define('particles/physics/twoD/actions/TargetVelocity', ['particles/physics/core/actions/Action'], function (Action) {
	function TargetVelocity (x, y, rate) {
		Action.apply(this, arguments);
		this.x = x;
		this.y = y;
		this.rate = rate;
	};
	$.extend(TargetVelocity.prototype, Action.prototype, {
		update: function (manager, actor, time) {
			actor.velocityX += (this.x - actor.velocityX) * this.rate * time;
			actor.velocityY += (this.y - actor.velocityY) * this.rate * time;
		}
	});
	return TargetVelocity;
});