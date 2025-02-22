<script lang="ts">
    import { run } from 'svelte/legacy';

    import { PlainTableCssTheme } from '$lib/index.js';
	import { GridFunctions } from "../GridFunctions.js";
    import type { GridColumn, GridFilter, GridTheme, GroupHeader, PagingDataInternal } from "$lib/types/index.js";
    import { PagingData } from "$lib/types/index.js";

    type T = $$Generic<any>;
    type ExpandedGroups = { [value:string] : boolean };




    interface Props {
        data?: Iterable<T> | ArrayLike<T>;
        dataUnpaged?: Iterable<T> | ArrayLike<T>;
        columns?: GridColumn<T>[];
        filters?: GridFilter[];
        groupBy?: string;
        sortByColumn?: string;
        sortOrder?: number;
        showCheckboxes?: boolean;
        groupsExpandedDefault?: boolean;
        selectedRows?: T[];
        theme?: GridTheme;
        paging?: any;
    }

    let {
        data = [],
        dataUnpaged = $bindable([]),
        columns = $bindable([]),
        filters = [],
        groupBy = "",
        sortByColumn = $bindable(""),
        sortOrder = $bindable(1),
        showCheckboxes = false,
        groupsExpandedDefault = true,
        selectedRows = $bindable([]),
        theme = PlainTableCssTheme,
        paging = $bindable(new PagingData())
    }: Props = $props();

    let sortOrderSecondary = $state(1); // 1 for ascending, -1 for descending
    let expandedGroups: ExpandedGroups = $state({});
    let gridData: T[] = $state([]);
    let groupHeaders: GroupHeader<T>[] = $state([]);
    let groupHeadersUnpaged: GroupHeader<T>[] = $state([]);

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

    let uniqueRowIds: {row: T, id: string}[] = $state([]);
    function resetSelectedRows() {
        selectedRows = []; // resetting the selected rows when fulldata changes
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
    let fulldata = $derived(Array.from(data));
    run(() => {
        columns, assignAutoColumns();
    });
    run(() => {
        uniqueRowIds = fulldata.map((row) => {
            const id = Math.random().toString(36).substr(2, 9);
            return { row: row, id: id  };
        }), resetSelectedRows();
    });
    run(() => {
        columns.forEach((col) => {
            if (col.visible === undefined) {
                col.visible = true;
            }
        })
    });
    let activeFilters = $derived(filters.filter(x => x.active));
    let grid = $derived(new GridFunctions<T>()
        .init(fulldata)
        .applyFilters(filters, columns)
        .sortBy(sortByColumn, sortOrder, groupBy, sortOrderSecondary, columns)
        .groupBy(groupBy,expandedGroups, groupsExpandedDefault, columns)
        .processPaging(groupBy, paging.currentPage, paging.itemsPerPage));
    run(() => {
        gridData = grid.data;
        dataUnpaged = grid.dataUnpaged;
        groupHeaders = grid.groupHeaders;
        groupHeadersUnpaged = grid.groupHeadersUnpaged;
        updatePaging();
    });
</script>

<theme.grid.container>
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
    <theme.grid.header.container>
        <theme.grid.header.row>
            {#if showCheckboxes}
                <theme.grid.header.checkbox checked={activeFilters.length == 0 ? fulldata.every(item => selectedRows.includes(item)) : Array.from(dataUnpaged).every(item => selectedRows.includes(item))} onChange={() => {toggleHeaderCheckbox()}} />
            {/if}
            {#each columns.filter(x => x.visible != false) as col (col.key)}
                {#if groupBy != col.key}
                    {@const sortable = col.sortable === undefined || col.sortable === true}
                    <theme.grid.header.content title={col.title} sortable={sortable} onClick={() => sortable && handleSort(col.key)}>
                        {#if sortable}
                            <theme.grid.header.sortIndicator isSorted={sortByColumn == col.key} isDescending={(groupBy && sortOrderSecondary == 1) || (!groupBy && sortOrder == 1)} />
                        {/if}
                    </theme.grid.header.content>
                {/if}
            {/each}
        </theme.grid.header.row>
    </theme.grid.header.container>
    <theme.grid.body.container>
        {#if groupBy}
            {#each groupHeaders as header, groupIndex (header.groupKey)}
                {@const unpagedHeader = groupHeadersUnpaged.find(x => x.groupKey == header.groupKey)}
                <theme.grid.groupby.container isSelected={showCheckboxes && unpagedHeader?.data.every(item => selectedRows.includes(item))}>
                    {#if showCheckboxes}
                        <theme.grid.groupby.checkbox checked={unpagedHeader?.data.every(item => selectedRows.includes(item))} onChange={() => { toggleGroupCheckbox(header); }} index={groupIndex} />
                    {/if}
                    <theme.grid.groupby.cell colspan={columns.length-1} onToggle={() => toggleGroup(header)} isExpanded={header.expanded}>
                        {@const col = columns.find(x => x.visible != false && x.key == groupBy)}
                        {#if col}
                            {@const value = header.titleData}
                            {@const renderComponent = col.renderComponent ? col.renderComponent : theme.grid.groupby.content}
    
                            {#if typeof value === 'object'}
                                {#if Object.keys(value).length > 0}
                                    {@const SvelteComponent = renderComponent}
                                    <SvelteComponent {...value} isGroupByHeader={true} />
                                {:else}
                                    {@const SvelteComponent_1 = renderComponent}
                                    <SvelteComponent_1 {...{value: value}} isGroupByHeader={true} />
                                {/if}
                            {:else}
                                {@const SvelteComponent_2 = renderComponent}
                                <SvelteComponent_2 {value} isGroupByHeader={true} />
                            {/if}
                            
                            {@const unpaged = groupHeadersUnpaged.find(x => x.groupKey == header.groupKey)}
                            <theme.grid.groupby.rowsCount showing={header.data.length} total={unpaged?.data.length} />
                        {/if}
                    </theme.grid.groupby.cell>
                </theme.grid.groupby.container>
                {#if header.expanded}
                    {#each header.data as row, index (getUniqueKey(row))}
                        <theme.grid.body.row isOdd={(index + 1) % 2 == 1} index={gridData.indexOf(row)} isSelected="{selectedRows.indexOf(row) >= 0}">
                            {#if showCheckboxes}
                                <theme.grid.body.checkbox value={row} index={gridData.indexOf(row)} bind:group={selectedRows} />
                            {/if}
                            {#each columns.filter(x => x.visible != false && x.key != groupBy) as col (col.key)}
                                <theme.grid.body.cell>
                                    {@const value = col.accessor ? col.accessor(row) : row[col.key]}
                                    {@const renderComponent = col.renderComponent ? col.renderComponent : theme.grid.body.content}
                
                                    {#if typeof value === 'object'}
                                        {#if Object.keys(value).length > 0}
                                            {@const SvelteComponent_3 = renderComponent}
                                            <SvelteComponent_3 {...value} />
                                        {:else}
                                            {@const SvelteComponent_4 = renderComponent}
                                            <SvelteComponent_4 {...{value: value}} />
                                        {/if}
                                    {:else}
                                        {@const SvelteComponent_5 = renderComponent}
                                        <SvelteComponent_5 {value} />
                                    {/if}
                                </theme.grid.body.cell>
                            {/each}
                        </theme.grid.body.row>
                    {/each}
                {/if}
            {/each}
        {:else}
            {#each gridData as row, index (getUniqueKey(row))}
                <theme.grid.body.row isOdd={(index+1) % 2 == 1} {index} isSelected="{selectedRows.indexOf(row) >= 0}">
                    {#if showCheckboxes}
                        <theme.grid.body.checkbox value={row} bind:group={selectedRows} index={index} />
                    {/if}
                    {#each columns.filter(x => x.visible != false) as col (col.key)}
                        <theme.grid.body.cell>
                            {@const value = col.accessor ? col.accessor(row) : row[col.key]}
                            {@const renderComponent = col.renderComponent ? col.renderComponent : theme.grid.body.content}

                            {#if typeof value === 'object'}
                                {#if Object.keys(value).length > 0}
                                    {@const SvelteComponent_6 = renderComponent}
                                    <SvelteComponent_6 {...value} />
                                {:else}
                                    {@const SvelteComponent_7 = renderComponent}
                                    <SvelteComponent_7 {...{value: value}} />
                                {/if}
                            {:else}
                                {@const SvelteComponent_8 = renderComponent}
                                <SvelteComponent_8 {value} />
                            {/if}
                        </theme.grid.body.cell>
                    {/each}
                </theme.grid.body.row>
            {/each}
        {/if}
    </theme.grid.body.container>
</theme.grid.container>