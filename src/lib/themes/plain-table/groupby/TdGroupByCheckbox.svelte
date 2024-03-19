<script lang="ts">
    export let index = 0;
    export let checked = false;
    export let onChange = () => {};
</script>

<td>
    <label for="checkbox-groupby-{index}">
        <input type="checkbox" checked={checked} on:change={onChange} id="checkbox-groupby-{index}">
    </label>
</td>