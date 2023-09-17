using AwesomeApp.Application.Accounts.Dtos;
using AwesomeApp.Application.Accounts.Queries;
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
        [ProducesResponseType(400)]
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
    }
}
