<script lang="ts">
    import type { GridBodyCellProps } from "../../../index.js";

    let { children } : GridBodyCellProps = $props();
</script>

<td class="gc-td">
    {@render children?.()}
</td>

<style>
    .gc-td {
        padding: var(--gc-td-padding, 0.5rem 0.75rem);
        text-align: var(--gc-td-text-align, left);
    }
</style>