<script>
import Delete from '../../_CRUD/_Delete';
export let target;
export let base;
export let id;
let doDelete= false;

function del (){
	doDelete = true;
}
</script>
<p>Do you really want to delete ?</p>
<button on:click="{del()}"> yes</button>
{#if doDelete}
<Delete target= {target} base={base} id={id} >
				<!-- <p>{count+1}</p> -->
			</Delete>
{:else}
goto("productions");

{/if}
