define('particles/physics/twoD/actions/MouseGravity', ['particles/physics/core/actions/Action'], function (Action) {
	function MouseGravity (power, camera, epsilon) {
		Action.apply(this, arguments);
		this.camera = camera;
		this._gravityConst = 5000;
		this.setPower(power);
		this.setEpsilon(epsilon);
	};
	
	$.extend(MouseGravity.prototype, Action.prototype, {
		setPower: function (value) { this._power = value * this._gravityConst; },
		getPower: function () { return this._power / this._gravityConst; },
		getEpsilon: function () { return Math.sqrt(this._epsilonSq); },
		setEpsilon: function (value) { this._epsilonSq = (value * value); },
		update: function (manager, actor, time) {
			var x = this.camera.mouseX - actor.x;
			var y = this.camera.mouseY - actor.y;
			var dSq = x * x + y * y;
			if (dSq == 0) {
				return;
			}			
			var d = Math.sqrt(dSq);
			if (dSq < this._epsilonSq) {
				dSq = this._epsilonSq;
			}
			var factor = (this._power * time) / (dSq * d);
			actor.velocityX += x * factor;
			actor.velocityY += y * factor;
		}
	});
	
	return MouseGravity;
});