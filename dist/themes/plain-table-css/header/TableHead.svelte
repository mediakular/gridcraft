<script lang="ts">
    import type { GridHeaderContainerProps } from "../../../index.js";

    let { children } : GridHeaderContainerProps = $props();
</script>

<thead>
    {@render children?.()}
</thead>

<style>
    thead {
        background-color: var(--gc-table-header-bg-color, var(--gc-secondary-color));
    }
</style>