<script lang="ts">
    interface Props {
        showing?: number;
        total?: number;
    }

    let { showing = 0, total = 0 }: Props = $props();
</script>

<small class="inline-block ml-auto text-gray-400 dark:text-gray-600">{showing} / {total}</small>
