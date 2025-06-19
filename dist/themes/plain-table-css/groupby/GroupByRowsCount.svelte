<script lang="ts">
    import type { GridGroupByRowsCountProps } from "../../../index.js";

    let { showing = 0, total = 0 }: GridGroupByRowsCountProps = $props();
</script>

<small class="gc-td__groupby-count">{showing} / {total}</small>
