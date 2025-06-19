import type { GridColumn, GridFilter, GroupHeader } from "./types/index.js";
export declare class GridFunctions<T> {
    data: T[];
    dataUnpaged: T[];
    dataLength: number;
    groupHeaders: GroupHeader<T>[];
    groupHeadersUnpaged: GroupHeader<T>[];
    /**
     * Initializes the GridFunctions instance with the provided data array.
     *
     * @param {T[]} data - The data array to initialize the GridFunctions with.
     * @return {GridFunctions<T>} The initialized GridFunctions instance.
     */
    init(data: T[]): GridFunctions<T>;
    /**
     * Applies filters to the grid data.
     *
     * @param {GridFilter[]} filters - An array of grid filters.
     * @param {GridColumn<T>[]} columns - An array of grid columns.
     * @return {GridFunctions<T>} - The updated grid functions object.
     */
    applyFilters(filters: GridFilter[], columns: GridColumn<T>[]): GridFunctions<T>;
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
    sortBy(column: string, sortOrder: number, groupby: string, sortOrderSecondary: number, columns: GridColumn<T>[]): GridFunctions<T>;
    /**
     * Processes paging for the grid based on the provided groupBy, currentPage, and itemsPerPage.
     * If groupBy is not provided, it processes paging for the entire grid.
     *
     * @param {string} groupBy - The key of the column to group the data by.
     * @param {number} currentPage - The current page number.
     * @param {number} itemsPerPage - The number of items to display per page.
     * @return {GridFunctions<T>} The updated GridFunctions instance.
     */
    processPaging(groupBy: string, currentPage: number, itemsPerPage: number): GridFunctions<T>;
    /**
     * Groups the data by the specified key and updates the group headers and data length.
     *
     * @param {string} groupByKey - The key to group the data by.
     * @param {object} expandedGroups - An object containing the expanded groups.
     * @param {boolean} groupsExpandedDefault - The default value for group expansion.
     * @param {GridColumn<T>[]} columns - An array of columns.
     * @return {GridFunctions<T>} The updated instance of GridFunctions.
     */
    groupBy(groupByKey: string, expandedGroups: {
        [key: string]: boolean;
    }, groupsExpandedDefault: boolean, columns: GridColumn<T>[]): GridFunctions<T>;
}
