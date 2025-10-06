using AutoMapper;
using TaskManagement.Service.Users.Descriptors;
using TaskManagement.Storage.Entities;

namespace TaskManagement.Service.Infrastructure
{
    public class EntityMapper : Profile
    {
        public EntityMapper()
        {
            CreateMap<UserDescriptor, User>()
                .ForMember(d => d.Id, opt => opt.Ignore());
        }
    }
}
