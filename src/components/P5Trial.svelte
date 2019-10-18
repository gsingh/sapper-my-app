<script>
// import p5 from 'p5';
import { onMount } from 'svelte';

let p5;
let p;
// window.onload = () => {
// export default {
 onMount(async () => {
const module = await import('p5');
p5 = module.default;

p = new p5(function(sketch) {
  let x = 100; 
  let y = 100;

 
  sketch.setup = () => {
    sketch.createCanvas(400, 400);
  };

  // sketch.draw = function() {
  sketch.draw = () => {
    sketch.background(0);
    sketch.fill(255);
    sketch.rect(x, y, 50, 50);
  };
});
});
// };
    // }
// };
</script>

<svelte:component this={p} />