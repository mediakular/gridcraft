import Table from "./Table.svelte";
import TableHead from "./header/TableHead.svelte";
import TableBody from "./row/TableBody.svelte";
import Th from "./header/Th.svelte";
import ThTr from "./header/ThTr.svelte";
import ThCheckbox from "./header/ThCheckbox.svelte";
import ThSortIndicator from "./header/ThSortIndicator.svelte";
import TrGroupByHeader from "./groupby/TrGroupByHeader.svelte";
import TdGroupByCheckbox from "./groupby/TdGroupByCheckbox.svelte";
import TdGroupBy from "./groupby/TdGroupBy.svelte";
import GroupByTitle from "./groupby/GroupByTitle.svelte";
import GroupByRowsCount from "./groupby/GroupByRowsCount.svelte";
import TrRow from "./row/TrRow.svelte";
import TdCheckbox from "./row/TdCheckbox.svelte";
import Content from "./row/Content.svelte";
import TdRow from "./row/TdRow.svelte";
import Footer from "./footer/Footer.svelte";
import Paging from "./paging/Paging.svelte";
import type { GridTheme } from "$lib/types/index.js";

const PlainTableTheme : GridTheme = {
    footer: Footer,
    paging: Paging,
    grid: {
        container: Table,
        header: {
            container: TableHead,
            row: ThTr,
            content: Th,
            checkbox: ThCheckbox,
            sortIndicator: ThSortIndicator,
        },
        groupby: {
            container: TrGroupByHeader,
            checkbox: TdGroupByCheckbox,
            cell: TdGroupBy,
            content: GroupByTitle,
            rowsCount: GroupByRowsCount,
        },
        body: {
            container: TableBody,
            row: TrRow,
            cell: TdRow,
            checkbox: TdCheckbox,
            content: Content
        }
    }
}

export default PlainTableTheme;