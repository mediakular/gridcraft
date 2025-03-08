<script lang="ts">
    interface Props {
        checked?: boolean;
        onChange?: any;
    }

    let { checked = false, onChange = () => {} }: Props = $props();
</script>

<th scope="col" class="ps-6 py-3 text-start">
    <label for="hs-at-with-checkboxes-main" class="flex">
        <input type="checkbox" checked={checked} onchange={onChange} class="shrink-0 border-gray-300 rounded text-blue-600 focus:ring-blue-500 disabled:opacity-50 disabled:pointer-events-none dark:bg-slate-900 dark:border-gray-600 dark:checked:bg-blue-500 dark:checked:border-blue-500 dark:focus:ring-offset-gray-800" id="hs-at-with-checkboxes-main">
        <span class="sr-only">Checkbox</span>
    </label>
</th>