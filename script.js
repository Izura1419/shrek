const canvas = document.querySelector('canvas');

let xpos, ypos, xspeed, yspeed, yRotDoney;
xspeed = yspeed = 3;
xpos = ypos = 0;
yRotDoney = 1.5;

const html = document.querySelector('html');
html.style.cursor = 'pointer';

const song = new Audio('other/song.mp3');
html.onclick = ()=>{
	song.volume = .1;
	song.play();

	html.style.cursor = 'default';
}

const renderer = new THREE.WebGLRenderer({canvas: canvas, alpha: true});
renderer.setSize( 250, 250 );
document.body.appendChild( renderer.domElement );

const camera = new THREE.PerspectiveCamera(75, 300 / 300, .1, 5);
camera.position.z = 20;

const scene = new THREE.Scene();

const light = new THREE.DirectionalLight('white', 5);
light.position.set(-2, 0, 20);
scene.add(light);

const loader = new THREE.GLTFLoader();

loader.load( 'other/scene.gltf', function ( gltf ) {
	  gltf.scene.position.set(0,-1.8,16.3);
	  gltf.scene.scale.set(0.28,0.28,0.28);

	  gltf.scene.rotation.x = 0.2;

	  scene.add( gltf.scene );

	  function render(time) {
	    gltf.scene.rotation.y = yRotDoney;

	  	yRotDoney = yRotDoney + xspeed / 40;

	    if (ypos > innerHeight - 250 || ypos < 0) {
				yspeed = yspeed * -1;
			}
			if (xpos > innerWidth - 250 || xpos < 0) {
				xspeed = xspeed * -1;
			}
			ypos = ypos + yspeed;
			xpos = xpos + xspeed;

			canvas.style.top = `${ypos}px`;
			canvas.style.left = `${xpos}px`;

	    renderer.render(scene, camera);

	    requestAnimationFrame(render);
	  }
	  requestAnimationFrame(render);
});