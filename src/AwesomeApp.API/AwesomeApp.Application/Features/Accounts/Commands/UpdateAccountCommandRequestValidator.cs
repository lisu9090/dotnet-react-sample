using AwesomeApp.Application.Features.Accounts.Validators;
using FluentValidation;

namespace AwesomeApp.Application.Features.Accounts.Commands
{
    internal class UpdateAccountCommandRequestValidator : AbstractValidator<UpdateAccountCommandRequest>
    {
        public UpdateAccountCommandRequestValidator()
        {
            RuleFor(request => request.Id)
                .NotEmpty();
            RuleFor(request => request.FullName)
                .NotEmpty()
                .When(request => request.FullName != null);
            RuleFor(request => request.DateOfBirth)
                .DateOfBirth()
                .When(request => request.DateOfBirth.HasValue);
        }
    }
}
