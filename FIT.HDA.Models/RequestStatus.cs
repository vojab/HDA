using System;

namespace FIT.HDA.Models
{
    public class RequestStatus
    {
        public int RequestStatusId { get; set; }
        public int RequestStatusValue { get; set; }
        public string RequestStatusName { get; set; }

        public DateTime DateCreated { get; set; }
    }
}
