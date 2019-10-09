<script context="module">
import {get} from '../../api/utils.js';
import { goto } from '@sapper/app';
import { post } from '../../api/utils'
	
	export async function preload(page, session, params) {
	
				const events = await get('mutate/get', `eventOfPlateMills`);
		
return {
		  events
		};
}
</script>
<script>
import { notice } from '../../../store/stores';
import { stores } from '@sapper/app';
// import Notifications from '@beyonk/svelte-notifications';
import { fly, fade } from 'svelte/transition';

  const { page, preloading, session } = stores();
    	let notifications;
	    let message; 
	export let pictureOfEvent= {
        id: "",
        picDate: "",
        imgType: "",
        imgFile: "",
        imgFileContentType: "",
        eventPM: ""
    };
    export let events;
    let _PREVIEW_URL;
    let visible = true;
    
   
     async function create(event) {
     const response =  await post('mutate/create', {...pictureOfEvent},'picture-of-events');
     
    notify();
  
     
     function notify () {
	  if (!response.status) {
	console.log('Login Ok.' );
		message = 'Record created !! ';
		const displayTimeMs = 8000;
        // notifications.success(message, displayTimeMs);
        visible = false;
        notice.set({message: message, status: "success"});
         goto('eventOfPlateMills'); 
  } else{
    		message = 'Looks like there was a problem. Status:  ' +
          response.statusText;
    const displayTimeMs = 7000
            notice.set({message: message, status: "danger"});

    // notifications.danger(message, displayTimeMs)
  }
  }
    
    } 
async function cancel(){
        notice.set({message: 'cancelled !! ', status: "info"});
        goto('pictureOfEvents');
}

async function displayImage(){
  // user selected file
    let file = this.files[0];
    console.log("image : " + JSON.stringify(file));
    // allowed MIME types
    var mime_types = [ 'image/jpeg', 'image/png' ];
    
    // validate MIME
    if(mime_types.indexOf(file.type) == -1) {
        alert('Error : Incorrect file type');
        return;
    }
    else {
        pictureOfEvent.imgType = file.type;
            console.log("file type : " + file.type);

        
    }



    // validate file size
    if(file.size > 12*1024*1024) {
        alert('Error : Exceeded size 2MB');
        return;
    }

    // validation is successful

    // hide upload dialog button
    // document.querySelector("#upload-dialog").style.display = 'none';

    // object url
    _PREVIEW_URL = URL.createObjectURL(file);

    // set src of image and show
    document.querySelector("#preview-image").setAttribute('src', _PREVIEW_URL);
    document.querySelector("#preview-image").style.display = 'inline-block';
}

// function clickInput(){
//     document.querySelector("#picDate").click();
// }
    
</script>

<div>
    <div class='p-2 border-green-300'>
       <h1 class="text-center font-serif text-lg text-grey-800 shadow-md pb-4">Add Picture Data</h1>
       <!-- <Notifications bind:this={notifications} /> -->
      {#if visible }
       <form in:fly="{{ x: 150, duration: 3000 }}" out:fade on:submit|preventDefault="{create}">
        <div class="p-3 font-medium border-orange-200">
             <label class="block" for="id">
             <span class="text-gray-700">ID</span></label>
            <input readonly  class="bg-white focus:outline-none focus:shadow-outline border border-gray-300 rounded-lg mt-1 block w-full" type="text" name="id" id="id" bind:value={pictureOfEvent.id}>
        </div>
        <div class="p-3 font-medium border-orange-200">
            <label for="picDate">
            <span class="text-gray-700">Picture Date</span></label>
            <input class="bg-white focus:outline-none focus:shadow-outline border border-gray-300 rounded-lg mt-1 block w-full" type="date" name="picDate" id="picDate" bind:value={pictureOfEvent.picDate}>
        </div>
        <div class="p-3 font-medium border-orange-200">
            <label for="imgType">
            <span class="text-gray-700">Image Type</span></label>
            <input class="bg-white focus:outline-none focus:shadow-outline border border-gray-300 rounded-lg mt-1 block w-full" type="text" name="imgType" id="imgType" bind:value={pictureOfEvent.imgType}>
        </div>
        <div class="p-3 font-medium border-orange-200">
            <label for="imgFile">
            <span class="text-gray-700">Image File</span></label>
            <!-- <button class="inline-block border border-blue-500 rounded py-1 px-3 bg-blue-500 text-white" id="upload-dialog" on:click = {clickInput} >Choose Image</button> -->
            <input class="bg-white focus:outline-none focus:shadow-outline border border-gray-300 rounded-lg mt-1 block w-full" type="file" name="imgFile" id="imgFile" bind:value={pictureOfEvent.imgFile}  accept="image/jpg,image/png" on:change = {displayImage}>
             <img id="preview-image" style="display:none" alt = "Image to upload" />
        </div>
         <div class="p-3 font-medium border-orange-200">
            <label for="imgFileContentType">
            <span class="text-gray-700">Image Content Type</span></label>
            <input class="bg-white focus:outline-none focus:shadow-outline border border-gray-300 rounded-lg mt-1 block w-full" type="text" name="imgFileContentType" id="imgType" bind:value={pictureOfEvent.imgFileContentType}>
        </div>
        <div class="p-3 font-medium border-orange-200">
            <label for="eventPM">
            <span class="text-gray-700">Event</span></label>
            <select class="bg-white focus:outline-none focus:shadow-outline border border-gray-300 rounded-lg mt-1 block w-full" name="eventPM" id="eventPM" bind:value={pictureOfEvent.eventPM}>
            <option>Select Event</option>    
            {#each events as event}
			<option value={event}>
				{event.id}{event.eventName}
			</option>
		{/each}
        </div>
        <div class="ps">
            <button class="inline-block border border-blue-500 rounded py-1 px-3 bg-blue-500 text-white" type="submit">Create</button>
            <button class="inline-block border border-blue-500 rounded py-1 px-3 bg-blue-500 text-white" type="submit" on:click={cancel}>Cancel</button>
        </div>
       </form>
       {/if}
    </div>
  </div>



