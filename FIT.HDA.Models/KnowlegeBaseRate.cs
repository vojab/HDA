using System;

namespace FIT.HDA.Models
{
    public class KnowlegeBaseRate
    {
        public int KnowlegeBaseRateId { get; set; }
        public int KnowlegeBaseRateValue { get; set; }
        public int KnowlegeBaseRateUserId { get; set; }

        public DateTime DateCreated { get; set; }
    }
}
