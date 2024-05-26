using System.Security.Cryptography;
using System.Text;
using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.Mvc.Filters;
using Microsoft.Extensions.Options;

namespace AwesomeApp.API.Filters
{
    internal class ApiKeyAuthorizationFilter : IAsyncActionFilter
    {
        private const string ApiKeyHeader = "X-Awesome-API-Key";
        private readonly IEnumerable<byte[]> _allowedApiKeyHashes;

        public ApiKeyAuthorizationFilter(IOptions<ApiKeyAuthorizationFilterOptions> allowedApiKeysOtions)
        {
            _allowedApiKeyHashes = allowedApiKeysOtions.Value.Select(HashStringToBytes);
        }

        public async Task OnActionExecutionAsync(ActionExecutingContext context, ActionExecutionDelegate next)
        {
            string? apiKey = context.HttpContext.Request.Headers[ApiKeyHeader];

            if (apiKey == null)
            {
                context.Result = new StatusCodeResult(StatusCodes.Status403Forbidden);

                return;
            }

            byte[] apiKeyHash = GetHashBytes(apiKey);

            if (!_allowedApiKeyHashes.Any(allowedApiKey => allowedApiKey.SequenceEqual(apiKeyHash)))
            {
                context.Result = new StatusCodeResult(StatusCodes.Status403Forbidden);

                return;
            }

            await next();
        }

        private byte[] GetHashBytes(string input) => SHA512.HashData(Encoding.UTF8.GetBytes(input));

        private byte[] HashStringToBytes(string input) => Convert.FromHexString(input);
    }

    internal class ApiKeyAuthorizationFilterOptions : List<string>
    {
    }
}
