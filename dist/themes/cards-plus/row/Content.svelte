<script lang="ts">
    import type { GridBodyContentProps } from "../../../index.js";

    let { value }: GridBodyContentProps = $props();
</script>
<span class="block text-sm text-gray-800 dark:text-gray-200">
    {value === undefined || value === "" ? "-" : value}
</span>
