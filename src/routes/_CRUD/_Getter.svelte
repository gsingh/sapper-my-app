<script>
export let id;
export let date;
export let base;
let link= "";
$: link = base + {id};
$: console.log("from _CRUD/getter: " + link);
</script>

<a rel='prefetch' href='{base}/{id}'>{date}</a>