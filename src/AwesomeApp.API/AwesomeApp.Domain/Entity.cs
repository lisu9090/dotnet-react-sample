namespace AwesomeApp.Domain
{
    /// <summary>
    /// Entity base class
    /// </summary>
    public abstract class Entity
    {
        /// <summary>
        /// Gets of sets identity
        /// </summary>
        public uint Id { get; set; }

        /// <summary>
        /// Gets or sets creation date and time
        /// </summary>
        public DateTime CreatedAt { get; set; }

        /// <summary>
        /// Gets or sets soft-deletion indicator
        /// </summary>
        public bool IsDeleted { get; set; }
    }
}
