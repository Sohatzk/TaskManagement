using AutoMapper;
using TaskManagement.Storage.Entities;
using TaskManagement.Storage.Views.Users;

namespace TaskManagement.Service.Infrastructure
{
    public class ViewMapper : Profile
    {
        public ViewMapper()
        {
            CreateMap<User, UserGridView>();
        }
    }
}
