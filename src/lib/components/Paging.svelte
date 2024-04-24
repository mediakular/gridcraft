<script lang="ts">
    import { PlainTableCssTheme, type GridTheme, PagingData } from '$lib/index.js';

    export let theme:GridTheme = PlainTableCssTheme;
    export let paging:PagingData = new PagingData();
</script>

<svelte:component this={theme.paging} bind:paging />