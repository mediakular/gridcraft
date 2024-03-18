<script lang="ts">
    import Table from "./table/Table.svelte";
    import TableHead from "./table/TableHead.svelte";
    import TableBody from "./table/TableBody.svelte";
    import Th from "./table/Th.svelte";
    import ThTr from "./table/ThTr.svelte";
    import ThCheckbox from "./table/ThCheckbox.svelte";
    import ThSortIndicator from "./table/ThSortIndicator.svelte";
    import TrGroupByHeader from "./table/groupby/TrGroupByHeader.svelte";
    import TdGroupByCheckbox from "./table/groupby/TdGroupByCheckbox.svelte";
    import TdGroupBy from "./table/groupby/TdGroupBy.svelte";
    import GroupByDefaultTitle from "./table/groupby/GroupByDefaultTitle.svelte";
    import GroupByRowsCount from "./table/groupby/GroupByRowsCount.svelte";
    import TrRow from "./table/row/TrRow.svelte";
    import TdCheckbox from "./table/row/TdCheckbox.svelte";
    import RowDefaultTitle from "./table/row/DefaultTitle.svelte";
    import TdRow from "./table/row/TdRow.svelte";

	import { GridFunctions, type GridFilter, type GridColumn, type GroupHeader } from "../GridFunctions.js";

    type T = $$Generic<any>;
    type ExpandedGroups = { [value:string] : boolean };

    export let data: Iterable<T> | ArrayLike<T> = [];
    export let dataUnpaged: Iterable<T> | ArrayLike<T> = []; // same as data, but nut cut for paging. Used for exports
    export let columns: GridColumn<T>[] = [];
    export let gridFilters: GridFilter[] = [];

    export let groupBy = ""; // Default grouping column
    export let sortByColumn = "";
    export let itemsPerPage = 10;
    export let sortOrder = 1; // 1 for ascending, -1 for descending
    export let currentPage = 1;
    export let totalPages = 0;
    export let totalResults = 0;
    export let showCheckboxes = false;
    export let groupsExpandedDefault = true;

    export let table = Table;
    export let thead = TableHead;
    export let theadTr = ThTr;
    export let tbody = TableBody;
    export let th = Th;
    export let thCheckbox = ThCheckbox;
    export let thSortIndicator = ThSortIndicator;
    export let trGroupByHeader = TrGroupByHeader;
    export let tdGroupByCheckbox = TdGroupByCheckbox;
    export let tdGroupBy = TdGroupBy;
    export let groupByDefaultTitle = GroupByDefaultTitle;
    export let groupByRowsCount = GroupByRowsCount;
    export let trRow = TrRow;
    export let tdRow = TdRow;
    export let tdCheckbox = TdCheckbox;
    export let rowDefaultTitle = RowDefaultTitle;
    export let selectedRows: T[] = [];


    let sortOrderSecondary = 1; // 1 for ascending, -1 for descending
    let expandedGroups: ExpandedGroups = {};

    $: fulldata = Array.from(data);
    $: columns.forEach((col) => {
        if (col.visible === undefined) {
            col.visible = true;
        }
    })
    $: grid = new GridFunctions<T>()
        .init(fulldata)
        .applyFilters(gridFilters, columns)
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

<svelte:component this={table}>
    <colgroup>
        {#each columns.filter(x => x.visible != false) as col (col.key)}
            {#if groupBy != col.key}
                <col span="1" style="{col.width ? "width:" + (Number.isInteger(col.width) ? `${col.width}px` : col.width) : ""}">
            {/if}
        {/each}
    </colgroup>
    <svelte:component this={thead}>
        <svelte:component this={theadTr}>
            {#if showCheckboxes}
                <svelte:component this={thCheckbox} checked={fulldata.every(item => selectedRows.includes(item))} onChange={() => {toggleHeaderCheckbox()}} />
            {/if}
            {#each columns.filter(x => x.visible != false) as col (col.key)}
                {#if groupBy != col.key}
                    {@const sortable = col.sortable === undefined || col.sortable === true}
                    <svelte:component this={th} title={col.title} sortable={sortable} onClick={() => sortable && handleSort(col.key)}>
                        {#if sortable}
                            <svelte:component this={thSortIndicator} isSorted={sortByColumn == col.key} isDescending={(groupBy && sortOrderSecondary == 1) || (!groupBy && sortOrder == 1)} />
                        {/if}
                    </svelte:component>
                {/if}
            {/each}
        </svelte:component>
    </svelte:component>
    <svelte:component this={tbody}>
        {#if groupBy}
            {#each groupHeaders as header, index (header.groupKey)}
                <svelte:component this={trGroupByHeader}>
                    {#if showCheckboxes}
                        {@const unpagedHeader = groupHeadersUnpaged.find(x => x.groupKey == header.groupKey)}
                        <svelte:component this={tdGroupByCheckbox} checked={unpagedHeader?.data.every(item => selectedRows.includes(item))} onChange={() => { toggleGroupCheckbox(header); }} index={index} />
                    {/if}
                    <svelte:component this={tdGroupBy} colspan={columns.length-1} onToggle={() => toggleGroup(header)} isExpanded={header.expanded}>
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
                                    <svelte:component this={groupByDefaultTitle} value={header.titleData} />
                                {/if}
                                
                                {@const unpaged = groupHeadersUnpaged.find(x => x.groupKey == header.groupKey)}
                                <svelte:component this={groupByRowsCount} showing={header.data.length} total={unpaged?.data.length} />
                            {/if}
                        {/each}
                    </svelte:component>
                </svelte:component>
                {#if header.expanded}
                    {#each header.data as row, index (row.id || generateUniqueKey())}
                        <svelte:component this={trRow} isOdd={(index+1) % 2 == 1}>
                            {#if showCheckboxes}
                                <svelte:component this={tdCheckbox} value={row} index={index} bind:group={selectedRows} />
                            {/if}
                            {#each columns.filter(x => x.visible != false) as col (col.key)}
                                {#if groupBy != col.key}
                                    <svelte:component this={tdRow}>
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
                                            <svelte:component this={rowDefaultTitle} value={value} />
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
                <svelte:component this={trRow} isOdd={(index+1) % 2 == 1}>
                    {#if showCheckboxes}
                        <svelte:component this={tdCheckbox} value={row} bind:group={selectedRows} index={index} />
                    {/if}
                    {#each columns.filter(x => x.visible != false) as col (col.key)}
                        {#if groupBy != col.key}
                            <svelte:component this={tdRow}>
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
                                    <svelte:component this={rowDefaultTitle} value={value} />
                                {/if}
                            </svelte:component>
                        {/if}
                    {/each}
                </svelte:component>
            {/each}
        {/if}
    </svelte:component>
</svelte:component>