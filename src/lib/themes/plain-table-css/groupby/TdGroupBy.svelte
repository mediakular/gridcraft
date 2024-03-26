<script>
    export let colspan = 1;
    export let onToggle = () => {};
    export let isExpanded = false;
</script>

<td class="gc-td gc-td__groupby" colspan={colspan}>
    <div class="gc-td__groupby-container">
        <button on:click={onToggle}>
            {#if isExpanded}
                <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="feather feather-chevron-down"><polyline points="6 9 12 15 18 9"></polyline></svg>
            {:else}
                <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="feather feather-chevron-right"><polyline points="9 18 15 12 9 6"></polyline></svg>
            {/if}
        </button>
        <div class="gc-td__groupby-content">
            <slot />
        </div>
    </div>
</td>

<style>
    .gc-td.gc-td__groupby {
        padding: var(--gc-td-groupby-padding, 0.5rem 0.75rem);
    }

    .gc-td__groupby-container {
        display: flex;
        gap: var(--gc-td-groupby-gap, var(--gc-td-gap));
    }

    .gc-td__groupby-content {
        display: flex;
        width: 100%;
        justify-content: space-between;
    }
</style>