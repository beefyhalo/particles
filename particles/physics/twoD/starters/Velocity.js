define('particles/physics/twoD/starters/Velocity', ['particles/physics/core/starters/Starter'], function (Starter) {
	function Velocity(zone) {
		this.zone = zone;
	};
	
	$.extend(Velocity.prototype, Starter.prototype, {
		initialize: function (manager, actor) {
			var location = this.zone.getLocation();
			
			if (actor.rotation == 0 ) {
				actor.velocityX = location.x;
				actor.velocityY = location.y;
			} else {
				var sin = Math.sin(actor.rotation);
				var cos = Math.cos(actor.rotation);
				actor.velocityX = (cos * location.x) - (sin * location.y);
				actor.velocityY = (cos * location.y) + (sin * location.x);
			}
		}
	});
	
	return Velocity;
});