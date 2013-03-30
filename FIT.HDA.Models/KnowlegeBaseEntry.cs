using System;

namespace FIT.HDA.Models
{
    public class KnowlegeBaseEntry
    {
        public int KnowlegeBaseEntryId { get; set; }
        public string KnowlegeBaseEntryDescription { get; set; }

        // TODO: Code first connections define bellow
        public int KnowlegeBaseRateId { get; set; }
        public int KnowlegeBaseAttachmentId { get; set; }

        public DateTime DateCreated { get; set; }
    }
}
