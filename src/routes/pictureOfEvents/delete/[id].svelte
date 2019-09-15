<script context="module">
export async function preload(page, session, params) {
		console.log("from [id].svelte: page.params.id " + page.params.id);
		const _id = page.params.id;
		console.log("from [id].svelte: _id " + _id);
		
		
return {
			id: _id
			
		};
	}
</script>
<script>

import Delete from '../../_CRUD/_Delete';
import * as api from '../../api/api.js';
import {stores,  goto} from '@sapper/app';
import { del } from '../../api/utils';
// import Notifications from '@beyonk/svelte-notifications';
import { fade } from 'svelte/transition';
 import { notice } from '../../../store/stores';

// export let target;
// export let base;
export let id;
let notifications;
	let message; 
let doDelete= false;
let data =  {data: `picture-of-events/` + id};
console.log( 'endpoint :   ' + data);

async function remove(){
	doDelete = true;
		console.log( 'endpoint :   ' + data);

		const response = await del('mutate/del', data);
		 notify();
  
     
     function notify () {
	  if (response.status >= 200 && response.status <= 300) {
	console.log( 'Record deleted !! ' );
		message = 'Record deleted !! ';
    const displayTimeMs = 8000;
            notice.set({message: message, status: "success"});

        // notifications.success(message, displayTimeMs);
         goto('pictureOfEvents'); 
  } else{
    		message = 'Looks like there was a problem. Status:  ' +
          response.statusText;
    const displayTimeMs = 7000;
            notice.set({message: message, status: "danger"});

    // notifications.danger(message, displayTimeMs)
  }
  }

		goto('pictureOfEvents');
	}
	function cancel(){
		message = 'Deleted cancelled !! ';
    const displayTimeMs = 8000;
            notice.set({message: message, status: "info"});

        // notifications.info(message, displayTimeMs);
		goto('pictureOfEvents');
	}

</script>

 <!-- <Notifications bind:this={notifications} /> -->
 <!--Modal-->
<!-- <div class="modal opacity-0 pointer-events-none fixed w-full h-full top-0 left-0 flex items-center justify-center">
    <div class="modal-overlay absolute w-full h-full bg-red-900 opacity-50"></div>
    
    <div class="modal-container bg-white w-11/12 md:max-w-md mx-auto rounded shadow-lg z-50 overflow-y-auto">
      
      <div class="modal-close absolute top-0 right-0 cursor-pointer flex flex-col items-center mt-4 mr-4 text-white text-sm z-50">
        <svg class="fill-current text-white" xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 18 18">
          <path d="M14.53 4.53l-1.06-1.06L9 7.94 4.53 3.47 3.47 4.53 7.94 9l-4.47 4.47 1.06 1.06L9 10.06l4.47 4.47 1.06-1.06L10.06 9z"></path>
        </svg>
        <span class="text-sm">(Esc)</span>
      </div>

      <!-- Add margin if you want to see some of the overlay behind the modal-->
      <!-- <div class="modal-content py-4 text-left px-6">
        <!--Title-->
        <!-- <div class="flex justify-between items-center pb-3">
          <p class="text-2xl font-bold">Simple Modal!</p>
          <div class="modal-close cursor-pointer z-50">
            <svg class="fill-current text-black" xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 18 18">
              <path d="M14.53 4.53l-1.06-1.06L9 7.94 4.53 3.47 3.47 4.53 7.94 9l-4.47 4.47 1.06 1.06L9 10.06l4.47 4.47 1.06-1.06L10.06 9z"></path>
            </svg>
          </div>
        </div> -->
 <!-- <div class="z-40 ml-0 mt-0 bg-red-400">
<div class="z-30 ml-2 mt-2 bg-red-500 opacity-1">
<div class="z-20 ml-4 mt-4 bg-red-600">
<div class="z-10 ml-6 mt-6 bg-red-700">
<div class="z-0 ml-8 mt-8 bg-red-800">        -->

<div in:fade out:fade class="relative p-8 bg-white w-full max-w-md m-auto flex-col flex self-center border-red-800 border-solid border-4 shadow rounded">
<p>Do you really want to delete ?</p>
 <!--Footer-->
<div class="flex justify-end pt-2">
<div class="pr-3">
<button class="inline-block border border-blue-500 rounded py-1 px-3 bg-red-600 text-white pr-30" on:click="{remove}"> yes</button>
</div>
<div class="pl-3">
<button class="inline-block border border-blue-500 rounded py-1 px-3 bg-green-600 text-white pl-30" on:click="{cancel}"> cancel</button>
 </div>
 </div>
</div>     
<!-- </div>
</div>
</div>
</div>
</div>   -->
      <!-- </div>
    </div>
  </div> -->

<!-- {#if doDelete}
<Delete target= {target} base={base} id={id} >
				<!-- <p>{count+1}</p> -->
			<!-- </Delete> --> 
<!-- {:else} -->
<!-- goto('pictureOfEvents'); -->

<!-- {/if} -->
