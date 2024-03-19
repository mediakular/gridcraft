<script lang="ts">
    export let value = "";
</script>

<span class="block text-sm text-gray-700 dark:text-gray-200">
    {!value || value === "" ? "-" : value}
</span>