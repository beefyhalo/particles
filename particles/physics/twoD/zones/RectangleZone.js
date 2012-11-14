define('particles/physics/twoD/zones/RectangleZone', ['particles/physics/twoD/zones/Zone2D', 'particles/geom/twoD/Point'], function (Zone2D, Point) {
	function RectangleZone(left, top, right, bottom) {
		this._left = left;
		this._top = top;
		this._right = right;
		this._bottom = bottom;
		this._width = right - left;
		this._height = bottom - top;
	};
	
	$.extend(RectangleZone.prototype, Zone2D, {
		contains: function (x, y) { return (x >= this._left && x <= this._right && y >= this._top && y <= this._bottom); },
		getLocation: function () { return new Point(this._left + Math.random() * this._width, this._top + Math.random() * this._height); },
		getArea: function () { return this._width * this._height; }
	});
	
	return RectangleZone;
});