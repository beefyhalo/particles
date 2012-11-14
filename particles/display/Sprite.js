define('particles/display/Sprite', ['particles/display/DisplayObjectContainer'], function (DisplayObjectContainer) {
	function Sprite () {
		DisplayObjectContainer.apply(this, arguments);
	};
	
	$.extend(Sprite.prototype, DisplayObjectContainer.prototype);
	
	return Sprite;
});