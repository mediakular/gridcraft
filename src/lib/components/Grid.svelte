<script lang="ts">
    import PlainTableTheme from "$lib/themes/plain-table/index.js";

	import { GridFunctions } from "../GridFunctions.js";
    import type { GridColumn, GridFilter, GridTheme, GroupHeader } from "$lib/types/index.js";

    type T = $$Generic<any>;
    type ExpandedGroups = { [value:string] : boolean };

    export let data: Iterable<T> | ArrayLike<T> = [];
    export let dataUnpaged: Iterable<T> | ArrayLike<T> = []; // same as data, but nut cut for paging. Used for exports
    export let columns: GridColumn<T>[] = [];
    export let filters: GridFilter[] = [];

    export let groupBy = ""; // Default grouping column
    export let sortByColumn = "";
    export let itemsPerPage = 10;
    export let sortOrder = 1; // 1 for ascending, -1 for descending
    export let currentPage = 1;
    export let totalPages = 0;
    export let totalResults = 0;
    export let showCheckboxes = false;
    export let groupsExpandedDefault = true;
    export let selectedRows: T[] = [];

    export let theme: GridTheme = PlainTableTheme;

    $: theme;

    let sortOrderSecondary = 1; // 1 for ascending, -1 for descending
    let expandedGroups: ExpandedGroups = {};

    $: fulldata = Array.from(data);

    $: columns, assignEmptyColumns();

    function assignEmptyColumns() {
        if (columns.length > 0 || fulldata.length == 0) {
            return;
        }

        const data = Array.from(fulldata)[0] as object;
        columns = Object.keys(data).map((key) => {
            return {
                key: key,
                title: key,
                visible: true
            }
        });
    }

    $: columns.forEach((col) => {
        if (col.visible === undefined) {
            col.visible = true;
        }
    })
    $: grid = new GridFunctions<T>()
        .init(fulldata)
        .applyFilters(filters, columns)
        .sortBy(sortByColumn, sortOrder, groupBy, sortOrderSecondary, columns)
        .groupBy(groupBy, expandedGroups, groupsExpandedDefault, columns)
        .processPaging(currentPage, itemsPerPage, groupBy, columns);
    $: gridData = grid.data;
    $: dataUnpaged = grid.dataUnpaged;
    $: totalResults = grid.dataLength;
    $: groupHeaders = grid.groupHeaders;
    $: groupHeadersUnpaged = grid.groupHeadersUnpaged;
    $: totalPages = Math.max(1, Math.ceil(totalResults / Math.max(1, itemsPerPage)));

    function handleSort(column: string) {
        if (groupBy) {
            if (column === sortByColumn) {
                if (groupBy == column){
                    sortOrder *= -1; //Toggle sorting order
                }
                sortOrderSecondary *= -1; // Toggle sorting order
            } else {
                if (groupBy == column){
                    sortOrder = 1; // Default to ascending
                }
                sortByColumn = column;
                sortOrderSecondary = 1; // Default to ascending
            }
            return;
        }
        
        if (column === sortByColumn) {
            sortOrder *= -1; // Toggle sorting order
        } else {
            sortByColumn = column;
            sortOrder = 1; // Default to ascending
        }
    }

    function toggleGroup(groupHeader: GroupHeader<T>) {
        expandedGroups[groupHeader.groupKey] = !expandedGroups[groupHeader.groupKey];
        groupHeader.expanded = !groupHeader.expanded;
    }

    function generateUniqueKey() {
        return Math.random().toString(36).substr(2, 9); // Generate a random unique key
    }

    function toggleHeaderCheckbox() {
        const isHeaderSelected = fulldata.every(item => selectedRows.includes(item));
        if (isHeaderSelected) {
            selectedRows = selectedRows.filter(item => !fulldata.includes(item));
        } else {
            const toAdd: T[] = fulldata.filter(item => !selectedRows.includes(item));
            selectedRows = [...selectedRows, ...toAdd];
        }
    }

    function toggleGroupCheckbox(header: GroupHeader<T>) {
        const actualHeader = groupHeadersUnpaged.find(x => x.groupKey == header.groupKey);

        const dataItems = actualHeader?.data ?? [];
        const isGroupSelected = dataItems
            .every(item => selectedRows.includes(item));

        if (isGroupSelected) {
            selectedRows = selectedRows.filter(item => !dataItems.includes(item));
        } else {
            const toAdd: T[] = dataItems.filter(item => !selectedRows.includes(item));
            selectedRows = [...selectedRows, ...toAdd];
        }
    }
</script>

<svelte:component this={theme.grid.container}>
    <colgroup>
        {#each columns.filter(x => x.visible != false) as col (col.key)}
            {#if groupBy != col.key}
                <col span="1" style="{col.width ? "width:" + (Number.isInteger(col.width) ? `${col.width}px` : col.width) : ""}">
            {/if}
        {/each}
    </colgroup>
    <svelte:component this={theme.grid.header.container}>
        <svelte:component this={theme.grid.header.row}>
            {#if showCheckboxes}
                <svelte:component this={theme.grid.header.checkbox} checked={fulldata.every(item => selectedRows.includes(item))} onChange={() => {toggleHeaderCheckbox()}} />
            {/if}
            {#each columns.filter(x => x.visible != false) as col (col.key)}
                {#if groupBy != col.key}
                    {@const sortable = col.sortable === undefined || col.sortable === true}
                    <svelte:component this={theme.grid.header.content} title={col.title} sortable={sortable} onClick={() => sortable && handleSort(col.key)}>
                        {#if sortable}
                            <svelte:component this={theme.grid.header.sortIndicator} isSorted={sortByColumn == col.key} isDescending={(groupBy && sortOrderSecondary == 1) || (!groupBy && sortOrder == 1)} />
                        {/if}
                    </svelte:component>
                {/if}
            {/each}
        </svelte:component>
    </svelte:component>
    <svelte:component this={theme.grid.body.container}>
        {#if groupBy}
            {#each groupHeaders as header, index (header.groupKey)}
                {@const unpagedHeader = groupHeadersUnpaged.find(x => x.groupKey == header.groupKey)}
                <svelte:component this={theme.grid.groupby.container} isSelected={showCheckboxes && unpagedHeader?.data.every(item => selectedRows.includes(item))}>
                    {#if showCheckboxes}
                        <svelte:component this={theme.grid.groupby.checkbox} checked={unpagedHeader?.data.every(item => selectedRows.includes(item))} onChange={() => { toggleGroupCheckbox(header); }} index={index} />
                    {/if}
                    <svelte:component this={theme.grid.groupby.cell} colspan={columns.length-1} onToggle={() => toggleGroup(header)} isExpanded={header.expanded}>
                        {#each columns.filter(x => x.visible != false) as col (col.key)}
                            {#if groupBy == col.key}
                                {#if col.renderComponent && col.accessor }
                                    {#if typeof header.titleData === 'object'}
                                        <svelte:component this={col.renderComponent} {...header.titleData} />
                                    {:else}
                                        <svelte:component this={col.renderComponent} {...{value: header.titleData}} />
                                    {/if}
                                {:else if col.renderComponent}
                                    <svelte:component this={col.renderComponent} {...{value: header.titleData}} />
                                {:else}
                                    <svelte:component this={theme.grid.groupby.content} value={header.titleData} />
                                {/if}
                                
                                {@const unpaged = groupHeadersUnpaged.find(x => x.groupKey == header.groupKey)}
                                <svelte:component this={theme.grid.groupby.rowsCount} showing={header.data.length} total={unpaged?.data.length} />
                            {/if}
                        {/each}
                    </svelte:component>
                </svelte:component>
                {#if header.expanded}
                    {#each header.data as row, index (row.id || generateUniqueKey())}
                        <svelte:component this={theme.grid.body.row} isOdd={(index + 1) % 2 == 1} isSelected="{selectedRows.indexOf(row) >= 0}">
                            {#if showCheckboxes}
                                <svelte:component this={theme.grid.body.checkbox} value={row} index={index} bind:group={selectedRows} />
                            {/if}
                            {#each columns.filter(x => x.visible != false) as col (col.key)}
                                {#if groupBy != col.key}
                                    <svelte:component this={theme.grid.body.cell}>
                                        {#if col.renderComponent && col.accessor}
                                            {#if typeof col.accessor(row) === 'object'}
                                                <svelte:component this={col.renderComponent} {...col.accessor(row)} />
                                            {:else}
                                                <svelte:component this={col.renderComponent} {...{value: col.accessor(row)}} />
                                            {/if}
                                        {:else if col.renderComponent}
                                            <svelte:component this={col.renderComponent} {...{value: row[col.key]}} />
                                        {:else}
                                            {@const value = col.accessor ? col.accessor(row) : row[col.key]}
                                            <svelte:component this={theme.grid.body.content} value={value} />
                                        {/if}
                                    </svelte:component>
                                {/if}
                            {/each}
                        </svelte:component>
                    {/each}
                {/if}
            {/each}
        {:else}
            {#each gridData as row, index (row.id || generateUniqueKey())}
                <svelte:component this={theme.grid.body.row} isOdd={(index+1) % 2 == 1} isSelected="{selectedRows.indexOf(row) >= 0}">
                    {#if showCheckboxes}
                        <svelte:component this={theme.grid.body.checkbox} value={row} bind:group={selectedRows} index={index} />
                    {/if}
                    {#each columns.filter(x => x.visible != false) as col (col.key)}
                        {#if groupBy != col.key}
                            <svelte:component this={theme.grid.body.cell}>
                                {#if col.renderComponent && col.accessor}
                                    {#if typeof col.accessor(row) === 'object'}
                                        <svelte:component this={col.renderComponent} {...col.accessor(row)} />
                                    {:else}
                                        <svelte:component this={col.renderComponent} {...{value: col.accessor(row)}} />
                                    {/if}
                                {:else if col.renderComponent}
                                    <svelte:component this={col.renderComponent} {...{value: row[col.key]}} />
                                {:else}
                                    {@const value = col.accessor ? col.accessor(row) : row[col.key]}
                                    <svelte:component this={theme.grid.body.content} value={value} />
                                {/if}
                            </svelte:component>
                        {/if}
                    {/each}
                </svelte:component>
            {/each}
        {/if}
    </svelte:component>
</svelte:component>