using AutoMapper;
using TaskManagement.Models.WorkItem.In;
using TaskManagement.Service.WorkItems.Descriptors;

namespace TaskManagement.Infrastructure;

public class DescriptorMapper : Profile
{
    public DescriptorMapper()
    {
        CreateMap<WorkItemCreateModel, WorkItemCreateDescriptor>();
        CreateMap<WorkItemUpdateModel, WorkItemUpdateDescriptor>();
    }
}