<script lang="ts">
    import type { GridHeaderContainerProps } from "$lib/index.js";

    let { children } : GridHeaderContainerProps = $props();
</script>

<thead>
    {@render children?.()}
</thead>