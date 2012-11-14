define('particles/physics/twoD/actions/BoundingBox', ['particles/physics/core/actions/Action'], function (Action) {
	function BoundingBox(left, top, right, bottom, bounce) {
		Action.apply(this, arguments);
		this.left = left;
		this.top = top;
		this.right = right;
		this.bottom = bottom;
		this.bounce = bounce;
	};
	
	$.extend(BoundingBox.prototype, Action.prototype, {
		update: function (manager, actor, time) {
			var radius = actor.collisionRadius;
			var position;
			
			if (actor.velocityX > 0 && (position = actor.x + radius) >= this.right ) {
					actor.velocityX = -actor.velocityX * this.bounce;
					actor.x += 2 * (this.right - position);
				   // manager.dispatchEvent( new ActorEvent( ActorEvent.BOUNDING_BOX_COLLISION, p ) );
			} else if ( actor.velocityX < 0 && (position = actor.x - radius) <= this.left ) {
					actor.velocityX = -actor.velocityX * this.bounce;
					actor.x += 2 * (this.left - position);
				  //  manager.dispatchEvent( new ActorEvent( ActorEvent.BOUNDING_BOX_COLLISION, p ) );
			} if ( actor.velocityY > 0 && (position = actor.y + radius) >= this.bottom ) {
					actor.velocityY = -actor.velocityY * this.bounce;
					actor.y += 2 * (this.bottom - position);
				   // manager.dispatchEvent( new ActorEvent( ActorEvent.BOUNDING_BOX_COLLISION, p ) );
			} else if ( actor.velocityY < 0 && (position = actor.y - radius) <= this.top ) {
					actor.velocityY = -actor.velocityY * this.bounce;
					actor.y += 2 * (this.top - position);
				   // manager.dispatchEvent( new ActorEvent( ActorEvent.BOUNDING_BOX_COLLISION, p ) );
			}
		}
	});
	
	return BoundingBox;
});