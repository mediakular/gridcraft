import type { Component } from "svelte";

export type GridColumn<T> = {
    key: string,
    title: string,
    visible?: boolean,
    sortable?: boolean,
    width?: number | string,
    renderComponent?: Component,
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
        container: Component;
        header: {
            container: Component,
            row: Component,
            content: Component,
            checkbox: Component,
            sortIndicator: Component,
        },
        groupby: {
            container: Component,
            checkbox: Component,
            cell: Component,
            content: Component,
            rowsCount: Component,
        },
        body: {
            container: Component,
            row: Component,
            cell: Component,
            checkbox: Component,
            content: Component
        }
    }
    footer: Component;
    paging: Component;
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