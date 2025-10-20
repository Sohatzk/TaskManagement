using TaskManagement.Service.WorkItems.Descriptors;
using TaskManagement.Service.WorkItems.Views;

namespace TaskManagement.Service.WorkItems;

public interface IWorkItemService
{
    Task<List<WorkItemGridView>> GetWorkItemsAsync(CancellationToken cancellationToken);
    Task<WorkItemView> GetWorkItemByIdAsync(Guid id, CancellationToken cancellationToken);
    Task<Guid> CreateWorkItemAsync(WorkItemCreateDescriptor descriptor, CancellationToken cancellationToken);
    Task UpdateWorkItemAsync(WorkItemUpdateDescriptor descriptor, CancellationToken cancellationToken);
    Task DeleteWorkItemsAsync(Guid[] ids, CancellationToken cancellationToken);
}