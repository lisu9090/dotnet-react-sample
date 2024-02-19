using System.Security.Cryptography;
using System.Text;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Authorization.Policy;
using Microsoft.Extensions.Options;

namespace AwesomeApp.API.Securities
{
    internal class ApiAuthorizationMiddleware : IAuthorizationMiddlewareResultHandler
    {
        private const string ApiKeyHeader = "X-Awesome-API-Key";
        private readonly AuthorizationMiddlewareResultHandler _defaultHandler = new();
        private readonly IEnumerable<byte[]> _allowedApiKeyHashes;

        public ApiAuthorizationMiddleware(IOptions<AllowedApiKeysOptions> allowedApiKeysOtions)
        {
            _allowedApiKeyHashes = allowedApiKeysOtions.Value.Select(HashStringToBytes);
        }

        public async Task HandleAsync(
            RequestDelegate next, 
            HttpContext context, 
            AuthorizationPolicy policy, 
            PolicyAuthorizationResult authorizeResult)
        {
            string? apiKey = context.Request.Headers[ApiKeyHeader];

            if (apiKey == null) 
            {
                context.Response.StatusCode = StatusCodes.Status403Forbidden;
                
                return;
            }

            byte[] apiKeyHash = GetHashBytes(apiKey);

            if (!_allowedApiKeyHashes.Any(allowedApiKey => allowedApiKey.SequenceEqual(apiKeyHash)))
            {
                context.Response.StatusCode = StatusCodes.Status403Forbidden;

                return;
            }

            await _defaultHandler.HandleAsync(next, context, policy, authorizeResult);
        }

        private byte[] GetHashBytes(string input) => SHA512.HashData(Encoding.UTF8.GetBytes(input));

        private byte[] HashStringToBytes(string input) => Convert.FromHexString(input);
    }
}
