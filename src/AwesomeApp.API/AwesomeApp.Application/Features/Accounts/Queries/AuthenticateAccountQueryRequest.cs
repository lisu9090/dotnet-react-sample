using AwesomeApp.Application.Features.Accounts.Dtos;
using MediatR;

namespace AwesomeApp.Application.Features.Accounts.Queries
{
    public class AuthenticateAccountQueryRequest : IRequest<AuthenticationResultDto>
    {
        /// <summary>
        /// Gets or set Email
        /// </summary>
        public string? Email { get; set; }

        /// <summary>
        /// Gets or set Password
        /// </summary>
        public string? Password { get; set; }
    }
}
