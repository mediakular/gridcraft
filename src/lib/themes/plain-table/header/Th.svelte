<script lang="ts">
    export let title = "";
    export let onClick = () => {};
    export let sortable = false;
</script>

<th scope="col" on:click={onClick}>
    {title}
    <slot/>
</th>