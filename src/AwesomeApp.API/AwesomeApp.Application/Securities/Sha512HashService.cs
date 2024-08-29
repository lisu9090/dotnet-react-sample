using System.Security.Cryptography;
using System.Text;

namespace AwesomeApp.Application.Security
{
    /// <summary>
    /// <see cref="IHashService"/> implementation; uses SHA512 algorithm
    /// </summary>
    internal class Sha512HashService : IHashService
    {
        public string GetHash(string key)
        {
            ArgumentException.ThrowIfNullOrWhiteSpace(key);

            using (SHA512 sha = SHA512.Create())
            {
                byte[] keyBytes = Encoding.UTF8.GetBytes(key);
                byte[] hashBytes = sha.ComputeHash(keyBytes);

                return Convert.ToHexString(hashBytes);
            }
        }

        public bool Compare(string hash1, string hash2)
        {
            ArgumentException.ThrowIfNullOrWhiteSpace(hash1);
            ArgumentException.ThrowIfNullOrWhiteSpace(hash2);

            var hash1Bytes = Convert.FromHexString(hash1);
            var hash2Bytes = Convert.FromHexString(hash2);

            return hash1Bytes.SequenceEqual(hash2Bytes);
        }
    }
}
