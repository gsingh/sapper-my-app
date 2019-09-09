<script>
import Delete from '../../_CRUD/_Delete';
import * as api from '../../api/api.js';
import {stores,  goto} from '@sapper/app';
import { del } from '../../api/utils';
import Notifications from '@beyonk/svelte-notifications';
export let target;
export let base;
export let id;
let doDelete= false;
let data = {"endpoint" : base + id};
async function remove (){
	doDelete = true;
		const response = await del(target, data);
		 notify();
  
     
     function notify () {
	  if (response.status >= 200 && response.status <= 300) {
	console.log( 'Record deleted !! ' );
		message = 'Record deleted !! ';
		const displayTimeMs = 8000;
        notifications.success(message, displayTimeMs);
		count += 1;
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
<p>Do you really want to delete ?</p>

<button on:click="{remove}"> yes</button>
<button on:click="{cancel}"> cancel</button>

<!-- {#if doDelete}
<Delete target= {target} base={base} id={id} >
				<!-- <p>{count+1}</p> -->
			<!-- </Delete> --> -->
<!-- {:else} -->
goto('productions');

<!-- {/if} -->
