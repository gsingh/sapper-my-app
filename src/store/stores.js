import { writable, derived } from 'svelte/store';

export const token = writable("");

export const authenticated = derived(
    token,
    $token => {
        if ($token != "") 
            return true;
        else 
            return false;
    })