using AutoMapper;
using AwesomeApp.Application.Features.Accounts.Dtos;
using AwesomeApp.Domain.Accounts.Entities;
using AwesomeApp.Domain.Accounts.Enums;
using AwesomeApp.Domain.Accounts.Repositories;
using MediatR;

namespace AwesomeApp.Application.Features.Accounts.Commands
{
    internal class UpdateAccountCommand : IRequestHandler<UpdateAccountCommandRequest, AccountDto?>
    {
        private readonly IAccountRepository _accountRepository;
        private readonly IMapper _mapper;

        public UpdateAccountCommand(IAccountRepository accountRepository, IMapper mapper)
        {
            _accountRepository = accountRepository;
            _mapper = mapper;
        }

        public async Task<AccountDto?> Handle(UpdateAccountCommandRequest request, CancellationToken cancellationToken)
        {
            Account? account = await _accountRepository.GetAsync(request.Id, cancellationToken);

            if (account == null)
            {
                return null;
            }

            if (request.FullName != null)
            {
                account.FullName = request.FullName;
            }

            if (request.DateOfBirth.HasValue)
            {
                account.DateOfBirth = request.DateOfBirth.Value;
            }

            if (request.VehiclesNumber.HasValue)
            {
                account.VehiclesNumber = request.VehiclesNumber.Value;
            }

            if (request.CustomerType.HasValue)
            {
                account.CustomerType = request.CustomerType.Value;
            }

            account = await _accountRepository.UpsertAsync(account, cancellationToken);

            return _mapper.Map<AccountDto>(account);
        }
    }
}
