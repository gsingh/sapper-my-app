import * as sapper from '@sapper/app';
import { Store } from 'svelte/store.js';
import useLocalStorage from './useLocalStorage.js';

const store = new Store({
	token_id: 'Gurmeet'
});

window.store = store;

// save data to localStorage every time our state changes
useLocalStorage(store, 'my-app');

sapper.start({
	target: document.querySelector('#sapper'),
	store
});