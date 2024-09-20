namespace AwesomeApp.Application.Features
{
    /// <summary>
    /// Transfers subset of <typeparamref name="T"/> with pagination informations; object of this class is readonly
    /// </summary>
    public class PaginationResultDto<T>
    {
        /// <summary>
        /// Creates new instance
        /// </summary>
        /// <param name="items">Page data items</param>
        /// <param name="pageNumber">Page number</param>
        /// <param name="pageSize">Page size</param>
        /// <param name="totalCount">Total number of elements in set</param>
        public PaginationResultDto(IEnumerable<T> items, uint pageNumber, uint pageSize, uint totalCount) 
        {
            Items = new List<T>(items).AsReadOnly();
            PageNumber = pageNumber;
            PageSize = pageSize;
            TotalCount = totalCount;
        }

        /// <summary>
        /// Gets page data items
        /// </summary>
        public IEnumerable<T> Items { get; }

        /// <summary>
        /// Gets page number
        /// </summary>
        public uint PageNumber { get; }

        /// <summary>
        /// Gets page size
        /// </summary>
        public uint PageSize { get; }

        /// <summary>
        /// Gets total number of <typeparamref name="T"/> in set
        /// </summary>
        public uint TotalCount { get; }
    }
}
