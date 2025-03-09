<script lang="ts">
    import type { GridHeaderContentProps } from '$lib/index.js';

    let {
        title = "",
        onClick = () => {},
        sortable = false,
        children
    }: GridHeaderContentProps = $props();
</script>

<th scope="col" onclick={onClick}>
    {title}
    {@render children?.()}
</th>