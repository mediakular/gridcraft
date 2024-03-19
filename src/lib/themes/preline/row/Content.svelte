<script lang="ts">
    export let value: any;
</script>
<span class="block text-sm text-gray-800 dark:text-gray-200">
    {value === undefined || value === "" ? "-" : value}
</span>
