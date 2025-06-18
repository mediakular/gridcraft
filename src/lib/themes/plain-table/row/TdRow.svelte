<script lang="ts">
    import type { GridBodyCellProps } from "$lib/index.js";

    let { children }: GridBodyCellProps = $props();
</script>

<td>
    {@render children?.()}
</td>