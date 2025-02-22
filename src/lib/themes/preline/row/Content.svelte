<script lang="ts">
    interface Props {
        value: any;
    }

    let { value }: Props = $props();
</script>
<span class="block text-sm text-gray-800 dark:text-gray-200">
    {value === undefined || value === "" ? "-" : value}
</span>
