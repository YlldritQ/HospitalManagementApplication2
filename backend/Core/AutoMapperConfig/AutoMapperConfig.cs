using AutoMapper;
using backend.Core.Dtos.Auth;
using backend.Core.Dtos.Patient;
using backend.Core.Enitites;
using backend.Core.Entities;

namespace backend.Core.AutoMapperConfig
{
    public class AutoMapperConfig : Profile
    {
        public AutoMapperConfig()
        {
            CreateMap<UpdateDto, ApplicationUser>();
            CreateMap<ApplicationUser, UpdateDto>();

            CreateMap<Patient, PatientDto>().ReverseMap();
            CreateMap<Patient, CUPatientDto>().ReverseMap();
        }
    }
}
