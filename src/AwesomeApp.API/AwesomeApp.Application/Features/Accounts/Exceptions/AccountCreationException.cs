using AwesomeApp.Application.Exceptions;

namespace AwesomeApp.Domain.Accounts.Exceptions
{
    public class AccountCreationException : ApplicationException
    {
        public AccountCreationException()
        {
        }

        public AccountCreationException(string? message) : base(message)
        {
        }
    }
}
