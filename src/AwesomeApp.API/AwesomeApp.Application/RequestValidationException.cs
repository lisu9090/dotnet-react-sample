using System.Runtime.Serialization;
using AwesomeApp.Domain;

namespace AwesomeApp.Application
{
    public class RequestValidationException : CustomException
    {
        public RequestValidationException()
        {
        }

        public RequestValidationException(string? message) : base(message)
        {
        }

        public RequestValidationException(SerializationInfo info, StreamingContext context) : base(info, context)
        {
        }

        public RequestValidationException(string? message, Exception? innerException) : base(message, innerException)
        {
        }
    }
}
