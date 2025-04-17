using AutoMapper;
using backend.Core.Dtos.Auth;
using backend.Core.Dtos;
using backend.Core.Enitites;

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
