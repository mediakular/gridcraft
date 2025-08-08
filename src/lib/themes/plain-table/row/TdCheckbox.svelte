<script lang="ts">
  import type { GridBodyCheckboxProps } from "$lib/index.js";

	let {
		index = -1,
		group = $bindable(undefined),
		value = undefined,
		checked = $bindable(false)
	}: GridBodyCheckboxProps = $props();
	
	function updateCheckbox(group: any) {
		checked = group.findIndex((x:any) => x.id === value.id) >= 0
	}
	
	function updateGroup(checked: boolean) {
		const index = group.findIndex((x:any) => x.id === value.id);
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

	$effect(() => {
		updateCheckbox(group)
	});
	$effect(() => {
		updateGroup(checked)
	});
</script>

<td>
    <label for="checkbox-row-{index}">
        <input type="checkbox" value={value} bind:checked={checked} id="checkbox-row-{index}" />
    </label>
</td>