using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Models
{
    class RequestStatus
    {
        public int RequestStatusId { get; set; }
        public int RequestStatusValue { get; set; }
        public string RequestStatusName { get; set; }

        public DateTime DateCreated { get; set; }
    }
}
