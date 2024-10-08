using AwesomeApp.Application.Features.Accounts.Validators;
using FluentValidation;

namespace AwesomeApp.Application.Features.Accounts.Commands
{
    /// <summary>
    /// Object validator for <see cref="UpdateAccountCommandRequest"/>
    /// </summary>
    internal class UpdateAccountCommandRequestValidator : AbstractValidator<UpdateAccountCommandRequest>
    {
        /// <summary>
        /// Creates an instance
        /// </summary>
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
