<script lang="ts">
    import type { GridGroupByContentProps } from "$lib/index.js";

    let { value = "" }: GridGroupByContentProps = $props();
</script>

<span>
    {!value || value === "" ? "-" : value}
</span>