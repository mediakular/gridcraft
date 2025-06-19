<script lang="ts">
    import type { GridContainerProps } from "../../index.js";

    let { children }: GridContainerProps = $props();
</script>

<table>
    {@render children?.()}
</table>