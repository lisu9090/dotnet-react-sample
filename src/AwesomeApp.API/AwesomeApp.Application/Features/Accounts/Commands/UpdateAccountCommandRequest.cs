using AwesomeApp.Application.Features.Accounts.Dtos;
using AwesomeApp.Domain.Accounts.Enums;
using MediatR;

namespace AwesomeApp.Application.Features.Accounts.Commands
{
    /// <summary>
    /// UpdateAccountCommand request
    /// </summary>
    public class UpdateAccountCommandRequest : IRequest<AccountDto?>
    {
        /// <summary>
        /// Gets of sets identity
        /// </summary>
        public uint Id { get; set; }

        /// <summary>
        /// Gets or sets full name
        /// </summary>
        public string? FullName { get; set; }

        /// <summary>
        /// Gets or sets date of birth
        /// </summary>
        public DateTime? DateOfBirth { get; set; }

        /// <summary>
        /// Gets or sets number of vehicles
        /// </summary>
        public uint? VehiclesNumber { get; set; }

        /// <summary>
        /// Gets or sets customer type
        /// </summary>
        public ECustomerType? CustomerType { get; set; }
    }
}
