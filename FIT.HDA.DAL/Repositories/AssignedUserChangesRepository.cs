using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using FIT.HDA.Models;

namespace FIT.HDA.DAL.Repositories
{
    public class AssignedUserChangesRepository
    {
        private readonly HelpDeskDbContext _context;
        public AssignedUserChangesRepository()
        {
            _context = new HelpDeskDbContext();
        }

        public IEnumerable<AssignedUserChanges> GetAll()
        {
            return _context.AssignedUserChanges.AsEnumerable();
        }

        public void SaveAssignedUserChanges(AssignedUserChanges assignedUserChanges)
        {
            _context.AssignedUserChanges.Add(assignedUserChanges);
            _context.SaveChanges();
        }

        public void Dispose()
        {
            if (_context != null)
                _context.Dispose();
        }
    }
}
