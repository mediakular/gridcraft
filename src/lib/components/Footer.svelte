<script lang="ts">
    import PlainTableTheme from "$lib/themes/plain-table/index.js";
    import type { GridTheme } from "$lib/types/index.js";

    export let theme: GridTheme = PlainTableTheme;
    export let currentPage = 1;
    export let totalPages = 1;
    export let totalResults = 1;
    export let itemsPerPage = 10;
    export let itemsPerPageOptions = [10, 20, 50, 100];
</script>

<svelte:component this={theme.footer} bind:currentPage={currentPage} bind:totalPages={totalPages} bind:totalResults={totalResults} bind:itemsPerPage={itemsPerPage} bind:itemsPerPageOptions={itemsPerPageOptions}>
    <svelte:component this={theme.paging} bind:currentPage={currentPage} bind:totalPages={totalPages} />
</svelte:component>