<script lang="ts">
    import type { GridHeaderCheckboxProps } from "../../../index.js";

    let { checked = false, onChange = () => {} }: GridHeaderCheckboxProps = $props();
</script>

<th class="gc-th gc-th__checkbox" scope="col">
    <label>
        <input type="checkbox" checked={checked} onchange={onChange}>
    </label>
</th>

<style>
    .gc-th {
        padding: var(--gc-th-padding, 0.5rem 0.75rem);
    }
</style>