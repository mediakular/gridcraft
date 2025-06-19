<script lang="ts">
    import type { GridGroupByRowsCountProps } from "../../../index.js";

    let { showing = 0, total = 0 }: GridGroupByRowsCountProps = $props();
</script>

<small>{showing} / {total}</small>
