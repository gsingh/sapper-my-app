<script>
	export let segment;
</script>

<style>
	nav {
		border-bottom: 1px solid rgba(255,62,0,0.1);
		font-weight: 300;
		padding: 0 1em;
	}

	ul {
		margin: 0;
		padding: 0;
	}

	/* clearfix */
	ul::after {
		content: '';
		display: block;
		clear: both;
	}

	li {
		display: block;
		float: left;
	}

	.selected {
		position: relative;
		display: inline-block;
	}

	.selected::after {
		position: absolute;
		content: '';
		width: calc(100% - 1em);
		height: 2px;
		background-color: rgb(255,62,0);
		display: block;
		bottom: -1px;
	}

	a {
		text-decoration: none;
		padding: 1em 0.5em;
		display: block;
	}
</style>

<nav>
	<ul class="flex border-b">
		<li class="-mb-px mr-1"><a class='{segment === undefined ? "selected" : ""} bg-white inline-block border-l border-t border-r rounded-t py-2 px-4 text-blue-700 font-semibold' href='.'>home</a></li>
		<li><a class='{segment === "about" ? "selected" : ""} bg-white inline-block border-l border-t border-r rounded-t py-2 px-4 text-blue-700 font-semibold' href='about'>about</a></li>
		<li><a rel=prefetch class='{segment === "productions" ? "selected" : ""} bg-white inline-block border-l border-t border-r rounded-t py-2 px-4 text-blue-700 font-semibold' href='productions'>production</a></li>
		<li><a rel=prefetch class='{segment === "managers" ? "selected" : ""} bg-white inline-block border-l border-t border-r rounded-t py-2 px-4 text-blue-700 font-semibold' href='managers'>shift-manager</a></li>

		<!-- for the blog link, we're using rel=prefetch so that Sapper prefetches
		     the blog data when we hover over the link or tap it on a touchscreen -->
		<li><a rel=prefetch class='{segment === "blog" ? "selected" : ""} bg-white inline-block border-l border-t border-r rounded-t py-2 px-4 text-blue-700 font-semibold' href='blog'>blog</a></li>
	</ul>
</nav>