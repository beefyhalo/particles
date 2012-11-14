define('particles/physics/twoD/actions/MouseAntiGravity', ['particles/physics/twoD/actions/MouseGravity'], function (MouseGravity) {
	function MouseAntiGravity () {
		MouseGravity.apply(this, arguments);
	};
	
	$.extend(MouseAntiGravity.prototype, MouseGravity.prototype, {
		setPower: function (value) { MouseGravity.prototype.setPower.call(this, -value); },
		getPower: function () { return -MouseGravity.prototype.getPower.apply(this, arguments); }
	});
	
	return MouseAntiGravity;
});