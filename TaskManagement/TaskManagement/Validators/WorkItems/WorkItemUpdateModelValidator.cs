using FluentValidation;
using TaskManagement.Models.WorkItem.In;

namespace TaskManagement.Validators.WorkItems;

public class WorkItemUpdateModelValidator : AbstractValidator<WorkItemUpdateModel>
{
    public WorkItemUpdateModelValidator()
    {
        Include(new WorkItemBaseModelValidator());
    }
}