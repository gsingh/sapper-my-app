<script>
export let id;
// export let date;
export let base;
let link= "";
$: link = base + {id};
$: console.log("from _CRUD/getter: " + link);
</script>

<a class="inline-block border border-blue-500 rounded py-1 px-3 bg-blue-500 text-white" rel='prefetch' href='{base}/{id}'>Update</a>