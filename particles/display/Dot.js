define('particles/display/Dot', ['particles/display/Shape'], function (Shape) {
	function Dot(radius, color) {
		Shape.apply(this, arguments);
		this.radius = radius || 1;
		this.color = color || "#fff";
	};
	
	$.extend(Dot.prototype, Shape.prototype, {
		draw: function () {
			this.graphics.fillStyle = this.color;
			this.graphics.beginPath();
			this.graphics.arc(0, 0, this.radius, 0, Math.PI * 2, true);        
			this.graphics.closePath();
			this.graphics.fill();
		}
	});
	
	return Dot;
});