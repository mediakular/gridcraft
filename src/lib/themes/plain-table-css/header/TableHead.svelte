<script>
    /** @type {{children?: import('svelte').Snippet}} */
    let { children } = $props();
</script>

<thead>
    {@render children?.()}
</thead>

<style>
    thead {
        background-color: var(--gc-table-header-bg-color, var(--gc-secondary-color));
    }
</style>