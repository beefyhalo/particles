define('particles/physics/twoD/actors/ActorFactory2D', ['particles/physics/core/actors/ActorFactory', 'particles/physics/twoD/actors/Actor2D'], function (ActorFactory, Actor2D) {
	function ActorFactory2D() {
		this.actors = [];
	};
	$.extend(ActorFactory2D.prototype, ActorFactory, {
		createActor: function () { return new Actor2D(); },
		disposeActor: function (actor) {
			actor.initialize();
			//this.actors.push(actor);
		}
	});
	return ActorFactory2D;
});