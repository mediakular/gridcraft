<script>
    /** @type {{children?: import('svelte').Snippet}} */
    let { children } = $props();
</script>

<div class="max-w-full min-w-full">
    {@render children?.()}
</div>