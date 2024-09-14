namespace AwesomeApp.Application.Features.Accounts.Dtos
{
    /// <summary>
    /// DTO to describe authentication result
    /// </summary>
    public class AuthenticationResultDto
    {
        /// <summary>
        /// Gets Account DTO session data
        /// </summary>
        public AccountSessionDto? Account { get; private set; }

        /// <summary>
        /// Gets authentication success indicator
        /// </summary>
        public bool AuthenticationSuccessful { get; private set; }

        /// <summary>
        /// Gets authentication error message
        /// </summary>
        public string? AuthenticationErrorMessage { get; private set; }

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
