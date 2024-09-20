using AwesomeApp.Application.Features.Accounts.Validators;
using FluentValidation;

namespace AwesomeApp.Application.Features.Accounts.Commands
{
    /// <summary>
    /// Object validator for <see cref="CreateAccountCommandRequest"/>
    /// </summary>
    internal class CreateAccountCommandRequestValidation : AbstractValidator<CreateAccountCommandRequest>
    {
        /// <summary>
        /// Creates an instance
        /// </summary>
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
