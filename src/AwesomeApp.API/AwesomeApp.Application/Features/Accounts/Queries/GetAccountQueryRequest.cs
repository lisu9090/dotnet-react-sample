using AwesomeApp.Application.Features.Accounts.Dtos;
using MediatR;

namespace AwesomeApp.Application.Features.Accounts.Queries
{
    public class GetAccountQueryRequest : IRequest<AccountDto?>
    {
        /// <summary>
        /// Gets or set Id
        /// </summary>
        public uint Id { get; set; }
    }
}
