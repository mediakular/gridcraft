<script lang="ts">
    export let index = -1;
    export let group = undefined;
	export let value = undefined;
	export let checked = false;

    //https://github.com/sveltejs/svelte/issues/2308

	$: updateCheckbox(group)
	$: updateGroup(checked)
	
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
</script>

<td class="gc-td gc-td__checkbox">
    <label for="checkbox-row-{index}">
        <input type="checkbox" value={value} bind:checked={checked} id="checkbox-row-{index}" />
    </label>
</td>

<style>
    .gc-td {
        padding: var(--gc-td-padding, 0.5rem 0.75rem);
		text-align: var(--gc-td-text-align-checkbox, center);
    }
</style>