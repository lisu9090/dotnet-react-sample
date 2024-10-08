using AwesomeApp.Application.Features.Accounts.Dtos;
using MediatR;

namespace AwesomeApp.Application.Features.Accounts.Queries
{
    /// <summary>
    /// GetAccountQuery request
    /// </summary>
    public class GetAccountQueryRequest : IRequest<AccountDto?>
    {
        /// <summary>
        /// Gets or set ID
        /// </summary>
        public uint Id { get; set; }
    }
}
