using TaskManagement.Shared.Enums;

namespace TaskManagement.Models.WorkItem.In;

public class WorkItemBaseModel
{
    public string Title { get; set; }
    
    public string Description { get; set; }
    
    public Guid UserId { get; set; }
    
    public WorkItemType Type { get; set; }
    
    public WorkItemStatus Status { get; set; }
    
    public int Priority { get; set; }
    
    public int? Severity { get; set; }
}