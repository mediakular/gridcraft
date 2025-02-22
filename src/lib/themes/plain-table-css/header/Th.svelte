<script lang="ts">
    interface Props {
        title?: string;
        onClick?: any;
        sortable?: boolean;
        children?: import('svelte').Snippet;
    }

    let {
        title = "",
        onClick = () => {},
        sortable = false,
        children
    }: Props = $props();
</script>

<th class="gc-th {sortable ? 'gc-th--sortable' : ''}" scope="col" onclick={onClick}>
    <div class="gc-th-col">
        <span class="gc-th-col-title">{title}</span>
        {@render children?.()}
    </div>
</th>

<style>
    .gc-th {
        padding: var(--gc-th-padding, 0.5rem 0.75rem);
        text-align: var(--gc-th-text-align, left);
    }

    .gc-th-col {
        display: flex;
        align-items: center;
        gap: var(--gc-th-gap, 0.25rem);
    }

    .gc-th-col-title {
        color: var(--gc-th-color, var(--gc-text-color));
        text-transform: var(--gc-th-text-transform, uppercase);
        font-size:  var(--gc-th-font-size, small);
    }

    .gc-th--sortable {
        cursor: pointer;
        background-color: var(--gc-table-header-bg-color, var(--gc-secondary-color));
    }

    .gc-th--sortable:hover {
        filter: brightness(95%);
    }
</style>