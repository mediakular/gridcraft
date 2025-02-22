<script lang="ts">
    interface Props {
        index: any;
        isOdd?: boolean;
        isSelected?: boolean;
        children?: import('svelte').Snippet;
    }

    let {
        index,
        isOdd = false,
        isSelected = false,
        children
    }: Props = $props();
</script>

<tr class="gc-tr {isOdd ? 'gc-tr__odd' : ''} {isSelected ? 'gc-tr__selected' : ''}">
    {@render children?.()}
</tr>

<style>
    .gc-tr {
        background-color: var(--gc-tr-bg-color, var(--gc-secondary-color));
        border: var(--gc-tr-border, 1px solid var(--gc-secondary-color));
        transition: var(--gc-transitions, all 0.2s ease-in-out);
    }
    .gc-tr:hover {
        filter: brightness(98%);
    }

    .gc-tr.gc-tr__odd {
        background-color: var(--gc-tr-bg-color-odd, var(--gc-tertiary-color));
    }

    .gc-tr.gc-tr__odd:hover {
        filter: brightness(98%);
    }

    .gc-tr.gc-tr__selected {
        background-color: var(--gc-tr-bg-color-selected, var(--gc-color-selected));
    }

    .gc-tr.gc-tr__selected:hover {
        filter: brightness(95%);
    }
</style>