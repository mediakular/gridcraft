<script>
    /** @type {{colspan?: number, onToggle?: any, isExpanded?: boolean, children?: import('svelte').Snippet}} */
    let {
        colspan = 1,
        onToggle = () => {},
        isExpanded = false,
        children
    } = $props();
</script>

<td colspan={colspan}>
    <div>
        <button onclick={onToggle}>
            {#if isExpanded}
                <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="feather feather-chevron-down"><polyline points="6 9 12 15 18 9"></polyline></svg>
            {:else}
                <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="feather feather-chevron-right"><polyline points="9 18 15 12 9 6"></polyline></svg>
            {/if}
        </button>
        {@render children?.()}
    </div>
</td>