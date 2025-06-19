import type { Component } from "svelte";
import type { GridBodyCellProps, GridBodyCheckboxProps, GridBodyContainerProps, GridBodyContentProps, GridBodyRowProps, GridColumnComponentProps, GridContainerProps, GridFooterProps, GridGroupByCellProps, GridGroupByCheckboxProps, GridGroupByContainerProps, GridGroupByContentProps, GridGroupByRowsCountProps, GridHeaderCheckboxProps, GridHeaderContainerProps, GridHeaderContentProps, GridHeaderIndicatorProps, GridHeaderRowProps, GridPagingProps } from "./props.js";
export declare type GridContainer = Component<GridContainerProps>;
export declare type GridFooter = Component<GridFooterProps>;
export declare type GridPaging = Component<GridPagingProps>;
export declare type GridHeaderContainer = Component<GridHeaderContainerProps>;
export declare type GridHeaderRow = Component<GridHeaderRowProps>;
export declare type GridHeaderContent = Component<GridHeaderContentProps>;
export declare type GridHeaderCheckbox = Component<GridHeaderCheckboxProps>;
export declare type GridHeaderIndicator = Component<GridHeaderIndicatorProps>;
export declare type GridGroupByContainer = Component<GridGroupByContainerProps>;
export declare type GridGroupByCheckbox = Component<GridGroupByCheckboxProps>;
export declare type GridGroupByCell = Component<GridGroupByCellProps>;
export declare type GridGroupByContent = Component<GridGroupByContentProps>;
export declare type GridGroupByRowsCount = Component<GridGroupByRowsCountProps>;
export declare type GridBodyContainer = Component<GridBodyContainerProps>;
export declare type GridBodyRow = Component<GridBodyRowProps>;
export declare type GridBodyCell = Component<GridBodyCellProps>;
export declare type GridBodyCheckbox = Component<GridBodyCheckboxProps>;
export declare type GridBodyContent = Component<GridBodyContentProps>;
export declare type GridColumnComponent = Component<GridColumnComponentProps>;
export type GridColumn<T> = {
    key: string;
    title: string;
    visible?: boolean;
    sortable?: boolean;
    width?: number | string;
    renderComponent?: GridColumnComponent;
    accessor?: (row: T) => unknown;
    sortValue?: (row: T) => string | number | Date | undefined;
};
export type GridFilter = {
    key: string;
    columns: "all" | string | string[];
    filter: (columnValue: unknown, columnKey: string) => boolean;
    active: boolean;
};
export type GroupHeader<T> = {
    selected: boolean;
    groupKey: string;
    titleData: any;
    expanded: boolean;
    data: T[];
};
export type GridTheme = {
    grid: {
        container: GridContainer;
        header: {
            container: GridHeaderContainer;
            row: GridHeaderRow;
            content: GridHeaderContent;
            checkbox: GridHeaderCheckbox;
            sortIndicator: GridHeaderIndicator;
        };
        groupby: {
            container: GridGroupByContainer;
            checkbox: GridGroupByCheckbox;
            cell: GridGroupByCell;
            content: GridGroupByContent;
            rowsCount: GridGroupByRowsCount;
        };
        body: {
            container: GridBodyContainer;
            row: GridBodyRow;
            cell: GridBodyCell;
            checkbox: GridBodyCheckbox;
            content: GridBodyContent;
        };
    };
    footer: GridFooter;
    paging: GridPaging;
};
export declare class PagingData {
    currentPage: number;
    itemsPerPage: number;
    itemsPerPageOptions: number[];
    readonly totalPages: number;
    readonly totalResults: number;
    constructor(currentPage?: number, itemsPerPage?: number, itemsPerPageOptions?: number[]);
}
export type PagingDataInternal = PagingData & {
    totalPages: number;
    totalResults: number;
};
