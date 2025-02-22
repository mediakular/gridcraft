<script>
    /** @type {{children?: import('svelte').Snippet}} */
    let { children } = $props();
</script>

<thead class="bg-gray-50 dark:bg-slate-800 drop-shadow-sm dark:drop-shadow-md overflow-x-scroll flex">
    {@render children?.()}
</thead>