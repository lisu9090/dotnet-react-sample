using AutoMapper;
using AwesomeApp.Application.Accounts.Commands;
using AwesomeApp.Application.Accounts.Dtos;
using AwesomeApp.Domain.Accounts.Entities;

namespace AwesomeApp.Application.Accounts
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
