<script lang="ts">
    import type { GridBodyCellProps } from "../../../index.js";

    let { children }: GridBodyCellProps = $props();
</script>

<td>
    {@render children?.()}
</td>