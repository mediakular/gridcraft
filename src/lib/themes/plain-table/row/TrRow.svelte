<script lang="ts">
    import type { GridBodyRowProps } from "$lib/index.js";

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