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
import Notifications from '@beyonk/svelte-notifications';
// export let target;
// export let base;
export let id;
let notifications;
	let message; 
let doDelete= false;
let data =  {data: `productions/` + id};
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
        notifications.success(message, displayTimeMs);
        //  goto('productions'); 
  } else{
    		message = 'Looks like there was a problem. Status:  ' +
          response.statusText;
    const displayTimeMs = 7000
    notifications.danger(message, displayTimeMs)
  }
  }

		goto('productions');
	}
	function cancel(){
		message = 'Deleted cancelled !! ';
		const displayTimeMs = 8000;
        notifications.info(message, displayTimeMs);
		goto('productions');
	}

</script>
 <style>
    .modal {
      transition: opacity 0.25s ease;
    }
    body.modal-active {
      overflow-x: hidden;
      overflow-y: visible !important;
    }
  </style>
 <Notifications bind:this={notifications} />
 <!--Modal-->
<div class="modal opacity-0 pointer-events-none fixed w-full h-full top-0 left-0 flex items-center justify-center">
    <div class="modal-overlay absolute w-full h-full bg-gray-900 opacity-50"></div>
    
    <div class="modal-container bg-white w-11/12 md:max-w-md mx-auto rounded shadow-lg z-50 overflow-y-auto">
      
      <div class="modal-close absolute top-0 right-0 cursor-pointer flex flex-col items-center mt-4 mr-4 text-white text-sm z-50">
        <svg class="fill-current text-white" xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 18 18">
          <path d="M14.53 4.53l-1.06-1.06L9 7.94 4.53 3.47 3.47 4.53 7.94 9l-4.47 4.47 1.06 1.06L9 10.06l4.47 4.47 1.06-1.06L10.06 9z"></path>
        </svg>
        <span class="text-sm">(Esc)</span>
      </div>

      <!-- Add margin if you want to see some of the overlay behind the modal-->
      <div class="modal-content py-4 text-left px-6">
        <!--Title-->
        <div class="flex justify-between items-center pb-3">
          <p class="text-2xl font-bold">Simple Modal!</p>
          <div class="modal-close cursor-pointer z-50">
            <svg class="fill-current text-black" xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 18 18">
              <path d="M14.53 4.53l-1.06-1.06L9 7.94 4.53 3.47 3.47 4.53 7.94 9l-4.47 4.47 1.06 1.06L9 10.06l4.47 4.47 1.06-1.06L10.06 9z"></path>
            </svg>
          </div>
        </div>

<p>Do you really want to delete ?</p>
 <!--Footer-->
<div class="flex justify-end pt-2">
<button on:click="{remove}"> yes</button>
<button on:click="{cancel}"> cancel</button>
 </div>
        
      </div>
    </div>
  </div>

<!-- {#if doDelete}
<Delete target= {target} base={base} id={id} >
				<!-- <p>{count+1}</p> -->
			<!-- </Delete> --> 
<!-- {:else} -->
<!-- goto('productions'); -->

<!-- {/if} -->
