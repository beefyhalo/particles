({
    appDir: "../swarming",
	baseDir: "../",
    baseUrl: "./",
	dir: "../swarming-build/build",
	optimize: "closure",
	paths: {
		"particles": "./particles"
	},
	modules: [
		{
			name: "swarming/main"
		}
	]
})