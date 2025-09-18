using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata.Builders;
using TaskManagement.Storage.Entities;

namespace TaskManagement.Storage.Mappings;

public class WorkItemMapping : BaseEntityMapping<WorkItem>
{
    public void Configure(EntityTypeBuilder<WorkItem> builder)
    {
        base.Configure(builder);
        builder.ToTable("WorkItems");
        builder.HasOne<User>()
            .WithMany()
            .OnDelete(DeleteBehavior.SetNull);
    }
}