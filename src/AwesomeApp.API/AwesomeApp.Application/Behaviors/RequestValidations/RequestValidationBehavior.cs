using FluentValidation;
using FluentValidation.Results;
using MediatR;
using Microsoft.Extensions.DependencyInjection;

namespace AwesomeApp.Application.Behaviors.RequestValidations
{
    internal class RequestValidationBehavior<TRequest, TResponse> : IPipelineBehavior<TRequest, TResponse> where TRequest : notnull
    {
        private readonly IValidator<TRequest>? _validator;

        public RequestValidationBehavior(IServiceProvider serviceProvider)
        {
            _validator = serviceProvider.GetService<IValidator<TRequest>>();
        }

        public Task<TResponse> Handle(TRequest request, RequestHandlerDelegate<TResponse> next, CancellationToken cancellationToken)
        {
            if (_validator == null)
            {
                return next();
            }

            ValidationResult result = _validator.Validate(request);

            return result.IsValid ? next() : throw new RequestValidationException();
        }
    }
}
