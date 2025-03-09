<script lang="ts">
    import type { GridBodyRowProps } from "$lib/index.js";

    let {
        index,
        isOdd = false,
        isSelected = false,
        children
    }: GridBodyRowProps = $props();
</script>

<tr class="hover:bg-gray-50 dark:hover:bg-slate-500 transition-colors {isOdd ? 'bg-gray-100 dark:bg-slate-700' : 'bg-gray-200 dark:bg-slate-800'} {isSelected ? 'bg-indigo-100/80 hover:bg-indigo-200/80 dark:bg-indigo-700/20 dark:hover:bg-indigo-800/20' : ''}">
    {@render children?.()}
</tr>