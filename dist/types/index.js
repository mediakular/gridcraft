export class PagingData {
    currentPage;
    itemsPerPage;
    itemsPerPageOptions;
    totalPages;
    totalResults;
    constructor(currentPage = 1, itemsPerPage = 10, itemsPerPageOptions = [10, 25, 50, 100]) {
        this.currentPage = currentPage;
        this.itemsPerPage = itemsPerPage;
        this.itemsPerPageOptions = itemsPerPageOptions;
        this.totalPages = 0;
        this.totalResults = 0;
    }
}
