<script lang="ts">
    export let currentPage = 1;
    export let totalPages = 1;
    export let totalResults = 0;
    export let itemsPerPage = 10;
    export let itemsPerPageOptions = [10, 20, 50, 100];
</script>


<div>
    <select bind:value={itemsPerPage}>
        {#each itemsPerPageOptions as option (option)}                
            <option value="{option}" selected={option == itemsPerPage}>{option}</option>
        {/each}
    </select>
    <span>of {totalResults} Results</span>

    <span>Page {currentPage} of {totalPages}</span>

    <slot />
</div>