
    import {onMount} from 'svelte'

onMount(async ()=> {
    managers = await api.get('shift-managers', true);
return {managers};
console.log("fron onmount()");
}
);

export let managers;




