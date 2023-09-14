namespace AwesomeApp.Infrastructure.InMemoryCache.Dao
{
    internal interface IMemoryCacheProxy
    {
        object Get(string key);

        IEnumerable<object> GetAll();

        IEnumerable<string> GetKeys();

        void Set(string key, object value);

        object Remove(string key);
    }
}
