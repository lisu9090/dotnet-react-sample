using System.Runtime.Serialization;

namespace AwesomeApp.Application.Exceptions
{
    public abstract class ApplicationException : Exception
    {
        protected ApplicationException()
        {
        }

        protected ApplicationException(string? message) : base(message)
        {
        }

        protected ApplicationException(SerializationInfo info, StreamingContext context) : base(info, context)
        {
        }

        protected ApplicationException(string? message, Exception? innerException) : base(message, innerException)
        {
        }
    }
}
