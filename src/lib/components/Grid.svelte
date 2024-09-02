<script lang="ts">
    import { PlainTableCssTheme } from '$lib/index.js';
	import { GridFunctions } from "../GridFunctions.js";
    import type { GridColumn, GridFilter, GridTheme, GroupHeader, PagingDataInternal } from "$lib/types/index.js";
    import { PagingData } from "$lib/types/index.js";

    type T = $$Generic<any>;
    type ExpandedGroups = { [value:string] : boolean };

    export let data: Iterable<T> | ArrayLike<T> = [];
    export let dataUnpaged: Iterable<T> | ArrayLike<T> = []; // same as data, but nut cut for paging. Used for exports
    export let columns: GridColumn<T>[] = [];
    export let filters: GridFilter[] = [];

    export let groupBy = ""; // Default grouping column
    export let sortByColumn = "";
    export let sortOrder = 1; // 1 for ascending, -1 for descending

    export let showCheckboxes = false;
    export let groupsExpandedDefault = true;
    export let selectedRows: T[] = [];

    export let theme: GridTheme = PlainTableCssTheme;
    export let paging = new PagingData();

    let sortOrderSecondary = 1; // 1 for ascending, -1 for descending
    let expandedGroups: ExpandedGroups = {};
    let gridData: T[] = [];
    let groupHeaders: GroupHeader<T>[] = [];
    let groupHeadersUnpaged: GroupHeader<T>[] = [];

    $: fulldata = Array.from(data);
    $: columns, assignAutoColumns();
    function assignAutoColumns() {
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

    let uniqueRowIds: {row: T, id: string}[] = [];
    $: uniqueRowIds = fulldata.map((row) => {
        const id = Math.random().toString(36).substr(2, 9);
        return { row: row, id: id  };
    }), resetSelectedRows();
    function resetSelectedRows() {
        selectedRows = []; // resetting the selected rows when fulldata changes
    }
    
    $: columns.forEach((col) => {
        if (col.visible === undefined) {
            col.visible = true;
        }
    })

    $: activeFilters = filters.filter(x => x.active);

    $: grid = new GridFunctions<T>()
        .init(fulldata)
        .applyFilters(filters, columns)
        .sortBy(sortByColumn, sortOrder, groupBy, sortOrderSecondary, columns)
        .groupBy(groupBy,expandedGroups, groupsExpandedDefault, columns)
        .processPaging(groupBy, paging.currentPage, paging.itemsPerPage);

    $: {
        gridData = grid.data;
        dataUnpaged = grid.dataUnpaged;
        groupHeaders = grid.groupHeaders;
        groupHeadersUnpaged = grid.groupHeadersUnpaged;
        updatePaging();
    }

    function updatePaging() {
        (paging as PagingDataInternal).totalResults = grid.dataUnpaged.length;
        (paging as PagingDataInternal).totalPages = Math.max(1, Math.ceil(paging.totalResults / Math.max(1, paging.itemsPerPage)));
        paging.currentPage = Math.max(1, Math.min(paging.currentPage, paging.totalPages));
    }
    
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

    function getUniqueKey(row: T) {
        return uniqueRowIds.find(x => x.row == row)?.id;
    }

    function toggleHeaderCheckbox() {
        const dataView = activeFilters.length == 0 ? fulldata : dataUnpaged as T[];
        const isHeaderSelected = dataView.every(item => selectedRows.includes(item));
        
        if (isHeaderSelected) {
            selectedRows = [];
        } else {
            const toAdd: T[] = dataView.filter(item => !selectedRows.includes(item));
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
        {#if showCheckboxes}
            <col span="1">
        {/if}
        {#each columns.filter(x => x.visible != false) as col (col.key)}
            {#if groupBy != col.key}
                <col span="1" style="{col.width ? "width:" + (Number.isInteger(col.width) ? `${col.width}px` : col.width) : ""}">
            {/if}
        {/each}
    </colgroup>
    <svelte:component this={theme.grid.header.container}>
        <svelte:component this={theme.grid.header.row}>
            {#if showCheckboxes}
                <svelte:component this={theme.grid.header.checkbox} checked={activeFilters.length == 0 ? fulldata.every(item => selectedRows.includes(item)) : Array.from(dataUnpaged).every(item => selectedRows.includes(item))} onChange={() => {toggleHeaderCheckbox()}} />
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
            {#each groupHeaders as header, groupIndex (header.groupKey)}
                {@const unpagedHeader = groupHeadersUnpaged.find(x => x.groupKey == header.groupKey)}
                <svelte:component this={theme.grid.groupby.container} isSelected={showCheckboxes && unpagedHeader?.data.every(item => selectedRows.includes(item))}>
                    {#if showCheckboxes}
                        <svelte:component this={theme.grid.groupby.checkbox} checked={unpagedHeader?.data.every(item => selectedRows.includes(item))} onChange={() => { toggleGroupCheckbox(header); }} index={groupIndex} />
                    {/if}
                    <svelte:component this={theme.grid.groupby.cell} colspan={columns.length-1} onToggle={() => toggleGroup(header)} isExpanded={header.expanded}>
                        {@const col = columns.find(x => x.visible != false && x.key == groupBy)}
                        {#if col}
                            {@const value = header.titleData}
                            {@const renderComponent = col.renderComponent ? col.renderComponent : theme.grid.groupby.content}
    
                            {#if typeof value === 'object'}
                                {#if Object.keys(value).length > 0}
                                    <svelte:component this={renderComponent} {...value} isGroupByHeader={true} />
                                {:else}
                                    <svelte:component this={renderComponent} {...{value: value}} isGroupByHeader={true} />
                                {/if}
                            {:else}
                                <svelte:component this={renderComponent} {value} isGroupByHeader={true} />
                            {/if}
                            
                            {@const unpaged = groupHeadersUnpaged.find(x => x.groupKey == header.groupKey)}
                            <svelte:component this={theme.grid.groupby.rowsCount} showing={header.data.length} total={unpaged?.data.length} />
                        {/if}
                    </svelte:component>
                </svelte:component>
                {#if header.expanded}
                    {#each header.data as row, index (getUniqueKey(row))}
                        <svelte:component this={theme.grid.body.row} isOdd={(index + 1) % 2 == 1} index={gridData.indexOf(row)} isSelected="{selectedRows.indexOf(row) >= 0}">
                            {#if showCheckboxes}
                                <svelte:component this={theme.grid.body.checkbox} value={row} index={gridData.indexOf(row)} bind:group={selectedRows} />
                            {/if}
                            {#each columns.filter(x => x.visible != false && x.key != groupBy) as col (col.key)}
                                <svelte:component this={theme.grid.body.cell}>
                                    {@const value = col.accessor ? col.accessor(row) : row[col.key]}
                                    {@const renderComponent = col.renderComponent ? col.renderComponent : theme.grid.body.content}
                
                                    {#if typeof value === 'object'}
                                        {#if Object.keys(value).length > 0}
                                            <svelte:component this={renderComponent} {...value} />
                                        {:else}
                                            <svelte:component this={renderComponent} {...{value: value}} />
                                        {/if}
                                    {:else}
                                        <svelte:component this={renderComponent} {value} />
                                    {/if}
                                </svelte:component>
                            {/each}
                        </svelte:component>
                    {/each}
                {/if}
            {/each}
        {:else}
            {#each gridData as row, index (getUniqueKey(row))}
                <svelte:component this={theme.grid.body.row} isOdd={(index+1) % 2 == 1} {index} isSelected="{selectedRows.indexOf(row) >= 0}">
                    {#if showCheckboxes}
                        <svelte:component this={theme.grid.body.checkbox} value={row} bind:group={selectedRows} index={index} />
                    {/if}
                    {#each columns.filter(x => x.visible != false) as col (col.key)}
                        <svelte:component this={theme.grid.body.cell}>
                            {@const value = col.accessor ? col.accessor(row) : row[col.key]}
                            {@const renderComponent = col.renderComponent ? col.renderComponent : theme.grid.body.content}

                            {#if typeof value === 'object'}
                                {#if Object.keys(value).length > 0}
                                    <svelte:component this={renderComponent} {...value} />
                                {:else}
                                    <svelte:component this={renderComponent} {...{value: value}} />
                                {/if}
                            {:else}
                                <svelte:component this={renderComponent} {value} />
                            {/if}
                        </svelte:component>
                    {/each}
                </svelte:component>
            {/each}
        {/if}
    </svelte:component>
</svelte:component>