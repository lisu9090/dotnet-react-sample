using AwesomeApp.Domain.Accounts.Enums;

namespace AwesomeApp.Application.Features.Accounts.Dtos
{
    /// <summary>
    /// AccountSessionDto
    /// </summary>
    public class AccountSessionDto
    {
        /// <summary>
        /// Id
        /// </summary>
        public uint Id { get; set; }

        /// <summary>
        /// EAccountRole
        /// </summary>
        public EAccountRole AccountRole { get; set; }

        /// <summary>
        /// Email
        /// </summary>
        public string? Email { get; set; }

        /// <summary>
        /// FullName
        /// </summary>
        public string? FullName { get; set; }
    }
}
