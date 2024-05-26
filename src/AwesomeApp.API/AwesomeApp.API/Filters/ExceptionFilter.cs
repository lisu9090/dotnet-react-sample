using AwesomeApp.Application.Behaviors.RequestValidations;
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
                    _ => new StatusCodeResult(StatusCodes.Status500InternalServerError)
                };
            }
        }
    }
}
