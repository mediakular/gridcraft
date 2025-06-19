import { type GridTheme, PagingData } from '../index.js';
interface Props {
    theme?: GridTheme;
    paging?: PagingData;
}
declare const Footer: import("svelte").Component<Props, {}, "paging">;
type Footer = ReturnType<typeof Footer>;
export default Footer;
