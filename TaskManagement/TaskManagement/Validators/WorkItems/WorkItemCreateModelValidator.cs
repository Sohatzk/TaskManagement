using FluentValidation;
using TaskManagement.Models.WorkItem.In;

namespace TaskManagement.Validators.WorkItems;

public class WorkItemCreateModelValidator: AbstractValidator<WorkItemCreateModel>
{
    public WorkItemCreateModelValidator()
    {
        Include(new WorkItemBaseModelValidator());
    }
}