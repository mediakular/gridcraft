import { type GridTheme, PagingData } from '../index.js';
interface Props {
    theme?: GridTheme;
    paging?: PagingData;
}
declare const Paging: import("svelte").Component<Props, {}, "paging">;
type Paging = ReturnType<typeof Paging>;
export default Paging;
