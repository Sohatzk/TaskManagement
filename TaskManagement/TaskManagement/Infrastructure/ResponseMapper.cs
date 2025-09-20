using AutoMapper;
using TaskManagement.Models.User.Out;
using TaskManagement.Models.WorkItem.Out;
using TaskManagement.Storage.Views.Users;
using TaskManagement.Storage.Views.WorkItems;

namespace TaskManagement.Infrastructure;

public class ResponseMapper : Profile
{
    public ResponseMapper()
    {
        CreateMap<WorkItemGridView, WorkItemGridResponse>();
        CreateMap<UserGridView, UserGridResponse>();
    }
}