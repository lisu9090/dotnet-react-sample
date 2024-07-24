using MediatR;

namespace AwesomeApp.Application.Features.Accounts.Commands
{
    public class DeleteAccountCommandRequest : IRequest
    {
        /// <summary>
        /// Gets or set Id
        /// </summary>
        public uint Id { get; set; }
    }
}
