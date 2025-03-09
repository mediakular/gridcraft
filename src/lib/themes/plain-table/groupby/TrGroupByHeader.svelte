<script lang="ts">
    import type { GridGroupByContainerProps } from "$lib/index.js";

    let { children } : GridGroupByContainerProps = $props();
</script>

<tr>
    {@render children?.()}
</tr>