namespace AwesomeApp.Application.Security
{
    /// <summary>
    /// Service that provides basic hashing functionality
    /// </summary>
    internal interface IHashService
    {
        /// <summary>
        /// Calculates hash out of provided key
        /// </summary>
        /// <param name="key">Key to hash</param>
        /// <returns>String hash value</returns>
        string GetHash(string key);

        /// <summary>
        /// Compares two hashes, returns true when equal, otherwise false;
        /// method is case-insensitive
        /// </summary>
        /// <param name="hash1">First string hash value</param>
        /// <param name="hash2">Second string hash value</param>
        /// <returns>Equality indicator</returns>
        bool Compare(string hash1, string hash2);
    }
}
