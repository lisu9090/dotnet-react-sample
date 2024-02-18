namespace AwesomeApp.Domain.Accounts.Exceptions
{
    public class AccountCreationException : CustomException
    {
        public AccountCreationException()
        {
        }

        public AccountCreationException(string? message) : base(message)
        {
        }
    }
}
