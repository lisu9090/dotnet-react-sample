namespace AwesomeApp.Domain
{
    /// <summary>
    /// Entity
    /// </summary>
    public abstract class Entity
    {
        /// <summary>
        /// Entity identity
        /// </summary>
        public uint Id { get; set; }

        /// <summary>
        /// CreatedAt
        /// </summary>
        public DateTime CreatedAt { get; set; }

        /// <summary>
        /// Gets or sets is entity deleted indicator
        /// </summary>
        public bool IsDeleted { get; set; }
    }
}
