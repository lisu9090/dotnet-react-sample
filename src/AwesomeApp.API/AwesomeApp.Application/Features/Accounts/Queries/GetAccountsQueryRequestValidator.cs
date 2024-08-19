using FluentValidation;

namespace AwesomeApp.Application.Features.Accounts.Queries
{
    internal class GetAccountsQueryRequestValidator : AbstractValidator<GetAccountsQueryRequest>
    {
        public GetAccountsQueryRequestValidator()
        {
            RuleFor(request => request.PageNumber)
                .NotEmpty();

            RuleFor(request => request.PageSize)
                .NotEmpty()
                .LessThanOrEqualTo((uint)100);
        }
    }
}
