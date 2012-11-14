define('particles/physics/twoD/actions/CircleCollide', ['particles/physics/core/actions/Action', 'particles/physics/core/events/ActorEvent'], function (Action, ActorEvent) {
	function CircleCollide (bounce, camera) {
		Action.apply(this, arguments);
		this.bounce = bounce;
		this.camera = camera;
	};
	$.extend(CircleCollide.prototype, Action.prototype, {
		update: function (manager, actor, time) {
			//var actors = manager.actors;
			var actors = this.camera.getActors();
			var other;
			var factor;
			var distanceSq;
			var collisionDist;
			var dx, dy;
			var n1, n2;
			var relN;
			var m1, m2;
			var f1, f2;
			var i = actors.length;
			while (i--) {
				other = actors[i];
				dx = other.x - actor.x;				
				collisionDist = other.collisionRadius + actor.collisionRadius;
				if (dx > collisionDist) continue;
				
				dy = other.y - actor.y;
				if (dy > collisionDist || dy < -collisionDist) continue;
				
				distanceSq = dy * dy + dx * dx;
				if (distanceSq <= collisionDist * collisionDist && distanceSq > 0) {
					factor = 1 / Math.sqrt(distanceSq);
					dx *= factor;
					dy *= factor;
					n1 = dx * actor.velocityX + dy * actor.velocityY;
					n2 = dx * other.velocityX + dy * other.velocityY;
					relN = n1 - n2;
					if (relN > 0) {
						m1 = actor.mass;
						m2 = other.mass;
						factor = ((1 + this.bounce) * relN) / (m1 + m2);
						f1 = factor * m2;
						f2 = -factor * m1;
						actor.velocityX -= f1 * dx;
						actor.velocityY -= f1 * dy;
						other.velocityX -= f2 * dx;
						other.velocityY -= f2 * dy;
						var e = new ActorEvent(ActorEvent.ACTORS_COLLISION, actor);
						e.otherObject = other;
						$(manager).trigger(e);
					}
				}
			}
		}
	});
	return CircleCollide;
});