<script lang="ts">
    import type { GridHeaderCheckboxProps } from "$lib/index.js";

    let { checked = false, onChange = () => {} }: GridHeaderCheckboxProps = $props();
</script>

<th scope="col">
    <label>
        <input type="checkbox" checked={checked} onchange={onChange}>
    </label>
</th>