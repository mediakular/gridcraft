import { hash } from "./helpers/hash-helper.js";
import type { GridColumn, GridFilter, GroupHeader } from "./types/index.js";

export class GridFunctions<T> {
    public data: T[] = [];
    public dataUnpaged: T[] = [];
    public dataLength = 0;
    public groupHeaders: GroupHeader<T>[] = [];
    public groupHeadersUnpaged: GroupHeader<T>[] = [];

    init(data: T[]) : GridFunctions<T> {
        this.data = data;
        this.dataLength = this.data.length;
        return this;
    }

    applyFilters(filters: GridFilter[], columns: GridColumn<T>[]) : GridFunctions<T> {
        if (filters.length == 0) {
            return this;
        }

        const activeFilters = filters.filter(x => x.active);

        this.data = this.data.filter((row: T) => {
            if (activeFilters.length == 0) {
                return true;
            }
            for (const filter of activeFilters) {
                if ((typeof filter.columns === 'string' || filter.columns instanceof String) && filter.columns != "all") {
                    const filterCol = columns.find((col) => col.key == filter.columns);
                    if (filterCol) {
                        const rowValue = filterCol.accessor ? filterCol.accessor(row) : row[filterCol.key as keyof T];
                        if (!filter.filter(rowValue, filterCol.key)) {
                            return false;
                        }
                    }
                } else {
                    for (const col of columns.filter((x) => x.visible)) {
                        if (filter.columns === "all" || (Array.isArray(filter.columns) && filter.columns.some(x => x == col.key))) {
                            const rowValue = col.accessor ? col.accessor(row) : row[col.key as keyof T];
                            if (filter.filter(rowValue, col.key)) {
                                return true;
                            }
                        }
                    }
                    return false
                }
            }
            return true;
        })

        this.dataLength = this.data.length;

        return this;
    }

    sortBy(column: string, sortOrder: number, groupby: string, sortOrderSecondary: number, columns: GridColumn<T>[]): GridFunctions<T> {
        if (groupby) { // always order by the groupBy column here, if the sortbyColumn is != groupby the sort will be done later
            this.data = this.data.sort((a, b) => {
                
                const groupByCol = columns.find(x => x.key == groupby);

                const aValue: any = groupByCol?.sortValue ? groupByCol.sortValue(a) : groupByCol?.accessor ? groupByCol.accessor(a) : a[groupby as keyof T];
                const bValue: any = groupByCol?.sortValue ? groupByCol.sortValue(b) : groupByCol?.accessor ? groupByCol.accessor(b) : b[groupby as keyof T];

                if (groupby == column) {
                    return sortOrder * (aValue === bValue ? a.index - b.index : (aValue > bValue ? 1 : -1));
                }

                // run secundary sorting if groupBy != sortByColumn
                if (aValue != bValue) {
                    return sortOrder * (aValue > bValue ? 1 : -1);
                }

                const sortCol = columns.find(x => x.key === column);

                const aValueSecundary: any = sortCol?.sortValue ? sortCol.sortValue(a) : sortCol?.accessor ? sortCol.accessor(a) : a[column as keyof T];
                const bValueSecundary: any = sortCol?.sortValue ? sortCol.sortValue(b) : sortCol?.accessor ? sortCol.accessor(b) : b[column as keyof T];

                return sortOrderSecondary * (aValueSecundary === bValueSecundary ? a.index - b.index : (aValueSecundary > bValueSecundary ? 1 : -1));
            })

            return this;
        }

        const sortCol = columns.find(x => x.key == column);

        this.data.sort((a, b) => {
            const aValue: any = sortCol?.sortValue ? sortCol.sortValue(a) : sortCol?.accessor ? sortCol.accessor(a) : a[column as keyof T];
            const bValue: any = sortCol?.sortValue ? sortCol.sortValue(b) : sortCol?.accessor ? sortCol.accessor(b) : b[column as keyof T];

            return sortOrder * (aValue == bValue ? a.index - b.index : (aValue > bValue ? 1 : -1));
        });

        return this;
    }

    processPaging(currentPage: number, itemsPerPage: number, groupBy: string, columns: GridColumn<T>[]): GridFunctions<T> {
        this.dataUnpaged = [...this.data];

        console.log("paging", currentPage, itemsPerPage);

        if (!groupBy) {
            const startIndex = (currentPage - 1) * itemsPerPage;
            const endIndex = startIndex + itemsPerPage;

            this.data = this.data.slice(startIndex, endIndex);
            return this;
        }

        const startIndex = (currentPage - 1) * itemsPerPage;

        let rest = -1;
        let skippedCount = 0;

        const newGroupHeaders:GroupHeader<T>[] = [];

        for (const groupHeader of this.groupHeaders) {
            if (rest == 0) {
                break;
            }

            if (startIndex >= skippedCount + groupHeader.data.length) {
                if (groupHeader.expanded) {
                    skippedCount += groupHeader.data.length;
                }
                continue;
            } else if (!groupHeader.expanded) {
                newGroupHeaders.push(groupHeader);
                groupHeader.data = [];

                continue;
            }  else if (rest == -1) { // this is for the first group header we will be adding
                const start = startIndex - skippedCount;
                const end = Math.min(start + itemsPerPage, groupHeader.data.length);
                const initialLength = groupHeader.data.length;

                newGroupHeaders.push(groupHeader);
               
                groupHeader.data = groupHeader.data.slice(start, end);

                rest = Math.max(0, start + itemsPerPage - initialLength);
                
                skippedCount += initialLength;
            } else  { // this for the rest of the group headers we need to display (all after the first one)
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

    groupBy(groupBy: string, expandedGroups: { [x: string]: boolean; }, groupsExpandedDefault: boolean, columns: GridColumn<T>[]): GridFunctions<T> {
        if (!groupBy) {
            return this;
        }

        let groupByDataLength = 0;

        const groupCol = columns.find((x) => x.key == groupBy);

        this.data.forEach((row: T) => {
            const groupValue: object | string = groupCol?.accessor != undefined ? groupCol?.accessor(row) ?? '' : (row as { [key: string]: any })[groupBy] || '';
            const existingHeader = this.groupHeaders.find((x) => x.titleData == groupValue);

            if (existingHeader) {
                existingHeader.data.push(row);
                if (existingHeader.expanded) {
                    groupByDataLength++;
                }
            } else {
                const groupKey = hash(groupValue);
                const extistingGroup = this.groupHeaders.find(x => x.groupKey == groupKey);
                const expanded = groupsExpandedDefault ? !expandedGroups[groupKey] : expandedGroups[groupKey];

                if (!extistingGroup) {
                    this.groupHeaders.push({
                        selected: false,
                        groupKey: groupKey,
                        titleData: groupValue,
                        expanded: expanded,
                        data: [row],
                    });
                } else {
                    extistingGroup.data.push(row);
                }
                if (expanded) {
                    groupByDataLength++;
                }
            }
        });

        // deep clone group headers
        this.groupHeaders.forEach(header => {
            const newHeader = {...header};
            newHeader.data = [...newHeader.data]
            this.groupHeadersUnpaged.push(newHeader);
        });
        

        this.dataLength = groupByDataLength;

        return this;
    }
}
