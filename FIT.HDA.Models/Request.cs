using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Models
{
    class Request
    {
        public int RequestId { get; set; }
        public string RequestDescription { get; set; }
        public bool RequestReadyForArchive { get; set; }
        public DateTime RequestOpenDate { get; set; }
        public DateTime RequestClosedDate { get; set; }

        // TODO: Code first connections define bellow
        public int RequestStatusId { get; set; }
        public int RequestProductId { get; set; }
        public int CurrentlyAssignedUserId { get; set; }
        public int RequestTimeManagamentId { get; set; }
        public int RequestKnowlegeBaseEntryId { get; set; }
        public int RequestAttachmentId { get; set; }

        public DateTime DateCreated { get; set; }
    }
}
