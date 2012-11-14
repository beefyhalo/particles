define('particles/physics/twoD/managers/Manager2D', ['particles/physics/core/managers/Manager', 'particles/physics/twoD/actors/ActorFactory2D'], function (Manager, ActorFactory2D) {
	function Manager2D() {
		Manager.apply(this, arguments);
		this.x = 0;
		this.y = 0;
		this.rotation = 0;
		this.actorFactory = new ActorFactory2D();
	};
	$.extend(Manager2D.prototype, Manager.prototype, {
		initActor: function (actor) {
			actor.x = this.x;
			actor.y = this.y;
			actor.previousX = this.x;
			actor.previousY = this.y;
			actor.rotation = this.rotation;
		},
		get rotation() {
			return this._rotation * 180 / Math.PI;
		},
		set rotation(value) {
			this._rotation = value * Math.PI / 180;
		}
	});	
	return Manager2D;
});
