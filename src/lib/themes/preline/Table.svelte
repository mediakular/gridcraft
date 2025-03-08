<script>
    /** @type {{children?: import('svelte').Snippet}} */
    let { children } = $props();
</script>

<div class="overflow-x-scroll">
    <table class="max-w-full min-w-full divide-y divide-gray-200 dark:divide-gray-700">
        {@render children?.()}
    </table>
</div>