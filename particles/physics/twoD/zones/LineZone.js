define('particles/physics/twoD/zones/LineZone', ['particles/physics/twoD/zones/Zone2D', 'particles/geom/twoD/Point'], function (Zone2D, Point) {
	function LineZone (startPoint, endPoint) {
		this._start = startPoint || new Point(0, 0);
		this._end = endPoint || new Point(0, 0);
		this._setLength();
	};
	
	$.extend(LineZone.prototype, Zone2D, {
		_setLength: function () {
			this._length = this._end.subtract(this._start);
		},
		contains: function (x, y) {
			return (x - this._start.x) * (x - this._end.x) + (y - this._start.y) * (y - this._end.y) <= 0;
		},		
		getLocation: function () {
			var point = this._start.clone();
			var weight = Math.random();
			point.x += this._length.x * weight;
			point.y += this._length.y * weight;
			return point;
		},
		getArea: function () { return this._length; }
	});
	
	return LineZone;
});