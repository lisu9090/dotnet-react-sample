using AwesomeApp.Application.Behaviors.RequestValidations;
using AwesomeApp.Application.Features.Accounts.Exceptions;
using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.Mvc.Filters;

namespace AwesomeApp.API.Filters
{
    internal class ExceptionFilter : IAsyncActionFilter
    {
        public async Task OnActionExecutionAsync(ActionExecutingContext context, ActionExecutionDelegate next)
        {
            try
            {
                await next();
            }
            catch (Exception e)
            {
                context.Result = e switch
                {
                    RequestValidationException => new StatusCodeResult(StatusCodes.Status400BadRequest),
                    AccountCreationException => new StatusCodeResult(StatusCodes.Status409Conflict),
                    _ => new StatusCodeResult(StatusCodes.Status500InternalServerError)
                };
            }
        }
    }
}
