<script context="module">
export function preload(page, { user } ) {
        return { user };
    };
</script>
<script>
import Logout from './_CRUD/_Logout.svelte';
import {send, receive} from '../components/crossFade';
import { stores } from '@sapper/app';
import { onMount } from 'svelte';
import Clock from '../components/Clock'
import P5Tree from '../components/P5Tree';
import P5Trial from '../components/P5Trial';

const { session } = stores();
export let user;
let myp5;
let p5;
// export let  userName;
// export let token_id;

$: {user = $session.user;
	console.log("user : " + user);
}
	onMount(async () => {
		({ user } = $session.user);

// 		// p5 start
// const module = await import('p5');
// p5=module.default;
// let canvas;
// var sketch = function (p) {
//     // Initial setup
//     p.setup = function () {
//         // Create the canvas
//         var canvas = p.createCanvas(p.windowWidth, p.windowHeight);
// 			canvas.position(0,0);
// 			canvas.style('z-index', '-1');

//         // Paint a new tree each time the mouse is pressed inside the canvas
//         canvas.mousePressed(paintNewTree);

//         // We will just paint the tree once
//         p.noLoop();
//         p.noStroke();

//         // Paint the tree
//         paintNewTree();
//     };

//     /*
//      * This function creates a tree iteratively and paints it in the canvas
//      */
//     function paintNewTree() {
//         var position = p.createVector(0.5 * p.width, 0.95 * p.height, 0);
//         var length = p.height / 7;
//         var diameter = length / 4.5;
//         var angle = -p.HALF_PI + (p.PI / 180) * p.random(-5, 5);
//         var color = p.color(130, 80, 20);
//         var level = 1;
//         var tree = new Branch(position, length, diameter, angle, color, level);

//         // Paint the tree
//         p.background(245);
//         tree.paint();
//     }

//     /*
//      * The Branch class
//      */
//     function Branch(position, length, diameter, angle, color, level) {
//         this.position = position;
//         this.length = length;
//         this.diameter = diameter;
//         this.angle = angle;
//         this.color = color;
//         this.level = level;
//         this.middleBranch = this.createSubBranch(true);
//         this.extremeBranch = this.createSubBranch(false);
//     }

//     /*
//      * This method paints the branch and its sub-branches in the canvas
//      */
//     Branch.prototype.paint = function () {
//         // Paint the middle branch
//         if (this.middleBranch) {
//             this.middleBranch.paint();
//         }

//         // Paint the extreme branch
//         if (this.extremeBranch) {
//             this.extremeBranch.paint();
//         }

//         // Calculate the diameter at the branch top
//         var topDiameter = 0.65 * this.diameter;

//         if (this.extremeBranch) {
//             topDiameter = this.extremeBranch.diameter;
//         }

//         // Paint the branch
//         p.push();
//         p.fill(this.color);
//         p.translate(this.position.x, this.position.y);
//         p.rotate(this.angle);
//         p.beginShape();
//         p.vertex(0, -this.diameter / 2);
//         p.vertex(1.04 * this.length, -topDiameter / 2);
//         p.vertex(1.04 * this.length, topDiameter / 2);
//         p.vertex(0, this.diameter / 2, 0);
//         p.endShape();
//         p.pop();
//     };

//     /*
//      * This method creates a new sub-branch
//      */
//     Branch.prototype.createSubBranch = function (isMiddleBranch) {
//         // Decide if the branch should be created
//         var createBranch = false;
//         var maxLevel = 18;

//         if (isMiddleBranch) {
//             if (this.level < 4 && p.random() < 0.7) {
//                 createBranch = true;
//             } else if (this.level >= 4 && this.level < 10 && p.random() < 0.8) {
//                 createBranch = true;
//             } else if (this.level >= 10 && this.level < maxLevel && p.random() < 0.85) {
//                 createBranch = true;
//             }
//         } else {
//             if (this.level == 1) {
//                 createBranch = true;
//             } else if (this.level < maxLevel && p.random() < 0.85) {
//                 createBranch = true;
//             }
//         }

//         if (createBranch) {
//             // Calculate the starting position of the new branch
//             var newPosition = p.createVector(p.cos(this.angle), p.sin(this.angle), 0);
//             newPosition.mult(this.length);

//             if (isMiddleBranch) {
//                 newPosition.mult(p.random(0.5, 0.9));
//             }

//             newPosition.add(this.position);

//             // Calculate the length of the new branch
//             var newLength = p.random(0.8, 0.9) * this.length;

//             // Calculate the diameter of the new branch
//             var newDiameter = this.diameter;

//             if (this.level < 5) {
//                 newDiameter *= p.random(0.8, 0.9);
//             } else {
//                 newDiameter *= p.random(0.65, 0.75);
//             }

//             // Calculate the inclination angle of the new branch
//             var newAngle = this.angle;

//             if (isMiddleBranch) {
//                 var sign = (p.random() < 0.5) ? -1 : 1;
//                 var deltaAngle = (p.PI / 180) * p.random(20, 40);
//                 newAngle += sign * deltaAngle;

//                 if (this.level < 8) {
//                     // Don't let the branches fall too much
//                     if (newAngle < -p.PI) {
//                         newAngle += 2 * deltaAngle;
//                     } else if (newAngle > 0) {
//                         newAngle -= 2 * deltaAngle;
//                     }
//                 }
//             } else {
//                 newAngle += (p.PI / 180) * p.random(-15, 15);

//                 if (this.level < 8) {
//                     // Don't let the branches fall too much
//                     if (newAngle < -p.PI) {
//                         newAngle += (p.PI / 180) * p.random(10, 30);
//                     } else if (newAngle > 0) {
//                         newAngle -= (p.PI / 180) * p.random(10, 30);
//                     }
//                 }
//             }

//             // Calculate the color of the new branch
//             var newColor;

//             if (newDiameter > 1) {
//                 var deltaColor = p.round(0, 20);
//                 newColor = p.color(p.red(this.color) + deltaColor, p.green(this.color) + deltaColor, p.blue(this.color));
//             } else {
//                 newColor = p.color(0.75 * p.red(this.color), p.green(this.color), 0.85 * p.blue(this.color));
//             }

//             // Calculate the new branch level
//             var newLevel = this.level + 1;

//             if (this.level < 6 && p.random() < 0.3) {
//                 newLevel++;
//             }

//             // Return the new branch
//             return new Branch(newPosition, newLength, newDiameter, newAngle, newColor, newLevel);
//         } else {
//             // Return undefined
//             return;
//         }
//     };
// };

// myp5 = new p5(sketch, document.getElementById('p5sketch'));

	});
        // $token= "123456";
</script> 

 

<svelte:head>
	<title>Sapper project template</title>
</svelte:head>
<div class="p5sketch"></div>
<div class="flex border border-gray-300">	
	<div class="w-3/4 mx-auto pt-4 order-1">
<h1>Great success!</h1>

<Clock />
<P5Trial />
<!-- <p>Token is : {$token}</p> -->
<!-- <p>Authenticated is {$authenticated}</p> -->

{#if user}
    <!-- <p>Logged in is {user}! </p> -->
	<p>You are logged in !  </p>
    <Logout target = 'auth/logout' ></Logout>
 {:else}

    <p>Your log in is {user}. Please log in.</p>
    <a class="inline-block border border-blue-500 rounded py-1 px-3 bg-blue-500 text-white" href="/login"> Log In</a> 
    
      
{/if}

<p><strong>Try editing this file (src/routes/index.svelte) to test live reloading.</strong></p>
<p>Fine playig along, Gurmeet !!!</p> 
<!-- <p>Token is {$token} and authorization is {$authenticated}</p> -->

	</div>	
</div>



