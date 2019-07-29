<script context="module">
import * as api from '../../api/api.js';
	// export async function preload({ params, query }) {
	// 	// the `slug` parameter is available because
	// 	// this file is called [slug].html
	// 	const res = await this.fetch(`blog/${params.slug}.json`);
	// 	const data = await res.json();

	export async function preload(page, session, params) {
		// const {slug} = page.params;
		console.log("from [id].svelte:  " );
		console.log("from [id].svelte: page.params.id " + page.params.id);
		const _id = page.params.id;
		const _idd = _id.slice(1,_id.length);
		console.log("from [id].svelte: _idd " + _idd);
		const production = await api.get(`productions/` + _idd, true);
		
		// const production = res.json();
return {
			id: _idd,
			production
		};
		

	}

		// if (res.status === 200) {
		// 	return { post: data };
		// } else {
		// 	this.error(res.status, data.message);
		// }
	// }
</script>

<script>
	export let production;
	export let id;
</script>

<!-- <style>
	/*
		By default, CSS is locally scoped to the component,
		and any unused styles are dead-code-eliminated.
		In this page, Svelte can't know which elements are
		going to appear inside the {{{post.html}}} block,
		so we have to use the :global(...) modifier to target
		all elements inside .content
	*/
	.content :global(h2) {
		font-size: 1.4em;
		font-weight: 500;
	}

	.content :global(pre) {
		background-color: #f9f9f9;
		box-shadow: inset 1px 1px 5px rgba(0,0,0,0.05);
		padding: 0.5em;
		border-radius: 2px;
		overflow-x: auto;
	}

	.content :global(pre) :global(code) {
		background-color: transparent;
		padding: 0;
	}

	.content :global(ul) {
		line-height: 1.5;
	}

	.content :global(li) {
		margin: 0 0 0.5em 0;
	}
</style> -->

<svelte:head>
	<title>{production.prodDate}</title>
</svelte:head>

<h1>{production.prodDate}</h1>
<h2>{production.prodTonnage}</h2>
<!-- <div class='content'>
	{@html post.html}
</div> -->