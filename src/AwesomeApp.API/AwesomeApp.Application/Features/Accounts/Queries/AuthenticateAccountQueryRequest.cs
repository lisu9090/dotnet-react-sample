using AwesomeApp.Application.Features.Accounts.Dtos;
using AwesomeApp.Application.Middlewares.RequestValidations;
using MediatR;

namespace AwesomeApp.Application.Features.Accounts.Queries
{
    public class AuthenticateAccountQueryRequest : IRequest<AuthenticationResultDto>
    {
        /// <summary>
        /// Gets or set Email
        /// </summary>
        [Required]
        public string? Email { get; set; }

        /// <summary>
        /// Gets or set Password
        /// </summary>
        [Required]
        public string? Password { get; set; }
    }
}
