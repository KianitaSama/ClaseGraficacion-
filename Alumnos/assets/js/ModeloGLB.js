

			// if ( WEBGL.isWebGLAvailable() === false ) {

			// 	// document.body.appendChild( WEBGL.getWebGLErrorMessage() );
			// 	document.getElementById('render').appendChild(Render.domElement);

			// }

			//Objeto de tipo RENDER
			var renderer = new THREE.WebGLRenderer( { antialias: true } );

			// Activacion de sombras
			renderer.shadowMapEnabled = true;

			//Objeto de tipo ESCENA
			var scene = new THREE.Scene();

			//Propiedades de la Ventana
			var controls;


			//Opciones de ventana
			var ancho=window.innerWidth-1000;
            var alto=window.innerHeight-100;

            //Ajustes de CAMARA


			var clock = new THREE.Clock();
            //// var handler = THREE.AnimationHandler.CATMULLROM;
            var anim1_, anim2_, anim3_, anim_4;

            //Objeto de tipo camara
            	


            //Establece la medida de la Ventana con respecto al Render
            	// THREEx.WindowResize(Render, Camara);


			var stats, gui, mixer, actions, activeAction, previousAction;
			var model, face;


			if(ancho<alto){
                var temp;
                temp = alto;
                alto=ancho;
                ancho = temp;
            }

            var angulo = 8;
            var aspecto = 1;
            var cerca = 0.02;
            var lejos = 500;

            // var angulo = 45;
            // var aspecto = ancho/alto;
            // var cerca = 0.1;
            // var lejos = 10000;            

	// Camara Perspectiva---------------------
            var camera = new THREE.PerspectiveCamera( angulo , aspecto, cerca, lejos );
				// var camera = new THREE.OrthographicCamera( 50 , 20, 100, 50, cerca, lejos );
	// Camara Ortogonal

			function init() {

				renderer.setSize(300*2,290*2);
				// renderer.setSize(400*1.5,390*1.5);
    			renderer.setClearColor(0xffffff);

				document.getElementById('render').appendChild( renderer.domElement );		

				// camera = new THREE.PerspectiveCamera( 45, window.innerWidth / window.innerHeight, 0.25, 100 );
				
				// camera.position.z=10;
				// camera.position.y=3;
				// camera.position.x=0;	

		// Valores originales de la Camara Perspectiva
				camera.position.z=1.5;
			    camera.position.y=1.5;
			    camera.position.x=-1.5;	

		// Valores originales de la camara Ortogonal
				// camera.position.z=100;
			 //    camera.position.y=100;
			 //    camera.position.x=100;	                					
				
				scene.add(camera);
				
				controls= new THREE.OrbitControls(camera,renderer.domElement);

				// Es para cambiar el color del canvas
				// scene.background = new THREE.Color( 0xfffff5 ); 



				// lights

 
  
 
				// model
 
		// Archivos Originales del proyecto de Papime

				var modelo =   "/ejemplo/assets/glb/Arduino Uno.glb";
				


		// Archivos de prueba para le video de CamaleonCD

				// var modelo 	= "/ejemplo/assets/glb/Las_Torres.glb";
				// var modelo2 = "/ejemplo/assets/glb/Control_snes.glb";				
				// var modelo3 = "/ejemplo/assets/glb/Estructura1.glb";
				// var modelo4 = "/ejemplo/assets/glb/Estructura2.glb";
				// var modelo5 = "/ejemplo/assets/glb/Arduino Uno.glb";
				// var modelo6 = "/ejemplo/assets/glb/Raspberry.glb";
				// var modelo7 = "/ejemplo/assets/glb/CIMA.glb";
				// var modelo8 = "/ejemplo/assets/glb/Dron.glb";
				// var modelo9 = "/ejemplo/assets/glb/untitled.glb";

				var loader = new THREE.GLTFLoader();

				loader.load( modelo7, function( gltf ) {

					model = gltf.scene;
					scene.add( model );

					createGUI( model, gltf.animations );

				});


				function createGUI( model, animations ) {

					var states = [ 'Anim1', 'Anim2', 'Anim3'];

					gui = new dat.GUI();

					mixer = new THREE.AnimationMixer( model );

					actions = {};


					for ( var i = 0; i < animations.length; i++ ) {

						var clip = animations[ i ];
						var action = mixer.clipAction( clip );
						actions[ clip.name ] = action;
						}

					// states

					var api = { state: 'Anim2' };
					var statesFolder = gui.addFolder( 'States' );

					var clipCtrl = statesFolder.add( api, 'state' ).options( states );

					clipCtrl.onChange( function() {

						fadeToAction( api.state, 0.5 );

					} );

					statesFolder.open();

					activeAction = actions['Anim2'];
					activeAction.play();

					expressionFolder.open();

				}

				function fadeToAction( name, duration ) {

					previousAction = activeAction;
					activeAction = actions[ name ];

					if ( previousAction !== activeAction ) {

						previousAction.fadeOut( duration );

					}

					activeAction
						.reset()
						.setEffectiveTimeScale( 1 )
						.setEffectiveWeight( 1 )
						.fadeIn( duration )
						.play();

				}

				Luz();
				function Luz(){
				var light = new THREE.HemisphereLight( 0xffffff, 0x444444 );
				light.position.set( 0, 20, 0 );


				scene.add( light );

				light = new THREE.DirectionalLight( 0xffffff );
				light.position.set( 0, 20, 10 );
				scene.add( light );
				}

				// renderer.setPixelRatio( window.devicePixelRatio );
				// renderer.setSize( window.innerWidth, window.innerHeight);
				// renderer.setSize(window.innerWidth/2.5, window.innerHeight/2,false);
				
				// renderer.gammaOutput = true;
				// renderer.gammaFactor = 2.2;
				

				// window.addEventListener( 'resize', onWindowResize, false ); //redimensiona el canvas del renderizado cuando hay cambio de resolucion

			}



			function onWindowResize() {

				camera.aspect = window.innerWidth / window.innerHeight;
				camera.updateProjectionMatrix();

				renderer.setSize( window.innerWidth, window.innerHeight );

			}


			function animate() {

				var dt = clock.getDelta(); //Activa el modelo

				if ( mixer ) mixer.update( dt ); //Activa las animaciones

				requestAnimationFrame( animate );

				renderer.render( scene, camera );


			}

			init();
			animate();