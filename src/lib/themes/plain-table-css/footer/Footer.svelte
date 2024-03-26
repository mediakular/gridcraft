<script lang="ts">
    export let currentPage = 1;
    export let totalPages = 1;
    export let totalResults = 0;
    export let itemsPerPage = 10;
    export let itemsPerPageOptions = [10, 20, 50, 100];
</script>


<div class="gc-footer">
    <span>Rows per page</span>

    <select bind:value={itemsPerPage}>
        {#each itemsPerPageOptions as option (option)}                
            <option value="{option}" selected={option == itemsPerPage}>{option}</option>
        {/each}
    </select>

    <span>{currentPage * itemsPerPage - itemsPerPage + 1} - {currentPage * itemsPerPage}  of {totalResults}</span>

    <slot />
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