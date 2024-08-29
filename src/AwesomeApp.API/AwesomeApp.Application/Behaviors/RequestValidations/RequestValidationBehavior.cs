using FluentValidation;
using FluentValidation.Results;
using MediatR;
using Microsoft.Extensions.DependencyInjection;

namespace AwesomeApp.Application.Behaviors.RequestValidations
{
    /// <summary>
    /// Generic Command/Query Request processing pipeline behavior; validates Request using dedicated <see cref="IValidator{TRequest}"/> (if exists)
    /// </summary>
    /// <typeparam name="TRequest"></typeparam>
    /// <typeparam name="TResponse"></typeparam>
    internal class RequestValidationBehavior<TRequest, TResponse> : IPipelineBehavior<TRequest, TResponse> where TRequest : notnull
    {
        private readonly IValidator<TRequest>? _validator;

        /// <summary>
        /// Creates an instance
        /// </summary>
        /// <param name="serviceProvider">Service provider</param>
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
