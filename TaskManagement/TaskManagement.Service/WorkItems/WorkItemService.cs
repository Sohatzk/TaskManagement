using Microsoft.EntityFrameworkCore;
using TaskManagement.Service.WorkItems.Descriptors;
using TaskManagement.Service.WorkItems.Views;
using TaskManagement.Storage;

namespace TaskManagement.Service.WorkItems;

public class WorkItemService(TaskManagementContext db) : IWorkItemService
{
    public async Task<List<WorkItemGridView>> GetWorkItemsAsync(CancellationToken cancellationToken)
    {
        return await db.WorkItems
            .Select(wi => new WorkItemGridView()
            {
                Id = wi.Id,
                WorkItemNumber = wi.WorkItemNumber,
                Title = wi.Title,
                FirstName = wi.User.FirstName,
                LastName = wi.User.LastName,
                Type = wi.Type,
                Status = wi.Status,
                UpdatedAt = wi.UpdatedAt
            }).ToListAsync(cancellationToken);
    } 
    
    public async Task<WorkItemView> GetWorkItemByIdAsync(Guid id, CancellationToken cancellationToken)
    {
        return await db.WorkItems
            .Where(wi => wi.Id == id)
            .Select(wi => new WorkItemView()
            {
                Id = wi.Id,
                Title = wi.Title,
                WorkItemNumber = wi.WorkItemNumber,
                Description = wi.Description,
                UserId = wi.UserId,
                FirstName = wi.User.FirstName,
                LastName = wi.User.LastName,
                CreatedAt = wi.CreatedAt,
                UpdatedAt = wi.UpdatedAt,
                Type = wi.Type,
                Status = wi.Status,
                Priority = wi.Priority,
                Severity = wi.Severity
            }).FirstOrDefaultAsync(cancellationToken);
    }
    
    public async Task<Guid> CreateWorkItemAsync(WorkItemCreateDescriptor descriptor, CancellationToken cancellationToken)
    {
        var workItem = new Storage.Entities.WorkItem
        {
            WorkItemNumber = await db.WorkItems.MaxAsync(wi => (int?)wi.WorkItemNumber, cancellationToken) + 1 ?? 1,
            Title = descriptor.Title,
            Description = descriptor.Description,
            UserId = descriptor.UserId,
            CreatedAt = DateTime.UtcNow,
            UpdatedAt = DateTime.UtcNow,
            Type = descriptor.Type,
            Status = descriptor.Status,
            Priority = descriptor.Priority,
            Severity = descriptor.Severity
        };

        db.WorkItems.Add(workItem);
        await db.SaveChangesAsync(cancellationToken);

        return workItem.Id;
    }
    
    public async Task UpdateWorkItemAsync(WorkItemUpdateDescriptor descriptor, CancellationToken cancellationToken)
    {
        var workItem = await db.WorkItems.FindAsync(descriptor.Id, cancellationToken);
        if (workItem == null)
        {
            throw new KeyNotFoundException("Work item not found");
        }

        workItem.Title = descriptor.Title;
        workItem.Description = descriptor.Description;
        workItem.UserId = descriptor.UserId;
        workItem.UpdatedAt = DateTime.UtcNow;
        workItem.Type = descriptor.Type;
        workItem.Status = descriptor.Status;
        workItem.Priority = descriptor.Priority;
        workItem.Severity = descriptor.Severity;

        db.WorkItems.Update(workItem);
        await db.SaveChangesAsync(cancellationToken);
    }
}