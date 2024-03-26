<script lang="ts">
    export let isOdd = false;
    export let isSelected = false;
</script>

<tr class="gc-tr {isOdd ? 'gc-tr__odd' : ''} {isSelected ? 'gc-tr__selected' : ''}">
    <slot />
</tr>

<style>
    .gc-tr {
        background-color: var(--gc-tr-bg-color, #f1f5f9);
        border: var(--gc-tr-border, 1px solid #d1d5db);
        transition: var(--gc-transitions, all 0.2s ease-in-out);
    }

    .gc-tr.gc-tr__odd {
        background-color: var(--gc-tr-bg-color-odd, #f8fafc);
    }

    .gc-tr.gc-tr__selected {
        background-color: var(--gc-tr-bg-color-selected, #e2eef9);
    }

    .gc-tr.gc-tr__selected:hover {
        background-color: var(--gc-tr-bg-color-selected-hover, #deecf9);
    }
</style>