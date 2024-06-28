using FluentValidation;

namespace AwesomeApp.Application.Features.Accounts.Queries
{
    internal class AuthenticateAccountQueryRequestValidator : AbstractValidator<AuthenticateAccountQueryRequest>
    {
        public AuthenticateAccountQueryRequestValidator()
        {
            RuleFor(request => request.Email)
                .NotEmpty();
            RuleFor(request => request.Password)
                .NotEmpty();
        }
    }
}
