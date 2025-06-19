<script lang="ts">
    import type { GridBodyRowProps } from "../../../index.js";

    let {
        index,
        isOdd = false,
        isSelected = false,
        children
    }: GridBodyRowProps = $props();
</script>

<tr>
    {@render children?.()}
</tr>