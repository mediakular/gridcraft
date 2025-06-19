<script lang="ts">
    import type { GridBodyContainerProps } from "../../../index.js";

    let { children } : GridBodyContainerProps = $props();
</script>

<tbody>
    {@render children?.()}
</tbody>