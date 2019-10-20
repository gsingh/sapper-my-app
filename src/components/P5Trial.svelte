<script>
import { onMount } from 'svelte';
import p5 from 'p5';

let myp5;
// let p5;
// // let p;
onMount(async () => {
	const p = (sketch) => {
  let x = 200; 
  let y = 200;
 
  sketch.setup = () => {
    sketch.createCanvas(400, 400);
  };

  // sketch.draw = function() {
  sketch.draw = () => {
    sketch.background(0);
    sketch.fill(255);
    sketch.circle(x, y, 150, 150);
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