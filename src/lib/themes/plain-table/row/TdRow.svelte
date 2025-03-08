<script>
    /** @type {{children?: import('svelte').Snippet}} */
    let { children } = $props();
</script>

<td>
    {@render children?.()}
</td>