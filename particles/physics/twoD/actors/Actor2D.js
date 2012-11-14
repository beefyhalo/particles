define('particles/physics/twoD/actors/Actor2D', ['particles/physics/core/actors/Actor', 'particles/geom/core/Matrix'], function (Actor, Matrix) {
	function Actor2D () {
		Actor.apply(this, arguments);
		this.x = 0;
		this.y = 0;
		this.previousX = 0;
		this.previousY = 0;
		this.velocityX = 0;
		this.velocityY = 0;
		this.rotation = 0;
	};
	
	$.extend(Actor2D.prototype, Actor.prototype, {
		getMatrixTransform: function () {
			var cos = this.scale * Math.cos(this.rotation);
			var sin = this.scale * Math.sin(this.rotation);
			return new Matrix(cos, sin, -sin, cos, this.x, this.y);
		}
	});
	
	return Actor2D;
});