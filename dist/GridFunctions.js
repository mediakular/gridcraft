import { hash } from "./helpers/hash-helper.js";
export class GridFunctions {
    data = [];
    dataUnpaged = [];
    dataLength = 0;
    groupHeaders = [];
    groupHeadersUnpaged = [];
    /**
     * Initializes the GridFunctions instance with the provided data array.
     *
     * @param {T[]} data - The data array to initialize the GridFunctions with.
     * @return {GridFunctions<T>} The initialized GridFunctions instance.
     */
    init(data) {
        this.data = data;
        this.dataLength = this.data.length;
        return this;
    }
    /**
     * Applies filters to the grid data.
     *
     * @param {GridFilter[]} filters - An array of grid filters.
     * @param {GridColumn<T>[]} columns - An array of grid columns.
     * @return {GridFunctions<T>} - The updated grid functions object.
     */
    applyFilters(filters, columns) {
        if (filters.length == 0) {
            return this;
        }
        const activeFilters = filters.filter(x => x.active);
        this.data = this.data.filter((row) => {
            if (activeFilters.length == 0) {
                return true;
            }
            return activeFilters.every((filter) => {
                if ((typeof filter.columns === 'string' || filter.columns instanceof String) && filter.columns != "all") {
                    const filterCol = columns.find((col) => col.key == filter.columns);
                    if (filterCol) {
                        const rowValue = filterCol.accessor ? filterCol.accessor(row) : row[filterCol.key];
                        if (filter.filter(rowValue, filterCol.key)) {
                            return true;
                        }
                    }
                }
                else {
                    for (const col of columns) {
                        if (filter.columns === "all" || (Array.isArray(filter.columns) && filter.columns.some(x => x == col.key))) {
                            const rowValue = col.accessor ? col.accessor(row) : row[col.key];
                            if (filter.filter(rowValue, col.key)) {
                                return true;
                            }
                        }
                    }
                }
                return false;
            });
        });
        this.dataLength = this.data.length;
        return this;
    }
    /**
     * Sorts the data in the grid by the specified column and order, and then by the specified groupBy column and secondary order if provided.
     *
     * @param {string} column - The column to sort by
     * @param {number} sortOrder - The sort order for the primary column
     * @param {string} groupby - The column to group by
     * @param {number} sortOrderSecondary - The sort order for the secondary column
     * @param {GridColumn<T>[]} columns - The columns to be used for sorting
     * @return {GridFunctions<T>} This instance of GridFunctions for chaining purposes
     */
    sortBy(column, sortOrder, groupby, sortOrderSecondary, columns) {
        if (groupby) { // always order by the groupBy column here, if the sortbyColumn is != groupby the sort will be done later
            this.data = this.data.sort((a, b) => {
                const groupByCol = columns.find(x => x.key == groupby);
                const aValue = groupByCol?.sortValue ? groupByCol.sortValue(a) : groupByCol?.accessor ? groupByCol.accessor(a) : a[groupby];
                const bValue = groupByCol?.sortValue ? groupByCol.sortValue(b) : groupByCol?.accessor ? groupByCol.accessor(b) : b[groupby];
                if (groupby == column) {
                    return sortOrder * (aValue === bValue ? a.index - b.index : (aValue > bValue ? 1 : -1));
                }
                // run secondary sorting if groupBy != sortByColumn
                if (aValue != bValue) {
                    return sortOrder * (aValue > bValue ? 1 : -1);
                }
                const sortCol = columns.find(x => x.key === column);
                const aValuesecondary = sortCol?.sortValue ? sortCol.sortValue(a) : sortCol?.accessor ? sortCol.accessor(a) : a[column];
                const bValuesecondary = sortCol?.sortValue ? sortCol.sortValue(b) : sortCol?.accessor ? sortCol.accessor(b) : b[column];
                return sortOrderSecondary * (aValuesecondary === bValuesecondary ? a.index - b.index : (aValuesecondary > bValuesecondary ? 1 : -1));
            });
            return this;
        }
        const sortCol = columns.find(x => x.key == column);
        this.data.sort((a, b) => {
            const aValue = sortCol?.sortValue ? sortCol.sortValue(a) : sortCol?.accessor ? sortCol.accessor(a) : a[column];
            const bValue = sortCol?.sortValue ? sortCol.sortValue(b) : sortCol?.accessor ? sortCol.accessor(b) : b[column];
            return sortOrder * (aValue == bValue ? a.index - b.index : (aValue > bValue ? 1 : -1));
        });
        return this;
    }
    /**
     * Processes paging for the grid based on the provided groupBy, currentPage, and itemsPerPage.
     * If groupBy is not provided, it processes paging for the entire grid.
     *
     * @param {string} groupBy - The key of the column to group the data by.
     * @param {number} currentPage - The current page number.
     * @param {number} itemsPerPage - The number of items to display per page.
     * @return {GridFunctions<T>} The updated GridFunctions instance.
     */
    processPaging(groupBy, currentPage, itemsPerPage) {
        this.dataUnpaged = [...this.data];
        if (!groupBy) {
            const startIndex = (currentPage - 1) * itemsPerPage;
            const endIndex = startIndex + itemsPerPage;
            this.data = this.data.slice(startIndex, endIndex);
            return this;
        }
        const startIndex = (currentPage - 1) * itemsPerPage;
        let rest = -1;
        let skippedCount = 0;
        const newGroupHeaders = [];
        for (const groupHeader of this.groupHeaders) {
            if (rest == 0) {
                break;
            }
            if (startIndex >= skippedCount + groupHeader.data.length) {
                if (groupHeader.expanded) {
                    skippedCount += groupHeader.data.length;
                }
                continue;
            }
            else if (!groupHeader.expanded) {
                newGroupHeaders.push(groupHeader);
                groupHeader.data = [];
                continue;
            }
            else if (rest == -1) { // this is for the first group header we will be adding
                const start = startIndex - skippedCount;
                const end = Math.min(start + itemsPerPage, groupHeader.data.length);
                const initialLength = groupHeader.data.length;
                newGroupHeaders.push(groupHeader);
                groupHeader.data = groupHeader.data.slice(start, end);
                rest = Math.max(0, start + itemsPerPage - initialLength);
                skippedCount += initialLength;
            }
            else { // this for the rest of the group headers we need to display (all after the first one)
                newGroupHeaders.push(groupHeader);
                const initialLength = groupHeader.data.length;
                const end = Math.min(rest, groupHeader.data.length);
                groupHeader.data = groupHeader.data.slice(0, end);
                rest -= groupHeader.data.length;
                skippedCount += initialLength;
            }
        }
        this.groupHeaders = newGroupHeaders;
        return this;
    }
    /**
     * Groups the data by the specified key and updates the group headers and data length.
     *
     * @param {string} groupByKey - The key to group the data by.
     * @param {object} expandedGroups - An object containing the expanded groups.
     * @param {boolean} groupsExpandedDefault - The default value for group expansion.
     * @param {GridColumn<T>[]} columns - An array of columns.
     * @return {GridFunctions<T>} The updated instance of GridFunctions.
     */
    groupBy(groupByKey, expandedGroups, groupsExpandedDefault, columns) {
        if (!groupByKey) {
            return this;
        }
        const groupColumn = columns.find((col) => col.key === groupByKey);
        if (!groupColumn) {
            return this;
        }
        const groupHeaders = [];
        const groupDataLength = this.data.reduce((length, row) => {
            const groupValue = groupColumn.accessor
                ? groupColumn.accessor(row) || ''
                : row[groupByKey] || '';
            const groupKey = hash(groupValue);
            const isExpanded = groupsExpandedDefault
                ? !expandedGroups[groupKey]
                : expandedGroups[groupKey];
            const existingGroup = groupHeaders.find((header) => header.groupKey === groupKey);
            if (existingGroup) {
                existingGroup.data.push(row);
                return isExpanded ? length + 1 : length;
            }
            groupHeaders.push({
                selected: false,
                groupKey,
                titleData: groupValue,
                expanded: isExpanded,
                data: [row],
            });
            return isExpanded ? length + 1 : length;
        }, 0);
        this.groupHeaders = groupHeaders;
        // deep clone group headers, we need to do this because the group headers are mutable
        this.groupHeaders.forEach(header => {
            const newHeader = { ...header };
            newHeader.data = [...newHeader.data];
            this.groupHeadersUnpaged.push(newHeader);
        });
        this.dataLength = groupDataLength;
        return this;
    }
}
