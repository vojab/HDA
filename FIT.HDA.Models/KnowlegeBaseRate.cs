using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Models
{
    class KnowlegeBaseRate
    {
        public int KnowlegeBaseRateId { get; set; }
        public int KnowlegeBaseRateValue { get; set; }
        public int KnowlegeBaseRateUserId { get; set; }

        public DateTime DateCreated { get; set; }
    }
}
