define('particles/geom/twoD/Point', function () {
	function Point(x, y) {
		this.x = x;
		this.y = y;
	};
	Point.prototype = {
		clone: function () {
			return new Point(this.x, this.y);
		},
		subtract: function (point) {
			return new Point(this.x - point.x, this.y - point.y);
		}
	};
	return Point;
});