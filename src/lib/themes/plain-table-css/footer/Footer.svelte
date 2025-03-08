<script lang="ts">
    import type { PagingData } from "$lib/types/index.js";

    interface Props {
        paging: PagingData;
        children?: import('svelte').Snippet;
    }

    let { paging = $bindable(), children }: Props = $props();

    function handleItemsPerPageChange() {
        paging = {
            ...paging, 
            itemsPerPage: paging.itemsPerPage
        };
    }
</script>

<div class="gc-footer">
    <span>Rows per page</span>

    <select bind:value={paging.itemsPerPage} onchange={handleItemsPerPageChange}>
        {#each paging.itemsPerPageOptions as option (option)}                
            <option value="{option}" selected={option == paging.itemsPerPage}>{option}</option>
        {/each}
    </select>

    <span>{paging.currentPage * paging.itemsPerPage - paging.itemsPerPage + 1} - {Math.min(paging.currentPage * paging.itemsPerPage, paging.totalResults)} of {paging.totalResults}</span>

    {@render children?.()}
</div>

<style>
    .gc-footer {
        display: flex;
        align-items: center;
        justify-content: var(--gc-footer-justify, flex-end);
        gap: var(--gc-footer-gap, 0.5rem);
        margin: var(--gc-footer-margin, 0.5rem 0);
        padding: var(--gc-footer-padding, 0.5rem 0.75rem);
        border: var(--gc-footer-border, 1px solid  var(--gc-main-color));
        border-radius: var(--gc-footer-border-radius, 0.25rem);
        background-color: var(--gc-footer-bg-color, var(--gc-secondary-color));
        font-size: var(--gc-footer-font-size, 0.875rem);
        color: var(--gc-footer-color, var(--gc-text-color));
    }

    .gc-footer select {
        background-color: transparent;
    }
</style>