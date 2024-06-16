using FluentValidation;

namespace AwesomeApp.Application.Features.Accounts.Commands
{
    internal class UpsertAccountCommandRequestValidator : AbstractValidator<UpsertAccountCommandRequest>
    {
        private readonly DateTime _dateOfBirthMinValue = new DateTime(1900, 1, 1, 0, 0, 0, DateTimeKind.Utc);

        public UpsertAccountCommandRequestValidator()
        {
            RuleFor(request => request.Id)
                .NotEmpty();
            RuleFor(request => request.Email)
                .NotEmpty();
            RuleFor(request => request.Password)
                .NotEmpty();
            RuleFor(request => request.FullName)
                .NotEmpty();
            RuleFor(request => request.DateOfBirth)
                .NotEmpty()
                .GreaterThanOrEqualTo(_dateOfBirthMinValue);
        }
    }
}
