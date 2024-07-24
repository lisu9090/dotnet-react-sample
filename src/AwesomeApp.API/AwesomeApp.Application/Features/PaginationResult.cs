using System.Collections;

namespace AwesomeApp.Application.Features
{
    public class PaginationResult<T> : IEnumerable<T>
    {
        private PaginationResult() 
        {
        }

        public IEnumerable<T> Items { get; private set; }

        public uint PageNumber { get; private set; }

        public uint PageSize { get; private set; }

        public uint TotalCount { get; private set; }

        public static PaginationResult<T> Create(IEnumerable<T> items, uint pageNumber, uint pageSize, uint totalCount) =>
            new PaginationResult<T>()
            {
                Items = new List<T>(items).AsReadOnly(),
                PageNumber = pageNumber,
                PageSize = pageSize,
                TotalCount = totalCount
            };

        public IEnumerator<T> GetEnumerator()
        {
            return Items.GetEnumerator();
        }

        IEnumerator IEnumerable.GetEnumerator()
        {
            return GetEnumerator();
        }
    }
}
