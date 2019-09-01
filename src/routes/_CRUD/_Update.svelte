<script>
export let id;
// export let date;
export let base;
let link= "";
$: link = base + {id};
$: console.log("from _CRUD/getter: " + link);
</script>

<a class="text-grey-lighter font-bold py-1 px-3 rounded text-xs bg-green hover:bg-green-dark" rel='prefetch' href='{base}/{id}'>Update</a>