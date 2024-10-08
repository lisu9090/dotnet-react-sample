﻿using AutoMapper;
using AwesomeApp.Application.Features.Accounts.Dtos;
using AwesomeApp.Application.Features.Accounts.Exceptions;
using AwesomeApp.Application.Security;
using AwesomeApp.Domain.Accounts.Entities;
using AwesomeApp.Domain.Accounts.Repositories;
using MediatR;

namespace AwesomeApp.Application.Features.Accounts.Commands
{
    /// <summary>
    /// Tries to insert or update an Account
    /// </summary>
    internal class UpsertAccountCommand : IRequestHandler<UpsertAccountCommandRequest, AccountDto>
    {
        private readonly IAccountRepository _accountRepository;
        private readonly IHashService _hashService;
        private readonly IMapper _mapper;

        /// <summary>
        /// Creates an instance
        /// </summary>
        /// <param name="accountRepository">Accounts repository</param>
        /// <param name="hashService">Hash service</param>
        /// <param name="mapper">Mapper instance</param>
        public UpsertAccountCommand(IAccountRepository accountRepository, IHashService hashService, IMapper mapper)
        {
            _accountRepository = accountRepository;
            _hashService = hashService;
            _mapper = mapper;
        }

        public async Task<AccountDto> Handle(UpsertAccountCommandRequest request, CancellationToken cancellationToken)
        {
            await ValidateIfEmailIsUsedByOtherEntityAsync(request.Email!, request.Id, cancellationToken);

            Account? account = await _accountRepository.GetAsync(request.Id, cancellationToken);

            ValidateIfPasswordIsRequired(account, request.Password);

            account = _mapper.Map(request, account ?? new Account());

            account.Email = account.Email!.ToLowerInvariant();

            if (request.Password != null)
            {
                account.PasswordHash = _hashService.GetHash(request.Password);
            }

            account = await _accountRepository.UpsertAsync(account, cancellationToken);

            return _mapper.Map<AccountDto>(account);
        }

        private async Task ValidateIfEmailIsUsedByOtherEntityAsync(string email, uint currentEntityId, CancellationToken cancellationToken)
        {
            Account? account = await _accountRepository.GetByEmailAsync(email, cancellationToken);

            if (account != null && account.Id != currentEntityId)
            {
                throw new AccountCreationException("Email already used");
            }
        }

        private void ValidateIfPasswordIsRequired(Account? existingAccount, string? password)
        {
            if (existingAccount == null && password == null)
            {
                throw new AccountCreationException("Password cannot be empty while creating an account");
            }
        }
    }
}
