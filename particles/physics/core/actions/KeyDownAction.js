define('particles/physics/core/actions/KeyDownAction', ['particles/physics/core/actions/Action'], function (Action) {
	function KeyDownAction (action, keyCode, stage) {
		Action.apply(this, arguments);
		this.action = action;
		this.keyCode = keyCode;
		this.stage = stage;
		this._isDown = false;
		this._bind();
	};	
	$.extend(KeyDownAction.prototype, Action.prototype, {
		update: function (manager, actor, time) {
			if (this._isDown) {
				this.action.update(manager, actor, time);
			}
		},
		keyDown: function (e) {
			if (e.keyCode == this.keyCode) {
				this._isDown = true;
			}
		},
		keyUp: function (e) {
			if (e.keyCode == this.keyCode) {
				this._isDown = false;
			}
		},
		addedToManager: function (manager) {
			this.action.addedToManager(manager);
		},
		removedFromManager: function (manager) {
			this.action.removedFromManager(manager);
		},
		_bind: function () {
			if (this.stage) {
				var self = this;
				$(this.stage).bind('keydown', function (e) { self.keyDown(e); });
				$(this.stage).bind('keyup', function (e) { self.keyUp(e); });
			}
		}
	});
	return KeyDownAction;
});