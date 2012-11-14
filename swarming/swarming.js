define('swarming/swarming', ['particles/display/Sprite', 'particles/physics/twoD/managers/Manager2D', 'particles/cameras/twoD/ActorCamera', 'particles/physics/core/counters/Blast', 'particles/physics/core/counters/Constant',  'particles/physics/core/starters/ImageClass', 'particles/display/Dot', 'particles/physics/core/starters/ColorPicker', 'particles/physics/twoD/starters/Position', 'particles/physics/twoD/zones/RectangleZone',  'particles/physics/twoD/starters/Velocity', 'particles/physics/twoD/zones/PointZone', 'particles/geom/twoD/Point', 'particles/physics/twoD/tasks/FollowMouse', 'particles/physics/twoD/actions/BoundingBox', 'particles/physics/twoD/actions/MouseGravity', 'particles/physics/twoD/actions/MouseAntiGravity', 'particles/physics/twoD/actions/Explode', 'particles/physics/twoD/actions/Friction', 'particles/physics/twoD/actions/Move', 'particles/physics/twoD/actions/CircleCollide'], function (Sprite, Manager2D, ActorCamera, Blast, Constant, ImageClass, Dot, ColorPicker, Position, RectangleZone, Velocity, PointZone, Point, FollowMouse, BoundingBox, MouseGravity, MouseAntiGravity, Explode, Friction, Move, CircleCollide) {
	function Swarming () {
		Sprite.apply(this, arguments);
	};
	
	$.extend(Swarming.prototype, Sprite.prototype, {
		init: function (element) {
			var canvas = $(element)[0];
			canvas.width = window.innerWidth;
			canvas.height = window.innerHeight;
			var graphics = canvas.getContext('2d');
			var manager = new Manager2D();
			var camera = new ActorCamera();
			var color1 = Math.random() * 0xffffffff;
			var color2 = Math.random() * 0xffffffff;			
			var bound = new BoundingBox(0, 0, canvas.width, canvas.height, 1);
			var grav = new MouseGravity(200, camera, 50);
			var antiGrav = new MouseAntiGravity(100, camera, 50);
			var explode = new Explode(1, 0, 0, 1, 50, 1);

			manager.counter = new Blast(10000);
			//manager.counter = new Constant(10);
			manager.addStarter(new ImageClass(Dot, [1]));
			manager.addStarter(new ColorPicker(color1, color2));
			manager.addStarter(new Position(new RectangleZone(0, 0, canvas.width, canvas.height)));
			//manager.addStarter(new Velocity(new PointZone(new Point(50, 10))));
			//manager.addTask(new FollowMouse(camera));
			manager.addAction(bound);
			manager.addAction(grav);
			manager.addAction(new Friction(25));
			manager.addAction(new Move());
			//manager.addAction(new CircleCollide(1, camera));
			
			camera.addManager(manager);
			manager.start();			
			this.addChild(camera);
			this.setGraphics(graphics);
			this.start();
			
			// bind to canvas
			$(element).mousedown(function () {
					manager.removeAction(grav);
					explode.reset();
					explode.x = camera.mouseX;
					explode.y = camera.mouseY;
					manager.addAction(explode);
					manager.addAction(antiGrav);
				})
				.mouseup(function () {
					manager.removeAction(explode);
					manager.removeAction(antiGrav);
					manager.addAction(grav);
				});
				
			// fullscreen
			$(window).resize(function () {
				canvas.width = window.innerWidth;
				canvas.height = window.innerHeight;
				bound.right = canvas.width;
				bound.bottom = canvas.height;
			});
			
			// fps
			var last_tick = 0;
			var last_fps_tick = 0;
			var frames = 0;
			var fps = 0;
			var current_tick = 0;
			$(manager).bind('managerUpdated', function (e) {
				frames += 1;
				current_tick = (new Date()).getTime();
				last_tick = current_tick;
				if (frames % 20 === 0) {
					fps = ~~(frames / ((current_tick - last_fps_tick) / 1000));
					frames = 0;
					last_fps_tick = current_tick;
					$('#fps').text(fps + " fps");
				}				
			});			
		}
	});
	
	// jquery plugin
	$.fn.swarming = function () {
		new Swarming().init(this);
	};
	
	return Swarming;
});