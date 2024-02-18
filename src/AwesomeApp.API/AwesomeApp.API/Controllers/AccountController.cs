using AwesomeApp.Application.Accounts.Commands;
using AwesomeApp.Application.Accounts.Dtos;
using AwesomeApp.Application.Accounts.Queries;
using AwesomeApp.Domain.Accounts.Exceptions;
using MediatR;
using Microsoft.AspNetCore.Mvc;

namespace AwesomeApp.API.Controllers
{
    [Route("[controller]")]
    [ApiController]
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
        public async Task<IActionResult> GetAccount([FromRoute] uint id)
        {
            var request = new GetAccountQueryRequest
            {
                Id = id
            };

            AccountDto? data = await _mediator.Send(request);

            if (data != null)
            {
                return Ok(data);
            }

            return NotFound();
        }

        [HttpPost]
        [ProducesResponseType(typeof(uint), 200)]
        [ProducesResponseType(409)]
        public async Task<IActionResult> CreateAccount([FromBody] CreateAccountCommandRequest request)
        {
            try
            {
                var result = await _mediator.Send(request);
                
                return Ok(result);
            }
            catch (AccountCreationException)
            {
                return Conflict();
            }
        }

        [HttpPost("authenticate")]
        [ProducesResponseType(typeof(AuthenticationResultDto), 200)]
        public async Task<IActionResult> AuthenticateAccount([FromBody] AuthenticateAccountQueryRequest request)
        {
            return Ok(await _mediator.Send(request));
        }
    }
}
