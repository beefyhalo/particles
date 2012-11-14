define('particles/display/Loader', ['particles/display/DisplayObjectContainer', 'particles/display/LoaderInfo', 'particles/display/DisplayObject', 'particles/physics/core/events/Event', 'particles/display/Bitmap'], function (DisplayObjectContainer, LoaderInfo, DisplayObject, Event, Bitmap) {
	function Loader () {
		DisplayObjectContainer.apply(this, arguments);
		this.loaderInfo = new LoaderInfo(this);
	};

	$.extend(Loader.prototype, DisplayObjectContainer.prototype, {
		load: function (url) {
			var self = this;
			var content = new DisplayObject();
			content.loaderInfo = this.loaderInfo;
			this.content = content;
			//this.loaderInfo.content = content;
			$(this.loaderInfo).bind(Event.COMPLETE, function () {
				self._loaded();
			});
			this.loaderInfo._load(url);
		},
		
		_loaded: function () {
			switch (this.loaderInfo.contentType) {
				case 'image/jpeg':
				case 'image/jpg':
				case 'image/png':
					var self = this;
					var bitmap = new Bitmap();
					bitmap.loaderInfo = this.loaderInfo;
					//bitmap.setImageData(this.loaderInfo.data); // TODO: do this instead of below
					bitmap.image = new Image();
					bitmap.image.onload = function () {
						bitmap.width = bitmap.image.width;
						bitmap.height = bitmap.image.height;
						self.content = bitmap;
						//self.addChild(self.content);
						self.trigger(new Event(Event.COMPLETE));
					};
					bitmap.image.src = this.loaderInfo.url;
				break;
			}
		}
	});
	
	return Loader;
});