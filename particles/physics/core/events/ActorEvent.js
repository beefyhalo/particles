define('particles/physics/core/events/ActorEvent', function () {
	function ActorEvent(type, actor) {
		jQuery.Event.call(this, type);
		this.actor = actor;
		this.otherObject;
	};
	ActorEvent.prototype = new jQuery.Event();
	ActorEvent.ACTOR_CREATED = 'actorCreated';
	ActorEvent.ACTOR_ADDED = 'actorAdded';
	ActorEvent.ACTOR_DEAD = 'actorDead';
	ActorEvent.ACTORS_COLLISION = 'actorsCollision';
	$.extend(ActorEvent.prototype, jQuery.Event.prototype);
	return ActorEvent;
});