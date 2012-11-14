define('particles/physics/twoD/starters/Position', ['particles/physics/core/starters/Starter'], function (Starter) {
	function Position(zone) {
		this.zone = zone;
	};
	
	$.extend(Position.prototype, Starter.prototype, {
		initialize: function (manager, actor) {
			var location = this.zone.getLocation();
			
			if (actor.rotation == 0 ) {
				actor.x += location.x;
				actor.y += location.y;
			} else {
				var sin = Math.sin(actor.rotation);
				var cos = Math.cos(actor.rotation);
				actor.x += cos * location.x - sin * location.y;
				actor.y += cos * location.y + sin * location.x;
			}
			actor.previousX = actor.x;
			actor.previousY = actor.y;
		}
	});
	
	return Position;
});
