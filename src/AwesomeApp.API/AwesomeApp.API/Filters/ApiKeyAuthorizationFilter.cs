using System.Security.Cryptography;
using System.Text;
using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.Mvc.Filters;
using Microsoft.Extensions.Options;

namespace AwesomeApp.API.Filters
{
    /// <summary>
    /// Security filter, authorizes incoming request by checking API Key
    /// </summary>
    internal class ApiKeyAuthorizationFilter : IAsyncActionFilter
    {
        private readonly IEnumerable<byte[]> _allowedApiKeyHashes;
        
        /// <summary>
        /// HTTP header name of API Key 
        /// </summary>
        public const string ApiKeyHeader = "X-Awesome-API-Key";

        /// <summary>
        /// Creates an instance
        /// </summary>
        /// <param name="allowedApiKeysOtions">API Key hashes to authorize requests</param>
        public ApiKeyAuthorizationFilter(IOptions<ApiKeyAuthorizationFilterOptions> allowedApiKeysOtions)
        {
            _allowedApiKeyHashes = allowedApiKeysOtions.Value.Select(HashStringToBytes);
        }

        /// <inheritdoc/>
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

    /// <summary>
    /// Type to register authorized API Keys with Options pattern
    /// </summary>
    internal class ApiKeyAuthorizationFilterOptions : List<string>
    {
    }
}
