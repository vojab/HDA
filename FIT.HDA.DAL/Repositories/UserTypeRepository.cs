using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using FIT.HDA.Models;

namespace FIT.HDA.DAL.Repositories
{
    public class UserTypeRepository
    {
        private readonly HelpDeskDbContext _context;
        public UserTypeRepository()
        {
            _context = new HelpDeskDbContext();
        }

        public IEnumerable<UserType> GetAll()
        {
            return _context.UserTypes.AsEnumerable();
        }

        public void Dispose()
        {
            if (_context != null)
                _context.Dispose();
        }
    }
}
