using backend.Core.Entities;
using AutoMapper;
using backend.Core.Dtos.Auth;
using backend.Core.Dtos;

namespace backend.Core.AutoMapperConfig
{
    public class AutoMapperConfig : Profile
    {
        public AutoMapperConfig()
        {

            CreateMap<UpdateDto, ApplicationUser>();
            CreateMap<ApplicationUser, UpdateDto>();


        }

    }
}
