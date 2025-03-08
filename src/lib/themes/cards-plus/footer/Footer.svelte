<script lang="ts">
    import type { PagingData } from "$lib/types/index.js";

    interface Props {
        paging: PagingData;
        children?: import('svelte').Snippet;
    }

    let { paging = $bindable(), children }: Props = $props();

    function handleItemsPerPageChange() {
        const totalPages = Math.max(1, Math.ceil(paging.totalResults / Math.max(1, paging.itemsPerPage)));
        const currentPage = Math.max(1, Math.min(paging.currentPage, totalPages));

        paging = {
            ...paging, 
            currentPage: currentPage,
            totalPages: totalPages, 
            itemsPerPage: paging.itemsPerPage
        };
    }
</script>


<div class="px-6 py-4 grid gap-3 md:flex md:justify-between md:items-center">
    <div class="inline-flex items-center gap-x-2">
        <div class="max-w-sm space-y-3">
            <select bind:value={paging.itemsPerPage} onchange={handleItemsPerPageChange} class="py-2 px-3 pr-9 block w-full border-gray-200 rounded-md text-sm focus:border-blue-500 focus:ring-blue-500 dark:bg-slate-900 dark:border-gray-700 dark:text-gray-400" >
                {#each paging.itemsPerPageOptions as option (option)}                
                    <option value="{option}" selected={option == paging.itemsPerPage}>{option}</option>
                {/each}
            </select>
        </div>
        <p class="text-sm text-gray-600 dark:text-gray-400">
          of <span class="font-semibold text-gray-800 dark:text-gray-200">{paging.totalResults}</span> Results
        </p>
    </div>

    <p class="text-sm text-gray-600 dark:text-gray-400">
        Page <span class="font-semibold text-gray-800 dark:text-gray-200">{paging.currentPage}</span> of <span class="font-semibold text-gray-800 dark:text-gray-200">{paging.totalPages}</span>
    </p>

    {@render children?.()}
</div>