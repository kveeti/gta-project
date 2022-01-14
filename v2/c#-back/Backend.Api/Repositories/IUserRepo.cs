using Backend.Api.Dtos.UserDtos;
using Backend.Api.Models;

namespace Backend.Api.Repositories;

public interface IUserRepo
{
  User GetByUsername(string username);

  Task<User> GetById(Guid id);

  IEnumerable<ReturnUserDto> GetAll();

  Task Add(User user);

  Task Update(User user);

  Task Delete(User user);
}