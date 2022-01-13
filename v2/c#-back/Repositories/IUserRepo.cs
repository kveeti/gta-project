using Backend.Dtos;
using Backend.Models;

namespace Backend.Repositories;
    
public interface IUserRepo
{
    User GetByUsername(string username);

    Task<User> GetById(Guid id);

    IEnumerable<ReturnUserDto> GetAll();

    Task Add(User user);

    Task Update(User user);

    Task Delete(User user);
}
