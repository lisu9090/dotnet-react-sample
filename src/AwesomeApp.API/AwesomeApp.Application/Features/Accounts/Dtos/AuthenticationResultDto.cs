namespace AwesomeApp.Application.Features.Accounts.Dtos
{
    public class AuthenticationResultDto
    {
        public AccountSessionDto? Account { get; set; }

        /// <summary>
        /// AuthenticationSuccessful
        /// </summary>
        public bool AuthenticationSuccessful { get; set; }

        /// <summary>
        /// AuthenticationErrorMessage
        /// </summary>
        public string? AuthenticationErrorMessage { get; set; }

        public static AuthenticationResultDto AuthenticationSuccessfulResult(AccountSessionDto account) =>
            new AuthenticationResultDto
            {
                Account = account,
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
