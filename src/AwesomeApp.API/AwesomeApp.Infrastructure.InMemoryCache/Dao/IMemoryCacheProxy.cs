namespace AwesomeApp.Infrastructure.InMemoryCache.Dao
{
    /// <summary>
    /// Proxy pattern interface to wrap InMemory cache functionality
    /// </summary>
    internal interface IMemoryCacheProxy
    {
        /// <summary>
        /// Retrieves an object stored under given Key
        /// </summary>
        /// <param name="key">Cache key</param>
        /// <returns>Object related to Key</returns>
        object Get(string key);

        /// <summary>
        /// Retrieves all object stored in cache
        /// </summary>
        /// <returns>Collection of cached objects</returns>
        IEnumerable<object> GetAll();

        /// <summary>
        /// Gets all keys used in cache
        /// </summary>
        /// <returns>Collection of cache keys</returns>
        IEnumerable<string> GetKeys();

        /// <summary>
        /// Sets cache Value under specific Key
        /// </summary>
        /// <param name="key">Cache key</param>
        /// <param name="value">Cache value</param>
        void Set(string key, object value);

        /// <summary>
        /// Removes cache Key and its value
        /// </summary>
        /// <param name="key">Cache key</param>
        /// <returns></returns>
        object Remove(string key);
    }
}
