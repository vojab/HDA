using System.Collections.Generic;
using System.Linq;
using FIT.HDA.BL.Enums;
using FIT.HDA.Models;

namespace FIT.HDA.DAL.Repositories
{
    public class UserRepository
    {
        private readonly HelpDeskDbContext _context;
        public UserRepository()
        {
            _context = new HelpDeskDbContext();
        }

        public IEnumerable<User> GetAll()
        {
            return _context.Users.Where(r => r.UserStatus != (int)HelpDeskEnums.Status.Deleted).AsEnumerable();
        }


        public User GetUserByUserNameAndPassword(string username, string password)
        {
            return
                _context.Users.Where(r => r.UserName == username && r.Password == password).Select(r => r).
                    FirstOrDefault();
        }

        public void SaveUser(User user)
        {
            _context.Users.Add(user);
            _context.SaveChanges();
        }

        // Method doesn't not delete user but only update user status to Deleted - 0
        public void DeleteUser(int userId)
        {
            var user = _context.Users.First(r => r.UserId == userId);

            if (user != null)
            {
                user.UserStatus = (int)HelpDeskEnums.Status.Deleted;

                _context.SaveChanges();
            }
        }

        public void ChangePassword(int userId, string newPassword)
        {
            var user = _context.Users.First(r => r.UserId == userId);

            if (user != null)
            {
                user.Password = newPassword;

                _context.SaveChanges();
            }
        }

        public void Dispose()
        {
            if (_context != null)
                _context.Dispose();
        }
    }
}
