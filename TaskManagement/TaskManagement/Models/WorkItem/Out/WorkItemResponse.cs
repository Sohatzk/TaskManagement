using TaskManagement.Shared.Enums;

namespace TaskManagement.Models.WorkItem.Out;

public class WorkItemResponse
{
    public Guid Id { get; set; }
    public int WorkItemNumber { get; set; }
    
    public string Title { get; set; }
    
    public string Description { get; set; }
    public Guid? UserId { get; set; }
    
    public string FirstName { get; set; }
    
    public string LastName { get; set; }
    
    public DateTime CreatedAt { get; set; }
    
    public DateTime UpdatedAt { get; set; }
    
    public WorkItemType Type { get; set; }
    
    public WorkItemStatus Status { get; set; }
    
    public int Priority { get; set; }
    
    public int? Severity { get; set; }
}