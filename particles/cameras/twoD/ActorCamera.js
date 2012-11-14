define('particles/cameras/twoD/ActorCamera', ['particles/cameras/core/SpriteCamera'], function (SpriteCamera) {
	function ActorCamera() {
		SpriteCamera.apply(this, arguments);
	};
	$.extend(ActorCamera.prototype, SpriteCamera.prototype, {
		render: function (actors) {
			var i = actors.length;
			while (i--) {
				actors[i].image.setMatrixTransform(actors[i].getMatrixTransform());
				//actor.image.setColorTransform(actor.getColorTransform());
			}
			// super
			SpriteCamera.prototype.render.apply(this, arguments);
		},
		addActor: function (actor) {
			var image = actor.image;
			image.setGraphics(this.graphics);
			image.setColorTransform(actor.getColorTransform());
			image.setMatrixTransform(actor.getMatrixTransform());
			this.addChildAt(image, 2);
		},
		removeActor: function (actor) {
			this.removeChild(actor.image);
		}
	});
	
	return ActorCamera;
});