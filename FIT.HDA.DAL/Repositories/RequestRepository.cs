using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using FIT.HDA.Models;

namespace FIT.HDA.DAL.Repositories
{
    public class RequestRepository
    {
        private readonly HelpDeskDbContext _context;
        public RequestRepository()
        {
            _context = new HelpDeskDbContext();
        }

        public IEnumerable<Request> GetAll()
        {
            return _context.Requests.AsEnumerable();
        }

        public IEnumerable<Request> GetRequestById(int id)
        {
            return _context.Requests.Where(r => r.RequestId == id).Select(r => r).AsEnumerable();
        }

        public void SaveRequest(Request request)
        {
            _context.Requests.Add(request);
            _context.SaveChanges();
        }

        public void Dispose()
        {
            if (_context != null)
                _context.Dispose();
        }
    }
}
