namespace AwesomeApp.Application.Features.Accounts.Exceptions
{
    /// <summary>
    /// Indicates error while creating an Account
    /// </summary>
    public class AccountCreationException : Application.Exceptions.ApplicationException
    {
        /// <inheritdoc/>
        public AccountCreationException()
        {
        }

        /// <inheritdoc/>
        public AccountCreationException(string? message) : base(message)
        {
        }
    }
}
