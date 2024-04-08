import PlainTableCssTheme from '$lib/themes/plain-table-css/index.js';
import type { GridTheme } from '$lib/types/index.js';
import { writable } from 'svelte/store';
 
const ThemeStore = writable<GridTheme>(PlainTableCssTheme);
 
export default ThemeStore;