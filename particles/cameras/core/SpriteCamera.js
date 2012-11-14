define('particles/cameras/core/SpriteCamera', ['particles/cameras/core/Camera', 'particles/display/Sprite', 'particles/physics/core/events/ManagerEvent', 'particles/physics/core/events/ActorEvent'], function (Camera, Sprite, ManagerEvent, ActorEvent) {
	function SpriteCamera() {
		Camera.apply(this, arguments);
		Sprite.apply(this, arguments);
	};
	
	$.extend(SpriteCamera.prototype, Sprite.prototype, Camera.prototype, {
		addManager: function (manager) {
			var self = this;
			this._managers.push(manager);			
			$(manager).bind(ManagerEvent.MANAGER_UPDATED, function (e) { self.managerUpdated(e); });
			$(manager).bind(ActorEvent.ACTOR_CREATED, function (e) { self.actorAdded(e); });
			$(manager).bind(ActorEvent.ACTOR_ADDED, function (e) { self.actorAdded(e); });
			$(manager).bind(ActorEvent.ACTOR_DEAD, function (e) { self.actorRemoved(e); });
			var i = manager.actors.length;
			while (i--) {
				this.addActor(manager.actors[i]);
			}
		},
		removeManager: function (manager) {
			var self = this;
			for (var i = 0; i < this._managers.length; i++) {
				if (manager == this._managers[i]) {
					this._managers.splice(i, 1);
					$(manager).unbind(ManagerEvent.MANAGER_UPDATED);
					$(manager).unbind(ActorEvent.ACTOR_CREATED);
					$(manager).unbind(ActorEvent.ACTOR_ADDED);
					$.each(manager.getActors(), function () {
						self.removeActor(this);
					});
					return;
				}
			}
		},
		addActor: function (actor) {},
		removeActor: function (actor) {},
		render: function (actors) {
			// clear canvas
			this.graphics.save();
			//this.graphics.fillStyle = 'rgba(0,0,0,0.05)';
			//this.graphics.fillRect(0, 0, this.graphics.canvas.width, this.graphics.canvas.height);
			this.graphics.clearRect(0, 0, this.graphics.canvas.width, this.graphics.canvas.height);
			this.graphics.restore();
			
			var child, m;
			for (var i = 0; i < this._children.length; i++) {
				child = this._children[i];
				m = child.getMatrixTransform();
				child.graphics.save();
				child.graphics.transform(m.a, m.b, m.c, m.d, m.tx, m.ty);
				child.draw();
				child.graphics.restore();
			}
		},				
		updateActors: function (e) {
			this.render(this.getActors());
		},
		managerUpdated: function (e) { this.updateActors(e); },
		actorAdded: function (e) { this.addActor(e.actor); }
	});
	
	return SpriteCamera;
});
