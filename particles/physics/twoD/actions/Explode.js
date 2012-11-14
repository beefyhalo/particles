define('particles/physics/twoD/actions/Explode', ['particles/physics/core/actions/Action'], function (Action) {
	function Explode (power, x, y, expansionRate, depth, epsilon) {
		this._powerConst = 100000;
		this._oldRadius = 0;
		this._radius = 0;
		this._radiusChange = 0;
		this.x = x;
		this.y = y;
		this.expansionRate = expansionRate;
		this.setPower(power)		
		this.setDepth(depth);
		this.setEpsilon(epsilon)
	}
		
	
	$.extend(Explode.prototype, Action.prototype, {
		getPower: function () { return this._power / this._powerConst; },
		setPower: function (value) { this._power = value * this._powerConst; },
		getDepth: function () { return this._depth * 2; },
		setDepth: function (value) {
			this._depth = value * 0.5;
			this._invDepth = 1 / this._depth;
		},
		getEpsilon: function () { return Math.sqrt(this._epsilonSq); },
		setEpsilon: function (value) { this._epsilonSq = value * value; },
		reset: function () {
			this._oldRadius = 0;
			this._radius = 0;
			this._radiusChange = 0;
		},
		update: function (manager, actor, time) {
			this._oldRadius = this._radius;
			this._radiusChange = this.expansionRate * time;
			this._radius += this._radiusChange;
		
			var x = actor.x - this.x;
			var y = actor.y - this.y;
			var dSq = x * x + y * y;
			if (dSq == 0)
			{
				dSq = 0.02;
				x = 0.1;
				y = 0.1;
				//return;
			}
			var d = Math.sqrt(dSq);
			
			if (d < this._oldRadius - this._depth) { return; }
			if (d > this._radius + this._depth) { return; }
			
			var offset = d < this._radius ? this._depth - this._radius + d : this._depth - d + this._radius;
			var oldOffset = d < this._oldRadius ? this._depth - this._oldRadius + d : this._depth - d + this._oldRadius;
			offset *= this._invDepth;
			oldOffset *= this._invDepth;
			
			if(offset < 0 ) {
				time = time * (this._radiusChange + offset) / this._radiusChange;
				offset = 0;
			}
			if (oldOffset < 0 ) {
				time = time * (this._radiusChange + oldOffset) / this._radiusChange;
				oldOffset = 0;
			}
			
			var factor;
			if (d < this._oldRadius || d > this._radius ) {
				factor = time * this._power * (offset + oldOffset) / (this._radius * 2 * d * actor.mass);
			} else {
				var ratio = (1 - oldOffset) / this._radiusChange;
				var f1 = ratio * time * this._power * (oldOffset + 1);
				var f2 = (1 - ratio) * time * this._power * (offset + 1);
				factor = (f1 + f2) / (this._radius * 2 * d * actor.mass);
			}
			actor.velocityX += x * factor;
			actor.velocityY += y * factor;
		}
	});
	
	return Explode;
});