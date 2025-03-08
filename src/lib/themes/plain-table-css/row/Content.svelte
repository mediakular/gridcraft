<script lang="ts">
    interface Props {
        value?: string;
    }

    let { value = "" }: Props = $props();
</script>

<span class="gc-td__content">
    {!value || value === "" ? "-" : value}
</span>

<style>
    .gc-td__content {
        font-size: var(--gc-td-content-font-size, 0.875rem);
        line-height: var(--gc-td-content-line-height, 1.25rem);
        color: var(--gc-td-content-color, var(--gc-text-color));
    }

    :global(.gc-tr.gc-tr__odd) .gc-td__content {
        color: var(--gc-td-content-color-odd, var(--gc-text-color));
    }
</style>