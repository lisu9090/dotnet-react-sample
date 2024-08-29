using System.Runtime.Serialization;

namespace AwesomeApp.Application.Exceptions
{
    /// <summary>
    /// Application Layer Exception
    /// </summary>
    public abstract class ApplicationException : Exception
    {
        /// <inheritdoc/>
        protected ApplicationException()
        {
        }

        /// <inheritdoc/>
        protected ApplicationException(string? message) : base(message)
        {
        }

        /// <inheritdoc/>
        protected ApplicationException(SerializationInfo info, StreamingContext context) : base(info, context)
        {
        }

        /// <inheritdoc/>
        protected ApplicationException(string? message, Exception? innerException) : base(message, innerException)
        {
        }
    }
}
