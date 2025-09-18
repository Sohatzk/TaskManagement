using AutoMapper;
using TaskManagement.Models.WorkItem.Out;
using TaskManagement.Storage.Views.WorkItems;

namespace TaskManagement.Infrastructure;

public class ResponseMapper : Profile
{
    public ResponseMapper()
    {
        CreateMap<WorkItemGridView, WorkItemGridResponse>();
    }
}