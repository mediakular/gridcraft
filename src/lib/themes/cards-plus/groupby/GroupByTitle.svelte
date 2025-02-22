<script lang="ts">
    interface Props {
        value?: string;
    }

    let { value = "" }: Props = $props();
</script>

<span class="block text-sm text-gray-700 dark:text-gray-200">
    {!value || value === "" ? "-" : value}
</span>