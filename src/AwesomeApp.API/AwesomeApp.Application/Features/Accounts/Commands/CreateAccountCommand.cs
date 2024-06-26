using AutoMapper;
using AwesomeApp.Application.Features.Accounts.Dtos;
using AwesomeApp.Application.Features.Accounts.Exceptions;
using AwesomeApp.Application.Security;
using AwesomeApp.Domain.Accounts.Entities;
using AwesomeApp.Domain.Accounts.Repositories;
using MediatR;

namespace AwesomeApp.Application.Features.Accounts.Commands
{
    internal class CreateAccountCommand : IRequestHandler<CreateAccountCommandRequest, AccountDto>
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

        public async Task<AccountDto> Handle(CreateAccountCommandRequest request, CancellationToken cancellationToken)
        {
            await ValidateIfEmailIsUsedAsync(request.Email!, cancellationToken);

            Account account = _mapper.Map<Account>(request);

            account.Email = account.Email!.ToLowerInvariant();
            account.PasswordHash = _hashService.GetHash(request.Password!);

            account = await _accountRepository.UpsertAsync(account, cancellationToken);

            return _mapper.Map<AccountDto>(account);
        }


        private async Task ValidateIfEmailIsUsedAsync(string email, CancellationToken cancellationToken)
        {
            Account? account = await _accountRepository.GetByEmailAsync(email, cancellationToken);

            if (account != null)
            {
                throw new AccountCreationException("Email already used");
            }
        }
    }
}
