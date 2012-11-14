define('particles/physics/core/utils/ColorUtils', {
	interpolateColors: function (color1, color2, ratio) {
		var inv = 1 - ratio;
		var red = Math.round(((color1 >>> 16) & 255) * ratio + ((color2 >>> 16) & 255) * inv);
		var green = Math.round(((color1 >>> 8) & 255) * ratio + ((color2 >>> 8) & 255) * inv);
		var blue = Math.round(((color1) & 255) * ratio + ((color2) & 255) * inv);
		var alpha = Math.round(((color1 >>> 24) & 255) * ratio + ((color2 >>> 24) & 255) * inv);
		return (alpha << 24) | (red << 16) | (green << 8) | blue;
	}	
});