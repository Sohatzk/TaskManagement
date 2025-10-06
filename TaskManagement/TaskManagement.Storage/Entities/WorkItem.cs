using TaskManagement.Shared.Enums;
using TaskManagement.Storage.Entities.Base;

namespace TaskManagement.Storage.Entities;

public class WorkItem : BaseEntity<Guid>
{
    public Guid? UserId { get; set; }
    
    public int WorkItemNumber { get; set; }
    public string Title { get; set; }
    public string Description { get; set; }
    public DateTime CreatedAt { get; set; }
    public DateTime UpdatedAt { get; set; }
    public WorkItemType Type { get; set; }
    public WorkItemStatus Status { get; set; }
    public int Priority { get; set; }
    public int? Severity { get; set; }
    public User User { get; set; }
}