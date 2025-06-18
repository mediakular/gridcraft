<script lang="ts">
    import type { GridBodyContainerProps } from "$lib/index.js";

    let { children }: GridBodyContainerProps = $props();
</script>

<div class="grid grid-cols-2 md:grid-cols-3 gap-4 mt-4">
    {@render children?.()}
</div>