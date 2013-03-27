using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Models
{
    class KnowlegeBaseEntry
    {
        public int KnowlegeBaseEntryId { get; set; }
        public string KnowlegeBaseEntryDescription { get; set; }

        // TODO: Code first connections define bellow
        public int KnowlegeBaseRateId { get; set; }
        public int KnowlegeBaseAttachmentId { get; set; }

        public DateTime DateCreated { get; set; }
    }
}
