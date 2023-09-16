using MediatR;

namespace AwesomeApp.Application.Accounts.Commands
{
    internal class CreateAccountCommand : IRequestHandler<CreateAccountCommandRequest, uint>
    {
        public async Task<uint> Handle(CreateAccountCommandRequest request, CancellationToken cancellationToken)
        {
            throw new NotImplementedException();
        }
    }
}
