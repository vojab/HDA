using System;

namespace FIT.HDA.Models
{
    public class RequestStatusChanges
    {
        public int RequestStatusChangesId { get; set; }
        public int RequestId { get; set; }
        public int RequestStatusId { get; set; }

        public DateTime DateCreated { get; set; }
    }
}
