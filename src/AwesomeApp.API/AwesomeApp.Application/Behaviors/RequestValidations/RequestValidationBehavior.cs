using System.Reflection;
using AwesomeApp.Application.Attributes;
using MediatR;

namespace AwesomeApp.Application.Middlewares.RequestValidations
{
    internal class RequestValidationBehavior<TRequest, TResponse> : IPipelineBehavior<TRequest, TResponse> where TRequest : notnull
    {
        public Task<TResponse> Handle(TRequest request, RequestHandlerDelegate<TResponse> next, CancellationToken cancellationToken)
        {
            bool isRequestValid = ValidateRequiredProps(request);

            return isRequestValid ? next() : throw new RequestValidationException();
        }

        private bool ValidateRequiredProps(object objectToValidate) 
        {
            IEnumerable<PropertyInfo> propsToValidate = objectToValidate
                .GetType()
                .GetProperties()
                .Where(prop => prop
                    .GetCustomAttributes<RequiredAttribute>()
                    .Any());


            return propsToValidate.All(prop =>
            {
                Type propType = prop.PropertyType;
                object? propValue = prop.GetValue(objectToValidate);

                return (propType.IsValueType && Activator.CreateInstance(propType) != propValue) ||
                    (!propType.IsValueType && propValue != null && ValidateRequiredProps(propValue));
            });
        }
    }
}
