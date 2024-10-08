using MediatR;

namespace AwesomeApp.Application.Features.Accounts.Commands
{
    /// <summary>
    /// DeleteAccountCommand request
    /// </summary>
    public class DeleteAccountCommandRequest : IRequest
    {
        /// <summary>
        /// Gets of sets identity
        /// </summary>
        public uint Id { get; set; }
    }
}
