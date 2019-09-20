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
const { session } = stores();
export let user;
// export let  userName;
// export let token_id;

$: {user = $session.user;
	console.log("user : " + user);
}
	onMount(async () => {
		({ user } = $session.user);
	});
        // $token= "123456";
</script> 

 <style>
	h1, figure, p {
		text-align: center;
		margin: 0 auto;
	}

	h1 {
		font-size: 2.8em;
		text-transform: uppercase;
		font-weight: 700;
		margin: 0 0 0.5em 0;
	}

	figure {
		margin: 0 0 1em 0;
	}

	img {
		width: 100%;
		max-width: 400px;
		margin: 0 0 1em 0;
	}

	p {
		margin: 1em auto;
	}

	@media (min-width: 480px) {
		h1 {
			font-size: 4em;
		}
	}
</style>

<svelte:head>
	<title>Sapper project template</title>
</svelte:head>

<h1>Great success!</h1>

<Clock />
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





