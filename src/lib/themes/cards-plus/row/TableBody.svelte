<script>
    /** @type {{children?: import('svelte').Snippet}} */
    let { children } = $props();
</script>

<div class="grid grid-cols-2 md:grid-cols-3 gap-4 mt-4">
    {@render children?.()}
</div>