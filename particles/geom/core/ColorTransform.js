define('particles/geom/core/ColorTransform', function () {
	function ColorTransform (redMult, greenMult, blueMult, alphaMult, redOff, greenOff, blueOff, alphaOff) {
		this.alphaMultiplier = alphaMult;
		this.alphaOffset = alphaOff;
		this.blueMultiplier = blueMult;
		this.blueOffset = blueOff;
		this.greenMultiplier = greenMult;
		this.greenOffset = greenOff;
		this.redMultiplier = redMult;
		this.redOffset = redOff;
		this._red = (255 * this.redMultiplier) + this.redOffset;
		this._blue = (255 * this.greenMultiplier) + this.greenOffset;
		this._green = (255 * this.blueMultiplier) + this.blueOffset;
		this._alpha = ((255 * this.alphaMultiplier) + this.alphaOffset) / 255;
	};
	
	ColorTransform.prototype = {
		getColor: function () {
			this._red = (255 * this.redMultiplier) + this.redOffset;
			this._green = (255 * this.greenMultiplier) + this.greenOffset;
			this._blue = (255 * this.blueMultiplier) + this.blueOffset;
			this._alpha = ((255 * this.alphaMultiplier) + this.alphaOffset) / 255;
			
			return "rgba(" + this._red + "," + this._green + "," + this._blue + "," + this._alpha + ")";
		}
	};
	
	return ColorTransform;
});