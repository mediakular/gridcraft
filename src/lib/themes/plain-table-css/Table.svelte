<script>
    /** @type {{children?: import('svelte').Snippet}} */
    let { children } = $props();
</script>

<div class="gc-table-wrapper">
    <table class="gc-table">
        {@render children?.()}
    </table>
</div>

<style lang="css">
    .gc-table-wrapper {
        overflow-x: scroll;
        border-radius: var(--gc-table-radius, 2px);
    }

    .gc-table {
        border-collapse: collapse;
        background-color:var(--gc-table-bg-color, var(--gc-main-color));
        width: 100%;
        color: var(--gc-table-color, var(--gc-text-color));
    }

    :global(html) {
        --gc-main-color: #e2e8f0;
        --gc-secondary-color: #f1f5f9;
        --gc-tertiary-color:white;
        --gc-text-color: #2a2a2a;
        --gc-color-selected: #bae6fd88;
    }

    :global(html.dark) {
        --gc-main-color: #1e293b;
        --gc-secondary-color: #334155;
        --gc-tertiary-color: #293647;
        --gc-text-color: #e8e7e7;
        --gc-color-selected: #155e75cc;
    }
</style>