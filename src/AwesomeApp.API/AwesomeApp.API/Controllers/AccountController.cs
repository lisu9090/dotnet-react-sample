using AwesomeApp.Application.Features.Accounts.Commands;
using AwesomeApp.Application.Features.Accounts.Dtos;
using AwesomeApp.Application.Features.Accounts.Exceptions;
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
        [ProducesResponseType(typeof(AccountDto), 200)]
        [ProducesResponseType(404)]
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
        [ProducesResponseType(typeof(IEnumerable<AccountDto>), 200)]
        public async Task<IActionResult> Get()
        {
            return Ok(new List<AccountDto>());
        }

        [HttpPost]
        [ProducesResponseType(typeof(AccountDto), 200)]
        [ProducesResponseType(400)]
        [ProducesResponseType(409)]
        public async Task<IActionResult> Create([FromBody] CreateAccountCommandRequest request)
        {
            try
            {
                return Ok(await _mediator.Send(request));
            }
            catch (AccountCreationException)
            {
                return Conflict();
            }
        }

        [HttpPut]
        [ProducesResponseType(typeof(AccountDto), 200)]
        [ProducesResponseType(400)]
        [ProducesResponseType(409)]
        public async Task<IActionResult> Update([FromBody] UpsertAccountCommandRequest request)
        {
            try
            {
                return Ok(await _mediator.Send(request));
            }
            catch (AccountCreationException)
            {
                return Conflict();
            }
        }

        [HttpPatch]
        [ProducesResponseType(typeof(AccountDto), 200)]
        [ProducesResponseType(400)]
        [ProducesResponseType(404)]
        public async Task<IActionResult> Update([FromBody] UpdateAccountCommandRequest request)
        {
            AccountDto? data = await _mediator.Send(request);

            if (data != null)
            {
                return Ok(data);
            }

            return NotFound();
        }

        [HttpPost("authenticate")]
        [ProducesResponseType(typeof(AuthenticationResultDto), 200)]
        [ProducesResponseType(400)]
        public async Task<IActionResult> Authenticate([FromBody] AuthenticateAccountQueryRequest request)
        {
            return Ok(await _mediator.Send(request));
        }
    }
}
