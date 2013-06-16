using System.Collections.Generic;
using System.Linq;
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
            return _context.Users.AsEnumerable();
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

        public void Dispose()
        {
            if (_context != null)
                _context.Dispose();
        }
    }
}
