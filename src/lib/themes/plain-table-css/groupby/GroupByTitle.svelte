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
        font-size: var(--gc-td-groupby-content-font-size, 0.875rem);
        font-weight: var(--gc-td-groupby-content-font-weight, bold);
        color: var(--gc-td-groupby-content-color, var(--gc-text-color));
    }
</style>