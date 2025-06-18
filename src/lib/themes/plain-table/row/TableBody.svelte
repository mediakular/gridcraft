<script lang="ts">
    import type { GridBodyContainerProps } from "$lib/index.js";

    let { children }: GridBodyContainerProps = $props();
</script>

<tbody>
    {@render children?.()}
</tbody>