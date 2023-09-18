using AwesomeApp.Application.Accounts.Dtos;
using MediatR;

namespace AwesomeApp.Application.Accounts.Queries
{
    public class AuthenticateAccountQueryRequest : IRequest<AuthenticationResultDto>
    {
        public string? Email { get; set; }

        public string? Password { get; set; }
    }
}
