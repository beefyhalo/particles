define('particles/display/TextField', ['particles/display/DisplayObject'], function (DisplayObject) {
	function TextField () {
		DisplayObject.apply(this, arguments);
		this.text = '';
		this.textAlign = 'left';
		this.strokeStyle = '';
		this.color = 'rgba(0,0,0,1)';
		this.font = '12px Arial';
		this.width = 100;
		this.height = 100;
	};

	$.extend(TextField.prototype, DisplayObject.prototype, {
		draw: function () {
			this.graphics.font = this.font;
			if (this.strokeStyle != '') {
				this.graphics.strokeStyle = this.strokeStyle;
			}
			if (this.fillStyle != '') {
				this.graphics.fillStyle = this.color;
			}
			this.graphics.fillText(this.text, this.x, this.y);
		}
	});
	
	return TextField;
});