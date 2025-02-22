<script>
    /** @type {{children?: import('svelte').Snippet}} */
    let { children } = $props();
</script>

<td class="gc-td">
    {@render children?.()}
</td>

<style>
    .gc-td {
        padding: var(--gc-td-padding, 0.5rem 0.75rem);
        text-align: var(--gc-td-text-align, left);
    }
</style>