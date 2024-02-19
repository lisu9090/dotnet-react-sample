using AwesomeApp.Application.Middlewares.RequestValidations;
using AwesomeApp.Domain.Accounts.Enums;
using MediatR;

namespace AwesomeApp.Application.Features.Accounts.Commands
{
    public class CreateAccountCommandRequest : IRequest<uint>
    {
        /// <summary>
        /// Email
        /// </summary>
        [Required]
        public string? Email { get; set; }

        /// <summary>
        /// Password
        /// </summary>
        [Required]
        public string? Password { get; set; }

        /// <summary>
        /// FullName
        /// </summary>
        [Required]
        public string? FullName { get; set; }

        /// <summary>
        /// DateOfBirth
        /// </summary>
        [Required]
        public DateTime DateOfBirth { get; set; }

        /// <summary>
        /// NumberOfCars
        /// </summary>
        public uint VechiclesNumber { get; set; }

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
