using AwesomeApp.Application.Features;
using AwesomeApp.Application.Features.Accounts.Commands;
using AwesomeApp.Application.Features.Accounts.Dtos;
using AwesomeApp.Application.Features.Accounts.Queries;
using MediatR;
using Microsoft.AspNetCore.Mvc;

namespace AwesomeApp.API.Controllers
{
    /// <summary>
    /// Controller to deal with Accounts domain
    /// </summary>
    [ApiController]
    [Route("[controller]")]
    public class AccountController : ControllerBase
    {
        private readonly IMediator _mediator;

        /// <summary>
        /// Creates an instance
        /// </summary>
        /// <param name="mediator">Command Bus</param>
        public AccountController(IMediator mediator)
        {
            _mediator = mediator;
        }

        /// <summary>
        /// Responds with <see cref="AccountDto"/> when Account with provided ID has been found, otherwise NotFound
        /// </summary>
        /// <param name="id">Account ID</param>
        [HttpGet("{id}")]
        [ProducesResponseType(typeof(AccountDto), StatusCodes.Status200OK)]
        [ProducesResponseType(StatusCodes.Status404NotFound)]
        public async Task<IActionResult> Get([FromRoute] uint id)
        {
            AccountDto? data = await _mediator.Send(new GetAccountQueryRequest
            {
                Id = id
            });

            if (data != null)
            {
                return Ok(data);
            }

            return NotFound();
        }

        /// <summary>
        /// Responds with paginated collection of <see cref="AccountDto"/> (<see cref="PaginationResultDto{T}"/>)
        /// or BadRequest when query is invalid
        /// </summary>
        /// <param name="request">Pagination query parameters</param>
        [HttpGet("list")]
        [ProducesResponseType(typeof(PaginationResultDto<AccountDto>), StatusCodes.Status200OK)]
        [ProducesResponseType(StatusCodes.Status400BadRequest)]
        public async Task<IActionResult> Get([FromQuery] GetAccountsQueryRequest request)
        {
            return Ok(await _mediator.Send(request));
        }

        /// <summary>
        /// Creates and responds with an Account when request is valid, otherwise responds with BadRequest;
        /// responds with Conflict when Account with same email address already exits
        /// </summary>
        /// <param name="request">Account creation request</param>
        [HttpPost]
        [ProducesResponseType(typeof(AccountDto), StatusCodes.Status200OK)]
        [ProducesResponseType(StatusCodes.Status400BadRequest)]
        [ProducesResponseType(StatusCodes.Status409Conflict)]
        public async Task<IActionResult> Create([FromBody] CreateAccountCommandRequest request)
        {
            return Ok(await _mediator.Send(request));
        }

        /// <summary>
        /// Updates an existing Account or creates new one (based on ID) when request is valid;
        /// responds with <see cref="AccountDto"/> on successful action;
        /// responds with BadREquest when request is invalid;
        /// responds with Conflict when other Account with same email address has been found
        /// </summary>
        /// <param name="request">Update or create Account request</param>
        [HttpPut]
        [ProducesResponseType(typeof(AccountDto), StatusCodes.Status200OK)]
        [ProducesResponseType(StatusCodes.Status400BadRequest)]
        [ProducesResponseType(StatusCodes.Status409Conflict)]
        public async Task<IActionResult> Update([FromBody] UpsertAccountCommandRequest request)
        {
            return Ok(await _mediator.Send(request));
        }

        /// <summary>
        /// Partially updates an existing Account and responds with it when request is valid, otherwise responds with BadRequest;
        /// responds with NotFound when Account with corresponding ID has not been found
        /// </summary>
        /// <param name="request">Update Account request</param>
        [HttpPatch]
        [ProducesResponseType(typeof(AccountDto), StatusCodes.Status200OK)]
        [ProducesResponseType(StatusCodes.Status400BadRequest)]
        [ProducesResponseType(StatusCodes.Status404NotFound)]
        public async Task<IActionResult> Update([FromBody] UpdateAccountCommandRequest request)
        {
            AccountDto? data = await _mediator.Send(request);

            if (data != null)
            {
                return Ok(data);
            }

            return NotFound();
        }

        /// <summary>
        /// Deletes an Account and responds with NoContent
        /// </summary>
        /// <param name="id">Account ID</param>
        [HttpDelete("{id}")]
        [ProducesResponseType(StatusCodes.Status204NoContent)]
        public async Task<IActionResult> Delete([FromRoute] uint id)
        {
            await _mediator.Send(new DeleteAccountCommandRequest
            {
                Id = id
            });

            return NoContent();
        }

        /// <summary>
        /// Authenticates request against Account credentials stored in this API and responds with <see cref="AuthenticationResultDto"/>
        /// when request is valid, otherwise with BadRequest
        /// </summary>
        /// <param name="request">User credentials to check against existing Account</param>
        [HttpPost("authenticate")]
        [ProducesResponseType(typeof(AuthenticationResultDto), StatusCodes.Status200OK)]
        [ProducesResponseType(StatusCodes.Status400BadRequest)]
        public async Task<IActionResult> Authenticate([FromBody] AuthenticateAccountQueryRequest request)
        {
            return Ok(await _mediator.Send(request));
        }
    }
}
