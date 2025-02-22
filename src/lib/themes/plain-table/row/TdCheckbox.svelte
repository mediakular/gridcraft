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

	
	function updateCheckbox(group) {
		checked = group.indexOf(value) >= 0
	}
	
	function updateGroup(checked) {
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

<td>
    <label for="checkbox-row-{index}">
        <input type="checkbox" value={value} bind:checked={checked} id="checkbox-row-{index}" />
    </label>
</td>