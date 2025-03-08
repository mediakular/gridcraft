<script lang="ts">
    interface Props {
        title?: string;
        onClick?: any;
        sortable?: boolean;
        children?: import('svelte').Snippet;
    }

    let {
        title = "",
        onClick = () => {},
        sortable = false,
        children
    }: Props = $props();
</script>

<th scope="col" onclick={onClick}>
    {title}
    {@render children?.()}
</th>