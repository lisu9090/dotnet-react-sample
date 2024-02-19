using System.Reflection;
using MediatR;

namespace AwesomeApp.Application.Middlewares.RequestValidations
{
    internal class RequestValidationBehavior<TRequest, TResponse> : IPipelineBehavior<TRequest, TResponse> where TRequest : notnull
    {
        public Task<TResponse> Handle(TRequest request, RequestHandlerDelegate<TResponse> next, CancellationToken cancellationToken)
        {
            IEnumerable<PropertyInfo> requestProps = request
                .GetType()
                .GetProperties();

            IEnumerable<PropertyInfo> propsToValidate = requestProps
                .Where(prop => prop.GetCustomAttributes<RequiredAttribute>().Any());

            // TODO use recurrence for deep validation
            bool isRequestValid = propsToValidate.All(prop =>
            {
                Type propType = prop.PropertyType;
                object? propValue = prop.GetValue(request);

                return 
                    (!propType.IsValueType && propValue != null) || 
                    (propType.IsValueType && Activator.CreateInstance(propType) != propValue);
            });

            return isRequestValid
                ? next()
                : throw new RequestValidationException();
        }
    }
}
