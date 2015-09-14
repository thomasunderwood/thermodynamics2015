$(document).ready(function() {
	Physics(function(world){
	var canvas = $('#world');
	canvas.width($(document).width());
	// canvas.height($(document).height());

	var width = canvas.width(),
		height = canvas.height()
		;

	var renderer = Physics.renderer('canvas', {
	el: 'world',
	width: width,
	height: height,
	styles: {
	    // set colors for the circle bodies
	    'circle' : {
	        strokeStyle: '#351024',
	        lineWidth: 1,
	        fillStyle: '#d33682',
	        angleIndicator: '#351024'
	    }
	}
	});

	// add the renderer
	world.add(renderer);
	// render on each step
	world.on('step', function(){
	world.render();
	});

	var n = 1000;
	for (var i = 0; i < n; i++) {
		world.add(
			Physics.body('circle', {
				x: Math.random()*width,
				y: Math.random()*height,
				radius: 30
			})
		);
	}

	var set = false;
	Physics.behavior('brownian', function(parent) {
		return {
			translate: function(old) {
				var transform = new Physics.transform({x: Math.SQRT1_2, y: Math.SQRT1_2}, Math.random()*2*Math.PI);
				return old.pos.rotate(transform).translate(transform);
			},
			behave: function(data) {
				var bodies = this.getTargets();
	            for (var i = 0, l = bodies.length; i < l; i++) {
	            	var body = bodies[i];
	            	body.state.pos = this.translate(body.state.old)
	            }
			}
		}
	});

	world.addBehavior(Physics.behavior('brownian'));
	world.warp( 0.25 );

	// subscribe to ticker to advance the simulation
	Physics.util.ticker.on(function(time, dt){
		world.step(time);
	});

	// start the ticker
	Physics.util.ticker.start();

	});

});
