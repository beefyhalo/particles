define('particles/cameras/core/Camera', ['particles/physics/core/events/ManagerEvent', 'particles/physics/core/events/ActorEvent'], function (ManagerEvent, ActorEvent) {
	function Camera() {
		this._managers = [];
	};
	
	$.extend(Camera.prototype, {
		addManager: function (manager) {
			var self = this;
			this._managers.push(manager);
			$(manager).bind(ManagerEvent.MANAGER_UPDATED, this.managerUpdated);
			$(manager).bind(ActorEvent.ACTOR_CREATED, this.actorAdded);
			$(manager).bind(ActorEvent.ACTOR_ADDED, this.actorAdded);
			$(manager).bind(ActorEvent.ACTOR_DEAD, this.actorRemoved);
			$.each(manager.getActors(), function () {
				self.addActor(this);
			});
		},
		
		removeManager: function (manager) {
		},
		
		addActor: function () {},
		removeActor: function () {},
		render: function (actors) {},
		managerUpdated: function (e) { this.render(e.target.actors); },
		actorAdded: function (e) { this.addActor(e.actor); },
		actorRemoved: function (e) { this.removeActor(e.actor); },
		getActors: function () {
			var actors = [];
			var i = this._managers.length;
			while (i--) {
				actors = actors.concat(this._managers[i].actors);
			}
			return actors;
		},
		getManagers: function () { return this._managers; },
		setManagers: function (value) {
			var self = this;
			$.each(this._managers, function () {
				self.removeManager(this);
			});
			$.each(value, function () {
				self.addManager(this);
			});
		}
	});
	
	return Camera;
});