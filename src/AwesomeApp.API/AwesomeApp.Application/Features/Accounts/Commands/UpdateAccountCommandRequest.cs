﻿using AwesomeApp.Application.Features.Accounts.Dtos;
using AwesomeApp.Domain.Accounts.Enums;
using MediatR;

namespace AwesomeApp.Application.Features.Accounts.Commands
{
    public class UpdateAccountCommandRequest : IRequest<AccountDto?>
    {
        /// <summary>
        /// Account identity
        /// </summary>
        public uint Id { get; set; }

        /// <summary>
        /// FullName
        /// </summary>
        public string? FullName { get; set; }

        /// <summary>
        /// DateOfBirth
        /// </summary>
        public DateTime? DateOfBirth { get; set; }

        /// <summary>
        /// VehiclesNumber
        /// </summary>
        public uint? VehiclesNumber { get; set; }

        /// <summary>
        /// ECustomerType
        /// </summary>
        public ECustomerType? CustomerType { get; set; }
    }
}
