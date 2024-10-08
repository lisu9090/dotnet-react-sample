using AwesomeApp.Application.Features.Accounts.Dtos;
using MediatR;

namespace AwesomeApp.Application.Features.Accounts.Queries
{
    /// <summary>
    /// GetAccountsQuery request
    /// </summary>
    public class GetAccountsQueryRequest : IRequest<PaginationResultDto<AccountDto>>
    {
        /// <summary>
        /// Gets or sets page number
        /// </summary>
        public uint PageNumber { get; set; }

        /// <summary>
        /// Gets or sets page size
        /// </summary>
        public uint PageSize { get; set; }
    }
}
