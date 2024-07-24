using AutoMapper;
using AwesomeApp.Application.Features.Accounts.Dtos;
using AwesomeApp.Domain.Accounts.Entities;
using AwesomeApp.Domain.Accounts.Repositories;
using MediatR;

namespace AwesomeApp.Application.Features.Accounts.Queries
{
    internal class GetAccountsQuery : IRequestHandler<GetAccountsQueryRequest, PaginationResultDto<AccountDto>>
    {
        private readonly IAccountRepository _accountRepository;
        private readonly IMapper _mapper;

        public GetAccountsQuery(IAccountRepository accountRepository, IMapper mapper)
        {
            _accountRepository = accountRepository;
            _mapper = mapper;
        }

        public async Task<PaginationResultDto<AccountDto>> Handle(GetAccountsQueryRequest request, CancellationToken cancellationToken)
        {
            uint pageIndex = request.PageNumber - 1;
            uint skip = pageIndex * request.PageSize;
            uint take = request.PageSize;

            IEnumerable<Account> accounts = await _accountRepository.GetAsync(skip, take, cancellationToken);
            uint totalCount = await _accountRepository.GetCountAsync(cancellationToken);
            
            return PaginationResultDto<AccountDto>.Create(
                _mapper.Map<List<AccountDto>>(accounts),
                request.PageNumber,
                request.PageSize,
                totalCount);
        }
    }
}
