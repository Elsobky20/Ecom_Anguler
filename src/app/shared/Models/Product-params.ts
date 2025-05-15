export class ProductParam {
    CategoryId: number = 0;         // Filter by category (default: 0 = all)
    SortSelected: string = '';      // Sorting option (e.g., 'name', 'price', etc.)
    Search: string = '';            // Search term for filtering
    pageNumber: number = 1;         // Page number for pagination (default is 1)
    pageSize: number = 3;           // Number of items per page (default is 3)
  }