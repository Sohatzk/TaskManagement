using TaskManagement.Storage.Views.WorkItems;

namespace TaskManagement.Service.WorkItems;

public interface IWorkItemService
{
    Task<List<WorkItemGridView>> GetWorkItemsAsync(CancellationToken cancellationToken);
}