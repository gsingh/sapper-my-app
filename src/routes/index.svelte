<script context="module">
export function preload(page, { user }) {
        return { user };
    };
</script>
<script>
import { stores } from '@sapper/app';
// import {logout} from './api/utils';
import Logout from './_CRUD/Logout.svelte';
const { session } = stores();
export let user;
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

<figure>
	<img alt='Borat' src='great-success.png'>
	<figcaption>HIGH FIVE!</figcaption>
</figure>
<!-- <p>Token is : {$token}</p> -->
<!-- <p>Authenticated is {$authenticated}</p> -->

{#if $session.user}
    <p>You are logged in !</p>
    <Logout target = 'auth/logout' ></Logout>
 {:else}

    <p>Please log in.
    <a href="/login"> Log In</a> 
    </p> 
      
{/if}

<p><strong>Try editing this file (src/routes/index.svelte) to test live reloading.</strong></p>
<p>Fine playig along, Gurmeet !!!</p> 
<!-- <p>Token is {$token} and authorization is {$authenticated}</p> -->





