<script lang="ts">
    import type { GridHeaderRowProps } from "../../../index.js";

    let { children }: GridHeaderRowProps = $props();
</script>

<tr>
    {@render children?.()}
</tr>