<script>
import { onMount } from 'svelte';
// import p5 from 'p5';

export let myp5;
let p5;
// // let p;
onMount(async () => {
 const module = await import('p5');
 let canvas;
 let n=0;
 let c=5;

 let spot = {
     x: 100,
     y: 100,
     radius: 20
  };
  let rgba = {
    r: 0,
    g: 0,
    b: 0,
    alpha: 127
  }
  p5=module.default;

	const p = (sketch) => {
  let x = 200; 
  let y = 200;
  let start;
 
 sketch.windowResized = () => {
  //  console.log("resized");
  sketch.resizeCanvas(sketch.windowWidth,sketch.windowHeight);
 };

  sketch.setup = () => {
    canvas=sketch.createCanvas(sketch.windowWidth,sketch.windowHeight);
    canvas.position(0,0);
    canvas.style('z-index', 'auto');
    
     sketch.angleMode(sketch.DEGREES);
     sketch.colorMode(sketch.HSB);
     start=0;
  };

  // sketch.draw = function() {
  sketch.draw = () => {
     sketch.background(0);
     sketch.translate(sketch.width/2, sketch.height/2);
     
   for(var i=0;i<n;i++){ 
     sketch.rotate(n*0.005); 
  //  spot.x = sketch.random(0, sketch.width);
  //  spot.y = sketch.random(0, sketch.height);
  //  spot.radius = sketch.random(5,55);
  //  rgba.r= sketch.random(50,255);
   rgba.g  = sketch.random(0, 200);
   rgba.b  = sketch.random(0, 200);
   rgba.alpha  = sketch.random(50, 255);
   let theta=i*137.5;
   let r= c*sketch.sqrt(i);
   let x = r*sketch.cos(theta);
   let y=r*sketch.sin(theta);
   var hu=sketch.sin(start+i);
   hu=sketch.map(hu, -1, 1, 0, 360);
    // sketch.fill(255);

    sketch.fill(hu,255,255,0.3);
  //  sketch.scale(sketch.height/n);  
   sketch.noStroke();
   sketch.ellipse(x,y,8,8);
 
   
   

   
    // sketch.fill(rgba.r, rgba.g, rgba.b, rgba.alpha);
   
    // sketch.circle(spot.x, spot.y, spot.radius);
  }
  n += 5;
  start += 5;
  };
};
myp5 = new p5(p, document.getElementById('p5sketch'));
	});
// const p = (sketch) => {
//   let x = 100; 
//   let y = 100;
 
//   sketch.setup = () => {
//     sketch.createCanvas(400, 400);
//   };

//   // sketch.draw = function() {
//   sketch.draw = () => {
//     sketch.background(0);
//     sketch.fill(255);
//     sketch.rect(x, y, 50, 50);
//   };
// };
// myp5 = new p5(p, document.getElementById('p5sketch'));
// });

// let myp5 = new p5(p, document.getElementById('p5sketch'));
// };
    // }
// };
</script>


 <div id = "p5sketch">
    <!-- p5 instance will be created here -->
  </div>

  <p>Some other HTML</p>
  <!-- <svelte:component this={myp5} /> -->