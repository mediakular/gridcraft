<script lang="ts">
    import type { GridContainerProps } from "$lib/index.js";

    let { children } : GridContainerProps = $props();
</script>

<div class="overflow-x-scroll">
    <table class="max-w-full min-w-full divide-y divide-gray-200 dark:divide-gray-700">
        {@render children?.()}
    </table>
</div>