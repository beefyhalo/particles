define('particles/physics/core/starters/ImageClass', ['particles/physics/core/starters/Starter'], function (Starter) {
	function ImageClass (imageClass, params) {
		this.imageClass = imageClass;
		this.params = params;
	};
	$.extend(ImageClass.prototype, Starter.prototype, {
		get imageClass() { return this._imageClass; },
		set imageClass(value) { this._imageClass = value; },
		get params() {	return this._params; },
		set params(value) { this._params = value; },
		initialize: function (manager, actor) { actor.image = this.construct(this.imageClass, this.params); },
		construct: function (type, params) { return new type(params[0], params[1]); }
	});
	return ImageClass;
});