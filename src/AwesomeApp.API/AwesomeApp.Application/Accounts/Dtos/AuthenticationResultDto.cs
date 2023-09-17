using AwesomeApp.Domain.Enums;

namespace AwesomeApp.Application.Accounts.Dtos
{
    internal class AuthenticationResultDto
    {
        public uint? AccountId { get; set; }

        public EAccountRole? AccountRole { get; set; }
        
        public bool AuthenticationSuccessful { get; set; }

        public string? AuthenticationErrorMessage { get; set; }

        public static AuthenticationResultDto AuthenticationSucessfulResult(uint accountId, EAccountRole accountRole) =>
            new AuthenticationResultDto
            {
                AccountId = accountId,
                AccountRole = accountRole,
                AuthenticationSuccessful = true
            };

        public static AuthenticationResultDto AuthenticationFailedResult() =>
            new AuthenticationResultDto
            {
                AuthenticationSuccessful = false,
                AuthenticationErrorMessage = $"Email or password are incorrect"
            };
    }
}
