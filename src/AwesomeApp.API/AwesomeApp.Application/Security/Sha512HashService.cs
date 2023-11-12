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

            using (SHA512 sha = SHA512.Create())
            {
                byte[] keyBytes = Encoding.UTF8.GetBytes(key);
                byte[] hashBytes = sha.ComputeHash(keyBytes);

                return Convert.ToHexString(hashBytes);
            }
        }

        public bool Compare(string hash1, string hash2)
        {
            if (string.IsNullOrEmpty(hash1) || string.IsNullOrEmpty(hash2))
            {
                throw new ArgumentNullException("Hash value cannot be null or empty");
            }

            var hash1Bytes = Convert.FromHexString(hash1);
            var hash2Bytes = Convert.FromHexString(hash2);

            return hash1Bytes.SequenceEqual(hash2Bytes);
        }
    }
}
