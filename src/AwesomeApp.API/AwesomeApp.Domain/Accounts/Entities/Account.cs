using AwesomeApp.Domain.Accounts.Enums;

namespace AwesomeApp.Domain.Accounts.Entities
{
    /// <summary>
    /// Account
    /// </summary>
    public class Account : Entity
    {
        /// <summary>
        /// Gets or sets email
        /// </summary>
        public string? Email { get; set; }

        /// <summary>
        /// Gets or sets password hash
        /// </summary>
        public string? PasswordHash { get; set; }

        /// <summary>
        /// Gets or sets full name
        /// </summary>
        public string? FullName { get; set; }

        /// <summary>
        /// Gets or sets date of birth
        /// </summary>
        public DateTime DateOfBirth { get; set; }

        /// <summary>
        /// Gets or sets number of vehicles
        /// </summary>
        public uint VehiclesNumber { get; set; }

        /// <summary>
        /// Gets or sets customer type
        /// </summary>
        public ECustomerType CustomerType { get; set; }

        /// <summary>
        /// Gets or sets account role
        /// </summary>
        public EAccountRole AccountRole { get; set; }
    }
}
