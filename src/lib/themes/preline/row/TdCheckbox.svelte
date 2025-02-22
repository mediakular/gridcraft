<script lang="ts">
	import { run } from 'svelte/legacy';

	interface Props {
		index?: any;
		group?: any;
		value?: any;
		checked?: boolean;
	}

	let {
		index = -1,
		group = $bindable(undefined),
		value = undefined,
		checked = $bindable(false)
	}: Props = $props();

	
	function updateCheckbox(group:any) {
		checked = group.indexOf(value) >= 0
	}
	
	function updateGroup(checked:any) {
		const index = group.indexOf(value)
		if (checked) {
			if (index < 0) {
				group.push(value)
				group = group
			}
		} else {
			if (index >= 0) {
				group.splice(index, 1)
				group = group
			}
		}
	}
    //https://github.com/sveltejs/svelte/issues/2308

	run(() => {
		updateCheckbox(group)
	});
	run(() => {
		updateGroup(checked)
	});
</script>

<td class="h-px w-px whitespace-nowrap">
    <div class="ps-6 py-3">
        <label for="checkbox-row-{index}" class="flex">
            <input type="checkbox" value={value} bind:checked={checked} class="shrink-0 border-gray-300 rounded text-blue-600 focus:ring-blue-500 disabled:opacity-50 disabled:pointer-events-none dark:bg-slate-900 dark:border-gray-600 dark:checked:bg-blue-500 dark:checked:border-blue-500 dark:focus:ring-offset-gray-800" id="checkbox-row-{index}">
            <span class="sr-only">Checkbox</span>
        </label>
    </div>
</td>