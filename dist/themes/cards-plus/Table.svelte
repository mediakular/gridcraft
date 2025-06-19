<script lang="ts">
    import type { GridContainerProps } from '../../index.js';

    let { children } : GridContainerProps = $props();
</script>

<div class="max-w-full min-w-full">
    {@render children?.()}
</div>