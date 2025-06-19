<script lang="ts">
    import type { GridGroupByContentProps } from "../../../index.js";

    let { value = "" }: GridGroupByContentProps = $props();
</script>

<span class="block text-sm text-gray-700 dark:text-gray-200">
    {!value || value === "" ? "-" : value}
</span>