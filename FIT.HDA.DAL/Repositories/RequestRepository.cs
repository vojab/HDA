using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using FIT.HDA.BL.Enums;
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

        public IEnumerable<Request> GetRequestsByUserId(int userId)
        {
            return _context.Requests.Where(r => r.AssignedUserChanges.FirstOrDefault().UserId == userId).Select(r => r).AsEnumerable();
        }

        public IEnumerable<Request> GetRequestsByRequestStatusId(int requestStatusId)
        {
            return _context.Requests.Where(r => 
                r.RequestStatusChanges.LastOrDefault().RequestStatusId == requestStatusId).Select(r => r).AsEnumerable();
        }

        // This method will return all help desk requests for help desk personell
        // 1) All requests assigned to currently logged in help desk user
        // 2) All requests in status OPEN - 1
        public IEnumerable<Request> GetRequestsForHelpDeskUsers(int userId)
        {
            return _context.Requests.Where(r => r.AssignedUserChanges.LastOrDefault().UserId == userId || 
                r.RequestStatusChanges.LastOrDefault().RequestStatusId == (int)HelpDeskEnums.RequestStatus.Open).Select(r => r).AsEnumerable();
        }

        public IEnumerable<Request> GetRequestsByProductId(int productId)
        {
            return _context.Requests.Where(r => r.ProductId == productId).Select(r => r).AsEnumerable();
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

        // TODO: Finish implementation of this
        public void UpdateRequest(int requestId)
        {
            var request = _context.Requests.
                First(r => r.RequestId == 6);

            if (request != null)
            {
                request.RequestDescription = "CHANGED DESCRIPTION";

                _context.SaveChanges();
            }
        }

        public void DeleteRequest(int requestId)
        {
            var request = _context.Requests.
                FirstOrDefault(r => r.RequestId == requestId);

            _context.Requests.Remove(request);

            _context.SaveChanges();
        }

        public void Dispose()
        {
            if (_context != null)
                _context.Dispose();
        }
    }
}
