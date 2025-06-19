<script lang="ts">
    import type { GridHeaderRowProps } from "../../../index.js";

    let { children } : GridHeaderRowProps = $props();
</script>

<tr class="gc-header-tr">
    {@render children?.()}
</tr>

<style>
    .gc-header-tr {
        border: var(--gc-th-tr-border, 1px solid var(--gc-secondary-color));
    }
</style>