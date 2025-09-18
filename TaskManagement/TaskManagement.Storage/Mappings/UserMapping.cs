using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata.Builders;
using TaskManagement.Storage.Entities;

namespace TaskManagement.Storage.Mappings
{
    public class UserMapping : BaseEntityMapping<User>
    {
        public void Configure(EntityTypeBuilder<User> builder)
        {
            base.Configure(builder);
            builder.ToTable("Users");
        }
    }
}
