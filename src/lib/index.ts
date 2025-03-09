// Reexport your entry components here

import Grid from './components/Grid.svelte';
import GridFooter from './components/Footer.svelte';
import GridPaging from './components/Paging.svelte';

import { PagingData } from "./types/index.js";

import PlainTableTheme from './themes/plain-table/index.js';
import PrelineTheme from './themes/preline/index.js';
import PlainTableCssTheme from './themes/plain-table-css/index.js';
import CardsPlusTheme from './themes/cards-plus/index.js';

import type { GridColumn, GridFilter, GridTheme, GroupHeader } from './types/index.js';
import type { GridBodyCellProps, GridBodyCheckboxProps, GridBodyContainerProps, GridBodyContentProps, GridBodyRowProps, GridContainerProps, GridFooterProps, GridGroupByCellProps, GridGroupByCheckboxProps, GridGroupByContainerProps, GridGroupByContentProps, GridGroupByRowsCountProps, GridHeaderCheckboxProps, GridHeaderContainerProps, GridHeaderContentProps, GridHeaderIndicatorProps, GridHeaderRowProps, GridPagingProps } from './types/props.js';

// main components
export { 
    Grid,
    GridFooter,
    GridPaging,
    PagingData,
};

// types
export {
    type GridColumn,
    type GridFilter,
    type GroupHeader,
    type GridTheme,
};

// default themes
export {
    PlainTableTheme,
    PrelineTheme,
    PlainTableCssTheme,
    CardsPlusTheme,
};

// theme component props
export {
    type GridBodyCellProps,
    type GridBodyCheckboxProps,
    type GridBodyContainerProps,
    type GridBodyContentProps,
    type GridBodyRowProps,
    type GridContainerProps,
    type GridFooterProps,
    type GridGroupByCellProps,
    type GridGroupByCheckboxProps,
    type GridGroupByContainerProps,
    type GridGroupByContentProps,
    type GridGroupByRowsCountProps,
    type GridHeaderCheckboxProps,
    type GridHeaderContainerProps,
    type GridHeaderContentProps,
    type GridHeaderIndicatorProps,
    type GridHeaderRowProps,
    type GridPagingProps
}