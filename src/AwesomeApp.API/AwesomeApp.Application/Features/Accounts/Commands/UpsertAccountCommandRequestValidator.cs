using AwesomeApp.Application.Features.Accounts.Validators;
using FluentValidation;

namespace AwesomeApp.Application.Features.Accounts.Commands
{
    /// <summary>
    /// Object validator for <see cref="UpsertAccountCommandRequest"/>
    /// </summary>
    internal class UpsertAccountCommandRequestValidator : AbstractValidator<UpsertAccountCommandRequest>
    {
        /// <summary>
        /// Creates an instance
        /// </summary>
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
