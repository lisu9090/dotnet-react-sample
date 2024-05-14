using AwesomeApp.Domain.Accounts.Enums;

namespace AwesomeApp.Application.Features.Accounts.Dtos
{
    /// <summary>
    /// AccountDto
    /// </summary>
    public class AccountDto
    {
        /// <summary>
        /// Entity identity
        /// </summary>
        public uint Id { get; set; }

        /// <summary>
        /// CreatedAt
        /// </summary>
        public DateTime CreatedAt { get; set; }

        /// <summary>
        /// Email
        /// </summary>
        public string? Email { get; set; }

        /// <summary>
        /// FullName
        /// </summary>
        public string? FullName { get; set; }

        /// <summary>
        /// DateOfBirth
        /// </summary>
        public DateTime DateOfBirth { get; set; }

        /// <summary>
        /// NumberOfCars
        /// </summary>
        public uint VehiclesNumber { get; set; }

        /// <summary>
        /// ECustomerType
        /// </summary>
        public ECustomerType CustomerType { get; set; }

        /// <summary>
        /// EAccountRole
        /// </summary>
        public EAccountRole AccountRole { get; set; }
    }
}
