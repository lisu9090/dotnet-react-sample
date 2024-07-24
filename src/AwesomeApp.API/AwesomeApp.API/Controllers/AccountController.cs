using AwesomeApp.Application.Features;
using AwesomeApp.Application.Features.Accounts.Commands;
using AwesomeApp.Application.Features.Accounts.Dtos;
using AwesomeApp.Application.Features.Accounts.Queries;
using MediatR;
using Microsoft.AspNetCore.Mvc;

namespace AwesomeApp.API.Controllers
{
    [ApiController]
    [Route("[controller]")]
    public class AccountController : ControllerBase
    {
        private readonly IMediator _mediator;

        public AccountController(IMediator mediator)
        {
            _mediator = mediator;
        }

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

        [HttpGet("list")]
        [ProducesResponseType(typeof(PaginationResult<AccountDto>), StatusCodes.Status200OK)]
        [ProducesResponseType(StatusCodes.Status409Conflict)]
        public async Task<IActionResult> Get([FromQuery] GetAccountsQueryRequest request)
        {
            return Ok(await _mediator.Send(request));
        }

        [HttpPost]
        [ProducesResponseType(typeof(AccountDto), StatusCodes.Status200OK)]
        [ProducesResponseType(StatusCodes.Status400BadRequest)]
        [ProducesResponseType(StatusCodes.Status409Conflict)]
        public async Task<IActionResult> Create([FromBody] CreateAccountCommandRequest request)
        {
            return Ok(await _mediator.Send(request));
        }

        [HttpPut]
        [ProducesResponseType(typeof(AccountDto), StatusCodes.Status200OK)]
        [ProducesResponseType(StatusCodes.Status400BadRequest)]
        [ProducesResponseType(StatusCodes.Status409Conflict)]
        public async Task<IActionResult> Update([FromBody] UpsertAccountCommandRequest request)
        {
            return Ok(await _mediator.Send(request));
        }

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

        [HttpPost("authenticate")]
        [ProducesResponseType(typeof(AuthenticationResultDto), StatusCodes.Status200OK)]
        [ProducesResponseType(StatusCodes.Status400BadRequest)]
        public async Task<IActionResult> Authenticate([FromBody] AuthenticateAccountQueryRequest request)
        {
            return Ok(await _mediator.Send(request));
        }
    }
}
