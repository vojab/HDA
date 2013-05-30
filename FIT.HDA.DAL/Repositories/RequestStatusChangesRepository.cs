using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using FIT.HDA.Models;

namespace FIT.HDA.DAL.Repositories
{
    public class RequestStatusChangesRepository
    {
        private readonly HelpDeskDbContext _context;
        public RequestStatusChangesRepository()
        {
            _context = new HelpDeskDbContext();
        }

        public IEnumerable<RequestStatusChanges> GetAll()
        {
            return _context.RequestStatusChanges.AsEnumerable();
        }

        public IEnumerable<RequestStatusChanges> GetRequestStatusChangeByRequestId(int requestId)
        {
            return _context.RequestStatusChanges.Where
                (r => r.RequestId == requestId).Select(r => r).AsEnumerable();
        }

        public void SaveRequestStatusChanges(RequestStatusChanges requestStatusChanges)
        {
            _context.RequestStatusChanges.Add(requestStatusChanges);
            _context.SaveChanges();
        }

        public void DeleteRequestStatusChanges(int requestStatusChangesId)
        {
            var requestStatusChanges = _context.RequestStatusChanges.
                FirstOrDefault(r => r.RequestStatusChangesId == requestStatusChangesId);

            _context.RequestStatusChanges.Remove(requestStatusChanges);

            _context.SaveChanges();
        }

        public void Dispose()
        {
            if (_context != null)
                _context.Dispose();
        }
    }
}
