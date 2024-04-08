<script lang="ts">
    import ThemeStore from '$lib/stores/ThemeStore.js';

    $: theme = $ThemeStore;
</script>

<svelte:component this={theme.paging} />