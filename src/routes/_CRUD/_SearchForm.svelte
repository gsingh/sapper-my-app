<script>
export let handleSubmit=function(event) {
    // do stuff
     const { value } = this.elements.search;
    searchTerm = value;
  }
   $: regex = new RegExp(searchTerm, "gi");
  $: data = searchTerm
    ? jsonResponse.filter(element => element.title.match(regex))
    : jsonResponse;

</script>
<div class="w-4/5 mx-auto pt-4">
<form on:submit|preventDefault={handleSubmit}>
  <label for="search">Search:</label>
  <input class="bg-white focus:outline-none focus:shadow-outline border border-gray-400 rounded-lg mt-1 block w-full" type="search" id="search" required />
  <button class="inline-block border border-blue-500 rounded py-1 px-3 bg-blue-400 text-white" type="submit">Search</button>
</form>
</div>

<slot {data} />