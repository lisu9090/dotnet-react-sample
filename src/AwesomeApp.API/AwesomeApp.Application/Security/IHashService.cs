using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace AwesomeApp.Application.Security
{
    internal interface IHashService
    {
        string GetHash(string key);
    }
}
