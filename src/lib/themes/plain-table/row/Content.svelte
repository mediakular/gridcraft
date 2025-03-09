<script lang="ts">
    import type { GridBodyContentProps } from "$lib/index.js";

    let { value = "" }: GridBodyContentProps = $props();
</script>
<span>
    {!value || value === "" ? "-" : value}
</span>
