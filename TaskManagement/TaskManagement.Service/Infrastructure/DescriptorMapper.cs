using AutoMapper;
using TaskManagement.Service.Users.Descriptors;
using TaskManagement.Storage.Entities;

namespace TaskManagement.Service.Infrastructure
{
    public class DescriptorMapper : Profile
    {
        public DescriptorMapper()
        {
            CreateMap<UserDescriptor, User>()
                .ForMember(d => d.Id, opt => opt.Ignore());
        }
    }
}
