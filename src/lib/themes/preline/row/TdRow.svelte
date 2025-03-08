<script>
    /** @type {{children?: import('svelte').Snippet}} */
    let { children } = $props();
</script>

<td class="h-px whitespace-nowrap">
    <div class="px-6 py-3">
        {@render children?.()}
    </div>
</td>