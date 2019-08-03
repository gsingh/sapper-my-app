import { writable, derived } from '@sapper/app';

export const token_id = writable("");

export const authenticated = derived(
    token_id,
    $token_id => {
        if ($token_id != "") 
            return true;
        else 
            return false;
    })