<script lang="ts">
    export let index = 0;
    export let checked = false;
    export let onChange = () => {};
</script>

<td class="h-px w-px whitespace-nowrap">
    <div class="ps-6 py-3">
        <label for="checkbox-groupby-{index}" class="flex">
            <input type="checkbox" checked={checked} on:change={onChange} class="shrink-0 border-gray-300 rounded text-blue-600 focus:ring-blue-500 disabled:opacity-50 disabled:pointer-events-none dark:bg-slate-900 dark:border-gray-600 dark:checked:bg-blue-500 dark:checked:border-blue-500 dark:focus:ring-offset-gray-800" id="checkbox-groupby-{index}" >
            <span class="sr-only">Checkbox</span>
        </label>
    </div>
</td>