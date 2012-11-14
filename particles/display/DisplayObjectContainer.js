define('particles/display/DisplayObjectContainer', ['particles/display/DisplayObject', 'particles/physics/core/events/Event'], function (DisplayObject, Event) {
	function DisplayObjectContainer() {
		DisplayObject.apply(this, arguments);
		this._children = [];
	};
	
	$.extend(DisplayObjectContainer.prototype, DisplayObject.prototype, {
		addChild: function (displayObject) {
			this.addChildAt(displayObject, 2);
		},
		addChildAt: function (displayObject, index) {
			this._children.splice(index, 0, displayObject);
			displayObject.parent = this;
			if (this.graphics) {
				displayObject.setGraphics(this.graphics);
			}
		},
		// TODOS
		getChildAt: function (index) {},
		getChildByName: function (name) {},
		getChildIndex: function (displayObject) {},
		removeChild: function (displayObject) {
			var i = this._children.length;
			while (i--) {
				if (displayObject == this._children[i]) {
					this._children.splice(i, 1);
					break;
				}
			}
		},
		removeChildAt: function (index) {},
		setChildIndex: function (displayObject, index) {},
		swapChildren: function (displayObject1, displayObject2) {},
		swapChildrenAt: function (index1, index2) {},
		contains: function (displayObject) {},
		// draw this, and children
		draw: function () {
			DisplayObject.prototype.draw.apply(this, arguments);
			var i = this._children.length;
			while (i--) {
				this._children[i].draw();
			}
		},		
		// tells the camera to draw objects onto the stage
		start: function () {
			this.graphics.save();
			this.draw();
			this.graphics.restore();
		},
		// sets the drawing context for this, and children
		setGraphics: function (value) {
			this.graphics = value;
			var i = this._children.length;
			while (i--) {
				this._children[i].setGraphics(value);
			}
		}
	});
	
	return DisplayObjectContainer;
});