using AwesomeApp.Application.Accounts.Dtos;
using MediatR;

namespace AwesomeApp.Application.Accounts.Queries
{
    public class GetAccountQueryRequest : IRequest<AccountDto?>
    {
        public GetAccountQueryRequest(uint id)
        {
            Id = id;
        }

        public uint Id { get; private set; }
    }
}
