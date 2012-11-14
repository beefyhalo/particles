define('particles/physics/core/managers/Manager', ['particles/physics/core/counters/ZeroCounter', 'particles/physics/core/managers/ManagerUpdater', 'particles/physics/core/events/ActorEvent', 'particles/physics/core/events/ManagerEvent', 'particles/physics/core/events/UpdateEvent', 'particles/physics/core/utils/ArrayUtil'], function (ZeroCounter, ManagerUpdater, ActorEvent, ManagerEvent, UpdateEvent, ArrayUtil) {
	function Manager () {
		this._started = false;
		this._running = false;
		this.actors = [];
		this.actorFactory;
		this._starters = [];
		this._actions = [];
		this._tasks = [];
		this.counter = new ZeroCounter();
		this._managerUpdater = new ManagerUpdater();
	};
	Manager.prototype = {
		start: function () {
			var self = this;
			this._managerUpdater.bind(UpdateEvent.UPDATE, function (e) { self.update(e); });
			this._started = true;
			this._running = true;
		
			// init tasks
			var i = this._tasks.length;
			while (i--) {
				this._tasks[i].initialize(this);
			}
			
			// start counter
			i = this.counter.startManager(this);
			while (i--) {
				this.createActor();
			}
		},		
		stop: function () { this._started = false; },
		pause: function () { this._running = false; },
		resume: function () { this._running = true; },
		update: function (e) { // e = UpdateEvent
			if (!this._running) {
				return;
			}
			
			var time = e.getTime();
				
			// any new actors to create?
			var i = this.counter.updateManager(this, time);			
			while (i--) {
				this.createActor();
			}
			
			// update tasks
			i = this._tasks.length;
			while (i--) {
				this._tasks[i].update(this, time);
			}
			
			// update actors
			if (this.actors.length) {
				i = this._actions.length;
				var j;
				while (i--) {					
					// update actions
					j = this.actors.length;
					while (j--) {
						this._actions[i].update(this, this.actors[j], time);
					}
				}
				// remove dead actors
				var actor;
				i = this.actors.length;
				while (i--) {
					actor = this.actors[i];
					if (actor.isDead) {
						this.actors.splice(i, 1);
						$(this).trigger(new ActorEvent(ActorEvent.ACTOR_DEAD, actor));
						if (actor.isDead) {
							this.actorFactory.disposeActor(actor);
						}
					}
				}
			} else {
				// fire managerEmpty
				$(this).trigger(new ManagerEvent(ManagerEvent.MANAGER_EMPTY));
			}
						
			// fire managerUpdated
			$(this).trigger(new ManagerEvent(ManagerEvent.MANAGER_UPDATED, time));
		},		
		createActor: function () {
			return this.addActor(this.actorFactory.createActor());
		},
		addActor: function (actor) {
			this.initActor(actor);
			var i = this._starters.length;
			while (i--) {
				this._starters[i].initialize(this, actor);
			}
			this.actors.push(actor);
			$(this).trigger(new ActorEvent(ActorEvent.ACTOR_CREATED, actor));
			return actor;
		},		
		initActor: function (actor) {},
			
		// counter
		get counter() {
			return this._counter;
		},
		set counter(value) {
			this._counter = value;
			if (this._running) {
				this._counter.startManager(this);
			};
		},

		// starters
		getStarters: function () {
			return this._starters;
		},
		setStarters: function (values) {
			var self = this;
			var i = this._starters.length;
			while (i--) {
				this._starters[i].removedFromManager(this);
			}
			this._starters = values;
			i = this._starters.length;
			while (i--) {
				this._starters[i].addedToManager(this);
			}
		},
		addStarter: function (starter) {
			ArrayUtil.add(this._starters, starter);
			starter.addedToManager(this);
		},
		removeStarter: function (starter) {
			if (ArrayUtil.remove(this._starters, starter)) {
				starter.removedFromManager(this);
			}
		},
		hasStarter: function (starter) {
			return ArrayUtil.contains(this._starters, starter);
		},
		hasStarterOfType: function (starterClass) {
			return ArrayUtil.containsType(this._starters, starterClass);
		},
		
		// actions
		getActions: function () {
			return this._actions;
		},		
		setActions: function (values) {
			var self = this;
			var i = this._actions.length;
			while (i--) {
				this._actions[i].removedFromManager(this);
			}
			this._actions = values;
			i = this._actions.length;
			while (i--) {
				this._actions[i].addedToManager(this);
			}
		},
		addAction: function (action) {
			ArrayUtil.add(this._actions, action);
			action.addedToManager(this);
		},
		removeAction: function (action) {
			if (ArrayUtil.remove(this._actions, action)) {
				action.removedFromManager(this);
			}
		},
		hasAction: function (action) {
			return ArrayUtil.contains(this._actions, action);
		},
		hasActionOfType: function (actionClass) {
			return ArrayUtil.containsType(this._actions, actionClass);
		},

		// tasks
		getTasks: function () {
			return this._tasks;
		},
		setTasks: function (values) {
			var self = this;
			var i = this._tasks.length;
			while (i--) {
				this._tasks[i].removedFromManager(this);
			}
			this._tasks = values;
			i = this._tasks.length;
			while (i--) {
				this._tasks[i].addedToManager(this);
			}
		},
		addTask: function (task) {
			ArrayUtil.add(this._tasks, task);
			task.addedToManager(this);
		},
		removeTask: function (task) {
			if (ArrayUtil.remove(this._tasks, task)) {
				task.removedFromManager(this);
			}
		},
		hasTask: function (task) {
			return ArrayUtil.contains(this._tasks, task);
		},
		hasTaskOfType: function (taskClass) {
			return ArrayUtil.containsType(this._tasks, taskClass);
		}
	};
	return Manager;
});