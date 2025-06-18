<script lang="ts">
    import type { GridGroupByCheckboxProps } from "$lib/index.js";

    let { index = 0, checked = false, onChange = () => {} }: GridGroupByCheckboxProps = $props();
</script>

<div class="ps-6 py-3">
    <label for="checkbox-groupby-{index}" class="flex">
        <small class="inline-block ml-auto text-gray-400 dark:text-gray-600 mr-2 text-nowrap cursor-pointer">Select all</small>
        <input type="checkbox" checked={checked} onchange={onChange} class="shrink-0 border-gray-300 rounded text-blue-600 focus:ring-blue-500 disabled:opacity-50 disabled:pointer-events-none dark:bg-slate-900 dark:border-gray-600 dark:checked:bg-blue-500 dark:checked:border-blue-500 dark:focus:ring-offset-gray-800 cursor-pointer" id="checkbox-groupby-{index}" >
        <span class="sr-only">Checkbox</span>
    </label>
</div>