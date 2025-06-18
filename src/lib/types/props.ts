import type { Snippet } from "svelte"
import type { PagingData } from "./index.js"


export interface GridColumnComponentProps {
    [key: string]: any;
}

export interface GridContainerProps {
    children: Snippet<[]> | undefined
}

export interface GridFooterProps {
    paging: PagingData, 
    children: Snippet<[]> | undefined
}

export interface GridPagingProps {
    paging: PagingData
}

export interface GridHeaderContainerProps {
    children: Snippet<[]> | undefined
}

export interface GridHeaderRowProps {
    children: Snippet<[]> | undefined
}

export interface GridHeaderContentProps {
    title?: string; 
    onClick?: any;
    sortable?: boolean;
    children?: Snippet<[]> | undefined;
}

export interface GridHeaderCheckboxProps {
    checked?: boolean;
    onChange?: any;
}

export interface GridHeaderIndicatorProps {
    isSorted?: boolean;
    isDescending?: boolean;
}

export interface GridGroupByContainerProps {
    isSelected: boolean;
    children?: Snippet<[]> | undefined;
}

export interface GridGroupByCheckboxProps {
    index?: number;
    checked?: boolean;
    onChange?: any;
}

export interface GridGroupByCellProps {
    colspan?: number;
    onToggle?: any; isExpanded?: boolean; 
    children?: Snippet<[]> | undefined;
}

export interface GridGroupByContentProps {
    isGroupByHeader?: boolean;
    value?: string;
}

export interface GridGroupByRowsCountProps {
    showing?: number;
    total?: number;
}

export interface GridBodyContainerProps {
    children?: Snippet<[]> | undefined;
}

export interface GridBodyRowProps {
    index: any;
    isOdd?: boolean;
    isSelected?: boolean;
    children?: Snippet<[]> | undefined;
}

export interface GridBodyCellProps {
    children?: Snippet<[]> | undefined;
}

export interface GridBodyCheckboxProps {
    index?: any;
    group?: any;
    value?: any;
    checked?: boolean;
}

export interface GridBodyContentProps {
    value?: string;
}
