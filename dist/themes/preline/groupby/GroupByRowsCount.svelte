<script lang="ts">
    import type { GridGroupByRowsCountProps } from "../../../index.js";

    let { showing = 0, total = 0 }: GridGroupByRowsCountProps = $props();
</script>

<small class="inline-block ml-auto text-gray-400 dark:text-gray-600">{showing} / {total}</small>
