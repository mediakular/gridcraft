<script lang="ts">
  import type { GridBodyCellProps } from '../../../index.js';

	let { children } : GridBodyCellProps = $props();
</script>

{@render children?.()}