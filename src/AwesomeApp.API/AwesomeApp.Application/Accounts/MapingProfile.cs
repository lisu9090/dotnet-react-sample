using AutoMapper;
using AwesomeApp.Application.Accounts.Dtos;
using AwesomeApp.Domain.Entities;

namespace AwesomeApp.Application.Accounts
{
    internal class MapingProfile : Profile
    {
        public MapingProfile() 
        {
            CreateMap<Account, AccountDto>(MemberList.Destination);
        }
    }
}
