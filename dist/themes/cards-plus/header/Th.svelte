<script lang="ts">
    import type { GridHeaderContentProps } from "../../../index.js";

    let {
        title = "",
        onClick = () => {},
        sortable = false,
        children
    }: GridHeaderContentProps = $props();
</script>

<th scope="col" class="px-6 py-3 text-left {sortable ? "hover:bg-slate-200 dark:hover:bg-slate-700/20 cursor-pointer transition-colors": ""}" onclick={onClick}>
    <div class="flex items-center gap-x-2">
        <span class="text-xs font-semibold uppercase tracking-wide text-gray-800 dark:text-gray-200">
            {title}
        </span>
        {@render children?.()}
    </div>
</th>