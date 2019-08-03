<button class="button" on:click={onClick}>
    {text}
</button>

<style>
    .button {
      border: 1px solid #f0c5c5;
      border-radius: 8px;
      backgroundColor: #8350d6;
      cursor: pointer;
      font-size: 15px;
      padding: 3px 10px;
      margin: 10px;
    }
</style>

<script>
  import { createEventDispatcher } from 'svelte';
  
  export let text = '';

  const dispatch = createEventDispatcher();

  function onClick(event) {
    dispatch('click', event)
  }
</script>
