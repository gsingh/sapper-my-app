import { writable, derived } from 'svelte/store';

export const token_id = writable("");
export const notice = writable({message: "", status: ""});

export const authenticated = derived(
    token_id,
    $token_id => {
        if ($token_id != "") 
            return true;
        else 
            return false;
    })