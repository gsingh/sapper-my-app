import * as sapper from '@sapper/app';
// import { Store } from '@sapper/app';
// import useLocalStorage from './useLocalStorage.js';

// export const store = new Store({
// 	token_id: 'Gurmeet'
// });

// window.store = store;

// // save data to localStorage every time our state changes
// useLocalStorage(store, 'my-app');

// // export store;

sapper.start({
	target: document.querySelector('#sapper')
	// store
});