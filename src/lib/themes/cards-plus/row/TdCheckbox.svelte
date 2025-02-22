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

<div class="absolute right-5 top-5 flex items-center -z-50">
	<label for="checkbox-row-{index}" class="flex relative cursor-pointer">
		<input type="checkbox" value={value} bind:checked={checked} class="peer transition-opacity opacity-0 group-hover:opacity-100 shrink-0 border-gray-300 rounded text-blue-600 focus:ring-blue-500 disabled:opacity-50 disabled:pointer-events-none dark:bg-slate-900 dark:border-gray-600 dark:checked:bg-blue-500 dark:checked:border-blue-500 dark:focus:ring-offset-gray-800 cursor-pointer" id="checkbox-row-{index}">
		<span class="sr-only">Checkbox</span>
		<svg viewBox="0 0 10 10" class="transition-all duration-[500ms] absolute -top-2 -left-2 w-100 h-100 scale-0 invisible opacity-0 peer-checked:visible peer-checked:scale-[5000%] peer-checked:opacity-100 -z-50" xmlns="http://www.w3.org/2000/svg">
			<defs>
				<radialGradient id="gradient">
					<stop offset="10%" stop-color="#c4b5fd" />
					<stop offset="80%" stop-color="#ede9fe" />
					<stop offset="100%" stop-color="white" />
				</radialGradient>
				<radialGradient id="gradient-dark">
					<stop offset="10%" stop-color="#4338ca" />
					<stop offset="30%" stop-color="#3730a3" />
					<stop offset="100%" stop-color="transparent" />
				</radialGradient>
			</defs>
		
			<!-- using my radial gradient -->
			<circle cx="5" cy="5" r="4" class="fill-[url('#gradient')] dark:fill-[url('#gradient-dark')]"  />
		</svg>
	</label>
</div>