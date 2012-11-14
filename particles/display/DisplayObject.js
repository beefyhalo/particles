define('particles/display/DisplayObject', ['particles/geom/core/Transform'], function (Transform) {
	function DisplayObject () {
		this.alpha;
		//this.blendMode;
		//this.filters;
		this.graphics;
		this.height;
		this.keyTracker = {};
		this.loaderInfo;
		//this.mask;
		this.mouseX = 0;
		this.mouseY = 0;
		this.name;
		this.parent = document;
		//this.root;
		this.rotation;
		this.scaleX;
		this.scaleY;
		//this.stage;
		this.transform = new Transform();
		this.visible;
		this.width;
		this.x = 0;
		this.y = 0;
		
		// TODO: de/activate mouse listeners
		var self = this;
		$(document).bind('mousemove', function (e) {
			self.mouseX = e.clientX - e.target.offsetLeft;
			self.mouseY = e.clientY - e.target.offsetTop;
		});
	};
	
	DisplayObject.prototype = {		
		trigger: function (e, params) { $(this).trigger(e, params); },
		bind: function (e, callback) { $(this).bind(e, callback); },
		draw: function () {},
		getMatrixTransform: function () {
			return this.transform.matrix;
		},
		setMatrixTransform: function (value) {
			this.transform.matrix = value;
		},
		setColorTransform: function (colorTransform) {
			this.transform.colorTransform = colorTransform;
			this.color = colorTransform.getColor();
		},
		setGraphics: function (value) {
			this.graphics = value;
		},
		root: function () {
			return (this.parent == document ? this : this.parent.root());
		},
		absoluteX: function () {
			return (this.parent == document ? this.x : this.x + this.parent.absoluteX());
			return this;
		},
		absoluteY: function () {
			return (this.parent == document ? this.y : this.y + this.parent.absoluteY());
			return this;
		},
		scale: function (x, y) {
			this.setMatrixTransform(this.getMatrixTransform().scale(x, y));
			return this;
		},
		rotate: function (angle) {
			this.setMatrixTransform(this.getMatrixTransform().rotate(angle));
			return this;
		},
		translate: function (dx, dy) {
			this.setMatrixTransform(this.getMatrixTransform().translate(dx, dy));
			return this;
		}
	};
	
	return DisplayObject;
});