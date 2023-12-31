﻿using AutoMapper;
using AwesomeApp.Application.Accounts.Dtos;
using AwesomeApp.Domain.Entities;
using AwesomeApp.Domain.Repositories;
using MediatR;

namespace AwesomeApp.Application.Accounts.Queries
{
    internal class GetAccountQuery : IRequestHandler<GetAccountQueryRequest, AccountDto?>
    {
        private readonly IAccountRepository _accountRepository;
        private readonly IMapper _mapper;

        public GetAccountQuery(IAccountRepository accountRepository, IMapper mapper)
        {
            _accountRepository = accountRepository;
            _mapper = mapper;
        }

        public async Task<AccountDto?> Handle(GetAccountQueryRequest request, CancellationToken cancellationToken)
        {
            Account account = await _accountRepository.GetAsync(request.Id, cancellationToken);

            return _mapper.Map<AccountDto>(account);
        }
    }
}
