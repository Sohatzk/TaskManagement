using Microsoft.EntityFrameworkCore;
using TaskManagement.Storage;
using TaskManagement.Storage.Views.WorkItems;

namespace TaskManagement.Service.WorkItems;

public class WorkItemService(TaskManagementContext db) : IWorkItemService
{
    public async Task<List<WorkItemGridView>> GetWorkItemsAsync(CancellationToken cancellationToken)
    {
        return await db.WorkItems
            .Select(wi => new WorkItemGridView()
            {
                Id = wi.Id,
                Title = wi.Title,
                FirstName = wi.User.FirstName,
                LastName = wi.User.LastName,
                Status = wi.Status,
                UpdatedAt = wi.UpdatedAt
            }).ToListAsync(cancellationToken);
    } 
}