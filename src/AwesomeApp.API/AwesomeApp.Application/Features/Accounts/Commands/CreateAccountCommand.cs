using AutoMapper;
using AwesomeApp.Application.Features.Accounts.Exceptions;
using AwesomeApp.Application.Security;
using AwesomeApp.Domain.Accounts.Entities;
using AwesomeApp.Domain.Accounts.Repositories;
using MediatR;

namespace AwesomeApp.Application.Features.Accounts.Commands
{
    internal class CreateAccountCommand : IRequestHandler<CreateAccountCommandRequest, uint>
    {
        private readonly IAccountRepository _accountRepository;
        private readonly IHashService _hashService;
        private readonly IMapper _mapper;

        public CreateAccountCommand(IAccountRepository accountRepository, IHashService hashService, IMapper mapper)
        {
            _accountRepository = accountRepository;
            _hashService = hashService;
            _mapper = mapper;
        }

        public async Task<uint> Handle(CreateAccountCommandRequest request, CancellationToken cancellationToken)
        {
            Account? account = await _accountRepository.GetByEmailAsync(request.Email!);

            if (account != null)
            {
                throw new AccountCreationException("Email already used");
            }

            account = _mapper.Map<Account>(request);

            account.PasswordHash = _hashService.GetHash(request.Password!);

            account = await _accountRepository.UpsertAsync(account, cancellationToken);

            return account.Id;
        }
    }
}
