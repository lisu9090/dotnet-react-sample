using FluentValidation;

namespace AwesomeApp.Application.Features.Accounts.Queries
{
    /// <summary>
    /// Object validator for <see cref="AuthenticateAccountQueryRequest"/>
    /// </summary>
    internal class AuthenticateAccountQueryRequestValidator : AbstractValidator<AuthenticateAccountQueryRequest>
    {
        /// <summary>
        /// Creates an instance
        /// </summary>
        public AuthenticateAccountQueryRequestValidator()
        {
            RuleFor(request => request.Email)
                .NotEmpty();
            RuleFor(request => request.Password)
                .NotEmpty();
        }
    }
}
