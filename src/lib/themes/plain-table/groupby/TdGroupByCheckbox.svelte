<script lang="ts">
    interface Props {
        index?: number;
        checked?: boolean;
        onChange?: any;
    }

    let { index = 0, checked = false, onChange = () => {} }: Props = $props();
</script>

<td>
    <label for="checkbox-groupby-{index}">
        <input type="checkbox" checked={checked} onchange={onChange} id="checkbox-groupby-{index}">
    </label>
</td>