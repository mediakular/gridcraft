<script lang="ts">
  import type { GridBodyCellProps } from '$lib/index.js';

	let { children } : GridBodyCellProps = $props();
</script>

{@render children?.()}