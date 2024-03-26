<div class="gc-table-wrapper">
    <table class="gc-table">
        <slot />
    </table>
</div>

<style lang="css">
    .gc-table-wrapper {
        overflow-x: scroll;
        border-radius: var(--gc-table-radius, 2px);
    }

    .gc-table {
        border-collapse: collapse;
        background-color:var(--gc-table-bg-color, white);
        width: 100%;
        color: var(--gc-table-color, black);
    }

    :global(.dark) .gc-table-wrapper {
        filter: var(--gc-table-filter, invert(1));
    }
    
    :global(.dark) .gc-table-wrapper :global(img), 
    :global(.dark) .gc-table-wrapper :global(video), 
    :global(.dark) .gc-table-wrapper :global(iframe) {
        /* this reverts the filter on img, video and iframe  */
        filter: var(--gc-table-filter, invert(1));
    }
/* 
    @media (prefers-color-scheme: dark) {
        .gc-table-wrapper {
            filter: var(--gc-table-filter, invert(1));
        }
        
        .gc-table-wrapper :global(img), 
        .gc-table-wrapper :global(video), 
        .gc-table-wrapper :global(iframe) {
            this reverts the filter on img, video and iframe  
            filter: var(--gc-table-filter, invert(1));
        }
    } */
</style>