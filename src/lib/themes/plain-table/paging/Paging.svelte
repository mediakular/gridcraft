<script lang="ts">
    import PagingStore from "$lib/stores/PagingStore.js";
    import type { PagingData } from "$lib/types/index.js";

    $: paging = $PagingStore;

    function nextPage() {
        PagingStore.update((value: PagingData) => {
            return {
                ...value,
                currentPage: value.currentPage += 1
            };
        })
    }

    function prevPage() {
        PagingStore.update((value: PagingData) => {
            return {
                ...value,
                currentPage: value.currentPage -= 1
            };
        })
    }
</script>

<div>
    <button on:click={prevPage} type="button" disabled={paging.currentPage == 1 ? true : false} >
        <svg class="w-3 h-3" xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" viewBox="0 0 16 16">
            <path fill-rule="evenodd" d="M11.354 1.646a.5.5 0 0 1 0 .708L5.707 8l5.647 5.646a.5.5 0 0 1-.708.708l-6-6a.5.5 0 0 1 0-.708l6-6a.5.5 0 0 1 .708 0z"/>
        </svg>
        Previous
    </button>

    <button on:click={nextPage} type="button" disabled={paging.currentPage < paging.totalPages ? false : true}>
        Next
        <svg class="w-3 h-3" xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" viewBox="0 0 16 16">
            <path fill-rule="evenodd" d="M4.646 1.646a.5.5 0 0 1 .708 0l6 6a.5.5 0 0 1 0 .708l-6 6a.5.5 0 0 1-.708-.708L10.293 8 4.646 2.354a.5.5 0 0 1 0-.708z"/>
        </svg>
    </button>
</div>