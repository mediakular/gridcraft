<script>
    /** @type {{children?: import('svelte').Snippet}} */
    let { children } = $props();
</script>

<tr class="gc-header-tr">
    {@render children?.()}
</tr>

<style>
    .gc-header-tr {
        border: var(--gc-th-tr-border, 1px solid var(--gc-secondary-color));
    }
</style>