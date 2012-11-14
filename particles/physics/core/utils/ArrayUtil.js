define('particles/physics/core/utils/ArrayUtil', {
	contains: function (array, item) {
		return item in array;
	},	
	containsType: function (array, type) {
		var len = array.length;
		for (var i = 0; i < len; i++) {
			if (array[i] instanceof type) {
				return true;
			}
		}
		return false;
	},
	remove: function (array, item) {
		var index = array.indexOf(item);
		if (index == -1) {
			return false;
		}
		array.splice(index, 1);
		return true;
	},
	add: function (array, item) {
		var len = array.length;
		array.push(item);
		return len + 1;
	},
	removeAt: function (array, index) {
		var temp = array[index];
		array.splice(index, 1);
		return temp;
	},	
	clear: function (array) {
		array.length = 0;
	}
});