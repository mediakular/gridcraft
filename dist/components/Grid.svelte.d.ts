import type { GridColumn, GridFilter, GridTheme } from "../types/index.js";
declare class __sveltets_Render<T extends any> {
    props(): {
        data?: Iterable<T> | ArrayLike<T> | undefined;
        dataUnpaged?: Iterable<T> | ArrayLike<T> | undefined;
        columns?: GridColumn<T>[] | undefined;
        filters?: GridFilter[];
        groupBy?: string;
        sortByColumn?: string;
        sortOrder?: number;
        showCheckboxes?: boolean;
        groupsExpandedDefault?: boolean;
        selectedRows?: T[] | undefined;
        theme?: GridTheme;
        paging?: any;
    };
    events(): {};
    slots(): {};
    bindings(): "paging" | "data" | "dataUnpaged" | "columns" | "sortByColumn" | "sortOrder" | "selectedRows";
    exports(): {};
}
interface $$IsomorphicComponent {
    new <T extends any>(options: import('svelte').ComponentConstructorOptions<ReturnType<__sveltets_Render<T>['props']>>): import('svelte').SvelteComponent<ReturnType<__sveltets_Render<T>['props']>, ReturnType<__sveltets_Render<T>['events']>, ReturnType<__sveltets_Render<T>['slots']>> & {
        $$bindings?: ReturnType<__sveltets_Render<T>['bindings']>;
    } & ReturnType<__sveltets_Render<T>['exports']>;
    <T extends any>(internal: unknown, props: ReturnType<__sveltets_Render<T>['props']> & {}): ReturnType<__sveltets_Render<T>['exports']>;
    z_$$bindings?: ReturnType<__sveltets_Render<any>['bindings']>;
}
declare const Grid: $$IsomorphicComponent;
type Grid<T extends any> = InstanceType<typeof Grid<T>>;
export default Grid;
