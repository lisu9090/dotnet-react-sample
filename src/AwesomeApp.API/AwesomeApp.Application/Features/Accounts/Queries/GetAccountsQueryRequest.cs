using AwesomeApp.Application.Features.Accounts.Dtos;
using MediatR;

namespace AwesomeApp.Application.Features.Accounts.Queries
{
    public class GetAccountsQueryRequest : IRequest<PaginationResult<AccountDto>>
    {
        /// <summary>
        /// Gets or sets PageNumber
        /// </summary>
        public uint PageNumber { get; set; }

        /// <summary>
        /// Gets or sets PageSize
        /// </summary>
        public uint PageSize { get; set; }
    }
}
