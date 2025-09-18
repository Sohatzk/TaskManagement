using TaskManagement.Shared.Enums;

namespace TaskManagement.Models.WorkItem.Out;

public class WorkItemGridResponse
{
    public Guid Id { get; set; }
    public string Title { get; set; }
    public string FirstName { get; set; }
    public string LastName { get; set; }
    public WorkItemStatus Status { get; set; }
    public DateTime UpdatedAt { get; set; }
}