﻿using AwesomeApp.Application.Accounts.Dtos;
using AwesomeApp.Application.Security;
using AwesomeApp.Domain.Entities;
using AwesomeApp.Domain.Repositories;
using MediatR;

namespace AwesomeApp.Application.Accounts.Queries
{
    internal class AuthenticateAccountQuery : IRequestHandler<AuthenticateAccountQueryRequest, AuthenticationResultDto>
    {
        private readonly IAccountRepository _accountRepository;
        private readonly IHashService _hashService;

        public AuthenticateAccountQuery(IAccountRepository accountRepository, IHashService hashService)
        {
            _accountRepository = accountRepository;
            _hashService = hashService;
        }

        public async Task<AuthenticationResultDto> Handle(AuthenticateAccountQueryRequest request, CancellationToken cancellationToken)
        {
            Account? account = await _accountRepository.GetByEmailAsync(request.Email);
            string passwordHash = _hashService.GetHash(request.Password);

            if (account == null || !_hashService.Compare(account.PasswordHash, passwordHash))
            {
                return AuthenticationResultDto.AuthenticationFailedResult();
            }

            return AuthenticationResultDto.AuthenticationSucessfulResult(account.Id, account.AccountRole);
        }
    }
}
