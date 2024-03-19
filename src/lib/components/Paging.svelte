<script lang="ts">
    import PlainTableTheme from "$lib/themes/plain-table/index.js";
    import type { GridTheme } from "$lib/types/index.js";

    export let theme: GridTheme = PlainTableTheme;

    export let currentPage = 1;
    export let totalPages = 1;
</script>

<svelte:component this={theme.paging} bind:currentPage={currentPage} bind:totalPages={totalPages} />