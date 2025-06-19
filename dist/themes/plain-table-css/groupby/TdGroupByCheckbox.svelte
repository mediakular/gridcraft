<script lang="ts">
    import type { GridGroupByCheckboxProps } from "../../../index.js";

    let { index = 0, checked = false, onChange = () => {} }: GridGroupByCheckboxProps = $props();
</script>

<td class="gc-td gc-td__groupby gc-td__groupby-checkbox">
    <label for="checkbox-groupby-{index}">
        <input type="checkbox" checked={checked} onchange={onChange} id="checkbox-groupby-{index}">
    </label>
</td>

<style>
    .gc-td__groupby-checkbox {
        padding: var(--gc-td-groupby-padding, var(--gc-td-padding, 0.5rem 0.75rem));
        text-align: var(--gc-td-text-align-checkbox, center);
    }
</style>