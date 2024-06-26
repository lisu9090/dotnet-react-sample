using AwesomeApp.Application.Features.Accounts.Validators;
using FluentValidation;

namespace AwesomeApp.Application.Features.Accounts.Commands
{
    internal class UpsertAccountCommandRequestValidator : AbstractValidator<UpsertAccountCommandRequest>
    {
        public UpsertAccountCommandRequestValidator()
        {
            RuleFor(request => request.Id)
                .NotEmpty();
            RuleFor(request => request.Email)
                .EmailAddress();
            RuleFor(request => request.Password)
                .StrongPassword()
                .When(request => request.Password != null);
            RuleFor(request => request.FullName)
                .NotEmpty();
            RuleFor(request => request.DateOfBirth)
                .DateOfBirth();
        }
    }
}
