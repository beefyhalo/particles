define('particles/physics/twoD/zones/PointZone', ['particles/physics/twoD/zones/Zone2D', 'particles/geom/twoD/Point'], function (Zone2D, Point) {
	function PointZone(point) {
		this._point = point ? point : new Point();
	};
	
	$.extend(PointZone.prototype, Zone2D, {
		getPoint: function () { return this._point; },
		setPoint: function (value) { this._point = value; },
		getX: function () { return this._point.x; },
		setX: function (value) { this._point.x = value; },
		getY: function () { return this._point.y; },
		setY: function (value) { this._point.y = value; },
		contains: function (x, y) { return (this._point.x == x && this._point.y == y); },
		getLocation: function () { return this._point.clone(); },
		getArea: function () { return 1; }
	});
	
	return PointZone;
});