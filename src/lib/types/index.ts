import type { ComponentType } from "svelte";

export type GridColumn<T> = {
    key: string,
    title: string,
    visible?: boolean,
    sortable?: boolean,
    width?: number | string,
    renderComponent?: ComponentType,
    accessor?: (row: T) => unknown,
    sortValue?: (row: T) => string | number | Date | undefined
}

export type GridFilter = {
    key: string;
    columns: "all" | string | string[];
    filter: (columnValue: unknown, columnKey: string) => boolean;
    active: boolean;
}

export type GroupHeader<T> = {
    selected: boolean;
    groupKey: string;
    titleData: any;
    expanded: boolean;
    data: T[];
};

export type GridTheme = {
    grid: {
        container: ComponentType;
        header: {
            container: ComponentType,
            row: ComponentType,
            content: ComponentType,
            checkbox: ComponentType,
            sortIndicator: ComponentType,
        },
        groupby: {
            container: ComponentType,
            checkbox: ComponentType,
            cell: ComponentType,
            content: ComponentType,
            rowsCount: ComponentType,
        },
        body: {
            container: ComponentType,
            row: ComponentType,
            cell: ComponentType,
            checkbox: ComponentType,
            content: ComponentType
        }
    }
    footer: ComponentType;
    paging: ComponentType;
}

export class PagingData {
    currentPage: number;
    itemsPerPage: number;
    itemsPerPageOptions: number[];

    readonly totalPages: number;
    readonly totalResults: number;

    constructor(
        currentPage: number = 1,
        itemsPerPage: number = 10,
        itemsPerPageOptions: number[] = [10, 25, 50, 100]
    ) {
        this.currentPage = currentPage;
        this.itemsPerPage = itemsPerPage;
        this.itemsPerPageOptions = itemsPerPageOptions;
        this.totalPages = 0;
        this.totalResults = 0;
    }
}

export type PagingDataInternal = PagingData & {
    totalPages: number;
    totalResults: number;
}