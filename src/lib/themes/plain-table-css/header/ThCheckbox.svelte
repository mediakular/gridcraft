<script lang="ts">
    export let checked = false;
    export let onChange = () => {};
</script>

<th class="gc-th gc-th__checkbox" scope="col">
    <label>
        <input type="checkbox" checked={checked} on:change={onChange}>
    </label>
</th>

<style>
    .gc-th {
        padding: var(--gc-th-padding, 0.5rem 0.75rem);
    }
</style>