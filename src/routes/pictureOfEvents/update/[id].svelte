<script context="module">
import {get} from '../../api/utils.js';
	// import Getter from '../_CRUD/_Getter.svelte';
	// import Delete from '../_CRUD/_Delete.svelte';
    import { goto } from '@sapper/app';
    import { put } from '../../api/utils';
	
	export async function preload(page, session, params) {
	
		console.log("from [id].svelte: page.params.id " + page.params.id);
		const _id = page.params.id;
		// const _idd = _id.slice(1,_id.length);
		console.log("from [id].svelte: _id " + _id);
		const pictureOfEvent = await get('mutate/get', `picture-of-events/` + _id);
		const events = await get('mutate/get', `eventOfPlateMills`);
		// const pictureOfEvent = res.json();
return {
			id: _id,
            pictureOfEvent,
            events
		};
    }
</script>
<script>
    import { notice } from '../../../store/stores';

import { stores } from '@sapper/app';
// import Notifications from '@beyonk/svelte-notifications';
import { fade } from 'svelte/transition';




  const { page, preloading, session } = stores();
    let notifications;
	let message; 
	export let pictureOfEvent= {
        id: "",
        picDate: "",
        imgType: "",
        imgFile: "",
        imgFileContentType: "",
        imgPM: ""
    };
    export let events;
    
    export let id;
    let selected;
   
     async function update() {
       const response = await put('mutate/update', {...pictureOfEvent}, 'picture-of-events');
        notify();
  
     
     function notify () {
	  if (!response.status) {
	console.log('Login Ok.' );
        notice.set({message: 'Picture updated !! ', status: "success"});
        // notice.status = "success";
        const displayTimeMs = 10000;
        
        // notifications.success(message, displayTimeMs)
         goto('pictureOfEvents'); 
     } else{
            notice.message = 'update failed !! ';
        notice.status = "danger";
            message = 'Looks like there was a problem. Status:  ' +
          response.statusText;
    const displayTimeMs = 7000;
    notice.set({message: message, status: "danger"});
    // notifications.danger(message, displayTimeMs)
  }
  }
    } 
 async function cancel(){
     message = "update cancelled";
     notice.set({message: message, status: "info"});
     goto('pictureOfEvents');
 }   
   async function displayImage(e) {
    // user selected file
    let file = e.target.files[0];
    if (e.target.files[0]) {
      const FR = new FileReader();
      FR.readAsDataURL(file);
      FR.onload = function(e) {
        document.getElementById("preview-image").src = e.target.result;
        document.getElementById("preview-image").style = "display:inline-block"
        let file_untrimmed = e.target.result;
        console.log("e.target.result : " + file_untrimmed);
       
        pictureOfEvent.imgFile =file_untrimmed.slice(23);
         let s = file.type;
      pictureOfEvent.imgType = file.type;
      console.log("file type : " + file.type);
      var afterDot = s.substr(s.indexOf("/") + 1);
      pictureOfEvent.imgFileContentType = generator.random_int() + "." + afterDot;

      };
    }
    // src = URL.createObjectURL(file);
    //  const img = document.getElementById("imgencoder");
    //      img.onload = function() {
    //     window.URL.revokeObjectURL(this.src);
    //      }
    // // let file = this.files[0];
    // console.log("src : " + src);
    // allowed MIME types
    var mime_types = ["image/jpeg", "image/png"];

    // validate MIME
    if (mime_types.indexOf(file.type) == -1) {
      alert("Error : Incorrect file type");
      return;
    } else {
      let s = file.type;
      pictureOfEvent.imgType = file.type;
      console.log("file type : " + file.type);
      // var afterDot = s.substr(s.indexOf("/") + 1);
      // pictureOfEvent.imgFileContentType = "pictures/" +
      //   generator.random_int() + "." + afterDot;
      // url_json = url;
      // // console.log("ürl : " + JSON.stringify({url}));
      // console.log("ürl stripped : " + url_json.slice(31));
      // url_stripped = url_json.slice(31);

      // pictureOfEvent.imgFile = url_stripped.slice(0, -2);
    }

    // validate file size
    if (file.size > 12 * 1024 * 1024) {
      alert("Error : Exceeded size 12MB");
      return;
    }

    // validation is successful

    // hide upload dialog button
    // document.querySelector("#upload-dialog").style.display = 'none';

    // object url
    // _PREVIEW_URL = URL.createObjectURL(file);

    // set src of image and show
    // document.querySelector("#preview-image").setAttribute('src', _PREVIEW_URL);
    // document.querySelector("#preview-image").style.display = 'inline-block';
  }
    
</script>

<div transition:fade>
    <div  class="p-3 font-medium border-green-300">
       <h1 class="text-center font-serif text-lg text-grey-800 shadow-md pb-4" >Edit Picture</h1>
        <!-- <Notifications bind:this={notifications} /> -->
       <form on:submit|preventDefault="{update}">
        <div>
             <label class="block" for="id">
             <span class="text-gray-700">ID</span></label>
            <input readonly  class="bg-white focus:outline-none focus:shadow-outline border border-gray-300 rounded-lg mt-1 block w-full" type="text" name="id" id="id" bind:value={pictureOfEvent.id}>
        </div>
        <div>
            <label for="picDate">
            <span class="text-gray-700">Picture Date</span></label>
            <input class="bg-white focus:outline-none focus:shadow-outline border border-gray-300 rounded-lg mt-1 block w-full" type="date" name="picDate" id="picDate" bind:value={pictureOfEvent.picDate}>
        </div>
        <div>
            <label for="imgType">
            <span class="text-gray-700">Image Type</span></label>
            <input class="bg-white focus:outline-none focus:shadow-outline border border-gray-300 rounded-lg mt-1 block w-full" type="text" name="imgType" id="imgType" bind:value={pictureOfEvent.imgType}>
        </div>
        <div>
            <label for="imgFile">
            <span class="text-gray-700">Image</span></label>
            <input
              class="bg-white focus:outline-none focus:shadow-outline border
              border-gray-300 rounded-lg mt-1 block w-full"
              type="file"
              name="imgFile"
              id="imgFile"
              accept="image/jpg,image/png"
              on:change={displayImage}
              />
               <img id="preview-image" style="display:none" alt="Image to upload" />
        </div>
       <div class="p-3 font-medium border-orange-200">
          <label for="imgFileContentType">
            <span class="text-gray-700">Image Content Type</span>
          </label>
          <input
            class="bg-white focus:outline-none focus:shadow-outline border
            border-gray-300 rounded-lg mt-1 block w-full"
            type="text"
            name="imgFileContentType"
            id="imgType"
            bind:value={pictureOfEvent.imgFileContentType} />
        </div>
       <div class="p-3 font-medium border-orange-200">
          <label for="eventPM">
            <span class="text-gray-700">Event</span>
          </label>
          <select
            class="bg-white focus:outline-none focus:shadow-outline border
            border-gray-300 rounded-lg mt-1 block w-full"
            name="eventPM"
            id="eventPM"
            bind:value={pictureOfEvent.eventPM}>
            <option>Select Event</option>
            {#each events as event}
              <option value={event}>{event.id}{event.eventName}</option>
            {/each}
          </select>
        </div>
        <div class="flex left-auto">
        <div class="pr12">
            <button class="inline-block border border-green-500 rounded py-1 px-3 bg-red-700 text-white" type="submit" >save</button>
        </div>
        <div class="pl-12">    
            <button class="inline-block border border-blue-500 rounded py-1 px-3 bg-green-500 text-white" type="submit" on:click={cancel}>Cancel</button>
        </div>
        </div>
       </form>
    </div>
  </div>



