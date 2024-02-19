using AwesomeApp.Application.Features.Accounts.Dtos;
using MediatR;

namespace AwesomeApp.Application.Features.Accounts.Queries
{
    public class GetAccountQueryRequest : IRequest<AccountDto?>
    {
        /// <summary>
        /// Gets or set Email
        /// </summary>
        public uint Id { get; set; }
    }
}
