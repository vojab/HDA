using System;
using System.Collections.Generic;
using System.Collections.ObjectModel;
using System.Net;
using System.Net.Http;
using System.Web.Http;
using System.Web.Mvc;
using FIT.HDA.API.Formatters;
using FIT.HDA.DAL;
using FIT.HDA.DAL.Repositories;
using FIT.HDA.Models;

namespace FIT.HDA.API.Controllers
{
    public class AssignedUserChangesAPIController : ApiController
    {
        private readonly AssignedUserChangesRepository _assignedUserChangesRepository;

        public AssignedUserChangesAPIController()
        {
            _assignedUserChangesRepository = new AssignedUserChangesRepository();
        }

        public IEnumerable<AssignedUserChanges> GetAssignedUserChanges()
        {
            IEnumerable<AssignedUserChanges> assignedUserChanges;

            try
            {
                assignedUserChanges = _assignedUserChangesRepository.GetAll();

            }
            catch (Exception)
            {
                throw new HttpResponseException(new HttpResponseMessage(HttpStatusCode.NotFound));
            }

            return assignedUserChanges;
        }

        [System.Web.Http.ActionName("SaveAssignedUserChange")]
        [System.Web.Http.HttpGet]
        public string SaveAssignedUserChange(string userid, string requestid)
        {
            try
            {
                var assignedUserChange = new AssignedUserChanges();

                assignedUserChange.UserId = Int32.Parse(userid);
                assignedUserChange.RequestId = Int32.Parse(requestid);
                assignedUserChange.DateCreated = DateTime.Now;

                _assignedUserChangesRepository.SaveAssignedUserChanges(assignedUserChange);

                // TODO: Move response to the constants
                return "Saved Assigned User Change - Success";
            }
            catch (Exception)
            {
                throw new HttpResponseException(new HttpResponseMessage(HttpStatusCode.NotFound));
            }
        }
    }
}
