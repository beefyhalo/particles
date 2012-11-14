define('particles/physics/core/starters/ColorPicker', ['particles/physics/core/starters/Starter', 'particles/physics/core/utils/ColorUtils'], function (Starter, ColorUtils) {
	function ColorPicker (min, max) {
		this.min = min;
		this.max = max;
	};
	$.extend(ColorPicker.prototype, Starter.prototype, {
		getColor: function () {	return this.min == this.max ? this.min : ColorUtils.interpolateColors(this.max, this.min, Math.random()); },
		initialize: function (manager, actor) { actor.color = this.getColor(); }
	});
	return ColorPicker;
});