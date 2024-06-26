using AwesomeApp.Application.Features.Accounts.Validators;
using FluentValidation;

namespace AwesomeApp.Application.Features.Accounts.Commands
{
    internal class CreateAccountCommandRequestValidation : AbstractValidator<CreateAccountCommandRequest>
    {
        public CreateAccountCommandRequestValidation()
        {
            RuleFor(request => request.Email)
                .EmailAddress();
            RuleFor(request => request.Password)
                .StrongPassword();
            RuleFor(request => request.FullName)
                .NotEmpty();
            RuleFor(request => request.DateOfBirth)
                .DateOfBirth();
        }
    }
}
