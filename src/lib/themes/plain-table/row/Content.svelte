<script lang="ts">
    interface Props {
        value?: string;
    }

    let { value = "" }: Props = $props();
</script>
<span>
    {!value || value === "" ? "-" : value}
</span>
