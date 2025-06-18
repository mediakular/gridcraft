<script lang="ts">
    import type { GridHeaderContainerProps } from '$lib/index.js';

    let { children }: GridHeaderContainerProps = $props();
</script>

<thead class="bg-gray-50 dark:bg-slate-800 drop-shadow-sm dark:drop-shadow-md overflow-x-scroll flex">
    {@render children?.()}
</thead>