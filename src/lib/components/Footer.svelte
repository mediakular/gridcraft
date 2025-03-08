<script lang="ts">
    import { PlainTableCssTheme, type GridTheme, PagingData } from '$lib/index.js';

    interface Props {
        theme?: GridTheme;
        paging?: PagingData;
    }

    let { theme = PlainTableCssTheme, paging = $bindable(new PagingData()) }: Props = $props();
</script>

<theme.footer bind:paging >
    <theme.paging bind:paging />
</theme.footer>