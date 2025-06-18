<script lang="ts">
    import type { GridGroupByCheckboxProps } from "$lib/index.js";

    let { index = 0, checked = false, onChange = () => {} }: GridGroupByCheckboxProps = $props();
</script>

<td>
    <label for="checkbox-groupby-{index}">
        <input type="checkbox" checked={checked} onchange={onChange} id="checkbox-groupby-{index}">
    </label>
</td>