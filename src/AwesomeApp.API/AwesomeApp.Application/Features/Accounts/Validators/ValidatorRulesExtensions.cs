using System.Text.RegularExpressions;
using FluentValidation;

namespace AwesomeApp.Application.Features.Accounts.Validators
{
    /// <summary>
    /// Extension methods for <see cref="IRuleBuilder{T, TProperty}"/>
    /// </summary>
    internal static class ValidatorRulesExtensions
    {
        private static readonly Regex _strongPasswordRegex = new Regex("/(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[^A-Za-z0-9])(?=.{8,20})/");
        private static readonly DateTime _dateOfBirthMinValue = new DateTime(1900, 1, 1, 0, 0, 0, DateTimeKind.Utc);

        /// <summary>
        /// Checks if date provided is greater than or equal to 1900-01-01; 
        /// </summary>
        /// <typeparam name="T">Source type</typeparam>
        /// <param name="ruleBuilder">Date of birth property selector</param>
        /// <returns>RuleBuilder</returns>
        public static IRuleBuilderOptions<T, DateTime> DateOfBirth<T>(this IRuleBuilder<T, DateTime> ruleBuilder)
        {
            return ruleBuilder
                .GreaterThanOrEqualTo(_dateOfBirthMinValue)
                .WithMessage("Date of birth should be later or equal to 1900-01-01");
        }

        /// <summary>
        /// Checks if date provided is not null and greater than or equal to 1900-01-01; 
        /// </summary>
        /// <typeparam name="T">Source type</typeparam>
        /// <param name="ruleBuilder">Date of birth property selector</param>
        /// <returns>RuleBuilder</returns>
        public static IRuleBuilderOptions<T, DateTime?> DateOfBirth<T>(this IRuleBuilder<T, DateTime?> ruleBuilder)
        {
            return ruleBuilder
                .NotNull()
                .GreaterThanOrEqualTo(_dateOfBirthMinValue)
                .WithMessage("Date of birth should be later or equal to 1900-01-01");
        }

        /// <summary>
        /// Checks if string provided contains capital letter, small letter, number, special character and is between 8 and 20 characters long
        /// </summary>
        /// <typeparam name="T">Source type</typeparam>
        /// <param name="ruleBuilder">Password property selector</param>
        /// <returns>RuleBuilder</returns>
        public static IRuleBuilderOptions<T, string?> StrongPassword<T>(this IRuleBuilder<T, string?> ruleBuilder)
        {
            return ruleBuilder
                .NotNull()
                .Must(value => _strongPasswordRegex.IsMatch(value!))
                .WithMessage("Password must contain capital letter, small letter, number, special character and be between 8 and 20 characters long");
        }
    }
}
