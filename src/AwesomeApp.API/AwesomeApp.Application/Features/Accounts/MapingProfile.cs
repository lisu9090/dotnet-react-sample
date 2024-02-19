using AutoMapper;
using AwesomeApp.Application.Features.Accounts.Commands;
using AwesomeApp.Application.Features.Accounts.Dtos;
using AwesomeApp.Domain.Accounts.Entities;

namespace AwesomeApp.Application.Features.Accounts
{
    internal class MapingProfile : Profile
    {
        public MapingProfile()
        {
            CreateMap<CreateAccountCommandRequest, Account>(MemberList.Source)
                .ForSourceMember(src => src.Password, opt => opt.DoNotValidate());

            CreateMap<Account, AccountDto>(MemberList.Destination);
        }
    }
}
