<script lang="ts">
    interface Props {
        showing?: number;
        total?: number;
    }

    let { showing = 0, total = 0 }: Props = $props();
</script>

<small>{showing} / {total}</small>
