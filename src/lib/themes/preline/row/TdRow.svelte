<script lang="ts">
    import type { GridBodyCellProps } from "$lib/index.js";

    let { children } : GridBodyCellProps = $props();
</script>

<td class="h-px whitespace-nowrap">
    <div class="px-6 py-3">
        {@render children?.()}
    </div>
</td>