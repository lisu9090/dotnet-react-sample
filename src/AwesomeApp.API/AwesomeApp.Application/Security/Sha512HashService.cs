using System.Security.Cryptography;
using System.Text;

namespace AwesomeApp.Application.Security
{
    internal class Sha512HashService : IHashService
    {
        public string GetHash(string key)
        {
            if (string.IsNullOrEmpty(key))
            {
                throw new ArgumentNullException(nameof(key));
            }

            byte[] keyBytes = Encoding.UTF8.GetBytes(key);

            using (SHA512 sha = SHA512.Create())
            {
                byte[] hashBytes = sha.ComputeHash(keyBytes);

                return Convert.ToBase64String(hashBytes);
            }
        }
    }
}
