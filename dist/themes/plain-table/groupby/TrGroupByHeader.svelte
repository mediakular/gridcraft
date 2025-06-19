<script lang="ts">
    import type { GridGroupByContainerProps } from "../../../index.js";

    let { children } : GridGroupByContainerProps = $props();
</script>

<tr>
    {@render children?.()}
</tr>