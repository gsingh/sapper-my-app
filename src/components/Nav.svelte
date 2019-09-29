<script>
	import { notice } from '../store/stores';
	import Notifications from '@beyonk/svelte-notifications';
	export let segment;
	let notifications;
	let notice_value;

	const unsubscribe = notice.subscribe(value => {
		notice_value = value;
	});
	 $: {var notification = notice_value.message;
	 		console.log('store.notice : ' + notification);
		 	 var status=notice_value.status;
	 		console.log('store.status : ' + status);

const displayTimeMs=6000;
			 switch (status){
				 case 'success':
					notifications.success(notification, displayTimeMs);	
					notice.set({message: '', status: ""});
					break;
				case 'danger':
					notifications.danger(notification, displayTimeMs);	
					notice.set({message: '', status: ""});
					break;
				case 'info':
					notifications.info(notification, displayTimeMs);	
					notice.set({message: '', status: ""});
					break;	

				default:
    				console.log('Sorry, we are out of ' + status + '.' );
			 }
			 
		 }
	 

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
	<p>{$notice.message}{$notice.status}</p>
	 <Notifications bind:this={notifications} />
	<ul class="flex border-b">
		<li class="-mb-px mr-1"><a class='{segment === undefined ? "selected" : ""} bg-white inline-block border-l border-t border-r rounded-t py-2 px-4 text-blue-700 font-semibold' href='.'>home</a></li>
		<li><a class='{segment === "about" ? "selected" : ""} bg-white inline-block border-l border-t border-r rounded-t py-2 px-4 text-blue-700 font-semibold' href='about'>about</a></li>
		<li><a rel=prefetch class='{segment === "productions" ? "selected" : ""} bg-white inline-block border-l border-t border-r rounded-t py-2 px-4 text-blue-700 font-semibold' href='productions'>production</a></li>
		<li><a rel=prefetch class='{segment === "managers" ? "selected" : ""} bg-white inline-block border-l border-t border-r rounded-t py-2 px-4 text-blue-700 font-semibold' href='managers'>shift-manager</a></li>
		<li><a rel=prefetch class='{segment === "pictureOfEvents" ? "selected" : ""} bg-white inline-block border-l border-t border-r rounded-t py-2 px-4 text-blue-700 font-semibold' href='pictureOfEvents'>Pictures</a></li>
		<li><a rel=prefetch class='{segment === "normalisings" ? "selected" : ""} bg-white inline-block border-l border-t border-r rounded-t py-2 px-4 text-blue-700 font-semibold' href='pictureOfEvents'>Normalising</a></li>
		<li><a rel=prefetch class='{segment === "shippings" ? "selected" : ""} bg-white inline-block border-l border-t border-r rounded-t py-2 px-4 text-blue-700 font-semibold' href='pictureOfEvents'>Shipping</a></li>
		<li><a rel=prefetch class='{segment === "heavy-plate-finisheds" ? "selected" : ""} bg-white inline-block border-l border-t border-r rounded-t py-2 px-4 text-blue-700 font-semibold' href='pictureOfEvents'>Heavy Plate</a></li>
		<!-- for the blog link, we're using rel=prefetch so that Sapper prefetches
		     the blog data when we hover over the link or tap it on a touchscreen -->
		<li><a rel=prefetch class='{segment === "blog" ? "selected" : ""} bg-white inline-block border-l border-t border-r rounded-t py-2 px-4 text-blue-700 font-semibold' href='blog'>blog</a></li>
	</ul>
</nav>