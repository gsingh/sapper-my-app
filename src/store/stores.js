import {Store } from 'svelte/store';
import useLocalStorage from './useLocalStorage.js';

export const store = writable(localStorage.getItem("store") || "");

store.subscribe(val => localStorage.setItem("store", val));

const store = new Store({
	token_id: ''
});

window.store = store;

// save data to localStorage every time our state changes
useLocalStorage(store, 'my-app');

export const authenticated = derived(
    token_id,
    $token_id => {
        if ($token_id != "") 
            return true;
        else 
            return false;
    })