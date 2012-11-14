define('particles/geom/core/Transform', ['particles/geom/core/ColorTransform', 'particles/geom/core/Matrix'], function (ColorTransform, Matrix) {
	function Transform () {
		this.colorTransform = new ColorTransform();
		this.matrix = $.extend({}, Matrix.IDENTITY); // clone
		//this.pixelBounds; //RectangleZone
	};
	
	return Transform;
});