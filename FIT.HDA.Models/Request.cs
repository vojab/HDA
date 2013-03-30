using System;
using System.Collections.Generic;

namespace FIT.HDA.Models
{
    public class Request
    {
        public int RequestId { get; set; }
        public string RequestDescription { get; set; }
        public bool RequestReadyForArchive { get; set; }
        public DateTime RequestOpenDate { get; set; }
        public DateTime RequestClosedDate { get; set; }

        // --- Code First DEFINITION
        //public int RequestTimeManagamentId { get; set; }
        //public TimeManagament TimeManagament { get; set; }

        //public int RequestProductId { get; set; }
        //public virtual ICollection<Product> Products { get; set; }
        // -------------------------

        // TODO: Code first connections define bellow - IMPLEMENT LATER
        //public int RequestStatusId { get; set; }
        //public int CurrentlyAssignedUserId { get; set; }
        //public int RequestKnowlegeBaseEntryId { get; set; }
        //public int RequestAttachmentId { get; set; }

        public DateTime DateCreated { get; set; }
    }
}
