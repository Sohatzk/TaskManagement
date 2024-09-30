using TaskManagement.Storage.Entities.Base;

namespace TaskManagement.Storage.Entities
{
    public class User : BaseEntity<Guid>
    {
        public string FirstName { get; set; }
        public string LastName { get; set; }
        public string Email { get; set; }
    }
}
