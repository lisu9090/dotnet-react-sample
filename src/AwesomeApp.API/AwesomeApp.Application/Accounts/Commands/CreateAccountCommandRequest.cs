using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using MediatR;

namespace AwesomeApp.Application.Accounts.Commands
{
    internal class CreateAccountCommandRequest : IRequest<uint>
    {
    }
}
