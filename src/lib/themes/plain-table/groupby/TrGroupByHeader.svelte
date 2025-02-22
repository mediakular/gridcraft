<script>
    /** @type {{children?: import('svelte').Snippet}} */
    let { children } = $props();
    // export let isSelected = false;
</script>

<tr>
    {@render children?.()}
</tr>