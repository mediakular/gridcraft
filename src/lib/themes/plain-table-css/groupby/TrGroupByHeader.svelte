<script>
    export let isSelected = false;
</script>

<tr class="gc-tr gc-tr__groupby {isSelected ? 'gc-tr__groupby-selected' : ''}">
    <slot />
</tr>

<style>
    .gc-tr {
        background-color: var(--gc-tr-groupby-bg-color, #e2e8f0);
        border: var(--gc-tr-groupby-border, 1px solid #d1d5db);
        transition: var(--gc-transitions, all 0.2s ease-in-out);
    }

    .gc-tr:hover {
        background-color: var(--gc-tr-groupby-bg-color-hover, #dee4ed);
    }
    
    .gc-tr__groupby-selected {
        background-color: var(--gc-tr-groupby-selected-bg, #e2eef9);
    }

    .gc-tr__groupby-selected:hover {
        background-color: var(--gc-tr-groupby-selected-bg-hover, #d7e6f4);
    }
</style>