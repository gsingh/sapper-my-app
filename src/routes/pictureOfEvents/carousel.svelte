<script context = "module">
// import Select from 'svelte-select';
// import {token, authenticated} from '../../store/stores.js';
import * as api from '../api/api.js';
import { get } from '../api/utils.js';
import {onMount} from 'svelte';

// import { stores } from '@sapper/app'; 

// const { session } = stores();

	export async function preload(page, session) {
	const pictureOfEvents = await api.get(`picture-of-events`);
			return { pictureOfEvents };
	}
</script>
<script>
import Carousel from '@beyonk/svelte-carousel';
import { ChevronLeftIcon, ChevronRightIcon } from 'svelte-feather-icons';
    export let pictureOfEvents;


</script>

<Carousel>
  <span class="control" slot="left-control">
    <ChevronLeftIcon />
  </span>
  {#each pictureOfEvents as picture}
  <div class="slide-content"><img src="data:image/png;base64,{picture.imgFile}" alt='picture of event'/></div>
  {/each}
   <!-- <div class="slide-content">slide 2</div>
 
  <div class="slide-content">Slide n</div> -->
  <span class="control" slot="right-control">
    <ChevronRightIcon />
  </span>
</Carousel>
