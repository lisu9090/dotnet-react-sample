namespace AwesomeApp.Domain.Entities
{
    /// <summary>
    /// Entity
    /// </summary>
    public class AwesomeEntity
    {
        /// <summary>
        /// Entity identity
        /// </summary>
        public uint Id { get; set; }

        /// <summary>
        /// Gets or sets is entity deleted indicator
        /// </summary>
        public bool IsDeleted { get; set; }
    }
}
