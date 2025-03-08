<script lang="ts">
    import type { PagingData } from "$lib/types/index.js";

    interface Props {
        paging: PagingData;
    }

    let { paging = $bindable() }: Props = $props();

    function nextPage() {
        paging.currentPage += 1;
    }

    function prevPage() {
        paging.currentPage -= 1;
    }
</script>

<div class="gc-paging">
    <button onclick={prevPage} type="button" disabled={paging.currentPage == 1 ? true : false} >
        <svg class="w-3 h-3" xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" viewBox="0 0 16 16">
            <path fill-rule="evenodd" d="M11.354 1.646a.5.5 0 0 1 0 .708L5.707 8l5.647 5.646a.5.5 0 0 1-.708.708l-6-6a.5.5 0 0 1 0-.708l6-6a.5.5 0 0 1 .708 0z"/>
        </svg>
        Previous
    </button>

    <button onclick={nextPage} type="button" disabled={paging.currentPage < paging.totalPages ? false : true}>
        Next
        <svg class="w-3 h-3" xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" viewBox="0 0 16 16">
            <path fill-rule="evenodd" d="M4.646 1.646a.5.5 0 0 1 .708 0l6 6a.5.5 0 0 1 0 .708l-6 6a.5.5 0 0 1-.708-.708L10.293 8 4.646 2.354a.5.5 0 0 1 0-.708z"/>
        </svg>
    </button>
</div>

<style>
    .gc-paging {
        display: flex;
        justify-content: space-between;
        align-items: center;
        gap: var(--gc-footer-button-gap, 0.5rem);
    }

    .gc-paging button {
        display: flex;
        align-items: center;
        background-color: var(--gc-footer-button-bg-color, var(--gc-secondary-color));
        border: var(--gc-footer-button-border, 1px solid var(--gc-secondary-color));
        border-radius: var(--gc-footer-button-border-radius, 0.25rem);
        padding: var(--gc-footer-button-padding, 0.5rem 0.75rem);
    }
    .gc-paging button:hover:not(:disabled) {
        filter:brightness(90%);
    }
    .gc-paging button:disabled {
        opacity: 0.5;
    }
</style>