<script context = "module">
// import Select from 'svelte-select';
// import {token, authenticated} from '../../store/stores.js';
import * as api from '../api/api.js';
import { get } from '../api/utils.js';
import {onMount} from 'svelte';

// import { stores } from '@sapper/app'; 

// const { session } = stores();

	export async function preload(page, session) {
	const pictureOfEvents = await get('mutate/get', `picture-of-events`);
			return { pictureOfEvents };
	}
</script>
<script>
import Carousel from '@beyonk/svelte-carousel';
import { ChevronLeftIcon, ChevronRightIcon } from 'svelte-feather-icons';
    export let pictureOfEvents;
$: pictureOfEvents = get('mutate/get', `picture-of-events`);

</script>
<!-- <style>
  .control :global(svg) {
		width: 150%;
		height: 150%;
		color: #fff;
		border: 2px solid #fff;
		border-radius: 32px;
	}
  </style> -->

<div class="container mx-auto content-center bg-grey-400 mx-auto">
<!-- {#await pictureOfEvents} -->
<!-- <h1> ... loading...</h1> -->
<!-- {:then} -->
<Carousel>
  <span class="control" slot="left-control">
    <ChevronLeftIcon />
  </span>
  {#each pictureOfEvents as picture}
  <div class="slide-content"><img class="rounded-full w-full object-center object-contain overflow-hidden w-full" src="data:image/jpeg;base64,{picture.imgFile}" alt='picture of event'/></div>
  {/each}
   <!-- <div class="slide-content">slide 2</div>
 
  <div class="slide-content">Slide n</div> -->
  <span class="control" slot="right-control">
    <ChevronRightIcon />
  </span>
</Carousel>
<!-- {/await} -->
</div>
