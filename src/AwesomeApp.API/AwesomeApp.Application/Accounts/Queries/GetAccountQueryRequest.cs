using AwesomeApp.Application.Accounts.Dtos;
using MediatR;

namespace AwesomeApp.Application.Accounts.Queries
{
    public class GetAccountQueryRequest : IRequest<AccountDto?>
    {
        public uint Id { get; set; }
    }
}
