<script lang="ts">
    import type { GridFooterProps } from "$lib/index.js";

    let { paging = $bindable(), children }: GridFooterProps = $props();

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

<div>
    <select bind:value={paging.itemsPerPage} onchange={handleItemsPerPageChange}>
        {#each paging.itemsPerPageOptions as option (option)}                
            <option value="{option}" selected={option == paging.itemsPerPage}>{option}</option>
        {/each}
    </select>
    <span>of {paging.totalResults} Results</span>

    <span>Page {paging.currentPage} of {paging.totalPages}</span>

    {@render children?.()}
</div>