<script lang="ts">
    export let checked = false;
    export let onChange = () => {};
</script>

<th scope="col">
    <label>
        <input type="checkbox" checked={checked} on:change={onChange}>
    </label>
</th>