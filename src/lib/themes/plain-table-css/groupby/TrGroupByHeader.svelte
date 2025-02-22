<script>
    /** @type {{isSelected?: boolean, children?: import('svelte').Snippet}} */
    let { isSelected = false, children } = $props();
</script>

<tr class="gc-tr gc-tr__groupby {isSelected ? 'gc-tr__groupby-selected' : ''}">
    {@render children?.()}
</tr>

<style>
    .gc-tr {
        background-color: var(--gc-tr-groupby-bg-color, var(--gc-main-color));
        border: var(--gc-tr-groupby-border, 1px solid var(--gc-secondary-color));
        transition: var(--gc-transitions, all 0.2s ease-in-out);
    }

    .gc-tr:hover {
        filter: brightness(95%);
    }
    
    .gc-tr.gc-tr__groupby-selected {
        background-color: var(--gc-tr-groupby-selected-bg, var(--gc-color-selected));
        filter: brightness(90%);
    }

    .gc-tr.gc-tr__groupby-selected:hover {
        filter: brightness(85%);
    }
</style>