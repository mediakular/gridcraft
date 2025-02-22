<script lang="ts">
    interface Props {
        checked?: boolean;
        onChange?: any;
    }

    let { checked = false, onChange = () => {} }: Props = $props();
</script>

<th scope="col">
    <label>
        <input type="checkbox" checked={checked} onchange={onChange}>
    </label>
</th>