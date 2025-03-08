<script lang="ts">
    interface Props {
        index?: number;
        checked?: boolean;
        onChange?: any;
    }

    let { index = 0, checked = false, onChange = () => {} }: Props = $props();
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