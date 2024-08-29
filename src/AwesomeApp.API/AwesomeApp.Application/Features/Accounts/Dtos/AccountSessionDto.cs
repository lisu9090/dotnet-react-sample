using AwesomeApp.Domain.Accounts.Enums;

namespace AwesomeApp.Application.Features.Accounts.Dtos
{
    /// <summary>
    /// Account DTO for session
    /// </summary>
    public class AccountSessionDto
    {
        /// <summary>
        /// Gets of sets identity
        /// </summary>
        public uint Id { get; set; }

        /// <summary>
        /// Gets or sets account role
        /// </summary>
        public EAccountRole AccountRole { get; set; }

        /// <summary>
        /// Gets or sets email
        /// </summary>
        public string? Email { get; set; }

        /// <summary>
        /// Gets or sets full name
        /// </summary>
        public string? FullName { get; set; }
    }
}
