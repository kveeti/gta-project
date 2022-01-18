using AutoMapper;
using Backend.Api.CarDtos;
using Backend.Api.GarageDtos;
using Backend.Api.ModelCarDtos;
using Backend.Api.ModelGarageDtos;
using Backend.Api.Models;

namespace Backend.Api;

public class MapperProfile : Profile
{
  public MapperProfile()
  {
    CreateMap<ModelGarage, ReturnModelGarageDto>();

    CreateMap<ModelCar, ReturnModelCarDto>();
    CreateMap<JoinedCarDto, ReturnCarDto>();
    CreateMap<Car, ReturnNotJoinedCarDto>();

    CreateMap<JoinedGarageDto, ReturnGarageDto>();
    CreateMap<Garage, ReturnNotJoinedGarageDto>();
  }
}