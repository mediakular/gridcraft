<script lang="ts">
    import type { GridContainerProps } from "$lib/index.js";

    let { children }: GridContainerProps = $props();
</script>

<table>
    {@render children?.()}
</table>