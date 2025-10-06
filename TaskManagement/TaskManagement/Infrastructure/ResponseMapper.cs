using AutoMapper;
using TaskManagement.Models.User.Out;
using TaskManagement.Models.WorkItem.Out;
using TaskManagement.Service.Users.Views;
using TaskManagement.Service.WorkItems.Views;
using TaskManagement.Storage.Views.Users;

namespace TaskManagement.Infrastructure;

public class ResponseMapper : Profile
{
    public ResponseMapper()
    {
        CreateMap<WorkItemGridView, WorkItemGridResponse>();
        CreateMap<WorkItemView, WorkItemResponse>();
        CreateMap<UserSelectView, UserSelectResponse>();
    }
}