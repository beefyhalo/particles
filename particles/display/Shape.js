define('particles/display/Shape', ['particles/display/DisplayObject'], function (DisplayObject) {
	function Shape() {
		DisplayObject.apply(this, arguments);
	};
	
	$.extend(Shape.prototype, DisplayObject.prototype, {
	});
	
	return Shape;
});