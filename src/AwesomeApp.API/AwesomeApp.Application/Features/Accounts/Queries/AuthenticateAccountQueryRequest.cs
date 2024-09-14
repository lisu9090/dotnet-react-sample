using AwesomeApp.Application.Features.Accounts.Dtos;
using MediatR;

namespace AwesomeApp.Application.Features.Accounts.Queries
{
    /// <summary>
    /// AuthenticateAccountQuery request
    /// </summary>
    public class AuthenticateAccountQueryRequest : IRequest<AuthenticationResultDto>
    {
        /// <summary>
        /// Gets or set email
        /// </summary>
        public string? Email { get; set; }

        /// <summary>
        /// Gets or set password
        /// </summary>
        public string? Password { get; set; }
    }
}
