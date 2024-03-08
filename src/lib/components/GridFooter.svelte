<script lang="ts">
	import GridPaging from "./GridPaging.svelte";

    export let currentPage = 1;
    export let totalPages = 1;
    export let totalResults = 0;
    export let itemsPerPage = 10;
    export let itemsPerPageOptions = [10, 20, 50, 100];
</script>


<div class="px-6 py-4 grid gap-3 md:flex md:justify-between md:items-center border-t border-gray-200 dark:border-gray-700">
    <div class="inline-flex items-center gap-x-2">
        <div class="max-w-sm space-y-3">
            <select bind:value={itemsPerPage} class="py-2 px-3 pr-9 block w-full border-gray-200 rounded-md text-sm focus:border-blue-500 focus:ring-blue-500 dark:bg-slate-900 dark:border-gray-700 dark:text-gray-400" >
                {#each itemsPerPageOptions as option (option)}                
                    <option value="{option}" selected={option == itemsPerPage}>{option}</option>
                {/each}
            </select>
        </div>
        <p class="text-sm text-gray-600 dark:text-gray-400">
          of <span class="font-semibold text-gray-800 dark:text-gray-200">{totalResults}</span> Results
        </p>
    </div>

    <p class="text-sm text-gray-600 dark:text-gray-400">
        Page <span class="font-semibold text-gray-800 dark:text-gray-200">{currentPage}</span> of <span class="font-semibold text-gray-800 dark:text-gray-200">{totalPages}</span>
    </p>

    <GridPaging bind:currentPage bind:totalPages />
</div>