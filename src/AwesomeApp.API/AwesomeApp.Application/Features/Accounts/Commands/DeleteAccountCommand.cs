using AwesomeApp.Domain.Accounts.Repositories;
using MediatR;

namespace AwesomeApp.Application.Features.Accounts.Commands
{
    /// <summary>
    /// Tries to delete an Account
    /// </summary>
    internal class DeleteAccountCommand : IRequestHandler<DeleteAccountCommandRequest>
    {
        private readonly IAccountRepository _accountRepository;

        /// <summary>
        /// Creates an instance
        /// </summary>
        /// <param name="accountRepository">Accounts repository</param>
        public DeleteAccountCommand(IAccountRepository accountRepository)
        {
            _accountRepository = accountRepository;
        }

        public Task Handle(DeleteAccountCommandRequest request, CancellationToken cancellationToken)
        {
            return _accountRepository.DeleteAsync(request.Id, cancellationToken);
        }
    }
}
