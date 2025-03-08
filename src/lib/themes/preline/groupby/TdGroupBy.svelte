<script lang="ts">
    interface Props {
        colspan?: number;
        onToggle?: any;
        isExpanded?: boolean;
        children?: import('svelte').Snippet;
    }

    let {
        colspan = 1,
        onToggle = () => {},
        isExpanded = false,
        children
    }: Props = $props();
</script>

<td colspan={colspan} class="h-px w-72 whitespace-nowrap" >
    <div class="flex gap-2 px-6 py-3">
        <button onclick={onToggle}>
            {#if isExpanded}
                <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="currentColor" class="dark:fill-gray-400"><polyline points="6 9 12 15 18 9"></polyline></svg>
            {:else}
                <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="currentColor" class="dark:fill-gray-400"><polyline points="9 18 15 12 9 6"></polyline></svg>
            {/if}
        </button>
        {@render children?.()}
    </div>
</td>