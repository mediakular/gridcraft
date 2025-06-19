import type { PagingData } from "../../../types/index.js";
interface Props {
    paging: PagingData;
    children?: import('svelte').Snippet;
}
declare const Footer: import("svelte").Component<Props, {}, "paging">;
type Footer = ReturnType<typeof Footer>;
export default Footer;
