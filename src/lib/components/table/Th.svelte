<script lang="ts">
    export let title = "";
    export let onClick = () => {};
</script>

<th scope="col" on:click={onClick}>
    {title}
    <slot/>
</th>