using Backend.Api.Dtos.UserDtos;
using Backend.Api.Models;

namespace Backend.Api.Repositories;

public interface IUserRepo
{
  User GetByUsername(string aUsername);

  Task<User> GetById(Guid aId);

  IEnumerable<ReturnUserDto> GetAll();

  Task Add(User aUser);

  Task Update();

  Task Delete(User aUser);
}