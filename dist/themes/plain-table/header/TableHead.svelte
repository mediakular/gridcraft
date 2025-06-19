<script lang="ts">
    import type { GridHeaderContainerProps } from "../../../index.js";

    let { children } : GridHeaderContainerProps = $props();
</script>

<thead>
    {@render children?.()}
</thead>