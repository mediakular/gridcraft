<script lang="ts">
    interface Props {
        isOdd?: boolean;
        isSelected?: boolean;
        index?: any;
        children?: import('svelte').Snippet;
    }

    let {
        isOdd = false,
        isSelected = false,
        index = -1,
        children
    }: Props = $props();
</script>

<!-- Card Wrapper -->
<label class="block group has-[:checked]:scale-[1.03] bg-white dark:bg-slate-800 hover:bg-slate-50 hover:dark:bg-slate-700 grid grid-cols-2 gap-4 p-3 min-h-[4.5rem] relative hover:scale-[1.03] transition-all rounded-md shadow overflow-hidden {isSelected ? 'bg-indigo-100/80 hover:bg-indigo-200/80 dark:bg-indigo-700/20 dark:hover:bg-indigo-800/20' : 'bg-slate-100 dark:bg-slate-700 hover:bg-slate-50 dark:hover:bg-slate-600 '}">
    {@render children?.()}
</label>