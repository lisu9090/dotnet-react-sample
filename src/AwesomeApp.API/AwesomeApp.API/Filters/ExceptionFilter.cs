using AwesomeApp.Application.Behaviors.RequestValidations;
using AwesomeApp.Application.Features.Accounts.Exceptions;
using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.Mvc.Filters;

namespace AwesomeApp.API.Filters
{
    /// <summary>
    /// Global exception handler, translate well-know exceptions into status codes
    /// </summary>
    internal class ExceptionFilter : IExceptionFilter
    {
        /// <inheritdoc/>
        public void OnException(ExceptionContext context)
        {
            StatusCodeResult? handledExceptionResult = context.Exception switch
            {
                RequestValidationException => new StatusCodeResult(StatusCodes.Status400BadRequest),
                AccountCreationException => new StatusCodeResult(StatusCodes.Status409Conflict),
                _ => null
            };

            if (context.Exception != null && handledExceptionResult != null)
            {
                context.Result = handledExceptionResult;
                context.ExceptionHandled = true;
            }
        }
    }
}
