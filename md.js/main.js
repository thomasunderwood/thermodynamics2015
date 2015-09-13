$(document).ready(function() {
	// This creates an object 'world' with the relevent Physics 'methods'
	Physics(function(world){

		// Simulation Boundaries
	  var viewWidth = 600;
	  var viewHeight = 375;
		var bounds = Physics.aabb(0, 0, viewWidth, viewHeight);

	  var renderer = Physics.renderer('canvas', {
	    el: 'viewport',
	    width: 600,
	    height: 375,
			autoResize: false,
	    // meta: false, // don't display meta data
	    styles: {
	        // set colors for the circle bodies
	        'circle' : {
	            strokeStyle: '#000000',
	            lineWidth: 3,
	            fillStyle: '#36a3d2',
	            // angleIndicator: '#351024'
	        }
	    }
	  });

	  // add the renderer
	  world.add( renderer );
	  // render on each step
	  world.on('step', function(){
	    world.render();
	  });

	  // bounds of the window
	  var viewportBounds = Physics.aabb(0, 0, viewWidth, viewHeight);

	  // constrain objects to these bounds
	  world.add(Physics.behavior('edge-collision-detection', {
	      aabb: viewportBounds,
	      restitution: 1.0,
	      cof: 0,
	  }));

	  // Add some circles
		var n = 30;
		for (var i = 0; i < n; i++) {
			world.add(
				Physics.body('circle', {
					x: Math.random()*viewWidth,
					y: Math.random()*viewHeight,
					vx: (Math.random()-0.5),
					vy: (Math.random()-0.5),
					radius: 10
				})
			);
		}

	  // ensure objects bounce when edge collision is detected
	  world.add( Physics.behavior('body-impulse-response', {
			restitution: 1.0,
			cof: 1.00,
		}) );

		// particle bouncy-bouncy!!
		var collisions = Physics.behavior('body-collision-detection')
		$('#collisions-on').click(function(){
			world.add( collisions );
    });
    $('#collisions-off').click(function(){
			world.removeBehavior( collisions );
    });

		world.add( Physics.behavior('sweep-prune') );

	  // subscribe to ticker to advance the simulation
	  Physics.util.ticker.on(function( time, dt ){
	      world.step( time );
	  });

	  // start the ticker
	  Physics.util.ticker.start();

	});
});
