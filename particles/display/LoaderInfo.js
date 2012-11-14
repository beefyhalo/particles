define('particles/display/LoaderInfo', ['particles/physics/core/events/Event'], function (Event) {
	function LoaderInfo (loader) {
		this.bytes;
		this.bytesLoaded;
		this.bytesTotal;
		this.content;
		this.contentType;
		this.loader = loader;
		this.url;
		
		this.data;
	};

	LoaderInfo.prototype = {
		_load: function (url) {
			var self = this;
			this.url = url;
			$.ajax({
				url: url,
				success: function (data, textStatus, request) {
					self.data = data;
					self.contentType = request.getResponseHeader('Content-Type');
					$(self).trigger(new Event(Event.COMPLETE));
				}
			});
		}
	};
	
	return LoaderInfo;
});