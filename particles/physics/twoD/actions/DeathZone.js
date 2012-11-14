define('particles/physics/twoD/actions/DeathZone', ['particles/physics/core/actions/Action'], function (Action) {
	function DeathZone (zone, invert) {
		Action.apply(this, arguments);
		this.zone = zone;
		this.invert = invert;
	};
	$.extend(DeathZone.prototype, Action.prototype, {
		update: function (manager, actor, time) {
			var inside = this.zone.contains(actor.x, actor.y);
			if (this.invert) {
				if (!inside) {
					actor.isDead = true;
				}
			} else {
				if (inside) {
					actor.isDead = true;
				}
			}
		}
	});
	return DeathZone;
});