<script lang="ts">
    interface Props {
        index: any;
        isOdd?: boolean;
        isSelected?: boolean;
        children?: import('svelte').Snippet;
    }

    let {
        index,
        isOdd = false,
        isSelected = false,
        children
    }: Props = $props();
</script>

<tr>
    {@render children?.()}
</tr>