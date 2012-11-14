define('particles/display/Button', ['particles/display/DisplayObject', 'particles/display/TextField'], function (DisplayObject, TextField) {
	function Button () {
		TextField.apply(this, arguments);
	};

	$.extend(Button.prototype, TextField.prototype, {
		hit: function () {
		},
		down: function () {
		},
		draw: function () {
			if (this.text) {
				TextField.prototype.draw.call(this);
			}
		}
	});
	
	return Button;
});