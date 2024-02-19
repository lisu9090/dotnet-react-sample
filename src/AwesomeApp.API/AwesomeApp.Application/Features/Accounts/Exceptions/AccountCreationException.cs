namespace AwesomeApp.Application.Features.Accounts.Exceptions
{
    public class AccountCreationException : Application.Exceptions.ApplicationException
    {
        public AccountCreationException()
        {
        }

        public AccountCreationException(string? message) : base(message)
        {
        }
    }
}
