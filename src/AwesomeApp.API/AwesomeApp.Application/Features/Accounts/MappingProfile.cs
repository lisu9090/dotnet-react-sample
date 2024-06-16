using AutoMapper;
using AwesomeApp.Application.Features.Accounts.Commands;
using AwesomeApp.Application.Features.Accounts.Dtos;
using AwesomeApp.Domain.Accounts.Entities;

namespace AwesomeApp.Application.Features.Accounts
{
    internal class MappingProfile : Profile
    {
        public MappingProfile()
        {
            CreateMap<CreateAccountCommandRequest, Account>(MemberList.Source)
                .ForSourceMember(src => src.Password, opt => opt.DoNotValidate());
            CreateMap<UpsertAccountCommandRequest, Account>(MemberList.Source)
                .ForSourceMember(src => src.Password, opt => opt.DoNotValidate());

            CreateMap<Account, AccountDto>(MemberList.Destination);
            CreateMap<Account, AccountSessionDto>(MemberList.Destination);
        }
    }
}
