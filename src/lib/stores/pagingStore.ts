import type { IPagingData } from '$lib/types/index.js';
import { writable } from 'svelte/store';
 
const PagingStore = writable<IPagingData>({
    currentPage: 1,
    totalPages: 1,
    totalResults: 0,
    itemsPerPage: 10,
    itemsPerPageOptions: [10, 25, 50, 100] 
});
 
export default PagingStore;