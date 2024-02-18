using System.Runtime.Serialization;

namespace AwesomeApp.Domain
{
    public abstract class CustomException : Exception
    {
        protected CustomException()
        {
        }

        protected CustomException(string? message) : base(message)
        {
        }

        protected CustomException(SerializationInfo info, StreamingContext context) : base(info, context)
        {
        }

        protected CustomException(string? message, Exception? innerException) : base(message, innerException)
        {
        }
    }
}
