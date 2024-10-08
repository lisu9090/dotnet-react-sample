﻿using AutoMapper;
using AwesomeApp.Application.Features.Accounts.Dtos;
using AwesomeApp.Application.Security;
using AwesomeApp.Domain.Accounts.Entities;
using AwesomeApp.Domain.Accounts.Repositories;
using MediatR;

namespace AwesomeApp.Application.Features.Accounts.Queries
{
    /// <summary>
    /// Tries to authenticate user by checking credentials provided against Accounts data in the repository
    /// </summary>
    internal class AuthenticateAccountQuery : IRequestHandler<AuthenticateAccountQueryRequest, AuthenticationResultDto>
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
        public AuthenticateAccountQuery(IAccountRepository accountRepository, IHashService hashService, IMapper mapper)
        {
            _accountRepository = accountRepository;
            _hashService = hashService;
            _mapper = mapper;
        }

        public async Task<AuthenticationResultDto> Handle(AuthenticateAccountQueryRequest request, CancellationToken cancellationToken)
        {
            Account? account = await _accountRepository.GetByEmailAsync(request.Email!.ToLowerInvariant(), cancellationToken);
            string passwordHash = _hashService.GetHash(request.Password!);

            if (account == null || !_hashService.Compare(account.PasswordHash!, passwordHash))
            {
                return AuthenticationResultDto.AuthenticationFailedResult();
            }

            AccountSessionDto accountDto = _mapper.Map<AccountSessionDto>(account);

            return AuthenticationResultDto.AuthenticationSuccessfulResult(accountDto);
        }
    }
}
