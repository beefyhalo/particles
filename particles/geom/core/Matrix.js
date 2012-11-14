define('particles/geom/core/Matrix', function () {
	function Matrix (a, b, c, d, tx, ty) {
		this.a = a;
		this.b = b;
		this.c = c;
		this.d = d;
		this.tx = tx;
		this.ty = ty;
	};
	
	Matrix.prototype = {
		// TODOS
		concat: function (m) {},
		identity: function () {},
		rotate: function (angle) {},
		scale: function (sx, sy) {
			this.a = sx;
			this.d = sy;
			return this;
		},
		transformPoint: function (point) {},
		translate: function (dx, dy) {}
	};
	Matrix.IDENTITY = new Matrix(1, 0, 0, 1, 0, 0);
	return Matrix;
});