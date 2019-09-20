<script>
	import Nav from '../components/Nav.svelte';
	import { fade } from "svelte/transition"
    import { stores } from "@sapper/app"
    import PageLoadingBar from "sapper-page-loading-bar/PageLoadingBar.svelte"

    const { preloading } = stores()
	

	export let segment;

</script>

<style>
	main {
		position: relative;
		max-width: 56em;
		background-color: white;
		padding: 2em;
		margin: 0 auto;
		box-sizing: border-box;
	}
</style>
<PageLoadingBar {preloading}/>
<Nav {segment}/>

{#if !$preloading}
<main>
	<slot></slot>
</main>
{/if}