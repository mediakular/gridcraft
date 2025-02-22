<script>
    /** @type {{children?: import('svelte').Snippet}} */
    let { children } = $props();
</script>

<tbody class="divide-y divide-gray-200 dark:divide-gray-700">
    {@render children?.()}
</tbody>