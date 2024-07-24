using AwesomeApp.Domain.Accounts.Repositories;
using MediatR;

namespace AwesomeApp.Application.Features.Accounts.Commands
{
    internal class DeleteAccountCommand : IRequestHandler<DeleteAccountCommandRequest>
    {
        private readonly IAccountRepository _accountRepository;

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
