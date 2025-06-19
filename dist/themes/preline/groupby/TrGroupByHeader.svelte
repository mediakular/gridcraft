<script lang="ts">
    import type { GridGroupByContainerProps } from "../../../index.js";

    let { isSelected = false, children } : GridGroupByContainerProps = $props();
</script>

<tr class="bg-slate-100 hover:bg-slate-200 dark:bg-slate-900 dark:hover:bg-slate-800 {isSelected ? 'transition-all bg-indigo-200 hover:bg-indigo-300 dark:bg-indigo-950 dark:hover:bg-indigo-900' : ''}">
    {@render children?.()}
</tr>