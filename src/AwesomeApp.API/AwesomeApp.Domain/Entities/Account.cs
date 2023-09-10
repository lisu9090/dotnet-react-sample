using AwesomeApp.Domain.Enums;

namespace AwesomeApp.Domain.Entities
{
    /// <summary>
    /// Account
    /// </summary>
    public class Account : AwesomeEntity
    {
        /// <summary>
        /// Email
        /// </summary>
        public string? Email { get; set; }

        /// <summary>
        /// PasswordHash
        /// </summary>
        public string? PasswordHash { get; set; }

        /// <summary>
        /// FullName
        /// </summary>
        public string? FullName { get; set; }

        /// <summary>
        /// Age
        /// </summary>
        public uint Age { get; set; }

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
