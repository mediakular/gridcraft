<script lang="ts">
    export let title = "";
    export let onClick = () => {};
    export let sortable = false;
</script>

<th class="gc-th {sortable ? 'gc-th--sortable' : ''}" scope="col" on:click={onClick}>
    <div class="gc-th-col">
        <span class="gc-th-col-title">{title}</span>
        <slot/>
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
        color: var(--gc-th-color, #2a2a2a);
        text-transform: var(--gc-th-text-transform, uppercase);
        font-size:  var(--gc-th-font-size, small);
    }

    .gc-th--sortable {
        cursor: pointer;
    }

    .gc-th--sortable:hover {
        background-color: var(--gc-th-sortable-bg-hover, #f3f4f6);
    }
</style>