using FluentValidation;
using TaskManagement.Models.WorkItem.In;

namespace TaskManagement.Validators.WorkItems;

public class WorkItemBaseModelValidator : AbstractValidator<WorkItemBaseModel>
{
    public WorkItemBaseModelValidator()
    {
        RuleFor(m => m.Title).NotEmpty();
    }
}