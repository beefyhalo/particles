define('particles/display/MovieClip', ['particles/display/Sprite'], function (Sprite) {
	function MovieClip () {
		Sprite.apply(this, arguments);
		this.currentFrame;
		this.currentLabel;
		this.currentLabels;
		this.currentScene;
		this.enabled;
		this.framesLoaded;
		this.scenes = [];
		this.totalFrames;
	};

	$.extend(MovieClip.prototype, Sprite.prototype, {
		goToAndPlay: function (label) {
			// clear canvas
			this.graphics.save();
			this.graphics.clearRect(0, 0, this.graphics.canvas.width, this.graphics.canvas.height);
			this.graphics.restore();
			// play
			this.scenes[label].play();
		},
		goToAndStop: function () {},
		nextFrame: function () {},
		nextScene: function () {},
		prevFrame: function () {},
		prevScene: function () {},
		stop: function () {},
		play: function () {},
		addScene: function (label, scene) {
			this.scenes[label] = scene;
			this.addChild(scene);
		}
	});
	
	return MovieClip;
});