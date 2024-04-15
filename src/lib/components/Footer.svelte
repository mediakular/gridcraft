<script lang="ts">
    import { PlainTableCssTheme, type GridTheme, type PagingData } from '$lib/index.js';

    export let theme:GridTheme = PlainTableCssTheme;
    export let paging:PagingData = {
        currentPage: 1,
        itemsPerPage: 10,
        itemsPerPageOptions: [10, 25, 50, 100],
        totalPages: 1,
        totalResults: 0,
    } as PagingData;
</script>

<svelte:component this={theme.footer} bind:paging >
    <svelte:component this={theme.paging} bind:paging />
</svelte:component>