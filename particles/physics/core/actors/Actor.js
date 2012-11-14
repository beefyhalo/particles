define('particles/physics/core/actors/Actor', ['particles/geom/core/ColorTransform', 'particles/display/DisplayObject'], function (ColorTransform, DisplayObject) {
	function Actor () {
		this.color = 0xffffffff;
		this.scale = 1;
		this.mass = 1;
		this.lifetime = 0;
		this.age = 0;
		this.energy = 1;
		this.isDead = false;
		this.collisionRadius = 1;
		this.image = new DisplayObject();
		this._previousColor = undefined;
		this._colorTransform;
	};
	
	Actor.prototype = {
		getColorTransform: function () {
			if (!this._colorTransform || this._previousColor != this.color) {				
				this._colorTransform = new ColorTransform(
					((this.color >>> 16 ) & 255) / 255,
					((this.color >>> 8) & 255) / 255,
					((this.color) & 255) / 255,
					((this.color >>> 24) & 255) / 255,
					0, 0, 0, 0
				);
				this._previousColor = this.color;
			}
			
			return this._colorTransform;
		},
		
		getAlpha: function () {
			return ((this.color & 0xff000000) >>> 24) / 255;
		},
		
		initialize: function initialize () {
			this.color = 0xFFFFFFFF;
			this.scale = 1;
			this.mass = 1;
			this.collisionRadius = 1;
			this.lifetime = 0;
			this.age = 0;
			this.energy = 1;
			this.isDead = false;
			this.image = null;
			this._colorTransform = null;
		}
	};
	
	return Actor;
});