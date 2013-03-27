using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Models
{
    class TimeManagament
    {
        public int TimeManagamentId { get; set; }
        public int EstimationTimeInHours { get; set; }
        public int RecordTimeInHours { get; set; }

        public DateTime DateCreated { get; set; }
    }
}
