using FluentValidation;

namespace AwesomeApp.Application.Features.Accounts.Queries
{
    /// <summary>
    /// Object validator for <see cref="GetAccountsQueryRequest"/>
    /// </summary>
    internal class GetAccountsQueryRequestValidator : AbstractValidator<GetAccountsQueryRequest>
    {
        /// <summary>
        /// Creates an instance
        /// </summary>
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
