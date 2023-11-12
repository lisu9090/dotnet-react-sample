namespace AwesomeApp.Application.Security
{
    internal interface IHashService
    {
        string GetHash(string key);

        bool Compare(string hash1, string hash2);
    }
}
