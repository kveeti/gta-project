using Backend.Dtos;
using Backend.Models;

namespace Backend.Repositories
{
    public interface IUserRepo
    {
        User GetByUsername(string Username);

        Task<User> GetById(int Id);

        IEnumerable<ReturnUser> GetAll();

        Task Add(User user);

        Task<User> UpdateRole(int Id, string NewRole);

        Task Delete(int Id);
    }
}
